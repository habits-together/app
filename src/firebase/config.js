import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtBfjTfxG6KvP96yHH6qiJexeS-2-3rJA",
  authDomain: "habits-together.firebaseapp.com",
  projectId: "habits-together",
  storageBucket: "habits-together.appspot.com",
  messagingSenderId: "731859375504",
  appId: "1:731859375504:web:80b078f13a31b5d897cf15",
  measurementId: "G-46NX1BKJK8",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const storage = getStorage();
