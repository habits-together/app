import Icon from "@/src/components/Icon";
import ProfileCreationBoxes from "@/src/components/PfpNameUsernameBoxes";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import { createUserInDb } from "@/src/firebase/api";
import { UserIdT, userWithIdT } from "@/src/lib/db_types";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { IconCheck } from "@tabler/icons-react-native";
import { getAuth } from "firebase/auth";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

export default function createprofile() {
  const { colorScheme } = useColorScheme();
  const auth = getAuth();
  const [data, setData] = useState<userWithIdT>({
    id: "" as UserIdT,
    displayName: "",
    username: "",
    picture: "",
    createdAt: new Date(),
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // set default pic
    setData({
      ...data,
      picture: "url",
    });
    // set id
    if (auth.currentUser) {
      setData({
        ...data,
        id: auth.currentUser.uid as UserIdT,
      });
    } else {
      resetNavigationStack("/");
    }
  }, [auth]);

  const validateData = (): boolean => {
    const { displayName, username, picture } = data;
    if (!displayName.trim()) {
      setError("Display name cannot be empty.");
      return false;
    }
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return false;
    }
    if (!picture.trim()) {
      setError("Profile picture cannot be empty.");
      return false;
    }
    const r = /^[a-zA-Z0-9_]{3,}$/;
    if (!r.test(username)) {
      setError(
        "Username must be at least 3 characters long and can only contain letters, numbers, and underscores.",
      );
      return false;
    }
    if (!r.test(displayName)) {
      setError(
        "Displayname must be at least 3 characters long and can only contain letters, numbers, and underscores.",
      );
      return false;
    }
    // TODO: check if displaynem alr taken
    return true;
  };

  const createProfile = async () => {
    if (validateData()) {
      const success = await createUserInDb({ userWithId: data });
      if (success) {
        resetNavigationStack("/habits");
      } else {
        resetNavigationStack("/");
      }
    }
  };

  return (
    <SafeAreaView
      className={`flex flex-1 flex-col items-center bg-white dark:bg-stone-800`}
      style={{
        paddingTop:
          Platform.OS === "android"
            ? Math.max(StatusBar.currentHeight || 0, 34)
            : 0,
      }}
    >
      {/* Form */}
      <View className="flex w-screen flex-col px-5">
        <Text className="text-3xl font-bold">Create profile</Text>
        <ProfileCreationBoxes
          editPage={false}
          formData={data}
          setFormData={setData}
        />
        {/* Complete profile */}
        <TouchableOpacity
          onPress={createProfile}
          className="mt-10 h-16 flex-row items-center justify-center rounded-lg border-2"
          style={{
            borderColor: DefaultColors[colorScheme].tint,
          }}
        >
          <Icon icon={IconCheck} />
          <Text className="ml-2 text-lg font-bold">Complete profile</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}
    </SafeAreaView>
  );
}
