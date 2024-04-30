import { View } from "@/src/components/Themed";
import FriendCard, { FriendCardProps } from "@/src/components/FriendCard";
import ProfilePicture from "./ProfilePicture";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import { useEffect, useState } from "react";
import { ProfilePic } from "./HabitCard";
import { mockHabitData } from "@/src/lib/mockHabitData";

// GPT COOKED FOR THIS ONE 🔥

interface FriendData {
  displayName: string;
  userName: string;
  profilePicUrl: string;
  commonHabits: any[]; // change this later
}

export default function FriendList() {
  const [friends, setFriends] = useState<FriendData[]>([
    {
      displayName: "Someone else",
      userName: "some1else",
      profilePicUrl: "",
      commonHabits: mockHabitData,
    },
    {
      displayName: "Eduardo",
      userName: "eduardo_012003",
      profilePicUrl: "",
      commonHabits: [],
    },
  ]);

  useEffect(() => {
    const fetchPics = async () => {
      const pics = await Promise.all(
        friends.map(() => fetchSingleUserThumbnail()),
      );
      const updatedFriends = friends.map((friend, index) => ({
        ...friend,
        profilePicUrl: pics[index].imgurl,
      }));
      setFriends(updatedFriends);
    };
    fetchPics();
  }, []);

  return (
    <View className="flex flex-col">
      {friends.map((friend, index) => (
        <FriendCard
          key={index}
          displayName={friend.displayName}
          userName={friend.userName}
          profilePic={<ProfilePicture picUrl={friend.profilePicUrl} />}
          commonHabits={friend.commonHabits}
        />
      ))}
    </View>
  );
}
