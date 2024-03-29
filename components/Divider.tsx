import { View } from "react-native";

export default function Divider({ borderClasses }: { borderClasses?: string }) {
  return (
    <View
      className={`border-b ${
        borderClasses || "border-grey-200 dark:border-stone-light"
      }`}
    />
  );
}
