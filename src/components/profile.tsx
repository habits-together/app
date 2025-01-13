import { Trash2Icon, UserPlus } from 'lucide-react-native';
import * as React from 'react';

import { type UserWithRelationshipT } from '@/api';
import { useFriendManagement } from '@/api/users/use-friend-management';
import { Button, View } from '@/ui';

import UserInfo from './user-info';

export default function Profile({ data }: { data: UserWithRelationshipT }) {
  const {
    isFriend,
    handleSendFriendRequest,
    handleRemoveFriend,
    isAddPending,
    isRemovePending,
  } = useFriendManagement(data.id, data.relationship.status === 'friends');

  return (
    <View className="flex flex-col items-center gap-4">
      <UserInfo data={data} />
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
