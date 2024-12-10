import { Trash2Icon, UserPlus } from 'lucide-react-native';
import * as React from 'react';

import { type UserT } from '@/api';
import { useFriendManagement } from '@/core';
import { Button, Text, View } from '@/ui';

import UserPicture from './picture';

export default function Profile({ data }: { data: UserT }) {
  const {
    isFriend,
    handleSendFriendRequest,
    handleRemoveFriend,
    isAddPending,
    isRemovePending,
  } = useFriendManagement(data.id, false);

  return (
    <View className="flex flex-col items-center gap-4">
      <View className="flex flex-col items-center gap-2">
        <View className="flex flex-col">
          <Text className="text-center text-lg font-semibold">
            {data.displayName}
          </Text>
          <Text className="text-center text-sm font-medium text-stone-400 dark:text-stone-400">
            @{data.username}
          </Text>
        </View>
        <UserPicture userId={data.id} size={128} />

        <Text className="text-center text-sm font-medium text-stone-400 dark:text-stone-400">
          Joined{' '}
          {data.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>
      {isFriend ? (
        <Button
          icon={Trash2Icon}
          label="Remove Friend"
          variant="destructive"
          className="w-full"
          onPress={handleRemoveFriend}
          loading={isRemovePending}
        />
      ) : (
        <Button
          icon={UserPlus}
          label="Send Friend Request"
          className="w-full"
          onPress={handleSendFriendRequest}
          loading={isAddPending}
        />
      )}
    </View>
  );
}
