import { Pressable } from "react-native";
import { Text, View } from "./Themed";
import { useColorScheme } from "nativewind";
import colors from "../constants/colors";
import Icon from "./Icon";
import { IconTrash } from "@tabler/icons-react-native";

export default function ConfirmAndDeleteButtons({
  confirmInvite,
  deleteInvite,
}: {
  confirmInvite: () => void;
  deleteInvite: () => void;
}) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-row bg-transparent">
      <Pressable className="flex justify-center rounded-xl border border-stone-300 bg-white px-2.5 py-1.5 dark:bg-transparent">
        <Text
          className="font-semibold text-white"
          style={{
            color: colorScheme === "dark" ? colors.stone[100] : colors.black,
          }}
          onPress={confirmInvite}
        >
          Confirm
        </Text>
      </Pressable>
      <Pressable
        className="ml-1 flex justify-center rounded-xl border border-stone-300 px-1.5 py-1"
        style={{
          backgroundColor:
            colorScheme === "dark" ? "transparent" : colors.white,
        }}
        onPress={deleteInvite}
      >
        <Icon
          icon={IconTrash}
          lightColor="black"
          darkColor="white"
          size={17}
          strokeWidth={2.5}
        />
      </Pressable>
    </View>
  );
}
