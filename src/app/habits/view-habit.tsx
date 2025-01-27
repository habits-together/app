/* eslint-disable max-lines-per-function */
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Link, useLocalSearchParams } from 'expo-router';
import {
  BellIcon,
  CheckIcon,
  ChevronRightIcon,
  Trash2Icon,
  UserPlusIcon,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';

import {
  type HabitColorT,
  type HabitCompletionWithDateInfoT,
  type HabitT,
  type ParticipantWithIdT,
  useAllUsersHabitCompletions,
  type UserIdT,
  type UserT,
} from '@/api';
import { ErrorMessage } from '@/components/error-message';
import { HabitIcon, type habitIcons } from '@/components/habit-icon';
import HabitInfoCard from '@/components/habit-info-card';
import ModifyHabitEntry from '@/components/modify-habit-entry';
import { DayNavigation } from '@/components/modify-habit-entry/day-navigation';
import UserCard, { UserImageNameAndUsername } from '@/components/user-card';
import { getTranslucentColor } from '@/core/get-translucent-color';
import {
  Button,
  colors,
  Header,
  Image,
  LoadingSpinner,
  Modal,
  Pressable,
  ScreenContainer,
  ScrollView,
  Text,
  useModal,
  View,
} from '@/ui';

export default function ViewHabit() {
  const { habitJson } = useLocalSearchParams<{
    habitJson: string;
  }>();
  const parsedHabit: HabitT = JSON.parse(habitJson);
  // Parse dates for all participants' lastActivity
  Object.values(parsedHabit.participants).forEach((participant) => {
    if (participant?.lastActivity) {
      participant.lastActivity = new Date(participant.lastActivity);
    }
  });

  const generateDatesList = (startDate: Date): Date[] => {
    const dates: Date[] = [];
    const start = new Date(startDate);
    // Set to start of day
    start.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    while (start <= today) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dates;
  };
  const datesList = generateDatesList(new Date(parsedHabit.createdAt));

  const {
    data: allCompletions,
    isPending: allCompletionsIsPending,
    isError: allCompletionsIsError,
    error: allCompletionsError,
    refetch: refetchCompletions,
  } = useAllUsersHabitCompletions({
    variables: {
      habitId: parsedHabit.id,
      numDays: datesList.length,
    },
  });

  const [selectedDayIndex, setSelectedDayIndex] = React.useState(
    datesList.length - 1,
  );

  const handleDayChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < datesList.length) {
      setSelectedDayIndex(newIndex);
    }
  };

  const resetStates = () => {
    // No form states to reset in this view, but keeping the function
    // for consistency with the DayNavigation interface
  };

  const participantsByMostRecentActivity: ParticipantWithIdT[] = Object.values(
    parsedHabit.participants,
  )
    .filter((p): p is ParticipantWithIdT => p !== undefined)
    .sort((a, b) => {
      // always show user first
      if (a.id === '1') return -1;
      if (b.id === '1') return 1;
      if (!a?.lastActivity) {
        console.error('no last activity', a);
        return 1;
      }
      if (!b?.lastActivity) {
        console.error('no last activity', b);
        return -1;
      }
      return b.lastActivity.getTime() - a.lastActivity.getTime();
    });

  return (
    <ScreenContainer>
      <Header leftButton="back" />
      <ScrollView>
        <View className="flex flex-1 flex-col gap-6 pb-10">
          <HabitHeader habit={parsedHabit} />
          <DayNavigation
            selectedDayIndex={selectedDayIndex}
            datesList={datesList}
            hasUnsavedChanges={false}
            onDayChange={handleDayChange}
            resetStates={resetStates}
          />
          {allCompletionsIsPending ? (
            <LoadingSpinner />
          ) : allCompletionsIsError ? (
            <ErrorMessage
              error={allCompletionsError}
              refetch={refetchCompletions}
              variant="compact"
            />
          ) : (
            <View className="flex flex-1 flex-col gap-2">
              {participantsByMostRecentActivity.map((p) => {
                const user: UserT = {
                  id: p.id,
                  displayName: p.displayName,
                  username: p.username,
                  createdAt: p.lastActivity,
                };
                return (
                  <UserWithEntry
                    key={p.id}
                    user={user}
                    entry={allCompletions[user.id][selectedDayIndex]}
                    color={parsedHabit.color}
                    isToday={selectedDayIndex === datesList.length - 1}
                    modifyEntryButton={
                      user.id === '1' && (
                        <ModifyHabitEntry
                          habit={parsedHabit}
                          completions={[
                            allCompletions[user.id][selectedDayIndex],
                          ]}
                          showAsNormalButton
                        />
                      )
                    }
                  />
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

interface HabitHeaderProps {
  habit: HabitT;
}
const HabitHeader = ({ habit }: HabitHeaderProps) => {
  const { colorScheme } = useColorScheme();
  const modal = useModal();
  const participants = Object.entries(habit.participants)
    .filter(
      (entry): entry is [string, NonNullable<(typeof entry)[1]>] =>
        entry[1] !== undefined,
    )
    .map(([_, p]) => p);
  const isOwner = habit.participants['1' as UserIdT]?.isOwner;

  const handleTransferOwnership = (userId: string) => {
    alert('TODO: Transfer ownership to ' + userId);
  };

  const handleKickUser = (userId: string) => {
    alert('TODO: Kick user ' + userId);
  };

  return (
    <>
      <Pressable
        className="flex-row items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 dark:border-stone-700 dark:bg-transparent"
        onPress={modal.present}
      >
        <View className="flex-1 flex-row items-center gap-2">
          <HabitIcon
            icon={habit.icon as keyof typeof habitIcons}
            size={20}
            color={colorScheme === 'dark' ? colors.white : colors.black}
            strokeWidth={2}
          />
          <Text
            numberOfLines={1}
            className="flex-1 text-lg font-semibold text-black dark:text-white"
          >
            {habit.title}
          </Text>
        </View>
        <ChevronRightIcon
          color={colorScheme === 'dark' ? colors.white : colors.black}
        />
      </Pressable>

      <Modal
        ref={modal.ref}
        enableDynamicSizing={false}
        snapPoints={['90%']}
        backgroundStyle={{
          backgroundColor:
            colorScheme === 'dark' ? colors.neutral[800] : colors.white,
        }}
      >
        <BottomSheetScrollView className="flex-1 px-4">
          <View className="flex flex-col gap-6">
            <HabitInfoCard habit={habit} />

            <Button
              label="Invite Friends"
              icon={UserPlusIcon}
              onPress={() => alert('todo')}
            />

            {participants.length >= 2 && (
              <View className="flex flex-col">
                <Text className="font-medium">
                  {participants.length} participants:
                </Text>
                {participants.map((p) => (
                  <UserCard
                    key={p.id}
                    data={{
                      id: p.id,
                      displayName: p.displayName,
                      username: p.username,
                      createdAt: p.lastActivity,
                    }}
                    showOwnerBadge={p.isOwner}
                    showManageOptions={isOwner && p.id !== '1'}
                    onTransferOwnership={() => handleTransferOwnership(p.id)}
                    onKickUser={() => handleKickUser(p.id)}
                    onPress={modal.dismiss}
                  />
                ))}
              </View>
            )}

            <Button
              label="Leave Habit"
              variant="destructive"
              icon={Trash2Icon}
              onPress={() => alert('todo')}
            />
          </View>
        </BottomSheetScrollView>
      </Modal>
    </>
  );
};

interface UserWithEntryProps {
  user: UserT;
  entry: HabitCompletionWithDateInfoT;
  color: HabitColorT;
  modifyEntryButton?: React.ReactNode;
  isToday: boolean;
}
const UserWithEntry = ({
  user,
  entry,
  color,
  modifyEntryButton,
  isToday,
}: UserWithEntryProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <Link
      push
      href={{
        pathname: '/friends/[id]',
        params: {
          id: user.id,
          theirUserId: user.id,
        },
      }}
      asChild
    >
      <Pressable className="rounded-3xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-transparent">
        <View className="flex flex-col gap-4">
          <View className="flex flex-row">
            <View
              className="flex flex-row items-center rounded-full border px-2 py-1"
              style={{
                borderColor:
                  entry.numberOfCompletions >= 1 ? color.base : 'transparent',
                backgroundColor:
                  entry.numberOfCompletions >= 1
                    ? getTranslucentColor(color.base, 0.15)
                    : colorScheme === 'dark'
                      ? colors.stone.light
                      : colors.stone[100],
              }}
            >
              <Text
                className="text-xs"
                style={{
                  color:
                    entry.numberOfCompletions === 0
                      ? colors.stone[400]
                      : color.base,
                }}
              >
                {entry.numberOfCompletions === 0 ? (
                  'Not completed'
                ) : (
                  <>
                    Completed{' '}
                    {entry.numberOfCompletions > 1 &&
                      entry.numberOfCompletions + ' times '}
                  </>
                )}
              </Text>
              {entry.numberOfCompletions >= 1 && (
                <CheckIcon
                  color={
                    entry.numberOfCompletions === 0
                      ? colors.stone[400]
                      : color.base
                  }
                  size={12}
                  strokeWidth={3}
                />
              )}
            </View>
          </View>
          <View className="flex flex-row items-center justify-between">
            <UserImageNameAndUsername data={user} />
            <ChevronRightIcon
              color={colorScheme === 'dark' ? colors.white : colors.black}
            />
          </View>
          {entry.note && <Text className="text-base">{entry.note}</Text>}
          {entry.image && (
            <Image
              source={{ uri: entry.image }}
              className="aspect-square w-full rounded-xl"
            />
          )}
          {/* the user sees a button to modify the entry */}
          {modifyEntryButton ||
            // for other users, show nudge button if no completions and it's today
            (entry.numberOfCompletions === 0 && isToday && (
              <View className="flex flex-row justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  label="Nudge"
                  icon={BellIcon}
                  onPress={() => alert('todo')}
                />
              </View>
            ))}
        </View>
      </Pressable>
    </Link>
  );
};
