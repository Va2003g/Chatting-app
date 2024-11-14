import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import CustomHeader from "@/components/CustomHeaderForFullScreen";
import { MessageType } from "@/utils/Types";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
let headerHeight: number = 0;
// const PhotoFullScreenView = ({ image, text }: { image: string; text?: string }) => {
const PhotoFullScreenView = () => {
  const { messageString } = useLocalSearchParams();
  const ios = Platform.OS === "ios";
  const { top } = useSafeAreaInsets();
  headerHeight = ios
    ? top + heightPercentageToDP(6)
    : top + heightPercentageToDP(6) + 10;
  const [isVisible, setIsVisible] = useState(true);
  let message: MessageType =
    typeof messageString === "string" && JSON.parse(messageString);
  return (
    <Pressable style={{ flex: 1 }} onPress={() => setIsVisible(!isVisible)}>
      <CustomHeader message={message} inPhotoPreview={isVisible} />
      <View style={styles.container}>
        <Image
          source={message.picture}
          style={styles.image}
          contentFit="contain"
        />
        {message.text && isVisible && (
          <Text style={styles.text}>{message.text}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: height - (headerHeight - heightPercentageToDP(6)),
    // position: "absolute",
  },
  text: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    backgroundColor: "black",
    opacity: 0.6,
    width: width,
    textAlign: "center",
    height: heightPercentageToDP(6),
  },
});

export default PhotoFullScreenView;
