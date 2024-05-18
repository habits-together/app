import { Text, View } from "@/src/components/Themed";
import { Link } from "expo-router";
import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";

export default function emailsignup() {
  const SignUp = () => {
    console.log("Sign Up");
  };
  return (
    <View className="flex-1 items-center px-3 pt-5">
      <AuthInputField text="Email" isPass={false} />
      <AuthInputField text="Password" isPass={true} />
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
      <Link href="/(auth)/emaillogin">
        <Text className="mt-2 text-base font-semibold">
          Already have an account? <Text className="underline">Login</Text>
        </Text>
      </Link>
    </View>
  );
}
