import { View } from "react-native";

export default function Divider() {
  return (
    <View
      className={`border-b ${
        "border-grey-200 dark:border-stone-light"
      }`}
    />
  );
}
