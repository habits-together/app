/* eslint-disable max-lines-per-function */
import { Link } from 'expo-router';
import {
  ActivityIcon,
  BookIcon,
  CheckIcon,
  EllipsisIcon,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  type HabitColorT,
  type HabitCompletionWithDateInfoT,
  type HabitIdT,
  type HabitT,
  type ParticipantWithIdT,
  usePressHabitButton,
  type UserIdT,
} from '@/api';
import { useHabitCompletions } from '@/api/habits/use-habit-completions';
import { useHabitOrder } from '@/core';
import { useConfetti } from '@/core/confetti';
import { getTranslucentColor } from '@/core/get-translucent-color';
import {
  colors,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  LoadingSpinner,
  Pressable,
  Text,
  View,
} from '@/ui';

import { ErrorMessage } from './error-message';
import UserPicture from './picture';

interface HabitCardProps {
  habit: HabitT;
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
    <>
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
          <HabitHeader
            habitId={habit.id}
            title={habit.title}
            icon={habit.icon}
          />
          <View className="flex flex-row">
            <HabitFriendCompletions habit={habit} />
          </View>
          {isPending ? (
            <LoadingSpinner />
          ) : isError ? (
            <ErrorMessage error={error} refetch={refetch} variant="compact" />
          ) : (
            <WeekViewCompletions
              userId={userId}
              habit={habit}
              completions={completions}
            />
          )}
        </Pressable>
      </Link>
    </>
  );
}

interface HabitHeaderProps {
  habitId: HabitIdT;
  title: string;
  icon: string;
}
const HabitHeader = ({ habitId, title }: HabitHeaderProps) => {
  const { colorScheme } = useColorScheme();
  const { moveHabit, canMoveHabit } = useHabitOrder();

  const menuItems = [
    {
      key: 'Move up in list',
      title: 'Move up in list',
      onSelect: () => moveHabit(habitId, 'up'),
      disabled: !canMoveHabit(habitId, 'up'),
    },
    {
      key: 'Move down in list',
      title: 'Move down in list',
      onSelect: () => moveHabit(habitId, 'down'),
      disabled: !canMoveHabit(habitId, 'down'),
    },
    {
      key: 'Edit habit',
      title: 'Edit habit',
      onSelect: () => {
        alert('todo');
      },
    },
    {
      key: 'Delete habit',
      title: 'Delete habit',
      onSelect: () => {
        alert('todo');
      },
    },
  ];

  return (
    <View className="ml-1 flex-row items-center justify-between">
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
        <DropdownMenuRoot>
          <DropdownMenuTrigger>
            <Pressable>
              <EllipsisIcon
                size={24}
                color={colorScheme === 'dark' ? colors.white : colors.black}
              />
            </Pressable>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.key}
                onSelect={item.onSelect}
                disabled={item.disabled}
              >
                <DropdownMenuItemTitle>{item.title}</DropdownMenuItemTitle>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </View>
    </View>
  );
};

interface WeekViewCompletionsProps {
  userId: UserIdT;
  habit: HabitT;
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

interface HabitFriendCompletionsProps {
  habit: HabitT;
}
function HabitFriendCompletions({ habit }: HabitFriendCompletionsProps) {
  const participantsList: ParticipantWithIdT[] = Object.entries(
    habit.participants,
  )
    .map(([id, participant]) => ({ id: id as UserIdT, ...participant }))
    .filter((p): p is ParticipantWithIdT => p !== undefined)
    .sort(
      (a, b) => (a.hasActivityToday ? 0 : 1) - (b.hasActivityToday ? 0 : 1),
    );

  return (
    <View
      className={`flex flex-row items-center gap-[5px] rounded-[10px] border p-[5px]`}
      style={{
        borderColor: getTranslucentColor(habit.color.text, 0.5),
      }}
    >
      <ProfilePicsList
        participants={participantsList}
        maxNumPics={5}
        color={habit.color}
      />
      <HabitParticipantCompletedBadge
        numParticipantsActiveToday={
          participantsList.filter((p) => p.hasActivityToday).length
        }
        color={habit.color}
      />
    </View>
  );
}

interface ProfilePicsListProps {
  participants: ParticipantWithIdT[];
  maxNumPics: number;
  color: HabitColorT;
}
function ProfilePicsList({
  participants,
  maxNumPics,
  color,
}: ProfilePicsListProps) {
  const { colorScheme } = useColorScheme();
  const [numPfpsToDisplay, setNumPfpsToDisplay] = useState<number>(maxNumPics);
  useEffect(() => {
    // since we want to display x pfps
    // but if there are more, we want to take one away
    // in order to display a "+3" circle (or whatever the amount is)
    if (participants.length === maxNumPics) {
      setNumPfpsToDisplay(maxNumPics);
    } else {
      setNumPfpsToDisplay(maxNumPics - 1);
    }
  }, [participants, maxNumPics]);

  return (
    <View
      className="mr-[7px] flex flex-row-reverse"
      style={{ backgroundColor: 'transparent' }}
    >
      {participants.length > maxNumPics && (
        <ExtraHiddenPfpsCircle
          color={color}
          numberToDisplay={participants.length - maxNumPics + 1}
        />
      )}
      {participants
        .slice(0, numPfpsToDisplay)
        .reverse()
        .map((p) => (
          <View
            key={p.id}
            className="-mr-2 rounded-full border-2"
            style={{
              borderColor: p.hasActivityToday
                ? color.base
                : colorScheme === 'dark'
                  ? colors.stone[500]
                  : colors.stone[600],
            }}
          >
            <UserPicture key={p.id} userId={p.id} size={30} />
          </View>
        ))}
    </View>
  );
}

interface ExtraHiddenPfpsCircleProps {
  color: HabitColorT;
  numberToDisplay: number;
}
function ExtraHiddenPfpsCircle({
  color,
  numberToDisplay,
}: ExtraHiddenPfpsCircleProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className="mr-[-7px] h-[32px] w-[32px] rounded-full" // 30px + 1px border
      style={{
        backgroundColor:
          colorScheme === 'dark' ? colors.stone.faded : color.faded,
      }}
    >
      <Text
        className="m-auto pl-1 text-xs font-semibold"
        style={{
          color: colorScheme === 'dark' ? colors.stone.text : color.text,
        }}
      >
        +{numberToDisplay}
      </Text>
    </View>
  );
}

interface HabitParticipantCompletedBadgeProps {
  numParticipantsActiveToday: number;
  color: HabitColorT;
}
function HabitParticipantCompletedBadge({
  numParticipantsActiveToday,
  color,
}: HabitParticipantCompletedBadgeProps) {
  return (
    <View
      className="flex flex-row items-center rounded-full border px-[10px] py-1 text-habitColors-red-base"
      style={{
        borderColor: color.base,
        backgroundColor: getTranslucentColor(color.base, 0.15),
      }}
    >
      <ActivityIcon size={12} strokeWidth={3} color={color.base} />
      <Text
        className="ml-[2px] text-xs font-semibold"
        style={{ color: color.base }}
      >
        {numParticipantsActiveToday} active today
      </Text>
    </View>
  );
}
