import FriendList from "@/src/components/FriendList";
import { ScrollView } from "@/src/components/Themed";

export default function FriendsTab() {
  return (
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <FriendList />
    </ScrollView>
  );
}
