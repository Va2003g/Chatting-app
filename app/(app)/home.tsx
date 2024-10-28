import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/authContext'

const Home = () => {
  const {logout,user} = useAuth();
  const handleLogout = async ()=>{
    await logout();
  }
  console.log(user)
  return (
    <View>
      <Text>Home</Text>
      <Button title='Sign Out' onPress={handleLogout}/>
    </View>
  )
}

export default Home