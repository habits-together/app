import Icon, { HabitIcon } from "@/src/components/Icon";
import { ScrollView, Text, View } from "@/src/components/Themed";
import {
  IconBell,
  IconEye,
  IconHistory,
  IconUserPlus,
} from "@tabler/icons-react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import {
  habitColorAtom,
  habitInfoAtom,
  habitParticipantIdsAtom,
  participantAtom,
  structuredHabitCompletionsAtom,
} from "../atoms/atoms";
import { currentUserIdAtom } from "../atoms/currentUserAtom";
import colors from "../constants/colors";
import DotsMenu from "./DotsMenu";
import { MediumProfilePicture } from "./ProfilePicture";
import WeeklyViewCompletionSquare from "./habit-components/WeeklyViewCompletionSquare";

export default function ViewHabitComponent() {
  const params = useLocalSearchParams();
  const { id } = params;
  if (typeof id !== "string") {
    throw new Error("Invalid habit id provided in URL params");
  }
  // get habit based on id
  const habit = useAtomValue(habitInfoAtom(id));
  if (!habit) {
    throw new Error(`Habit with id ${id} not found`);
  }

  return (
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{ paddingBottom: 100, gap: 40 }}
    >
      <View className="flex-column flex" style={{ gap: 20 }}>
        {/* Title */}
        <View>
          <View className="flex flex-row items-center justify-between">
            <View
              className="flex flex-1 flex-row items-center"
              style={{ gap: 10 }}
            >
              <HabitIcon size={32} icon={habit.icon} />
              <Text
                numberOfLines={1}
                className="mb-1 flex-1 text-xl font-bold text-black dark:text-white"
              >
                {habit.title}
              </Text>
            </View>
          </View>
          <Text className="text-stone-400">{habit.description}</Text>
        </View>

        {/* Full history button */}
        <TouchableOpacity className="flex flex-row items-center">
          <Icon icon={IconHistory} />
          <Text className="ml-1 text-sm font-semibold">Full history</Text>
        </TouchableOpacity>
      </View>
      <ParticipantsSection habitId={id} />
    </ScrollView>
  );
}

function ParticipantsSection({ habitId }: { habitId: string }) {
  const userId = useAtomValue(currentUserIdAtom);
  const participantIds = useAtomValue(habitParticipantIdsAtom(habitId));

  return (
    <View className="flex flex-1 flex-col" style={{ gap: 20 }}>
      <Text
        numberOfLines={1}
        className="text-xl font-bold text-black dark:text-white"
      >
        Participants ({participantIds.length})
      </Text>
      <View className="mx-auto">
        <WeeklyOrMonthlySwitcher />
      </View>
      <View className="flex flex-1 flex-col" style={{ gap: 10 }}>
        <View className="flex flex-1 flex-col">
          <ActivityCard habitId={habitId} participantId={userId} />
          <TouchableOpacity className="my-2 flex w-full flex-row items-center justify-center">
            <Icon icon={IconEye} />
            <Text className="ml-1 text-sm font-semibold">
              My friends can see my progress
            </Text>
          </TouchableOpacity>
        </View>
        {participantIds
          .filter((participantId) => participantId != userId)
          .map((participantId) => (
            <ActivityCard
              key={participantId}
              habitId={habitId}
              participantId={participantId}
            />
          ))}
      </View>
      <InviteFriendsButton />
    </View>
  );
}

