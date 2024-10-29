import { View, Text, ScrollView } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({
  messages,
  currentUser,
}: {
  messages: Object[];
  currentUser: Object;
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message: Object, index: number) => {
        return <MessageItem message={message} key={index} currentUser={currentUser}/>;
      })}
    </ScrollView>
  );
};

export default MessageList;
