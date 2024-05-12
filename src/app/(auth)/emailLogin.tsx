import { Text, View } from "@/src/components/Themed";
import { Link } from "expo-router";
import AuthButton from "@/src/components/AuthButton";
import AuthInputFienld from "@/src/components/AuthInputFienld";

export default function EmailSignUp() {
    const Login = () => {
        console.log("Login")
    }
    return (
        <View className="flex-1 items-center pt-5 px-3">
            <AuthInputFienld text="Email" isPass={false} />
            <AuthInputFienld text="Password" isPass={true} />
            <Text className="mb-5 w-2/3 text-center">
                <Link href="/(auth)/forgotpassword">
                    <Text className="text-xs text-stone-400 underline">
                        Forgot password?
                    </Text>
                </Link>
            </Text>
            <AuthButton text="Login" onPress={Login} />
            <Text className="mt-2 font-semibold text-base">
                Don't have an account?{" "}
                <Link href="/(auth)/emailSignUp">
                    <Text className="underline">Sign up</Text>
                </Link>
            </Text>
        </View>
    );
}