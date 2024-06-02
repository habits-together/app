import { Text, View } from "@/src/components/Themed";
import { getMockFriends } from "@/src/lib/mockData";
import { useEffect, useState } from "react";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import { FriendData } from "../lib/types";
import FriendCard from "./FriendCard";
import FriendSearchBar from "./FriendSearchBar";
import { MediumProfilePicture } from "./ProfilePicture";
import ShareInviteLink from "./ShareInviteLink";

export default function InviteFriends() {
  const [friends, setFriends] = useState<FriendData[]>([]);
  useEffect(() => {
    const fetchFriends = async () => {
      const data = await getMockFriends();
      setFriends(data);
      const pics = await Promise.all(
        data.map(() => fetchSingleUserThumbnail()),
      );
      const updatedFriends = data.map((friend, index) => ({
        ...friend,
        profilePicUrl: pics[index].imgurl,
      }));
      setFriends(updatedFriends);
    };
    fetchFriends();
  }, []);
  return (
    <View className="flex-1 p-4">
      <FriendSearchBar placeholder="Search for someone..." />
      <ShareInviteLink />
      <Text className="mt-4 text-xl font-bold">My friends</Text>
      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          displayName={friend.displayName}
          userName={friend.userName}
          profilePic={<MediumProfilePicture picUrl={friend.profilePicUrl} />}
          commonHabits={friend.commonHabits}
          displayType="invite"
        />
      ))}
    </View>
  );
}
