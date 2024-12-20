import { Link } from 'expo-router';

import { type UserT } from '@/api';
import { Pressable, Text, View } from '@/ui';

import UserPicture from './picture';

export default function UserCard({ data }: { data: UserT }) {
  return (
    <Link
      push
      href={{
        pathname: '/friends/[id]',
        params: {
          id: data.id,
          theirUserId: data.id,
        },
      }}
      asChild
    >
      <Pressable className="my-1 flex flex-row gap-2 rounded-3xl border border-stone-200 bg-white px-4 py-[10px] dark:border-stone-700 dark:bg-transparent">
        <UserPicture userId={data.id} size={40} />
        <View className="flex flex-col">
          <Text className="text-base font-semibold">{data.displayName}</Text>
          <Text className="text-xs font-medium text-stone-400 dark:text-stone-400">
            @{data.username}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
