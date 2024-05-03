import { View } from "@/src/components/Themed";
import FriendCard, { FriendCardProps } from "@/src/components/FriendCard";
import ProfilePicture from "./ProfilePicture";
import { fetchSingleUserThumbnail } from "../lib/getRandomProfilePics";
import { useEffect, useState } from "react";
import { ProfilePic } from "./HabitCard";
import { mockHabitData } from "@/src/lib/mockHabitData";

export default function FriendList() {
  const [profilePic1, setProfilePic1] = useState<ProfilePic>({
    hasCompleted: false,
    imgurl: "",
  });
  const [profilePic2, setProfilePic2] = useState<ProfilePic>({
    hasCompleted: false,
    imgurl: "",
  });
  useEffect(() => {
    const fetchPics = async () => {
      const pic1 = await fetchSingleUserThumbnail();
      const pic2 = await fetchSingleUserThumbnail();
      setProfilePic1(pic1);
      setProfilePic2(pic2);
    };
    fetchPics();
  }, []);
  const profilePicComponent1 = <ProfilePicture picUrl={profilePic1.imgurl} />;
  const profilePicComponent2 = <ProfilePicture picUrl={profilePic2.imgurl} />;
  return (
    <View className="flex flex-col">
      <FriendCard
        displayName="Someone else"
        userName="some1else"
        profilePic={profilePicComponent1}
        commonHabits={mockHabitData}
      />
      <FriendCard
        displayName="Eduardo"
        userName="eduardo_012003"
        profilePic={profilePicComponent2}
        commonHabits={[]}
      />
    </View>
  );
}
