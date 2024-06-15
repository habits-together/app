import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";
import { Text, View } from "@/src/components/Themed";
import { auth, firestore } from "@/src/firebase/config";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function emailsignup() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (email: string) => {
    setData({ ...data, email: email });
  };

  const handlePasswordChange = (password: string) => {
    setData({ ...data, password: password });
  };

  const SignUp = () => {
    console.log("Sign Up Attempted");
    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      (success) => {
        handleDatabaseSignUp();
        resetNavigationStack("/");
      },
      (err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            return;
          case "auth/invalid-email":
            alert("Invalid email");
            return;
          case "auth/weak-password":
            alert("Weak password");
            return;
          default:
            alert(`An error occurred. Please try again. ${err.code}`);
            return;
        }
      },
    );
  };

  const handleDatabaseSignUp = async () => {
    // BASE DATA
    const baseData = {
      created_at: new Date(),
      display_name: data.email,
      picture: "",
      username: auth.currentUser?.email,
      habit_invited: [],
      friend_requests: [],
    };

    const dummyHabitData = {
      completion_date: new Date(),
      habit_id: "BASEHABIT",
      times_completed: 0,
    };

    const nudgeDummyData = {
      habit_ref: "habits/BASEHABIT",
      friend_ref: "users/otheruser",
      sent_at: new Date(),
    };

    const friendDummyData = {
      friend_ref: "users/otheruser",
      friends_since: new Date(),
    };

    // PUSH TO FIREBASE
    if (auth.currentUser) {
      // write regular user data doc
      const accDocRef = doc(firestore, "users", auth.currentUser.uid);
      await setDoc(accDocRef, baseData);

      // create habit completion collection
      const habitUserCompletionColRef = collection(
        accDocRef,
        "habits",
      );
      const id =
        "BASEHABIT-" +
        String(new Date().toLocaleDateString("en-CA").replace(/\//g, "")); //BASEHABIT-YYYYMMDD
      const habitCompletetionDocRef = doc(habitUserCompletionColRef, id);
      await setDoc(habitCompletetionDocRef, dummyHabitData);

      // create nudge collection
      const nudgeColRef = collection(accDocRef, "nudges");
      await addDoc(nudgeColRef, nudgeDummyData);

      // create friends collection
      const friendsColRef = collection(accDocRef, "friends");
      await addDoc(friendsColRef, friendDummyData);

      console.log(
        "Added User Document written with ID: ",
        auth.currentUser.uid,
      );
    } else {
      //potential issue: if user gets created but DB write fails
      console.log("An error occurred. Please try again.");
    }
  };
  return (
    <View className="flex-1 items-center px-3 pt-5">
      <AuthInputField
        text="Email"
        isPass={false}
        updateFunction={handleEmailChange}
      />
      <AuthInputField
        text="Password"
        isPass={true}
        updateFunction={handlePasswordChange}
      />
      <Text className="mb-5 w-2/3 text-center text-xs text-stone-400">
        By continuing, I agree to the {"\n"}
        <Link href="/">
          <Text className="text-xs text-stone-400 underline">
            Terms & Conditions
          </Text>
        </Link>{" "}
        and{" "}
        <Link href="/">
          <Text className="text-xs text-stone-400 underline">
            Privacy Policy
          </Text>
        </Link>
      </Text>
      <AuthButton text="Sign Up" onPress={SignUp} />
      <View className="mt-2">
        <Link href="/(auth)/emaillogin">
          <Text className="text-base font-semibold">
            Already have an account? <Text className="underline">Login</Text>
          </Text>
        </Link>
      </View>
    </View>
  );
}
