import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
const PhotoPreview = ({ photoUrl }: { photoUrl: string | null }) => {
  return (
    <View style={styles.previewContainer}>
      <Image source={photoUrl} style={styles.previewImage} />
    </View>
  );
};

export default PhotoPreview;

const styles = StyleSheet.create({
  previewContainer: {
    position: "absolute",
    bottom: hp(6),
    alignSelf: "flex-start",
    left:wp(4)
  },
  previewText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  previewImage: {
    width: 50,
    height: 50,
  }
});
