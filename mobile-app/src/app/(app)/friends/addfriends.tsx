import { searchQueryAtom, searchResultUsersAtom } from "@/src/atoms/atoms";
import FriendSearchBar from "@/src/components/FriendSearchBar";
import ShareInviteLink from "@/src/components/ShareInviteLink";
import { View } from "@/src/components/Themed";
import UserCard from "@/src/components/UserCard";
import { UserIdT } from "@/src/lib/db_types";
import { useAtomValue } from "jotai";

export default function AddFriends() {
  const searchText = useAtomValue(searchQueryAtom);
  const searchResultUsers = useAtomValue(searchResultUsersAtom);

  return (
    <View className="flex-1 p-4">
      <FriendSearchBar placeholder="Username or email" />

      {searchText.length == 0 && <ShareInviteLink />}
      {/* TODO: implement native sharing */}
      {searchText.length > 0 &&
        Object.keys(searchResultUsers).map((userId) => (
          <UserCard
            key={userId}
            userInfo={{
              id: userId as UserIdT,
              ...searchResultUsers[userId as UserIdT],
            }}
            displayType="addFriends"
          />
        ))}
    </View>
  );
}
