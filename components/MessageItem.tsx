import { View, Text } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { MessageType, UserType } from "@/utils/Types";

const MessageItem = ({
  message,
  currentUser,
}: {
  message: MessageType;
  currentUser: UserType;
}) => {
  if (currentUser?.userId === message?.userId) {
    //my message
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end p-3 rounded-2xl bg-white border border-neutral-200">
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    //my message
    return (
      <View className="mb-3 ml-3" style={{ width: wp(80) }}>
        <View className="flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200">
          <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;
