import { createQuery } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { augmentUsersWithPictures } from './augment-user-pictures';
import { mockUsers } from './mock-users';
import { type CompleteUserT, loadingPicture } from './types';

type Response = CompleteUserT[];
type Variables = void;

// don't need friend status
export const useFriends = createQuery<Response, Variables, Error>({
  queryKey: ['friends'],
  fetcher: async () => {
    const friends = await addTestDelay(
      mockUsers.filter((user) => user.isFriend),
    );

    const cachedData: Response | undefined = queryClient.getQueryData<Response>(
      ['friends'],
    );

    const friendsWithPictures = friends.map((friend) => ({
      ...friend,
      picture:
        cachedData?.find((h) => h.id === friend.id)?.picture ?? loadingPicture,
    }));

    augmentUsersWithPictures(friendsWithPictures).then((augmentedFriends) => {
      queryClient.setQueryData(['friends'], augmentedFriends);
    });

    return friendsWithPictures;
  },
});
