import { View } from "@/src/components/Themed";
import FriendRequest from "@/src/components/FriendRequest";
import { useEffect, useState } from "react";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import SmallProfilePicture from "./ProfilePicture";

interface FriendRequestData {
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
            setFriendRequests([
                { displayName: "Someone else", userName: "some1else", profilePicUrl: pic1.imgurl },
                { displayName: "Eduardo", userName: "eduardo_012003", profilePicUrl: pic2.imgurl }
            ]);
        };
        fetchPics();
    }, []);

    const deleteInvite = () => {
        console.log("Invite deleted");
    };

    const confirmInvite = () => {
        console.log("Invite confirmed");
    };

    return (
        <View className="flex flex-col">
            {friendRequests.map((request, index) => (
                <FriendRequest
                    key={index}
                    displayName={request.displayName}
                    userName={request.userName}
                    profilePic={<SmallProfilePicture picUrl={request.profilePicUrl} />}
                    deleteInvite={deleteInvite}
                    confirmInvite={confirmInvite}
                />
            ))}
        </View>
    );
}
