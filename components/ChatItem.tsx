import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash, formatData, getRoomId } from "@/utils/common";
import { db } from "@/firebaseConfig";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { MessageType, UserType } from "@/utils/Types";

const ChatItem = ({
  item,
  index,
  noBorder,
  router,
  currentUser,
}: {
  item: UserType;
  index: number;
  noBorder: boolean;
  router: any;
  currentUser: UserType;
}) => {
  const [lastMessage, setLastMessage] = useState<
    MessageType | undefined | null
  >(undefined);
  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? (allMessages[0] as MessageType) : null);
    });
    return unsub;
  }, []);

  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
    console.log("item in chatitem", item);
  };

  const renderTime = () => {
    if (lastMessage) {
      console.log("last message time: ", lastMessage?.createdAt); //time in nano seconds
      let date = lastMessage?.createdAt;
      return formatData(new Date(date?.seconds * 1000));
    }
  };
  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "Loading...";
    if (lastMessage) {
      if (currentUser?.userId === lastMessage?.userId)
        return "You: " + lastMessage?.text;
      return lastMessage?.text;
    } else {
      return "Say Hi to start chating";
    }
  };
  return (
    <TouchableOpacity
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
        !noBorder && "border-b border-b-neutral-200"
      }`}
      onPress={openChatRoom}
    >
      <Image
        // source={require("../assets/images/avatar.png")}
        source={{ uri: item?.profileUrl }}
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
            {renderTime()}
          </Text>
        </View>

        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {/* {lastMessage?.text}
           */}
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
