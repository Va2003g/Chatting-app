import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import HomeHeader from "@/components/HomeHeader";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import CustomHeader from "@/components/CustomHeaderForFullScreen";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          header: () => <HomeHeader inProfile={true}/>,
        }}
      />
      <Stack.Screen
        name="CameraScreen"
        options={{
          // header: () => <HomeHeader />,
          headerShown:false,
          presentation:'modal'
        }}
      />
      <Stack.Screen
        name="photoFullScreenView"
        options={{
          // header: () => <CustomHeader message={message} />,
          // headerShown:false,
          // presentation:'modal'
        }}
      />
    </Stack>
  );
};

export default _layout;
