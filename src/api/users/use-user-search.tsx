import { createQuery } from 'react-query-kit';

import { addTestDelay, queryClient } from '../common';
import { augmentUsersWithPictures } from './augment-user-pictures';
import { mockUsers } from './mock-users';
import { type CompleteUserT, loadingPicture } from './types';

type Variables = {
  query: string;
};
type Response = CompleteUserT[];

// don't need friend status
export const useUserSearch: ReturnType<
  typeof createQuery<Response, Variables, Error>
> = createQuery<Response, Variables, Error>({
  queryKey: ['user-search'],
  fetcher: async (variables) => {
    const users = await addTestDelay(
      mockUsers.filter(
        (user) =>
          user.displayName
            .toLowerCase()
            .includes(variables.query.toLowerCase()) ||
          user.username.toLowerCase().includes(variables.query.toLowerCase()),
      ),
    );

    const cachedData: Response | undefined = queryClient.getQueryData<Response>(
      useUserSearch.getKey(variables),
    );

    const usersWithPictures = users.map((user) => ({
      ...user,
      picture:
        cachedData?.find((h) => h.id === user.id)?.picture ?? loadingPicture,
    }));

    augmentUsersWithPictures(usersWithPictures).then((augmentedUsers) => {
      queryClient.setQueryData(useUserSearch.getKey(variables), augmentedUsers);
    });

    return usersWithPictures;
  },
});
