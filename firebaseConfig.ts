// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getReactNativePersistence } from 'react-native';
import {collection, getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIkzBeernsRcHHNp6ae40IcDwDdEB2FNE",
  authDomain: "chatting-app-b4442.firebaseapp.com",
  projectId: "chatting-app-b4442",
  storageBucket: "chatting-app-b4442.appspot.com",
  messagingSenderId: "158159561508",
  appId: "1:158159561508:web:1b42df87b4ab286c7349b1",
  measurementId: "G-Z1LJTNY22B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const usersRef = collection(db,'users')
export const roomRef = collection(db,'rooms')