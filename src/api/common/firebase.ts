import { Env } from '@env';
import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  initializeFirestore,
} from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

import { reactNativeAsyncStorage } from '../../core/storage';
const firebaseConfig = {
  apiKey: Env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: Env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: Env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: Env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: Env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const functions = getFunctions(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(reactNativeAsyncStorage),
});
export const storage = getStorage(app);

// Connect to emulator
// 10.0.2.2 is a special IP address to connect to the 'localhost' of the host computer from an Android emulator
const emulatorHost = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2';
const FIRESTORE_PORT = 8080;
const FUNCTIONS_PORT = 5001;
const AUTH_PORT = 9099;
const STORAGE_PORT = 9199;

if (__DEV__) {
  connectFirestoreEmulator(db, emulatorHost, FIRESTORE_PORT);
  connectFunctionsEmulator(functions, emulatorHost, FUNCTIONS_PORT);
  connectAuthEmulator(auth, `http://${emulatorHost}:${AUTH_PORT}`);
  connectStorageEmulator(storage, emulatorHost, STORAGE_PORT);
}
