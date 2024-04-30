import { Text, View } from "@/src/components/Themed";
import { HabitCard } from "@/src/components/HabitCard";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import Profile from "../viewprofile";

export default function FriendsTab() {
  return (
    <View className="flex-1 p-4">
      <Link
            push
            href={{
              pathname: "/viewprofile",
            }}
            asChild
          >
            <Pressable>
              <Text> TESTING BUTTON </Text>
            </Pressable>
          </Link>
    </View>
  );
}
