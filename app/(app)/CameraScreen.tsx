import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CameraViews from "@/components/CameraView";
import { useLocalSearchParams } from "expo-router";

const CameraScreen = () => {
  const { inChat, inProfile, item } = useLocalSearchParams();
  console.log(item, "item in camera screen");
  let itemObject;
  if (typeof item === "string") {
    itemObject = JSON.parse(item);
  }
  return (
    <CameraViews
      inChat={inChat === "true" ? true : false}
      inProfile={inProfile === "true" ? true : false}
      item={itemObject}
    />
  );
};

export default CameraScreen;

const styles = StyleSheet.create({});
