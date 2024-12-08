/* eslint-disable max-lines-per-function */
import { Link } from 'expo-router';
import { BookIcon, CheckIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  type HabitColorT,
  type HabitIdT,
  type HabitWithCompletionsT,
  type ParticipantCompletionsT,
  usePressHabitButton,
  type UserIdT,
} from '@/api';
import { useConfetti } from '@/core/confetti';
import { colors, Pressable, Text, View } from '@/ui';

export function HabitCard({ data }: { data: HabitWithCompletionsT }) {
  const { colorScheme } = useColorScheme();

  return (
    <Link
      push
      href={{
        pathname: '/habits/[id]',
        params: { id: data.id },
      }}
      asChild
    >
      <Pressable
        className="flex h-[171px] flex-col gap-[10px] rounded-3xl px-4 py-[10px]"
        style={{
          backgroundColor:
            colorScheme === 'dark' ? colors.stone.light : data.color.light,
        }}
      >
        <HabitHeader title={data.title} icon={data.icon} />
        <View className="h-[10px]" />
        {/* <HabitFriendCompletions habitId={habitId} /> */}
        <View className="h-[10px]" />
        <WeekViewCompletions userId={'1' as UserIdT} data={data} />
      </Pressable>
    </Link>
  );
}

const HabitHeader = ({ title }: { title: string; icon: string }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="-mb-2 ml-1 flex-row items-center justify-between">
      <View className="mr-2 flex-1 flex-row items-center gap-1">
        <BookIcon
          size={24}
          color={colorScheme === 'dark' ? colors.white : colors.black}
        />
        <Text
          numberOfLines={1}
          className="mb-1 flex-1 text-base font-bold text-black dark:text-white"
        >
          {title}
        </Text>
      </View>

      <View className="">
        {/* <DotsMenu
            options={[
              // change to other view
              {
                label: `Change to ${displayType === 'weekly-view' ? 'monthly' : 'weekly'} view`,
                color: colors.black,
                action: () =>
                  setDisplayType(
                    displayType === 'weekly-view'
                      ? 'monthly-view'
                      : 'weekly-view',
                  ),
              },
              {
                label: 'Edit',
                color: colors.black,
                action: () => {
                  router.push({
                    pathname: '/habits/edithabit',
                    params: { habitidStr: habitId },
                  });
                },
              },
              {
                label: 'Delete',
                color: colors.black,
                action: () => {
                  deleteHabit();
                },
              },
            ]}
          /> */}
      </View>
    </View>
  );
};

type habitCompletionWithDateInfoT = {
  date: string;
  numberOfCompletions: number;
  dayOfTheMonth: number;
  dayOfTheWeek: string;
};
function structureCompletionData({
  completionData,
  numDays,
}: {
  completionData: ParticipantCompletionsT;
  numDays: number;
}): habitCompletionWithDateInfoT[] {
  const structuredCompletionData: habitCompletionWithDateInfoT[] = [];

  let currentDate = new Date();
  // go back to the first day we want to display
  currentDate.setDate(currentDate.getDate() - numDays + 1);
  // loop through each day and add the completion data for that day to the structured data
  for (let i = 0; i < numDays; i++) {
    // if there is no completion data for the current date, default to 0 (no completions that day)
    structuredCompletionData.push({
      numberOfCompletions:
        completionData?.completions?.[
          currentDate.toLocaleDateString('en-CA')
        ] ?? 0,
      dayOfTheMonth: currentDate.getDate(),
      dayOfTheWeek: currentDate.toLocaleString('en-US', { weekday: 'short' }),
      date: currentDate.toLocaleDateString('en-CA'),
    });
    // move current date ahead 1 day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return structuredCompletionData;
}

interface WeekViewCompletionsProps {
  userId: UserIdT;
  data: HabitWithCompletionsT;
}
const WeekViewCompletions = ({ userId, data }: WeekViewCompletionsProps) => {
  const structuredCompletionData = structureCompletionData({
    completionData: data.participantCompletions[userId],
    numDays: 7,
  });
  const completionsPerDay =
    data.goal.period === 'daily' ? data.goal.completionsPerPeriod : 1;

  return (
    <View className="flex w-full flex-1 flex-row items-end justify-between gap-x-4">
      {structuredCompletionData.map((completion) => (
        <WeekViewSquare
          key={completion.date}
          habitId={data.id}
          userId={userId}
          color={data.color}
          completionsPerDay={completionsPerDay}
          completion={completion}
        />
      ))}
    </View>
  );
};

interface WeekViewSquareProps {
  habitId: HabitIdT;
  userId: UserIdT;
  color: HabitColorT;
  completionsPerDay: number;
  completion: habitCompletionWithDateInfoT;
}
const WeekViewSquare = ({
  habitId,
  userId,
  color,
  completionsPerDay,
  completion,
}: WeekViewSquareProps) => {
  const { colorScheme } = useColorScheme();
  const pressHabit = usePressHabitButton();
  const { playConfetti } = useConfetti();

  const handlePress = async (event: {
    nativeEvent: { pageX: number; pageY: number };
  }) => {
    const currentCompletions = completion.numberOfCompletions;
    try {
      // Optimistically update UI through mutation
      const newCompletions = (currentCompletions + 1) % (completionsPerDay + 1);
      completion.numberOfCompletions = newCompletions;
      if (newCompletions !== 0) {
        playConfetti(event.nativeEvent.pageX, event.nativeEvent.pageY);
      }
      await pressHabit.mutateAsync({
        habitId: habitId,
        userId: userId,
        date: completion.date,
      });
    } catch (error) {
      completion.numberOfCompletions = currentCompletions;
      showMessage({
        message: 'Failed to update habit completion',
        type: 'danger',
        duration: 2000,
      });
    }
  };

  return (
    <>
      <View
        key={completion.date}
        className="flex flex-1 flex-col items-center overflow-visible"
      >
        <View className="aspect-square w-full">
          <Pressable
            className="relative flex aspect-square flex-1 overflow-hidden rounded"
            style={{
              backgroundColor:
                colorScheme === 'dark' ? colors.stone.faded : color.faded,
            }}
            onPress={(event) => handlePress(event)}
          >
            {/* day of the month text */}
            {completion.numberOfCompletions !== completionsPerDay && (
              <Text
                className="m-auto text-center text-xs font-semibold"
                style={{
                  color:
                    colorScheme === 'dark' ? colors.stone.text : color.text,
                }}
              >
                {completion.dayOfTheMonth}
              </Text>
            )}
            {/* base color fill (can be partial for multiple-times-per-day habit) */}
            {completion.numberOfCompletions > 0 && (
              <View
                className="absolute bottom-0 w-full"
                style={{
                  backgroundColor: color.base,
                  height: `${(100 * completion.numberOfCompletions) / completionsPerDay}%`,
                }}
              ></View>
            )}
            {/* check mark */}
            {completion.numberOfCompletions === completionsPerDay && (
              <View className="m-auto">
                <CheckIcon size={20} strokeWidth={4} color={colors.white} />
              </View>
            )}
          </Pressable>
        </View>
        <Text
          className="text-xs font-semibold"
          style={{
            color: colorScheme === 'dark' ? colors.stone.text : color.text,
          }}
        >
          {completion.dayOfTheWeek}
        </Text>
      </View>
    </>
  );
};
