import { useColorScheme } from "nativewind";
import { Pressable } from "react-native";
import colors from "../constants/colors";
import { Text, View } from "./Themed";

type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result

export default function ConfirmAndDeleteButtons({
  confirmInvite,
  deleteInvite,
}: {
  confirmInvite: SetAtom<[], void>;
  deleteInvite: SetAtom<[], void>;
}) {
  return (
    <View className="flex flex-row bg-transparent">
      <Pressable
        className="flex justify-center rounded-xl border border-stone-300 bg-white px-[40px] py-1.5 dark:bg-transparent"
        android_ripple={{ color: colors.stone["300"], radius: 200 }}
        onPress={confirmInvite}
      >
        <Text className="font-semibold text-black dark:text-stone-100">
          Confirm
        </Text>
      </Pressable>
      <Pressable
        className="ml-3 flex justify-center rounded-xl border border-stone-100 bg-stone-100 px-[40px] py-1.5 dark:border-stone-700 dark:bg-stone-700"
        onPress={deleteInvite}
        android_ripple={{ color: colors.stone["300"], radius: 200 }}
      >
        <Text className="font-semibold text-black dark:text-stone-100">
          Delete
        </Text>
      </Pressable>
    </View>
  );
}
