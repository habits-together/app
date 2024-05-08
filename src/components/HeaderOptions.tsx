import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { IconEdit, IconCheck } from "@tabler/icons-react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { Pressable } from "react-native";
import colors from "../constants/colors";
import DotsMenu from "./DotsMenu";
import HeaderBackButton from "./HeaderBackButton";
import Icon from "./Icon";
import { Text, View } from "./Themed";
import RoundedButton from "./RoundedButton";

function sharedOptions(colorScheme: string): NativeStackNavigationOptions {
  return {
    headerShown: true,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor:
        colorScheme === "dark" ? colors.stone.base : colors.white,
    },
    headerBackVisible: false,
  };
}

export function viewHabitOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  return {
    headerLeft: () => <HeaderBackButton showText={true} />,
    headerTitle: () => <></>,
    headerRight: () => (
      <View className="flex-row items-center">
        <Pressable className="mr-2" onPress={() => alert(`Edit habit`)}>
          <Icon icon={IconEdit} />
        </Pressable>
        <DotsMenu
          options={[
            {
              label: "Add friends to habit",
              color: colors.black,
              action: () => alert("Add friends to habit"),
            },
            {
              label: "Share join link",
              color: colors.black,
              action: () => alert("Share join link"),
            },
            {
              label: "Edit habit",
              color: colors.black,
              action: () => alert("Edit habit"),
            },
            {
              label: "Leave habit",
              color: colors.black,
              action: () => alert("Leave habit"),
            },
          ]}
        />
      </View>
    ),
    ...sharedOptions(colorScheme),
  };
}

export function viewProfileOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  const { userName } = useGlobalSearchParams<{ userName: string }>();

  return {
    presentation: "modal",
    headerLeft: () => <HeaderBackButton chevronDirection="down" />,
    headerTitle: () => (
      <Text className="text-base font-semibold text-black dark:text-white">
        {userName}
      </Text>
    ),
    headerRight: () => (
      <DotsMenu
        options={[
          {
            label: "Remove friend",
            color: colors.black,
            action: () => alert("Remove friend"),
          },
        ]}
      />
    ),
    headerTitleAlign: "center",
    ...sharedOptions(colorScheme),
  };
}

export function inviteFriendsOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  return {
    presentation: "modal",
    headerLeft: () => <HeaderBackButton chevronDirection="down" />,
    headerTitle: () => (
      <Text className="text-base font-semibold text-black dark:text-white">
        Invite friends
      </Text>
    ),
    headerRight: () => (
      <RoundedButton
        text="Done"
        icon={IconCheck}
        strokeWidth={4}
        onPress={() => {
          router.back();
        }}
      />
    ),
    headerTitleAlign: "center",
    ...sharedOptions(colorScheme),
  };
}
