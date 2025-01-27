import * as React from 'react';

import { type UserWithRelationshipT } from '@/api';
import { Text, View } from '@/ui';

import UserPicture, { type pfpSize } from './picture';

interface UserInfoProps {
  data: UserWithRelationshipT;
  pictureSize?: pfpSize;
}

export default function UserInfo({ data, pictureSize = 128 }: UserInfoProps) {
  return (
    <View className="flex flex-col items-center gap-2">
      <View className="flex flex-col">
        <Text className="text-center text-lg font-semibold">
          {data.displayName}
        </Text>
        <Text className="text-center text-sm font-medium text-stone-400 dark:text-stone-400">
          @{data.username}
        </Text>
      </View>
      <UserPicture userId={data.id} size={pictureSize} />

      <Text className="text-center text-sm font-medium text-stone-400 dark:text-stone-400">
        Joined{' '}
        {data.createdAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      {data.relationship.friendsSince && (
        <Text className="text-center text-sm font-medium text-stone-400 dark:text-stone-400">
          Friends Since{' '}
          {data.relationship.friendsSince.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      )}
    </View>
  );
}
