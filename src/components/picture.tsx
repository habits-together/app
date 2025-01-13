import { TriangleAlertIcon } from 'lucide-react-native';

import { usePicture, type UserIdT } from '@/api';
import { Image, View } from '@/ui';

export type pfpSize = 128 | 40 | 30;

interface PictureProps {
  userId: UserIdT;
  size: pfpSize;
}
export default function UserPicture({ userId, size }: PictureProps) {
  const { data, isPending, isError } = usePicture({
    variables: { id: userId },
  });

  return (
    <View
      className="overflow-hidden rounded-full bg-stone-300 dark:bg-stone-600"
      style={{
        height: size,
        width: size,
      }}
    >
      {isPending ? (
        <View className="h-full w-full animate-pulse bg-stone-200 dark:bg-stone-700" />
      ) : isError ? (
        <TriangleAlertIcon className="m-auto h-8 w-8 text-red-500" />
      ) : (
        <Image
          source={data}
          alt="Profile Picture"
          style={{
            height: size,
            width: size,
          }}
        />
      )}
    </View>
  );
}
