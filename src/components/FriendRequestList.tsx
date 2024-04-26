import { View } from "@/src/components/Themed";
import FriendRequest from "@/src/components/FriendRequest";
import { useEffect, useState } from "react";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import ProfilePicture from "./ProfilePicture";
import { ProfilePic } from "./HabitCard";


// fetch all freind requests a user has received
export default function FriendRequestList() {
    const [profilePic1, setProfilePic1] = useState<ProfilePic>({hasCompleted: false, imgurl: ""});
    const [profilePic2, setProfilePic2] = useState<ProfilePic>({hasCompleted: false, imgurl: ""});
    useEffect(() => {
        const fetchPics = async () => {
            const pic1 = await fetchSingleUserThumbnail();
            const pic2 = await fetchSingleUserThumbnail();
            setProfilePic1(pic1);
            setProfilePic2(pic2);
        };
        fetchPics();
    }, []);
    const profilePicComponent1 = <ProfilePicture picUrl={profilePic1.imgurl} />
    const profilePicComponent2 = <ProfilePicture picUrl={profilePic2.imgurl} />
    return (
        <View className="flex flex-col">
            <FriendRequest inviterDisplayName="Someone else" inviterUserName="some1else" profilePic={profilePicComponent1} />
            <FriendRequest inviterDisplayName="Eduardo" inviterUserName="eduardo_012003" profilePic={profilePicComponent2} />
        </View>
    );
}