import { showMessage } from 'react-native-flash-message';

import { addTestDelay } from '../common';
import { mockPictures } from './mock-users';
import { type CompleteUserT } from './types';

export const augmentUsersWithPictures = async (users: CompleteUserT[]) => {
  const friendsWithPictures: CompleteUserT[] = users.map((user) => {
    try {
      const picture = mockPictures[user.id];
      if (!picture) {
        throw new Error('Picture not found');
      }
      return {
        ...user,
        picture: {
          url: picture,
          isPending: false,
          isError: false,
          error: null,
        },
      };
    } catch (error) {
      showMessage({
        message: 'Error fetching image(s)',
        type: 'danger',
      });
      return {
        ...user,
        picture: {
          url: null,
          isPending: false,
          isError: true,
          error: error as string,
        },
      };
    }
  });
  return addTestDelay(friendsWithPictures);
};
