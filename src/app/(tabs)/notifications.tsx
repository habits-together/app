import FriendList from "@/src/components/FriendList";
import FriendRequestList from "@/src/components/FriendRequestList";
import HabitInviteList from "@/src/components/HabitInviteList";
import { ScrollView } from "@/src/components/Themed";
import Divider from "@/src/components/Divider";
import { View } from "react-native";
import HabitReminderList from "@/src/components/HabitReminderList";

export default function FriendsTab() {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Divider />
      <FriendRequestList />
      <HabitInviteList />
      <HabitReminderList />
    </ScrollView>
  );
}
