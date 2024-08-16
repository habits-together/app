import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";
import { Text, View } from "@/src/components/Themed";
import { handleFirebaseAuthSignUp } from "@/src/firebase/auth";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Link } from "expo-router";
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

  const signUp = async () => {
    const success = await handleFirebaseAuthSignUp(data);
    if (success) {
      resetNavigationStack("/createprofile");
    } else {
      resetNavigationStack("/");
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
        <Link href="/habits">
          <Text className="text-xs text-stone-400 underline">
            Terms & Conditions
          </Text>
        </Link>{" "}
        and{" "}
        <Link href="/habits">
          <Text className="text-xs text-stone-400 underline">
            Privacy Policy
          </Text>
        </Link>
      </Text>
      <AuthButton text="Sign Up" onPress={signUp} />
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
