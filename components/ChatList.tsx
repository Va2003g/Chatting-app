import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

const ChatList = ({ users }: { users: Object[] }) => {
  console.log("users in chat list", users);
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random().toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          
          return (
            <ChatItem
              noBorder={index + 1 === users.length}
              item={item}
              index={index}
              router={router}
            />
          );
        }}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
