import { HabitCard } from "@/src/components/HabitCard";
import { ScrollView, Text, View } from "@/src/components/Themed";
import { getMockHabitData, mockHabitData } from "@/src/lib/mockData";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { BigProfilePicture } from "../../components/ProfilePicture";
import { profilePicsDataPromise } from "../../lib/getRandomProfilePics";

export default function Profile() {
  const { displayName } = useLocalSearchParams<{ displayName: string }>();

  const [profilePicUrl, setProfilePicUrl] = useState<string>("undefined");
  useEffect(() => {
    profilePicsDataPromise(1).then((profilePic) => {
      setProfilePicUrl(profilePic[0].imgurl);
    });
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-column flex">
        <ScrollView
          className="px-4 pt-4"
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          overScrollMode="never"
        >
          {/* Profile Info */}
          <View className="flex flex-row space-x-3">
            <BigProfilePicture picUrl={profilePicUrl} />
            <View className="flex flex-col">
              <Text className="text-3xl font-semibold">{displayName}</Text>
              <Text>Friends for 8 months</Text>
            </View>
          </View>

          {/* Habits */}
          <View className="space-y-4 pb-32 pt-4">
            <Text className="text-xl font-semibold">Habits Together</Text>
            {mockHabitData.map((habit) => (
              <Link
                push
                href={{
                  pathname: "/modals/viewhabit",
                  params: { id: habit.id },
                }}
                asChild
                key={habit.id}
              >
                <Pressable>
                  <HabitCard
                    habit={habit}
                    completionData={getMockHabitData(habit.id)}
                  />
                </Pressable>
              </Link>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
