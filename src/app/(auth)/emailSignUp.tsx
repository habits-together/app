import { Text, View } from "@/src/components/Themed";
import { Link } from "expo-router";
import AuthButton from "@/src/components/AuthButton";
import AuthInputField from "@/src/components/AuthInputField";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import {auth,firestore} from "@/src/firebase/config";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function emailsignup() {
  
  const [data,setData] = useState({
    email: '',
    password: ''
  });
  
  const handleEmailChange = (email: string) => {
    setData({...data,email: email});
  }

  const handlePasswordChange = (password: string) => {
    setData({...data,password: password});
  }

  const SignUp = () => {

    console.log("Sign Up");
    console.log(data);
  
    // UNCOMMENT THE BELOW LINE TO ENABLE FIREBASE AUTHENTICATION
    // createUserWithEmailAndPassword(auth, data.email, data.password);

    // ADD TO DATABASE AFTER SIGN UP
    // handleDatabaseSignUp();
  };


  const handleDatabaseSignUp = async () => {
    // BASE DATA
    const baseData = {

    }
    
    // PUSH TO FIREBASE
    if (auth.currentUser) {
      const docRef = doc(firestore, "users", auth.currentUser.uid);
      await setDoc(docRef, baseData);
      console.log("Document written with ID: ", auth.currentUser.uid);
    }
    else {
      console.log("An error occurred. Please try again.");
    }
  }
  return (
    <View className="flex-1 items-center px-3 pt-5">
      <AuthInputField text="Email" isPass={false} updateFunction={handleEmailChange}/>
      <AuthInputField text="Password" isPass={true} updateFunction={handlePasswordChange}/>
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
