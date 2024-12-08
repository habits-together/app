import { createMutation } from 'react-query-kit';

import { addTestDelay } from '../common/add-test-delay';
import { queryClient } from '../common/api-provider';
import { type UserIDT } from '../schemas';

type Variables = { id: UserIDT };
type Response = void;

export const useRemoveFriend = createMutation<Response, Variables, Error>({
  mutationFn: async () => {
    await addTestDelay(undefined);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['friends'] });
  },
});
