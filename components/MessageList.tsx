import { View, Text, ScrollView } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";
import { MessageType, UserType } from "@/utils/Types";

const MessageList = ({ messages, currentUser, scrollViewRef }: { messages: MessageType[]; currentUser: UserType; scrollViewRef: any }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }} ref={scrollViewRef}>
      {messages.map((message: MessageType, index: number) => {
        return <MessageItem message={message} key={index} currentUser={currentUser} />;
      })}
    </ScrollView>
  );
};

export default MessageList;
