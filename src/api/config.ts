import { Env } from '@env';
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: Env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: Env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: Env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: Env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: Env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: Env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app);
export const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
// export const storage = getStorage(app);
