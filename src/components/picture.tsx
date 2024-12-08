import { TriangleAlertIcon } from 'lucide-react-native';

import { type UserPictureT } from '@/api';
import { Image, View } from '@/ui';

interface PictureProps {
  picture: UserPictureT;
  size: 128 | 40;
}
export default function UserPicture({ picture, size }: PictureProps) {
  return (
    <View
      className={`${picture.isPending ? 'animate-pulse' : 'animate-none'} rounded-full bg-stone-200 dark:bg-stone-700`}
      style={{
        height: size,
        width: size,
      }}
    >
      {picture.isPending ? (
        <></>
      ) : picture.isError ? (
        <TriangleAlertIcon className="m-auto h-8 w-8 text-red-500" />
      ) : (
        <Image
          source={picture.url}
          alt="Profile Picture"
          className="rounded-full"
          style={{
            height: size,
            width: size,
          }}
        />
      )}
    </View>
  );
}
