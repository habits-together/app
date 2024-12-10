import { createQuery } from 'react-query-kit';

import { addTestDelay } from '../common';
import { mockPictures } from './mock-users';
import { type UserIdT } from './types';

type Variables = { id: UserIdT };
type Response = string;

export const usePicture: ReturnType<
  typeof createQuery<Response, Variables, Error>
> = createQuery<Response, Variables, Error>({
  queryKey: ['picture'],
  fetcher: async (variables) => {
    const picture = await addTestDelay(mockPictures[variables.id]);
    if (!picture) throw new Error('User picture not found');
    return picture;
  },
});
