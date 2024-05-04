import FriendList from "@/src/components/FriendList";
import FriendRequestList from "@/src/components/FriendRequestList";
import HabitInviteList from "@/src/components/HabitInviteList";
import { ScrollView } from "@/src/components/Themed";

export default function FriendsTab() {
  return (
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <FriendRequestList />
      <HabitInviteList />

      <FriendList />
    </ScrollView>
  );
}
