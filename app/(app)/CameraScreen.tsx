import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CameraViews from "@/components/CameraView";
import { useLocalSearchParams } from "expo-router";

const CameraScreen = () => {
  const { inChat, inProfile } = useLocalSearchParams();
  return (
    <CameraViews
      inChat={inChat === "true" ? true : false}
      inProfile={inProfile === "true" ? true : false}
    />
  );
};

export default CameraScreen;

const styles = StyleSheet.create({});
