import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import PhotoPreview from "./PhotoPreview";
export default function CameraViews({
  inChat,
  inProfile,
}: {
  inChat: boolean;
  inProfile?: boolean;
}) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<null | string>(null);
  const cameraRef: any = useRef(null);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
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
    }
  }

  return (
    <View style={styles.container}>
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
            <MaterialCommunityIcons name="flashlight" size={24} color="white" />
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
      {inChat && <PhotoPreview photoUrl={photoUrl} />}
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
