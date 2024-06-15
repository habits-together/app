import { IconShare2 } from "@tabler/icons-react-native";
import { Pressable } from "react-native";
import colors from "../constants/colors";
import Icon from "./Icon";
import { Text } from "./Themed";

export default function ShareInviteLink() {
  return (
    <Pressable
      className="mt-2 h-10 w-auto flex-row items-center justify-center rounded-xl border border-stone-300"
      android_ripple={{ color: colors.stone["300"], radius: 200 }}
    >
      <Icon icon={IconShare2} size={17} strokeWidth={3} />
      <Text className="ml-2 text-base font-semibold">Share Invite Link</Text>
    </Pressable>
  );
}