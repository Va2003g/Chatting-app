import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MessageType } from "@/utils/Types";
import { Stack, useNavigation } from "expo-router";
import { useAuth } from "@/context/authContext";
import { formatData } from "@/utils/common";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Entypo, Ionicons } from "@expo/vector-icons";

const CustomHeader = ({ message,inPhotoPreview }: { message: MessageType ,inPhotoPreview:boolean}) => {
  const ios = Platform.OS === "ios";
  const { top } = useSafeAreaInsets();
  const { user } = useAuth();
  const navigation = useNavigation();

  const renderDate = (lastMessage: MessageType) => {
    if (lastMessage) {
      console.log("last message time: ", lastMessage?.createdAt); //time in nano seconds
      let date = lastMessage?.createdAt;
      return formatData(new Date(date?.seconds * 1000), true);
    }
  };
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShown:inPhotoPreview,
        header: () => (
          <View
            style={{
              paddingTop: ios ? top : top + 10,
              flexDirection: "row",
            //   justifyContent: "center",
                position:'absolute',
                backgroundColor:'white'
            }}
          >
            <View style={{flex:1}}>
              <TouchableOpacity
                style={{ paddingLeft: 10, alignSelf: "flex-start" }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Entypo name="chevron-left" size={heightPercentageToDP(4)} color="#737373" />
              </TouchableOpacity>
            </View>
            <View style={{flex:10,alignItems:'center'}}>
              {user?.userId === message?.userId ? (
                <View className="mb-3 mr-3 items-center gap-1">
                  <Text style={{ fontSize: heightPercentageToDP(2.3) }}>
                    {user.username}
                  </Text>
                  <Text>{renderDate(message)}</Text>
                </View>
              ) : (
                <View className="mb-3 mr-3 items-center gap-1">
                  <Text style={{ fontSize: heightPercentageToDP(2.3) }}>
                    {message.senderName}
                  </Text>
                  <Text>{renderDate(message)}</Text>
                </View>
              )}
            </View>
          </View>
        ),
      }}
    />
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
