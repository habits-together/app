import { currentUserAtom } from "@/src/atoms/currentUserAtom";
import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";
import { Text, View } from "@/src/components/Themed";
import { handleDatabaseSignUp } from "@/src/firebase/auth";
import { auth } from "@/src/firebase/config";
import { userWithIdT } from "@/src/lib/db_types";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Link } from "expo-router";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { useAtom } from "jotai";
import { useState } from "react";
import { Alert } from "react-native";

export default function emailsignup() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [_, setCurrentUserAtom] = useAtom(currentUserAtom);

  const handleEmailChange = (email: string) => {
    setData({ ...data, email: email });
  };

  const handlePasswordChange = (password: string) => {
    setData({ ...data, password: password });
  };

  const SignUp = () => {
    console.log("Sign Up Attempted");
    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      (userCredential) => {
        handleDatabaseSignUp(data).then(() => {
          const user = userCredential.user; // same as auth.currentUser but is guaranteed to exist

          //Updating current user atom
          const currentUserData: userWithIdT = {
            createdAt: new Date(),
            displayName: data.email,
            picture: "",
            username: user.email as string, //kinda hacky, under other login methods they may not have an email
            id: user.uid,
          };

          setCurrentUserAtom(currentUserData);

          resetNavigationStack("/");
        });
      },
      (error: FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        switch (errorCode) {
          case "auth/missing-email":
            Alert.alert("Please enter an email");
            break;
          case AuthErrorCodes.EMAIL_EXISTS:
            Alert.alert("Email already in use");
            return;
          case AuthErrorCodes.INVALID_EMAIL:
            Alert.alert("Invalid email");
            return;
          case AuthErrorCodes.WEAK_PASSWORD:
            Alert.alert("Weak password");
            return;
          default:
            Alert.alert(
              `An error occurred. Please try again. ${errorMessage} "${errorCode}"`,
            );
            return;
        }
      },
    );
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
