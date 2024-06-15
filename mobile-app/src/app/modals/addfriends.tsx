import FriendSearchBar from "@/src/components/FriendSearchBar";
import ShareInviteLink from "@/src/components/ShareInviteLink";
import { View } from "@/src/components/Themed";

export default function AddFriends() {
  return (
    <View className="flex-1 p-4">
      <FriendSearchBar placeholder="Username or email" />
      <ShareInviteLink />
    </View>
  );
}