import { View, Text, Pressable } from "react-native";
import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MessageType, UserType } from "@/utils/Types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const MessageItem = ({ message, currentUser }: { message: MessageType; currentUser: UserType }) => {
  const router = useRouter();

  function moveToFullScreen(message: MessageType) {
    const messageString = JSON.stringify(message);
    router.push({
      pathname: "/(app)/photoFullScreenView",
      params: { messageString },
    });
  }
  if (currentUser?.userId === message?.userId) {
    //my message
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end p-3 rounded-2xl bg-white border border-neutral-200">
            {message.picture && (
              <Pressable onPress={() => moveToFullScreen(message)}>
                <Image source={message.picture} style={{ width: wp(50), height: hp(30) }} />
              </Pressable>
            )}
            <Text
              style={{
                fontSize: hp(1.9),
              }}
            >
              {message?.text}
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    //my message
    return (
      <View className="mb-3 ml-3" style={{ width: wp(80) }}>
        <View className="flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200 gap-2">
          {message.picture && (
            <Pressable onPress={() => moveToFullScreen(message)}>
              <Image source={message.picture} style={{ width: wp(50), height: hp(30) }} />
            </Pressable>
          )}
          <Text
            style={{
              fontSize: hp(1.9),
            }}
          >
            {message?.text}
          </Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;
