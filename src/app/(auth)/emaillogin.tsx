import { Text, View } from "@/src/components/Themed";
import { Link } from "expo-router";
import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";

export default function emaillogin() {
  const Login = () => {
    resetNavigationStack("/");
  };
  return (
    <View className="flex-1 items-center px-3 pt-5">
      <AuthInputField text="Email" isPass={false} />
      <AuthInputField text="Password" isPass={true} />
      <Text className="mb-5 w-2/3 text-center">
        <Link href="/(auth)/forgotpassword">
          <Text className="text-xs text-stone-400 underline">
            Forgot password?
          </Text>
        </Link>
      </Text>
      <AuthButton text="Login" onPress={Login} />
      <View className="mt-2">
        <Link href="/(auth)/emailSignUp">
          <Text className="text-base font-semibold">
            Don't have an account? <Text className="underline">Sign up</Text>
          </Text>
        </Link>
      </View>
    </View>
  );
}
