
import { Text, View } from "@/src/components/Themed";
import { FriendData, getMockFriends } from "@/src/lib/mockData";
import { useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import SmallProfilePicture from "./ProfilePicture";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import FriendSearchBar from "./FriendSearchBar";
import { Pressable } from "react-native";
import Icon from "./Icon";
import { IconShare2 } from "@tabler/icons-react-native";
import colors from "../constants/colors";

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
          profilePic={<SmallProfilePicture picUrl={friend.profilePicUrl} />}
          commonHabits={friend.commonHabits}
          displayType="invite"
        />
      ))}
    </View>
  );
}


function ShareInviteLink() {
  return (
    <Pressable className="h-10 mt-2 w-auto flex-row items-center justify-center border rounded-xl border-stone-300"
      android_ripple={{ color: colors.stone["300"], radius: 200 }}
    >
      <Icon icon={IconShare2} size={17} strokeWidth={3} />
      <Text className="ml-2 font-semibold text-base">Share Invite Link</Text>
    </Pressable>
  )
}