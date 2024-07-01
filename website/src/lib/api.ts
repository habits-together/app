"use server";

import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getCurrentNumberOfSignups() {
  try {
    const numSignups = (await getDocs(collection(db, "website-signups"))).size;
    return numSignups;
  } catch {
    return null;
  }
}

export async function emailSignupInDB(email: string) {
  try {
    const docSnap = await getDoc(doc(db, "website-signups", email));
    // they already signed up
    if (docSnap.exists()) {
      return {
        status: "already_signed_up",
        signup_number: docSnap.data().signup_number,
      };
    }
    // they haven't signed up yet
    else {
      const numSignups = (await getDocs(collection(db, "website-signups")))
        .size;
      const signup_number = numSignups + 1;

      await setDoc(doc(db, "website-signups", email), {
        email,
        signup_date: new Date(),
        signup_number: signup_number,
      });

      return { status: "success", signup_number: signup_number };
    }
  } catch {
    // error
    return { status: "error", signup_number: null };
  }
}
