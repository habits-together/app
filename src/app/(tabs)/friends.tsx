import FriendList from "@/src/components/FriendList";
import FriendRequestList from "@/src/components/FriendRequestList";
import FriendSearchBar from "@/src/components/FriendSearchBar";
import HabitInviteList from "@/src/components/HabitInviteList";
import { ScrollView, Text } from "@/src/components/Themed";

export default function FriendsTab() {
  return (
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text className="text-2xl font-bold">New friend requests</Text>
      <FriendRequestList />

      <Text className="text-2xl font-bold">New habit invite</Text>
      <HabitInviteList />

      <Text className="text-2xl font-bold">My friends</Text>
      <FriendSearchBar />
      <FriendList />
    </ScrollView>
  );
}