function ActivityCard({
  habitId,
  participantId,
}: {
  habitId: string;
  participantId: string;
}) {
  const { colorScheme } = useColorScheme();
  const participant = useAtomValue(participantAtom({ habitId, participantId }));
  const habitColor = useAtomValue(habitColorAtom(habitId));
  const completions = useAtomValue(
    structuredHabitCompletionsAtom({ habitId, participantId }),
  );

  return (
    <View
      className="flex flex-col rounded-[25px] border border-stone-300 p-[10px]"
      style={{ gap: 10 }}
    >
      {/* info */}
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row" style={{ gap: 10 }}>
          {/* image */}
          <View className="">
            <MediumProfilePicture picUrl={participant.picture} />
          </View>
          {/* text */}
          <View className="flex flex-col justify-center">
            <Text className="text-base font-semibold">
              {participant.displayName}
            </Text>
            <Text className="text-xs text-stone-400">
              {participant.username}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center" style={{ gap: 10 }}>
          <NudgeButton
            participantId={participantId}
            numberOfCompletionsToday={completions.at(-1)?.numberOfCompletions}
          />
          <DotsMenu
            options={[
              {
                label: "Add friend",
                action: () => alert("Add friend"),
                color: colors.black,
              },
              {
                label: "View profile",
                action: () => alert("View profile"),
                color: colors.black,
              },
              {
                label: "Kick from habit",
                action: () => alert("Kick from habit"),
                color: colors.black,
              },
              {
                label: "Transfer ownership",
                action: () => alert("Transfer ownership"),
                color: colors.black,
              },
            ]}
          />
        </View>
      </View>
      {/* completions */}
      <View
        className="flex w-full flex-1 flex-row items-end justify-between rounded-[15px] p-[10px] pb-[6px]"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.habitColors.stone.light
              : colors.habitColors[habitColor].light,
        }}
      >
        {completions.slice(-7).map((completion, index) => (
          <WeeklyViewCompletionSquare
            key={index}
            habitId={habitId}
            completion={completion}
          />
        ))}
      </View>
    </View>
  );
}

function NudgeButton({
  numberOfCompletionsToday,
  participantId,
}: {
  numberOfCompletionsToday: number | undefined;
  participantId: string;
}) {
  const userId = useAtomValue(currentUserIdAtom);
  const [displayNudgeButton, setDisplayNudgeButton] = useState(false);
  useEffect(() => {
    setDisplayNudgeButton(
      numberOfCompletionsToday === 0 && participantId !== userId,
    );
  }, [numberOfCompletionsToday, userId]);

  return displayNudgeButton ? (
    <Pressable
      className="flex flex-row items-center justify-center rounded-full border border-stone-300 px-4 py-2"
      android_ripple={{ color: colors.stone["300"], radius: 55 }}
      onPress={() => alert("Nudge")}
    >
      <Icon icon={IconBell} size={16} strokeWidth={2.5} />
      <Text className="ml-1 text-xs font-semibold">Nudge</Text>
    </Pressable>
  ) : (
    <></>
  );
}

function WeeklyOrMonthlySwitcher() {
  const [selected, setSelected] = useState<"weekly" | "monthly">("weekly");

  return (
    <View
      className="flex h-11 w-60 flex-row rounded-full bg-stone-100 p-2 dark:bg-stone-700"
      style={{ gap: 10 }}
    >
      <View
        className={`flex-1 rounded-full ${selected === "weekly" ? "border border-stone-300 bg-white dark:bg-stone-800" : "bg-transparent"}`}
      >
        <Text className="m-auto font-semibold text-black dark:text-white">
          Weekly
        </Text>
      </View>
      <View
        className={`flex-1 rounded-full ${selected === "monthly" ? "border border-stone-300 bg-white dark:bg-stone-800" : "bg-transparent"}`}
      >
        <Text className="m-auto font-semibold text-black dark:text-white">
          Monthly
        </Text>
      </View>
    </View>
  );
}

function InviteFriendsButton() {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-row" style={{ gap: 10 }}>
      <Link
        push
        href={{
          pathname: "/modals/invitefriends",
        }}
        asChild
      >
        <Pressable className="flex-1">
          <View
            className="flex flex-row content-center items-center justify-center rounded-xl border border-stone-300 pb-2 pt-2"
            style={{
              borderColor:
                colorScheme === "dark" ? colors.stone.light : colors.stone[200],
              gap: 4,
            }}
          >
            <Icon icon={IconUserPlus} />
            <Text className="font-semibold">Invite friends</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
