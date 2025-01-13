/* eslint-disable max-lines-per-function */
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { CheckIcon, Trash2Icon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { type HabitT, type NotificationT, useUser } from '@/api';
import { HabitIcon } from '@/components/habit-icon';
import HabitInfoCard from '@/components/habit-info-card';
import UserPicture from '@/components/picture';
import { Button, colors, Modal, Text, useModal, View } from '@/ui';

import UserInfo from './user-info';

interface NotificationCardProps {
  notification: any;
  userName: string | null;
  habit: HabitT | null | undefined;
  isLoading: boolean;
}

function getTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}hr`;

  const days = Math.floor(hours / 24);
  return `${days}d`;
}

interface NotificationResponseModalProps {
  modal: any;
  notification: NotificationT;
  name: string;
  habit?: HabitT | null;
  onConfirm: () => void;
  onDelete: () => void;
}

function NotificationResponseModal({
  modal,
  notification,
  habit,
  onConfirm,
  onDelete,
}: NotificationResponseModalProps) {
  const { colorScheme } = useColorScheme();
  const { data: userData } = useUser({
    variables: { id: notification.senderId },
  });

  return (
    <Modal
      ref={modal.ref}
      enableDynamicSizing={true}
      snapPoints={[]}
      backgroundStyle={{
        backgroundColor:
          colorScheme === 'dark' ? colors.neutral[800] : colors.white,
      }}
    >
      <BottomSheetScrollView className="">
        <View className="flex flex-col gap-4 p-4 pb-10">
          {notification.type === 'friendRequest' && userData && (
            <UserInfo data={userData} />
          )}
          {notification.type === 'habitInvite' && habit && (
            <View className="py-2">
              <HabitInfoCard habit={habit} />
            </View>
          )}
          <View className="flex flex-col justify-center gap-4">
            <Button
              label="Confirm"
              icon={CheckIcon}
              onPress={() => {
                onConfirm();
                modal.dismiss();
              }}
            />
            <Button
              label="Delete"
              variant="destructive"
              icon={Trash2Icon}
              onPress={() => {
                onDelete();
                modal.dismiss();
              }}
            />
          </View>
        </View>
      </BottomSheetScrollView>
    </Modal>
  );
}

export function NotificationCard({
  notification,
  userName,
  habit,
  isLoading,
}: NotificationCardProps) {
  const modal = useModal();

  const handleConfirm = () => {
    // TODO: Implement confirmation logic
    console.log('Confirmed');
  };

  const handleDelete = () => {
    // TODO: Implement deletion logic
    console.log('Deleted');
  };

  return (
    <View className="flex flex-row items-center gap-2">
      <View className="flex flex-1 flex-row items-center gap-4">
        <View className="relative">
          <UserPicture userId={notification.senderId} size={40} />
          {notification.type !== 'friendRequest' && habit?.icon && (
            <View className="absolute -bottom-1.5 -right-1.5 h-5 w-5 items-center justify-center rounded-full bg-slate-50 p-3 dark:bg-stone-900">
              <HabitIcon
                icon={habit.icon}
                color={habit.color.base}
                size={16}
                strokeWidth={2}
              />
            </View>
          )}
        </View>
        <View className="flex-1">
          {isLoading ? (
            <>
              <View className="mb-1 h-5 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
              <View className="h-4 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
            </>
          ) : (
            <>
              <Text className="font-medium">
                {notification.type === 'friendRequest' && 'New friend request'}
                {notification.type === 'habitInvite' && (
                  <>{userName} invited you</>
                )}
                {notification.type === 'nudge' && <>{userName} nudged you</>}
                <Text className="text-sm text-neutral-500">
                  {' '}
                  • {getTimeAgo(notification.sentAt)}
                </Text>
              </Text>
              <Text className="text-sm text-neutral-600 dark:text-neutral-400">
                {notification.type === 'friendRequest' && (
                  <>{userName} wants to be your friend</>
                )}
                {notification.type === 'habitInvite' && (
                  <>Join in: {habit?.title}</>
                )}
                {notification.type === 'nudge' && (
                  <>Don't forget: {habit?.title}</>
                )}
              </Text>
            </>
          )}
        </View>
      </View>
      <View className="">
        <Button
          label={notification.type === 'nudge' ? 'Dismiss' : 'Respond'}
          variant="outline"
          size="sm"
          disabled={isLoading}
          onPress={notification.type === 'nudge' ? handleDelete : modal.present}
        />
      </View>
      {notification.type !== 'nudge' && (
        <NotificationResponseModal
          modal={modal}
          notification={notification}
          name={userName ?? ''}
          habit={habit}
          onConfirm={handleConfirm}
          onDelete={handleDelete}
        />
      )}
    </View>
  );
}
