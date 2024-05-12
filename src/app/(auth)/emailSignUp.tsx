import { Text, View } from "@/src/components/Themed";
import { Link } from "expo-router";
import AuthButton from "@/src/components/AuthButton";
import AuthInputFienld from "@/src/components/AuthInputFienld";

export default function EmailSignUp() {
  const SignUp = () => {
    console.log("Sign Up")
  }
  return (
    <View className="flex-1 items-center pt-5 px-3">
      <AuthInputFienld text="Email" isPass={false} />
      <AuthInputFienld text="Password" isPass={true} />
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
      <AuthButton text="Sign Up" onPress={SignUp}/>
      <Text className="mt-2 font-semibold text-base">
        Already have an account?{" "}
        <Link href="/(auth)/emailLogin">
          <Text className="underline">Login</Text>
        </Link>
      </Text>
    </View>
  );
}