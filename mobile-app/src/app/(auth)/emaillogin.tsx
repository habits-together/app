import { currentUserAtom } from "@/src/atoms/currentUserAtom";
import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";
import { Text, View } from "@/src/components/Themed";
import { handleDatabaseLogin } from "@/src/firebase/auth";
import { userWithIdT } from "@/src/lib/db_types";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Link } from "expo-router";
import { FirebaseError } from "firebase/app";
import {
  AuthErrorCodes,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAtom } from "jotai";
import { useState } from "react";
import { Alert } from "react-native";

export default function emaillogin() {
  const [data, setData] = useState({ email: "", password: "" });
  const [val, setCurrentUserAtom] = useAtom(currentUserAtom)
  const handleEmailChange = (email: string) => {
    setData({ ...data, email: email });
  };
  const handlePasswordChange = (password: string) => {
    setData({ ...data, password: password });
  };
  const Login = () => {
    signInWithEmailAndPassword(getAuth(), data.email, data.password)
      .then((userCredential) => {
        handleDatabaseLogin().then(
          (success:userWithIdT) => {
            setCurrentUserAtom(success);
            console.log(val)
            resetNavigationStack("/");
          });

      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        switch (errorCode) {
          case "auth/missing-email":
            Alert.alert("Please enter an email");
            break;
          case AuthErrorCodes.INVALID_EMAIL:
            Alert.alert("User does not exist");
            break;
          case AuthErrorCodes.INVALID_PASSWORD:
            Alert.alert("Wrong password please try again");
            break;
          case AuthErrorCodes.INVALID_IDP_RESPONSE:
            Alert.alert("Wrong email or password please try again");
            break;
          default:
            Alert.alert(
              `An error occurred. Please try again. ${errorMessage} "${errorCode}"`,
            );
            break;
        }
      });
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
      <Text className="mb-5 w-2/3 text-center">
        <Link href="/(auth)/forgotpassword">
          <Text className="text-xs text-stone-400 underline">
            Forgot password?
          </Text>
        </Link>
      </Text>
      <AuthButton text="Login" onPress={Login} />
      <View className="mt-2">
        <Link href="/(auth)/emailsignup">
          <Text className="text-base font-semibold">
            Don't have an account? <Text className="underline">Sign up</Text>
          </Text>
        </Link>
      </View>
    </View>
  );
}
