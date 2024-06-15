import { Text, View } from "@/src/components/Themed";
import { IconShare2 } from "@tabler/icons-react-native";
import { useAtomValue } from "jotai";
import { Pressable } from "react-native";
import { friendIdsAtom } from "../atoms/atoms";
import colors from "../constants/colors";
import FriendCard from "./FriendCard";
import FriendSearchBar from "./FriendSearchBar";
import Icon from "./Icon";
import ShareInviteLink from "./ShareInviteLink";

export default function InviteFriends() {
  const friendIds = useAtomValue(friendIdsAtom);
  return (
    <View className="flex-1 p-4">
      <FriendSearchBar placeholder="Search for someone..." />
      <ShareInviteLink />
      <Text className="mt-4 text-xl font-bold">My friends</Text>
      {friendIds.map((friendId) => (
        <FriendCard key={friendId} friendId={friendId} displayType="invite" />
      ))}
    </View>
  );
}
