import { searchQueryAtom, searchResultsAtom } from "@/src/atoms/atoms";
import FriendCard from "@/src/components/FriendCard";
import FriendSearchBar from "@/src/components/FriendSearchBar";
import ShareInviteLink from "@/src/components/ShareInviteLink";
import { View } from "@/src/components/Themed";
import { useAtomValue } from "jotai";

export default function AddFriends() {
  const searchText = useAtomValue(searchQueryAtom);
  const queriedFriendIds = useAtomValue(searchResultsAtom);
  return (
    <View className="flex-1 p-4">
      <FriendSearchBar placeholder="Username or email" />

      {searchText.length == 0 && <ShareInviteLink />}
      {/* TODO: implement native sharing */}
      {searchText.length > 0 &&
        queriedFriendIds.map((friendId) => (
          <FriendCard key={friendId} friendId={friendId} displayType="search" />
        ))}
    </View>
  );
}
