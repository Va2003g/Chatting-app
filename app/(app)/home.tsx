import { View, Text, Button, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "@/components/ChatList";
import Loading from "@/components/Loading";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "@/firebaseConfig";
const Home = () => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState<Object[]>({});

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.uid));
    const querySnapshot = await getDocs(q);
    let data: Object[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    if (data.length !== 0) setUsers(data);
  };
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    if (user?.uid) getUsers();
  }, []);
  console.log("user data", user);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {users?.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(10)} />
        </View>
      )}
    </View>
  );
};

export default Home;
