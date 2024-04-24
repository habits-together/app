import { initializeApp } from "firebase/app";
// authentication
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
// firestore
import { getFirestore } from "firebase/firestore";
// cloud storage
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "../config";

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const firestore = getFirestore();
export const storage = getStorage();
