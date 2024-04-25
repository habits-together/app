import { Image } from "react-native";

export default function ProfilePicture({ picUrl }: { picUrl: string }) {
  return (
    <Image
      className="h-12 w-12 rounded-full bg-stone-200"
      source={{ uri: picUrl }}
    />
  );
}
