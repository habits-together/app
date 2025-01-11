import { Link } from 'expo-router';
import { EllipsisIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import { type UserT } from '@/api';
import { colors, Pressable, Text, View } from '@/ui';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import UserPicture from './picture';

interface UserCardProps {
  data: UserT;
  showOwnerBadge?: boolean;
  showManageOptions?: boolean;
  onTransferOwnership?: () => void;
  onKickUser?: () => void;
  onPress?: () => void;
}

export default function UserCard({
  data,
  showOwnerBadge,
  showManageOptions,
  onTransferOwnership,
  onKickUser,
  onPress,
}: UserCardProps) {
  const { colorScheme } = useColorScheme();

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
      <Pressable
        className="my-1 flex-row items-center justify-between rounded-3xl border border-stone-200 bg-white px-4 py-[10px] dark:border-stone-700 dark:bg-transparent"
        onPress={() => onPress?.()}
      >
        <UserImageNameAndUsername data={data} />
        {showOwnerBadge && (
          <Text className="text-xs text-stone-400 dark:text-stone-500">
            Admin
          </Text>
        )}
        {showManageOptions && (
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
              <DropdownMenuItem
                key={'transfer'}
                onSelect={onTransferOwnership}
                destructive
              >
                <DropdownMenuItemTitle>
                  Transfer ownership
                </DropdownMenuItemTitle>
              </DropdownMenuItem>
              <DropdownMenuItem
                key={'remove'}
                onSelect={onKickUser}
                destructive
              >
                <DropdownMenuItemTitle>Remove from habit</DropdownMenuItemTitle>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        )}
      </Pressable>
    </Link>
  );
}

export function UserImageNameAndUsername({ data }: { data: UserT }) {
  return (
    <View className="flex flex-row gap-2">
      <UserPicture userId={data.id} size={40} />
      <View className="flex flex-col">
        <Text className="text-base font-semibold">{data.displayName}</Text>
        <Text className="text-xs font-medium text-stone-400 dark:text-stone-400">
          @{data.username}
        </Text>
      </View>
    </View>
  );
}
