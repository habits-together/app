import {
  habitColorAtom,
  habitCompletionAtomsAtom,
  habitGoalAtom,
  habitInfoAtom,
  habitParticipantIdsAtom,
  numberOfCompletionsTodayAtom,
  participantAtom,
  sendHabitNudgeAtom,
  viewHabitDisplayTypeAtom,
} from "@/src/atoms/atoms";
import { currentUserIdAtom } from "@/src/atoms/currentUserAtom";
import DotsMenu from "@/src/components/DotsMenu";
import Icon, { HabitIcon } from "@/src/components/Icon";
import { MediumProfilePicture } from "@/src/components/ProfilePicture";
import { ScrollView, Text, View } from "@/src/components/Themed";
import HabitCompletionsMonthlyView from "@/src/components/habit-components/HabitCompletionsMonthlyView";
import WeeklyViewCompletionSquare from "@/src/components/habit-components/WeeklyViewCompletionSquare";
import colors from "@/src/constants/colors";
import { HabitIdT, UserIdT } from "@/src/lib/db_types";
import {
  IconBell,
  IconCheck,
  IconEye,
  IconHistory,
  IconUserPlus,
} from "@tabler/icons-react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import { Suspense, useEffect, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";

export default function ViewHabit() {
  const { habitId: habitId } = useLocalSearchParams<{ habitId: HabitIdT }>();
  if (typeof habitId !== "string") {
    throw new Error("Invalid habit id provided in URL params");
  }
  // get habit based on id
  const habit = useAtomValue(habitInfoAtom(habitId as HabitIdT));
  if (!habit) {
    throw new Error(`Habit with id ${habitId} not found`);
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
      <ParticipantsSection habitId={habitId as HabitIdT} />
    </ScrollView>
  );
}

function ParticipantsSection({ habitId }: { habitId: HabitIdT }) {
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
        <Suspense fallback={<></>}>
          <WeeklyOrMonthlySwitcher habitId={habitId} />
        </Suspense>
      </View>
      <View className="flex flex-1 flex-col" style={{ gap: 10 }}>
        <View className="flex flex-1 flex-col">
          <Suspense fallback={<></>}>
            <ActivityCard habitId={habitId} participantId={userId} />
          </Suspense>
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
            <Suspense key={participantId} fallback={<></>}>
              <ActivityCard habitId={habitId} participantId={participantId} />
            </Suspense>
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
  habitId: HabitIdT;
  participantId: UserIdT;
}) {
  const { colorScheme } = useColorScheme();
  const participant = useAtomValue(participantAtom({ habitId, participantId }));
  const habitColor = useAtomValue(habitColorAtom(habitId));
  const viewType = useAtomValue(viewHabitDisplayTypeAtom(habitId));
  const habitGoalPeriod = useAtomValue(habitGoalAtom(habitId)).period;
  const numCompletionsToday = useAtomValue(
    numberOfCompletionsTodayAtom({ habitId, participantId }),
  ).numberOfCompletions;

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
            numberOfCompletionsToday={numCompletionsToday}
            habitId={habitId}
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
        className="flex h-full w-full flex-1 flex-col rounded-[15px] p-[8px]"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.habitColors.stone.light
              : colors.habitColors[habitColor].light,
        }}
      >
        {viewType === "weekly-view" && (
          <ViewHabitWeeklyCompletions
            habitId={habitId}
            participantId={participantId}
          />
        )}
        {viewType === "monthly-view" && (
          <View
            className={`flex h-[112px] flex-1 bg-transparent ${habitGoalPeriod === "weekly" && "mt-[10px]"}`}
          >
            <HabitCompletionsMonthlyView
              habitId={habitId}
              userId={participantId}
              currentScreen="view-habit"
            />
          </View>
        )}
      </View>
    </View>
  );
}

function ViewHabitWeeklyCompletions({
  habitId,
  participantId,
}: {
  habitId: HabitIdT;
  participantId: UserIdT;
}) {
  const { colorScheme } = useColorScheme();
  const habitColor = useAtomValue(habitColorAtom(habitId));
  const completionAtoms = useAtomValue(
    habitCompletionAtomsAtom({ habitId, participantId }),
  );

  return (
    <View
      className="flex w-full flex-1 flex-row items-end justify-between"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? colors.habitColors.stone.light
            : colors.habitColors[habitColor].light,
      }}
    >
      {completionAtoms.slice(-7, -1).map((completionAtom, index) => (
        <WeeklyViewCompletionSquare
          key={index}
          habitId={habitId}
          completionAtom={completionAtom}
        />
      ))}
      {
        <WeeklyViewCompletionSquare
          habitId={habitId}
          completionAtom={numberOfCompletionsTodayAtom({
            habitId,
            participantId,
          })}
        />
      }
    </View>
  );
}

function NudgeButton({
  numberOfCompletionsToday,
  participantId,
  habitId,
}: {
  numberOfCompletionsToday: number | undefined;
  participantId: UserIdT;
  habitId: HabitIdT;
}) {
  const userId = useAtomValue(currentUserIdAtom);
  const [displayNudgeButton, setDisplayNudgeButton] = useState(false);
  const [alreadySent, send] = useAtom(
    sendHabitNudgeAtom({ habitId, theirUserId: participantId }),
  );
  useEffect(() => {
    setDisplayNudgeButton(
      numberOfCompletionsToday === 0 && participantId !== userId,
    );
  }, [numberOfCompletionsToday, userId]);

  if (!displayNudgeButton) return <></>;
  return alreadySent ? (
    <View className="flex-row items-center self-start pt-2.5">
      <Icon icon={IconCheck} size={16} strokeWidth={3} />
      <Text className="ml-1 text-xs font-semibold">Sent</Text>
    </View>
  ) : (
    <Pressable
      className="flex flex-row items-center justify-center rounded-full border border-stone-300 px-4 py-2"
      android_ripple={{ color: colors.stone["300"], radius: 55 }}
      onPress={send}
    >
      <Icon icon={IconBell} size={16} strokeWidth={2.5} />
      <Text className="ml-1 text-xs font-semibold">Nudge</Text>
    </Pressable>
  );
}

function WeeklyOrMonthlySwitcher({ habitId }: { habitId: HabitIdT }) {
  const [selected, setSelected] = useAtom(viewHabitDisplayTypeAtom(habitId));

  return (
    <View
      className="flex h-11 w-60 flex-row rounded-full bg-stone-100 p-2 dark:bg-stone-700"
      style={{ gap: 10 }}
    >
      <Pressable
        onPress={() => setSelected("weekly-view")}
        className={`flex-1 rounded-full ${selected === "weekly-view" ? "border border-stone-300 bg-white dark:bg-stone-800" : "bg-transparent p-[1px]"}`}
      >
        <Text className="m-auto text-center font-semibold text-black dark:text-white">
          Weekly
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setSelected("monthly-view")}
        className={`flex-1 rounded-full ${selected === "monthly-view" ? "border border-stone-300 bg-white dark:bg-stone-800" : "bg-transparent p-[1px]"}`}
      >
        <Text className="m-auto text-center font-semibold text-black dark:text-white">
          Monthly
        </Text>
      </Pressable>
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
          pathname: "/friends/invitefriends",
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
