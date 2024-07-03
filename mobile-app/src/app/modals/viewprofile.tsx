import { commonHabitIdsAtom, getUserInfoAtom } from "@/src/atoms/atoms";
import { ScrollView, Text, View } from "@/src/components/Themed";
import { HabitCard } from "@/src/components/habit-components/HabitCard";
import { useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";
import { BigProfilePicture } from "../../components/ProfilePicture";

export default function Profile() {
  const { theirUserId } = useLocalSearchParams<{ theirUserId: string }>();
  if (!theirUserId) {
    throw new Error("No theirUserId provided");
  }

  const { picture, displayName } = useAtomValue(getUserInfoAtom(theirUserId));
  const commonHabitIds = useAtomValue(commonHabitIdsAtom(theirUserId));

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
            <BigProfilePicture picUrl={picture} />
            <View className="flex flex-col">
              <Text className="text-3xl font-semibold">{displayName}</Text>
              <Text>Friends for 8 months</Text>
            </View>
          </View>

          {/* Habits */}
          <View className="space-y-4 pb-32 pt-4">
            <Text className="text-xl font-semibold">Habits Together</Text>
            {commonHabitIds.map((habitId) => (
              <HabitCard key={habitId} habitId={habitId} screenType="/modals" />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
