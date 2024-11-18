import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@/context/authContext";
import { Image } from "expo-image";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { router } from "expo-router";
const Profile = () => {
  const { user } = useAuth();
  const handleProfilePhotoChange = () => {
    router.push("/CameraScreen?inProfile=true");
  };
  return (
    <View className="flex-1 items-center gap-8">
      <Pressable onPress={handleProfilePhotoChange}>
        <Image
          source={user.profileUrl}
          style={{
            height: hp(30),
            width: wp(70),
            borderRadius: wp(100),
            marginTop: 18,
          }}
          className="flex-1 self-center rounded-full"
        />
      </Pressable>
      <Text className="text-3xl">Username:- {user.username}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
