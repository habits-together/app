/* eslint-disable max-lines-per-function */
import { Link } from 'expo-router';
import { BookIcon, CheckIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  type HabitColorT,
  type HabitCompletionWithDateInfoT,
  type HabitIdT,
  type HabitWithParticipantPicturesT,
  usePressHabitButton,
  type UserIdT,
} from '@/api';
import { useHabitCompletions } from '@/api/habits/use-habit-completions';
import { useConfetti } from '@/core/confetti';
import { colors, LoadingSpinner, Pressable, Text, View } from '@/ui';

import { ErrorMessage } from './error-message';

interface HabitCardProps {
  habit: HabitWithParticipantPicturesT;
}
export function HabitCard({ habit }: HabitCardProps) {
  const { colorScheme } = useColorScheme();
  const userId = '1' as UserIdT;
  const {
    data: completions,
    isPending,
    isError,
    error,
    refetch,
  } = useHabitCompletions({
    variables: { habitId: habit.id, userId },
  });

  return (
    <Link
      push
      href={{
        pathname: '/habits/[id]',
        params: { id: habit.id },
      }}
      asChild
    >
      <Pressable
        className="flex h-[171px] flex-col gap-[10px] rounded-3xl px-4 py-[10px]"
        style={{
          backgroundColor:
            colorScheme === 'dark' ? colors.stone.light : habit.color.light,
        }}
      >
        <HabitHeader title={habit.title} icon={habit.icon} />
        <View className="h-[10px]" />
        {/* <HabitFriendCompletions habit={habit} /> */}
        <View className="h-[10px]" />
        {isPending ? (
          <LoadingSpinner />
        ) : isError ? (
          <ErrorMessage error={error} refetch={refetch} />
        ) : (
          <WeekViewCompletions
            userId={userId}
            habit={habit}
            completions={completions}
          />
        )}
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

interface WeekViewCompletionsProps {
  userId: UserIdT;
  habit: HabitWithParticipantPicturesT;
  completions: HabitCompletionWithDateInfoT[];
}
const WeekViewCompletions = ({
  userId,
  habit,
  completions,
}: WeekViewCompletionsProps) => {
  const completionsPerDay =
    habit.goal.period === 'daily' ? habit.goal.completionsPerPeriod : 1;

  return (
    <View className="flex w-full flex-1 flex-row items-end justify-between gap-x-4">
      {completions.map((completion) => (
        <WeekViewSquare
          key={completion.date}
          habitId={habit.id}
          userId={userId}
          color={habit.color}
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
  completion: HabitCompletionWithDateInfoT;
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
