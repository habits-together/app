import Icon from "@/src/components/Icon";
import { ScrollView, Text, View } from "@/src/components/Themed";
import { IconEye, IconHistory, IconUserPlus } from "@tabler/icons-react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import { Suspense, useEffect, useState } from "react";
import { Pressable } from "react-native";
import {
  habitCompletionsAtom,
  habitInfoAtom,
  habitParticipantAtom,
  habitParticipantCompletionsAtom,
  habitParticipantIdsAtom,
  userAtom,
} from "../atoms/atoms";
import colors from "../constants/colors";
import { getLocalRandomProfilePic } from "../lib/getRandomProfilePics";
import { MediumProfilePicture } from "./ProfilePicture";
import WeeklyViewCompletionSquare from "./habit-components/WeeklyViewCompletionSquare";

export default function ViewHabitComponent() {
  const params = useLocalSearchParams();
  const { id: idString } = params;
  if (typeof idString !== "string") {
    throw new Error("Invalid habit id provided in URL params");
  }
  const id = parseInt(idString);

  return (
    <ScrollView
      className="flex-1 p-4"
      style={{ gap: 40 }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View className="flex-column flex flex-1" style={{ gap: 32 }}>
        <HabitInformationSection id={id} />
        <ParticipantsSection habitId={id} />
      </View>
    </ScrollView>
  );
}

function HabitInformationSection({ id }: { id: number }) {
  const habit = useAtomValue(habitInfoAtom(id));

  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-1 flex-row items-center" style={{ gap: 10 }}>
          <Icon size={32} icon={habit.icon} />
          <Text
            numberOfLines={1}
            className="mb-1 flex-1 text-xl font-bold text-black dark:text-white"
          >
            {habit.title}
          </Text>
        </View>
      </View>
      <Text className="text-stone-400">{habit.description}</Text>
      <View className="mt-4 flex flex-row items-center">
        <Icon icon={IconHistory} strokeWidth={2.5} />
        <Link
          push
          href={{
            pathname: "/modals/edithabit",
            // search: { id: id.toString() },
          }}
          asChild
        >
          <Pressable>
            <Text className="ml-1 text-base font-semibold">
              See full history
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

function ParticipantsSection({ habitId }: { habitId: number }) {
  const user = useAtomValue(userAtom);
  const participants = useAtomValue(habitParticipantIdsAtom(habitId));

  return (
    <View className="flex flex-1 flex-col">
      <Text
        numberOfLines={1}
        className="text-xl font-bold text-black dark:text-white"
      >
        Participants ({participants.length})
      </Text>
      <View className="mx-auto my-5">
        <WeeklyOrMonthlySwitcher />
      </View>
      <View className="flex flex-1 flex-col" style={{ gap: 10 }}>
        <Suspense fallback={<></>}>
          <View className="flex flex-1 flex-col">
            <ActivityCard
              habitId={habitId}
              participantId={null}
              // personData={{
              //   id: user.id,
              //   displayName: user.displayName,
              //   username: user.username,
              //   profilePicUrl: user.profilePicture,
              // }}
            />
            <View className="my-2 flex w-full flex-row items-center justify-center">
              <Icon icon={IconEye} />
              <Text className="ml-1 text-sm font-semibold">
                My friends can see my progress
              </Text>
            </View>
          </View>
        </Suspense>
        {participants.map((participant) => (
          <Suspense key={participant} fallback={<></>}>
            <ActivityCard
              habitId={habitId}
              participantId={participant}
              // personData={participant}
            />
          </Suspense>
        ))}
        {/* <ActivityCard habitId={1} friendId={2} /> */}
      </View>
    </View>
  );
}

function ActivityCard({
  habitId,
  participantId,
}: {
  habitId: number;
  // null means the user themself
  participantId: number | null;
}) {
  const { colorScheme } = useColorScheme();
  const habit = useAtomValue(habitInfoAtom(habitId));
  const completionData = participantId
    ? useAtomValue(habitParticipantCompletionsAtom({ habitId, participantId }))
    : useAtomValue(habitCompletionsAtom(habitId));
  // const completionData = useAtomValue(habitCompletionsAtom(habitId));
  const participant = participantId
    ? useAtomValue(habitParticipantAtom({ habitId, participantId }))
    : useAtomValue(userAtom);

  const [pfp, setPfp] = useState<string | null>(null);
  useEffect(() => {
    participant && setPfp(getLocalRandomProfilePic(participant.id));
  }, [participant]);

  return (
    <View
      className="flex flex-col rounded-[25px] border border-stone-300 p-[10px]"
      style={{ gap: 10 }}
    >
      {/* info */}
      <View className="flex flex-row" style={{ gap: 10 }}>
        {/* image */}
        <View className="">
          {pfp && <MediumProfilePicture picUrl={pfp} isLocalImage={true} />}
        </View>
        {/* text */}
        <View className="flex flex-col justify-center">
          <Text className="text-base font-semibold">
            {participant.displayName}
          </Text>
          <Text className="text-xs text-stone-400">{participant.username}</Text>
        </View>
      </View>
      {/* completions */}
      <View
        className="flex w-full flex-1 flex-row items-end justify-between rounded-[15px] p-[10px] pb-[6px]"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.habitColors.stone.light
              : colors.habitColors[habit.color].light,
        }}
      >
        {completionData.slice(-7).map((completion, index) => (
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

function WeeklyOrMonthlySwitcher() {
  return (
    <View className="h-11 w-60 rounded-full bg-stone-100 dark:bg-stone-700"></View>
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
          {/* <IconButton icon={IconUserPlus} text="Invite friends" /> */}
          <View
            className="border-1 flex flex-row content-center justify-center rounded-2xl border pb-2 pt-2"
            style={{
              borderColor:
                colorScheme === "dark" ? colors.stone.light : colors.stone[200],
              gap: 2,
            }}
          >
            <Icon icon={IconUserPlus} />
            <Text>Invite friends</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
