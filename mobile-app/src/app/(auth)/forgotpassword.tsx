import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";
import { Text, View } from "@/src/components/Themed";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes, getAuth, sendPasswordResetEmail } from "firebase/auth";

import { useState } from "react";
import { Alert } from "react-native";

export default function forgotpassword() {
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const handleEmailChange = (email: string) => {
    setEmail(email);
  };
  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(getAuth(), email);
      setCheckEmail(true);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        switch (errorCode) {
          case "auth/missing-email":
            Alert.alert("Please enter an email");
            break;
          case AuthErrorCodes.INVALID_EMAIL:
            Alert.alert("User not found");
            break;
          default:
            Alert.alert(
              `An error occurred. Please try again. ${errorMessage} "${errorCode}"`,
            );
            break;
        }
      } else {
        console.log(error);
      }
    }
  };
  const redirToLoginPage = () => {
    resetNavigationStack("/(auth)/emaillogin");
  };
  return (
    <View className="flex-1 items-center px-3 pt-5">
      {checkEmail ? (
        <>
          <Text className="mb-5 ml-2 self-start text-2xl text-stone-400">
            Check your email
          </Text>
          <Text className="mb-7 ml-2 self-start text-stone-400">
            We’ve sent a reset link to{" "}
            <Text className="font-bold">{email}</Text>
          </Text>
          <AuthButton text="Go back to Login page" onPress={redirToLoginPage} />
        </>
      ) : (
        <>
          <Text className="mb-5 text-stone-400">
            You’ll get an email with a password reset link
          </Text>
          <AuthInputField
            text="Email"
            isPass={false}
            updateFunction={handleEmailChange}
          />
          <AuthButton text="Get password link" onPress={resetPassword} />
        </>
      )}
    </View>
  );
}
