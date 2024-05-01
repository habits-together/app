import { View, Text } from "@/src/components/Themed";
import FriendCard from "@/src/components/FriendCard";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import { useEffect, useState } from "react";
import { Habit, mockHabitData } from "@/src/lib/mockHabitData";
import SmallProfilePicture from "./ProfilePicture";

// GPT COOKED FOR THIS ONE 🔥

interface FriendData {
  id: number;
  displayName: string;
  userName: string;
  profilePicUrl: string;
  commonHabits: Habit[];
}

export default function FriendList() {
  const [friends, setFriends] = useState<FriendData[]>([
    {
      id: 1,
      displayName: "Someone else",
      userName: "some1else",
      profilePicUrl: "",
      commonHabits: mockHabitData,
    },
    {
      id: 2,
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