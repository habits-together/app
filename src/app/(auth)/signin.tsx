import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { Button, Input } from "react-native-elements";
import { router } from "expo-router";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDtBfjTfxG6KvP96yHH6qiJexeS-2-3rJA",
//   authDomain: "habits-together.firebaseapp.com",
//   projectId: "habits-together",
//   storageBucket: "habits-together.appspot.com",
//   messagingSenderId: "731859375504",
//   appId: "1:731859375504:web:80b078f13a31b5d897cf15",
//   measurementId: "G-46NX1BKJK8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function Signin() {
  // in the future we want to only have sign in with Google & Apple
  // but for now we will have email sign in for testing
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    // see if the account exists

    setLoading(false);

    // they previously created an account and are logging in
    if (true) {
      resetNavigationStack("/");
    }
    // they are creating an account for the first time
    else {
      router.push("/createprofile");
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          // placeholder="test@gmail.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          // placeholder="password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
