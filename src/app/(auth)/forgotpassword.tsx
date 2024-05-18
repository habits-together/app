import { Text, View } from "@/src/components/Themed";
import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";

export default function forgotpassword() {
  const resetPassword = () => {
    console.log("Reset password");
  };
  return (
    <View className="flex-1 items-center px-3 pt-5">
      <Text className="mb-5 text-stone-400">
        You’ll get an email with a password reset link
      </Text>
      <AuthInputField text="Email" isPass={false} />
      <AuthButton text="Get password link" onPress={resetPassword} />
    </View>
  );
}
