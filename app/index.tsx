import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Slot } from "expo-router";

const StartPage = () => {
  return (
    <View className="flex-1 justify-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};

export default StartPage;
