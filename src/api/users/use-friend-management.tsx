import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';

import { type UserIdT } from './types';
import { useRemoveFriend } from './use-remove-friend';
import { useSendFriendRequest } from './use-send-friend-request';

export const useFriendManagement = (
  userId: UserIdT,
  initialIsFriend: boolean,
) => {
  const [isFriend, setIsFriend] = useState(initialIsFriend);
  const sendFriendRequest = useSendFriendRequest();
  const removeFriend = useRemoveFriend();

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest.mutateAsync({ id: userId });
      setIsFriend(true);
      showMessage({
        message: 'Sent friend request successfully',
        type: 'success',
        duration: 2000,
      });
    } catch (error) {
      showMessage({
        message: 'Failed to send friend request',
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
    handleSendFriendRequest,
    handleRemoveFriend,
    isAddPending: sendFriendRequest.isPending,
    isRemovePending: removeFriend.isPending,
  };
};
