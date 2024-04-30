import { Text, View, ScrollView } from "@/src/components/Themed";
import FriendList from "@/src/components/FriendList";
import FriendRequestList from "@/src/components/FriendRequestList";
import FriendSearchBar from "@/src/components/FriendSearchBar";
import HabitInviteList from "@/src/components/HabitInviteList";
import { HabitCard } from "@/src/components/HabitCard";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import Profile from "../viewprofile";

export default function FriendsTab() {
  return (
    <ScrollView className="flex-1 p-4"
      contentContainerStyle={{ paddingBottom: 100 }}
      >
      <Text className="text-2xl font-bold">New friend requests</Text>
      <FriendRequestList />

      <Text className="text-2xl font-bold">New habit invite</Text>
      <HabitInviteList />

      <Text className="text-2xl font-bold">My friends</Text>
      <FriendSearchBar />
      <FriendList />
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

    </ScrollView>
  );
}