import { Image } from "react-native";

export function SmallProfilePicture({
  picUrl,
  isLocalImage = false,
}: {
  picUrl: string;
  isLocalImage?: boolean;
}) {
  return (
    <Image
      className="h-[30px] w-[30px] rounded-full"
      // source={
      //   isLocalImage
      //     ? picUrl
      //     : picUrl
      //       ? { uri: picUrl }
      //       : require("../../assets/images/default_user.png")
      // }
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
