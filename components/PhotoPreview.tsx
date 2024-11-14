import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode, useRef, useState } from "react";
import { Image } from "expo-image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { getRoomId } from "@/utils/common";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/context/authContext";
import { UserType } from "@/utils/Types";
import { upload } from "cloudinary-react-native";
import { cld } from "@/utils/cloudinary";
import { router } from "expo-router";
import CustomKeyboardView from "./CustomKeyboardView";
import Loading from "./Loading";
const PhotoPreview = ({
  photoUrl,
  inProfile,
  item,
}: {
  photoUrl: string | null;
  inProfile?: boolean;
  item: UserType;
}) => {
  console.log("photoUrl in photopreview ", photoUrl);
  const { width, height } = Dimensions.get("window");
  const textRef = useRef("");
  const inputRef = useRef<TextInput>(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  if (inProfile) {
    return (
      <View
        className="flex-1 bg-red-100"
        style={{ width: wp(100), height: hp(100) }}
      >
        <Image
          source={photoUrl}
          style={{ width: wp(100), height: hp(100) }}
          className="flex-1 w-full h-full"
        />
      </View>
    );
  }

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) message = "";
    try {
      setLoading(true);
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();
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
          const newDoc = await addDoc(messagesRef, {
            userId: user?.userId,
            text: message,
            profileUrl: user?.profileUrl,
            senderName: user?.username,
            picture: response.secure_url,
            createdAt: Timestamp.fromDate(new Date()),
          });

          console.log("new message id: ", newDoc.id);
          setLoading(false);
          router.back();
        },
      });
    } catch (error: any) {
      Alert.alert("Message", error.message);
    }
  };

  // const handleCamera = () => {
  //   router.push("/CameraScreen?inChat=true");
  // };
  console.log(loading, "loading");
  // return !loading ? (
  //   <CustomKeyboardView inChat={true}>
  //     <Image
  //       source={photoUrl}
  //       style={styles.previewImage}
  //       className={`${!loading} && bg-gray-400`}
  //     />
  //     <View
  //       style={{}}
  //       className="absolute bottom-2 flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5 gap-4"
  //     >
  //       <TouchableOpacity
  //         // onPress={handleCamera}
  //         className="bg-neutral-200 p-2 -ml-[6px] rounded-full"
  //       >
  //         <Feather name="camera" size={hp(2.7)} color={"#737373"} />
  //       </TouchableOpacity>
  //       <TextInput
  //         placeholder="Type message"
  //         className="flex-1 "
  //         style={{ fontSize: hp(2) }}
  //         onChangeText={(value) => (textRef.current = value)}
  //         ref={inputRef}
  //       />
  //       <TouchableOpacity
  //         onPress={handleSendMessage}
  //         className="bg-neutral-200 p-2 mr-[1px] rounded-full"
  //       >
  //         <Feather name="send" size={hp(2.7)} color={"#737373"} />
  //       </TouchableOpacity>
  //     </View>
  //   </CustomKeyboardView>
  // ) : (
  //   <View className="flex-1 justify-center items-center">
  //     <Loading size={100} />
  //   </View>
  // );

  return (
    <CustomKeyboardView inChat={true}>
      <Image
        source={photoUrl}
        style={styles.previewImage}
        className={`${loading} && bg-gray-600`}
      />
      <View
        style={{}}
        className="absolute bottom-2 flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5 gap-4"
      >
        <TouchableOpacity
          // onPress={handleCamera}
          className="bg-neutral-200 p-2 -ml-[6px] rounded-full"
        >
          <Feather name="camera" size={hp(2.7)} color={"#737373"} />
        </TouchableOpacity>
        <TextInput
          placeholder="Type message"
          className="flex-1 "
          style={{ fontSize: hp(2) }}
          onChangeText={(value) => (textRef.current = value)}
          ref={inputRef}
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          className="bg-neutral-200 p-2 mr-[1px] rounded-full"
        >
          <Feather name="send" size={hp(2.7)} color={"#737373"} />
        </TouchableOpacity>
      </View>
      {loading && (
        <View
          className="flex-1 justify-center items-center absolute"
          style={{ width: width, height: height }}
        >
          <Loading size={100} />
        </View>
      )}
    </CustomKeyboardView>
  );
};

export default PhotoPreview;

const styles = StyleSheet.create({
  previewContainer: {
    // position: "absolute",
    // bottom: hp(6),
    // alignSelf: "flex-start",
    // left: wp(4),
  },
  previewText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  previewImage: {
    width: wp(100),
    height: hp(100),
  },
});
