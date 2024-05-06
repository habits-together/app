
import { Text, View } from "@/src/components/Themed";
import { FriendData, getMockFriends } from "@/src/lib/mockData";
import { useEffect, useState } from "react";

export default function InviteFriends() {
  const [friends, setFriends] = useState<FriendData[]>([]);
  useEffect(() => {
    const fetchFriends = async () => {
      const data = await getMockFriends();
      setFriends(data);
    };
    fetchFriends();
  }, []);
  return (
    <View className="flex-1 p-4">
        <Text className="text-2xl font-bold">My Friends</Text>
    </View>
  );
}

