import { Image } from "react-native";

export default function SmallProfilePicture({ picUrl }: { picUrl: string }) {
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
