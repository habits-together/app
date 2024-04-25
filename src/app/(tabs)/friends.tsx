import FriendSearchBar from "@/src/components/FriendSearchBar";
import HabitInviteList from "@/src/components/HabitInviteList";
import { Text, View } from "@/src/components/Themed";

export default function FriendsTab() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold">New friend requests</Text>
      <Text className="text-2xl font-bold">New habit invite</Text>

      <HabitInviteList />

      <Text className="text-2xl font-bold">My friends</Text>
      <FriendSearchBar />
    </View>
  );
}
