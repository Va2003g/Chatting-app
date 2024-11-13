import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import PhotoPreview from "./PhotoPreview";
import { useAuth } from "@/context/authContext";
import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { cld } from "@/utils/cloudinary";

import { upload } from "cloudinary-react-native";
import ImageResizer from "react-native-image-resizer";
import { router } from "expo-router";
import { UserType } from "@/utils/Types";

export default function CameraViews({
  inChat,
  inProfile,
  item
}: {
  inChat: boolean;
  inProfile?: boolean;
  item:UserType
}) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<null | string>(null);
  const cameraRef: any = useRef(null);
  const { user } = useAuth();
  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleTorch() {
    console.log(flash);
    setFlash(!flash);
  }
  async function clickPicture() {
    // console.log(cameraRef.current);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUrl(photo.uri);
      if (inProfile) {
        Alert.alert(
          "Confirm Profile Photo",
          "Are you sure you want to save this photo as your profile picture?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Confirm",
              onPress: () => updateUserProfilePhoto(),
            },
          ]
        );
      }
    }
  }

  const updateUserProfilePhoto = async () => {
    if (!photoUrl) {
      console.log("in if condition", photoUrl);
      return;
    }
    try {
      console.log("photourl", photoUrl);
      const options = {
        upload_preset: "chatting-app",
        unsigned: true,
      };

      await upload(cld, {
        file: photoUrl,
        options: options,
        callback: async (error: any, response: any) => {
          //.. handle response
          console.log("response", response.secure_url);
          console.log("error", error);
          const userDocRef = doc(db, "users", user.userId);
          await updateDoc(userDocRef, { profileUrl: response.secure_url });
          router.back();
        },
      });
    } catch (error) {
      console.log("Error while uploading image in cloudinay", error);
    }
  };

  return (
    <View style={styles.container}>
      {!photoUrl && (
        <CameraView
          style={styles.camera}
          facing={facing}
          animateShutter={true}
          enableTorch={flash}
          // flash={flash}
          ref={cameraRef}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={toggleTorch}
            className="flex-1 relative top-20 right-[350px]"
          >
            {flash ? (
              <MaterialCommunityIcons
                name="flashlight-off"
                size={24}
                color="white"
              />
            ) : (
              <MaterialCommunityIcons
                name="flashlight"
                size={24}
                color="white"
              />
            )}
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              // style={styles.button}
              onPress={clickPicture}
              className="flex-row gap-4"
            >
              <Entypo name="circle" size={55} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              // style={styles.button}
              onPress={toggleCameraFacing}
              className="flex-row gap-4 absolute"
              style={{ right: wp(-40) }}
            >
              <Ionicons name="camera-reverse-sharp" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
      {/* {inProfile && (
        <Button title="Save Profile Photo" onPress={updateUserProfilePhoto} />
        )} */}
      {/* {inProfile && photoUrl && (
        <View className="flex-1 bg-red-700">
        <Image source={photoUrl} className="flex-1 w-full h-full" />
        </View>
        )} */}
      {photoUrl && <PhotoPreview photoUrl={photoUrl} inProfile={inProfile} item={item} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: hp(6),
    left: wp(45),
    alignItems: "baseline",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  previewContainer: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
  },
  previewText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  previewImage: {
    width: 200,
    height: 300,
  },
});
