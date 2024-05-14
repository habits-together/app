import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import { fetchSingleUserThumbnail } from "@/src/lib/getRandomProfilePics";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { IconTrash } from "@tabler/icons-react-native";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Platform, SafeAreaView, TouchableOpacity } from "react-native";
import ProfileCreationBoxes from "@/src/components/PfpNameUsernameBoxes";

export default function editprofile() {
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
        <ProfileCreationBoxes editPage={true} />
        {/* Delete Account */}
        <TouchableOpacity
          onPress={() => resetNavigationStack("/")}
          className="mt-10 h-12 flex-row items-center justify-center rounded-lg border-2 border-[#FF0000]"
        >
          <Icon lightColor="#FF0000" darkColor="#FF0000" icon={IconTrash} />
          <Text className="ml-2 text-lg font-semibold text-[#FF0000]">
            Delete account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
