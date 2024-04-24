
import { Image } from "react-native";

export default function ProfilePicture({ picUrl }: {
    picUrl: string;
  }) {
    return (
      <Image
        className="w-12 h-12 rounded-full bg-stone-200 r -mr-3"
        source={{ uri: picUrl }}
      />
    );
  }
