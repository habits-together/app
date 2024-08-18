import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";
import { Text, View } from "@/src/components/Themed";
import { handleFirebaseAuthLogIn } from "@/src/firebase/auth";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Link } from "expo-router";
import { useState } from "react";

export default function emaillogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (email: string) => {
    setData({ ...data, email: email });
  };

  const handlePasswordChange = (password: string) => {
    setData({ ...data, password: password });
  };

  const validateData = (): boolean => {
    const { email, password } = data;
    if (!email.trim()) {
      setError("Email cannot be empty.");
      return false;
    }
    if (!password.trim()) {
      setError("Password cannot be empty.");
      return false;
    }
    return true;
  };

  const login = async () => {
    setError("");
    if (validateData()) {
      try {
        await handleFirebaseAuthLogIn(data);
        resetNavigationStack("/habits");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
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
      <Text className="mb-5 w-2/3 text-center">
        <Link href="/(auth)/forgotpassword">
          <Text className="text-xs text-stone-400 underline">
            Forgot password?
          </Text>
        </Link>
      </Text>
      <AuthButton text="Login" onPress={login} />
      <View className="mt-2">
        <Link href="/(auth)/emailsignup">
          <Text className="text-base font-semibold">
            Don't have an account? <Text className="underline">Sign up</Text>
          </Text>
        </Link>
      </View>
      {error ? (
        <Text className="w-10/12 py-5 text-center text-habitColors-red-base">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
