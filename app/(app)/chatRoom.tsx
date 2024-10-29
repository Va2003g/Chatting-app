import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import MessageList from "@/components/MessageList";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";

const ChatRoom = () => {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  // console.log('item: ',item)
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View className="h-3 border-b border-neutral-300"></View>
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList messages={messages} />
        </View>
        <View style={{ marginBottom: hp(1.7) }} className="pt-2">
          <View className="flex-row justify-between items-center mx-3 ">
            <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                placeholder="Type message"
                className="flex-1 mr-2"
                style={{ fontSize: hp(2) }}
              />
              <TouchableOpacity className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                <Feather name="send" size={hp(2.7)} color={"#737373"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatRoom;
