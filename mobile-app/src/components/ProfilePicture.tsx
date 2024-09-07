import { Image } from "expo-image";

export function SmallProfilePicture({ picUrl }: { picUrl: string }) {
  return (
    <Image
      className="h-[30px] w-[30px] rounded-full"
      source={{ uri: picUrl }}
    />
  );
}

export function MediumProfilePicture({ picUrl }: { picUrl: string }) {
  return (
    <Image
      className="h-12 w-12 rounded-full bg-stone-200"
      source={
        picUrl
          ? { uri: picUrl }
          : require("../../assets/images/default_user.png")
      }
    />
  );
}

export function NotifProfilePicture({ picUrl }: { picUrl: string }) {
  return (
    <Image
      className="h-[72px] w-[72px] rounded-full bg-stone-200"
      source={
        picUrl
          ? { uri: picUrl }
          : require("../../assets/images/default_user.png")
      }
    />
  );
}

export function BigProfilePicture({ picUrl }: { picUrl: string }) {
  return (
    <Image
      className="h-24 w-24 rounded-[20px]"
      source={
        picUrl
          ? { uri: picUrl }
          : require("../../assets/images/default_user.png")
      }
    />
  );
}
