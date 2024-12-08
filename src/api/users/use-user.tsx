import { createQuery } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { augmentUsersWithPictures } from './augment-user-pictures';
import { mockUsers } from './mock-users';
import { type CompleteUserT, loadingPicture, type UserIdT } from './types';

type Variables = { id: UserIdT };
type Response = CompleteUserT;

export const useUser: ReturnType<
  typeof createQuery<Response, Variables, Error>
> = createQuery<Response, Variables, Error>({
  queryKey: ['friend'],
  fetcher: async (variables) => {
    const cachedData: Response | undefined = queryClient.getQueryData<Response>(
      useUser.getKey(variables),
    );
    if (cachedData) {
      return cachedData;
    }

    const user = await addTestDelay(
      mockUsers.find((user) => user.id === variables.id),
    );
    if (!user) throw new Error('User not found');

    const userWithPicture = {
      ...user,
      picture: loadingPicture,
    };

    augmentUsersWithPictures([userWithPicture]).then((user) => {
      queryClient.setQueryData(useUser.getKey(variables), user[0]);
    });

    return userWithPicture;
  },
});
