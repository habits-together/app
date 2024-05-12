import { Text, View } from "@/src/components/Themed";
import AuthButton from "@/src/components/AuthButton";
import AuthInputFienld from "@/src/components/AuthInputFienld";

export default function EmailSignUp() {
    const resetPassword = () => {
        console.log("Reset password")
    }
    return (
        <View className="flex-1 items-center pt-5 px-3">
            <Text className="text-stone-400 mb-5">
                You’ll get an email with a password reset link
            </Text>
            <AuthInputFienld text="Email" isPass={false} />
            <AuthButton text="Get password link" onPress={resetPassword} />
        </View>
    );
}