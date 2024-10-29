import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "@/utils/common";

const ChatItem = ({
  item,
  index,
  noBorder,
  router,
}: {
  item: Object;
  index: number;
  noBorder: boolean;
  router: any;
}) => {

  const openChatRoom = ()=>{
    router.push({pathname:'/chatRoom',params:item})
    console.log("item in chatitem", item);
  }
  return (
    <TouchableOpacity
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
        !noBorder && "border-b border-b-neutral-200"
      }`}
      onPress={openChatRoom}
    >
      <Image
        // source={require("../assets/images/avatar.png")}
        source={{uri:item?.profileUrl}}
        style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
        placeholder={blurhash}
        transition={500}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-semibold text-neutral-800"
          >
            time
          </Text>
        </View>

        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
