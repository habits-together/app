import { createQuery } from 'react-query-kit';

import { getUserPicture } from './firebase-queries';
import { type UserIdT } from './types';

type Variables = { id: UserIdT };
type Response = string;

export const usePicture = createQuery<Response, Variables, Error>({
  queryKey: ['picture'],
  fetcher: async (variables) => {
    return await getUserPicture(variables.id);
  },
});
