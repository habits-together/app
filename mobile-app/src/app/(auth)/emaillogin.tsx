import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";
import { Text, View } from "@/src/components/Themed";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Link } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function emaillogin() {
  const [data, setData] = useState({ email: "", password: "" });
  const handleEmailChange = (email: string) => {
    setData({ ...data, email: email });
  };
  const handlePasswordChange = (password: string) => {
    setData({ ...data, password: password });
  };
  const Login = () => {
    signInWithEmailAndPassword(getAuth(), data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential)
        resetNavigationStack("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // switch (errror.code) {
        // case "auth/user-not-found":
        //   alert("User not found");
        //   break;
        // case "auth/wrong-password":
        //   alert("Wrong password");
        //   break;
        
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
