import { View } from "@/src/components/Themed";
import { FriendCard } from "@/src/components/UserCard";
import { useAtomValue } from "jotai";
import { friendIdsAtom } from "../atoms/friendsAtom";

export default function FriendList() {
  const friendIds = useAtomValue(friendIdsAtom);
  return (
    <View className="flex flex-col">
      {friendIds.map((friendId) => (
        <FriendCard
          key={friendId}
          friendId={friendId}
          displayType={"friendsList"}
        />
      ))}
    </View>
  );
}
