import colors from "@/src/constants/colors";
import { useSetAtom, WritableAtom } from "jotai";
import { Pressable } from "react-native";
import { Text } from "../Themed";

export function ConfirmButton({
  atomToSetOnClick,
  notificationId,
}: {
  atomToSetOnClick: WritableAtom<null, [notificationId: string], Promise<void>>;
  notificationId: string;
}) {
  const onClick = useSetAtom(atomToSetOnClick);

  return (
    <Pressable
      className="flex flex-1 rounded-xl border bg-white py-1.5 dark:border-0"
      android_ripple={{ color: colors.stone["300"], radius: 200 }}
      onPress={() => onClick(notificationId)}
    >
      <Text className="text-center font-semibold text-black">Confirm</Text>
    </Pressable>
  );
}

export function DeleteButton({
  atomToSetOnClick,
  notificationId,
}: {
  atomToSetOnClick: WritableAtom<null, [notificationId: string], Promise<void>>;
  notificationId: string;
}) {
  const onClick = useSetAtom(atomToSetOnClick);

  return (
    <Pressable
      className="ml-3 flex flex-1 rounded-xl border border-stone-100 bg-stone-100 py-1.5 dark:border-stone-700 dark:bg-stone-700"
      android_ripple={{ color: colors.stone["300"], radius: 200 }}
      onPress={() => onClick(notificationId)}
    >
      <Text className="text-center font-semibold text-black dark:text-stone-100">
        Delete
      </Text>
    </Pressable>
  );
}

export function DismissButton({
  atomToSetOnClick,
  notificationId,
}: {
  atomToSetOnClick: WritableAtom<null, [notificationId: string], Promise<void>>;
  notificationId: string;
}) {
  const onClick = useSetAtom(atomToSetOnClick);

  return (
    <Pressable
      className="flex flex-1 rounded-xl border bg-white py-1.5 dark:border-0"
      onPress={() => onClick(notificationId)}
      android_ripple={{ color: colors.stone["300"], radius: 200 }}
    >
      <Text className="text-center font-semibold text-black">Dismiss</Text>
    </Pressable>
  );
}
