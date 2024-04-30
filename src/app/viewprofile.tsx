import { Text, View } from "@/src/components/Themed";
import { HabitCard } from "@/src/components/HabitCard";
import {
  IconBook,
  IconCalendarMonth,
  IconChevronLeft,
  IconEdit,
  IconHistory,
  IconShare2,
  IconTrash,
  IconUserPlus,
} from "@tabler/icons-react-native";
import { Link, useLocalSearchParams } from "expo-router";

import Icon from "@/src/components/Icon";
import { Pressable } from "react-native";
import IconButton from "@/src/components/IconButton";
import HeaderBackButton from "@/src/components/HeaderBackButton";
import DotsMenu from "../components/DotsMenu";
import colors from "@/src/constants/colors";
import ProfilePicture from "../components/ProfilePicture";
import React, { useEffect, useState } from "react";
import { profilePicsDataPromise } from "../lib/getRandomProfilePics";

const habits = [
  {
    title: "Read for 15 minutes",
    description: "Read for at least 15 minutes every day",
    icon: IconBook,
    color: "fuchsia",
    participants: [1, 2], // should be user objects
    id: 1,
  },
];

export default function Profile() {
  //const params = useLocalSearchParams();
  //const { id } = params;
  //// in the future, get habit based off id
  const habit = habits[0];
  const [profilePicUrl, setProfilePicUrl] = useState<string>("undefined");
  useEffect(() => {
    profilePicsDataPromise(1).then((profilePic) => {
      setProfilePicUrl(profilePic[0].imgurl);
    
    });
  }, []);

  return (
    <View className="flex-1 p-4 pt-12" style={{ gap: 40 }}>
      <View className="flex-column flex" style={{ gap: 20 }}>
        <View className="flex flex-row justify-between items-center">
          <View className="basis-1/12">
            <HeaderBackButton showText={false} />
          </View>
          <Text className="font-medium">
            johndoeThisIsNotCentered
          </Text>
          <View className="basis-1/12">
            <DotsMenu
              options={[
                {
                  label: "Edit",
                  color: colors.habitColors.purple.text,
                  action: () => alert(`Edit`),
                },
                {
                  label: "Delete",
                  color: colors.black,
                  action: () => alert(`Delete`),
                },
              ]}
            />
          </View>
          
        </View>
        {/* Profile Info */}
        <View className="flex flex-row space-x-3">
          <ProfilePicture picUrl={profilePicUrl} displayType="profile-page" />
          <View className="flex flex-col">
            
            <Text className="text-3xl font-semibold">
              John Doe
            </Text>
            <Text>
              Friends for 8 months
            </Text>
          </View>
        </View>


        {/* Habits */}
        
        <View className="space-y-2">
          <Text className="text-xl font-semibold">
            Habits Together
          </Text>
          <Link
            push
            href={{
              pathname: "/viewhabit",
              params: { id: habit.id },
            }}
            asChild
            key={habit.id}
          >
            <Pressable>
              <HabitCard
                title={habit.title}
                color={"fuchsia"}
                icon={habit.icon}
                displayType="friend's-habit"
              />
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
