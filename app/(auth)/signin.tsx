import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { Button, Input } from "react-native-elements";
import { router } from "expo-router";
import { resetNavigationStack } from "@/lib/resetNavigationStack";
import { supabase } from "@/lib/supabase";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Signin() {
  // in the future we want to only have sign in with Google & Apple
  // but for now we will have email sign in for testing
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

    if (signInError || !signInData || !signInData.user) {
      Alert.alert(
        "Sign in failed" + (signInError && ": " + signInError.message)
      );
      setLoading(false);
      return;
    }

    // see if the account exists by checking profile_created in profiles table
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", signInData.user.id)
      .single();

    setLoading(false);

    if (profileError) {
      Alert.alert("Error fetching profile: " + profileError.message);
      return;
    }

    // they previously created an account and are logging in
    if (profileData.profile_created) {
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
