import { HabitCard, HabitDisplayType } from "@/src/components/HabitCard";
import { Text, View } from "@/src/components/Themed";
import {
  IconBook,
  IconCalendarMonth,
  IconEdit,
  IconHistory,
  IconShare2,
  IconTrash,
  IconUserPlus,
} from "@tabler/icons-react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Icon from "@/src/components/Icon";
import IconButton from "@/src/components/IconButton";
import { Pressable } from "react-native";
import { getMockHabitData, mockHabitData } from "../lib/mockData";
import { useState } from "react";

export default function ViewHabitComponent() {
  const params = useLocalSearchParams();
  const { id } = params;
  if (typeof id !== "string") {
    throw new Error("Invalid habit id provided in URL params");
  }
  // get habit based on id
  const habit = mockHabitData.find((habit) => habit.id === parseInt(id));
  if (!habit) {
    throw new Error(`Habit with id ${id} not found`);
  }
  // const habit = mockHabitData[0];

  const [displayType, setDisplayType] = useState<HabitDisplayType>("weekly-view");

  return (
    <View className="flex-1 p-4" style={{ gap: 40 }}>
      <View className="flex-column flex" style={{ gap: 20 }}>
        {/* Title */}
        <View>
          <View className="flex flex-row items-center justify-between">
            <View
              className="flex flex-1 flex-row items-center"
              style={{ gap: 10 }}
            >
              <Icon size={32} icon={habit.icon} />
              <Text
                numberOfLines={1}
                className="mb-1 flex-1 text-xl font-bold text-black dark:text-white"
              >
                {habit.title}
              </Text>
            </View>
          </View>
          <Text>{habit.description}</Text>
        </View>

        {/* Edit/Delete Buttons */}
        <View className="flex flex-row" style={{ gap: 10 }}>
          <Pressable className="flex-1">
            <IconButton icon={IconEdit} text="Edit habit" />
          </Pressable>
          <Pressable className="flex-1">
            <IconButton icon={IconTrash} text="Delete habit" />
          </Pressable>
        </View>

        {/* Heatmap */}
        <View className="">
          <HabitCard
            habit={habit}
            displayType="weekly-view"
            currentPage="habit-tab"
            completionData={getMockHabitData({
              displayType: displayType,
              habitId: habit.id,
              targetNumberOfCompletionsPerDay:
                habit.goal.period === "daily"
                  ? habit.goal.completionsPerPeriod
                  : 1,
            })}
          />
        </View>

        {/* Full/Edit Heatmap Buttons */}
        <View className="flex flex-row" style={{ gap: 10 }}>
          <Pressable className="flex-1">
            <IconButton icon={IconHistory} text="Full history" />
          </Pressable>
          <Pressable className="flex-1">
            <IconButton icon={IconCalendarMonth} text="Edit dates" />
          </Pressable>
        </View>
      </View>

      {/* Participants */}
      <View className="flex-column flex" style={{ gap: 20 }}>
        <Text className="mb-1 text-xl font-bold text-black dark:text-white">
          Participants (3)
        </Text>
        {/* add participant cards */}
      </View>

      {/* Invite/Share Buttons*/}
      <View className="flex flex-row" style={{ gap: 10 }}>
        <Link
          push
          href={{
            pathname: "/modals/invitefriends",
          }}
          asChild
        >
          <Pressable className="flex-1">
            <IconButton icon={IconUserPlus} text="Invite friends" />
          </Pressable>
        </Link>
        <Pressable className="flex-1">
          <IconButton icon={IconShare2} text="Share link" />
        </Pressable>
      </View>
    </View>
  );
}
