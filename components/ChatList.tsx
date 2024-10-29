import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";
import { UserType } from "@/utils/Types";

const ChatList = ({
  users,
  currentUser,
}: {
  users: UserType[];
  currentUser: UserType;
}) => {
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
              currentUser={currentUser}
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
