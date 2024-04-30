import { Image } from "react-native";

export default function ProfilePicture({ picUrl, displayType }: { picUrl: string, displayType: "habit-card" | "profile-page" }) {
  if (displayType === "habit-card") {
    return (
      <Image
        className="h-12 w-12 rounded-full bg-stone-200"
        source={{ uri: picUrl }}
      />
    );
  }
  if (displayType === "profile-page") {
    return (
      <Image
        className="h-24 w-24 rounded-[20px]"
        source={{ uri: picUrl }}
      />
    );
  }
}
