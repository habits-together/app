import FriendRequest from "@/src/components/FriendRequest";
import { Text, View } from "@/src/components/Themed";
import { useEffect, useState } from "react";
import { FriendRequestData, getMockFriendInites } from "../lib/mockHabitData";
import SmallProfilePicture from "./ProfilePicture";

export default function FriendRequestList() {
  const [requests, setRequests] = useState<FriendRequestData[]>([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      // we would fetch the list from the db and set it here
      const friendRequests = await getMockFriendInites();
      setRequests(friendRequests);
    };
    fetchFriendRequests();
  }, []);

  const deleteInvite = (id: number) => {
    console.log("Invite deleted");
    // delete in db
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };
  const confirmInvite = (id: number) => {
    console.log("Invite confirmed");
    // confirm in db
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  if (requests.length === 0) {
    return <></>;
  }
  return (
    <View className="flex flex-col">
      <Text className="text-xl font-bold">
        New friend request{requests.length > 1 && "s"}
      </Text>
      {requests.map((request, index) => (
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
