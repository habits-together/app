import { commonHabitIdsAtom, getUserInfoAtom } from "@/src/atoms/atoms";
import { BigProfilePicture } from "@/src/components/ProfilePicture";
import { ScrollView, Text, View } from "@/src/components/Themed";
import { HabitCard } from "@/src/components/habit-components/HabitCard";
import { UserIdT } from "@/src/lib/db_types";
import { useGlobalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";

export default function Profile() {
  const { theirUserId } = useGlobalSearchParams<{ theirUserId: UserIdT }>();
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
          <View className="space-y-4 pt-4">
            <Text className="text-xl font-semibold">Habits Together</Text>
            <View className="">
              {commonHabitIds.map((habitId) => (
                <HabitCard key={habitId} habitId={habitId} isOwner={false}/>
              ))}
            </View>
          </View>
          <View className="space-y-4 pt-4">
            <Text className="text-xl font-semibold">
              Shared & public habits
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
