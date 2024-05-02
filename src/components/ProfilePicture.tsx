import { Image } from "react-native";

export default function SmallProfilePicture({ picUrl }: { picUrl: string }) {
  if (picUrl === "") {
    return (
      <Image
        className="h-12 w-12 rounded-full bg-stone-200"
        source={require('../../assets/images/default_user.png')}
      />
    );
  } else {
    return (
      <Image
        className="h-12 w-12 rounded-full bg-stone-200"
        source={{ uri: picUrl }}
      />
    );
  }
}

export function BigProfilePicture({ picUrl }: { picUrl: string }) {
  if (picUrl == "") {
    return (
      <Image className="h-24 w-24 rounded-[20px]" source={require('../../assets/images/default_user.png')} />
    );
  } else {
    return (
      <Image className="h-24 w-24 rounded-[20px]" source={{ uri: picUrl }} />
    );
  }
}
