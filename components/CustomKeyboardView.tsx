import { View, Text, KeyboardAvoidingView, Platform,ScrollView } from 'react-native'
import React, { ReactNode } from 'react'

const ios = Platform.OS === 'ios'
const CustomKeyboardView = ({children}:{children:ReactNode}) => {
  return (
    <KeyboardAvoidingView
        behavior={ios ? 'padding':'height'}
        style={{flex:1}}
    >
        <ScrollView
            
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            {children}
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyboardView