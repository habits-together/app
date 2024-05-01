import { View, Text } from "@/src/components/Themed";
import FriendRequest from "@/src/components/FriendRequest";
import { useEffect, useState } from "react";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import SmallProfilePicture from "./ProfilePicture";

interface FriendRequestData {
  id: number;
  displayName: string;
  userName: string;
  profilePicUrl: string;
}

export default function FriendRequestList() {
  const [friendRequests, setFriendRequests] = useState<FriendRequestData[]>([]);

  useEffect(() => {
    const fetchPics = async () => {
      const pic1 = await fetchSingleUserThumbnail();
      const pic2 = await fetchSingleUserThumbnail();
      // we would fetch the list from the db and set it here
      setFriendRequests([
        {
          id: 1,
          displayName: "Someone else",
          userName: "some1else",
          profilePicUrl: pic1.imgurl,
        },
        {
          id: 2,
          displayName: "Eduardo",
          userName: "eduardo_012003",
          profilePicUrl: pic2.imgurl,
        },
      ]);
    };
    fetchPics();
  }, []);

  const deleteInvite = (id: number) => {
    console.log("Invite deleted");
    // delete in db
    setFriendRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };
  const confirmInvite = (id: number) => {
    console.log("Invite confirmed");
    // confirm in db
    setFriendRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  return (
    <View className="flex flex-col">
      {friendRequests.length === 1 && (
        <Text className="text-xl font-bold">New friend request</Text>
      )}
      {friendRequests.length > 1 && (
        <Text className="text-xl font-bold">New friend requests</Text>
      )}
      {friendRequests.map((request, index) => (
        <FriendRequest
          key={index}
          displayName={request.displayName}
          userName={request.userName}
          profilePic={<SmallProfilePicture picUrl={request.profilePicUrl} />}
          deleteInvite={() => deleteInvite(request.id)}
          confirmInvite={() => confirmInvite(request.id)}
        />
      ))}
    </View>
  );
}
