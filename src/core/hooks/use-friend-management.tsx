import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';

import { useAddFriend, useRemoveFriend, type UserIDT } from '@/api';

export const useFriendManagement = (
  userId: UserIDT,
  initialIsFriend: boolean,
) => {
  const [isFriend, setIsFriend] = useState(initialIsFriend);
  const addFriend = useAddFriend();
  const removeFriend = useRemoveFriend();

  const handleAddFriend = async () => {
    try {
      await addFriend.mutateAsync({ id: userId });
      setIsFriend(true);
      showMessage({
        message: 'Friend added successfully',
        type: 'success',
        duration: 2000,
      });
    } catch (error) {
      showMessage({
        message: 'Failed to add friend',
        type: 'danger',
        duration: 2000,
      });
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await removeFriend.mutateAsync({ id: userId });
      setIsFriend(false);
      showMessage({
        message: 'Friend removed successfully',
        type: 'success',
        duration: 2000,
      });
    } catch (error) {
      showMessage({
        message: 'Failed to remove friend',
        type: 'danger',
        duration: 2000,
      });
    }
  };

  return {
    isFriend,
    handleAddFriend,
    handleRemoveFriend,
    isAddPending: addFriend.isPending,
    isRemovePending: removeFriend.isPending,
  };
};
