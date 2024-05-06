
import { Text, View } from "@/src/components/Themed";
import { FriendData, getMockFriends } from "@/src/lib/mockData";
import { useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import SmallProfilePicture from "./ProfilePicture";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";

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
    <View className="flex-1 p-4" style={{ gap: 0 }}>
      {friends.length === 1 && (
        <Text className="text-xl font-bold">My friend</Text>
      )}
      {friends.length > 1 && (
        <Text className="text-xl font-bold">My friends</Text>
      )}
      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          displayName={friend.displayName}
          userName={friend.userName}
          profilePic={<SmallProfilePicture picUrl={friend.profilePicUrl} />}
          commonHabits={friend.commonHabits}
        />
      ))}
    </View>
  );
}

