import FriendCard from "@/src/components/FriendCard";
import { Text, View } from "@/src/components/Themed";
import { useAtomValue } from "jotai";
import { friendIdsAtom } from "../atoms/atoms";

export default function FriendList() {
  const friendIds = useAtomValue(friendIdsAtom);
  return (
    <View className="flex flex-col">
      {friendIds.length === 1 && (
        <Text className="text-xl font-bold">My friend</Text>
      )}
      {friendIds.length > 1 && (
        <Text className="text-xl font-bold">My friends</Text>
      )}
      {friendIds.map((friendId) => (
        <FriendCard key={friendId} friendId={friendId} />
      ))}
    </View>
  );
}
