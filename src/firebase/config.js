import { initializeApp } from "firebase/app";
// authentication
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// firestore
import { getFirestore } from "firebase/firestore";
// cloud storage
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "../config";

const app = initializeApp(firebaseConfig);

// react native persistence should allow the app to remember the user's login state
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage), 
});
export const firestore = getFirestore(app);
export const storage = getStorage();
