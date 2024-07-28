import {
  deleteNotificationAtom,
  getUserInfoAtom,
  habitNotificationAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { useAtomValue } from "jotai";
import { HabitIcon } from "../Icon";
import { NotifProfilePicture } from "../ProfilePicture";
import { Text, View } from "../Themed";
import { DismissButton } from "./ConfirmDeleteButton";
import { NotificationIdT } from "@/src/lib/db_types";

export function Nudge({ notifId }: { notifId: NotificationIdT }) {
  const notifData = useAtomValue(habitNotificationAtom(notifId));
  const personData = useAtomValue(getUserInfoAtom(notifData.senderId));

  return (
    <View className="mt-2 flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="items-top flex flex-row">
        <View>
          <NotifProfilePicture picUrl={personData.picture} />
          <View
            className="absolute -right-[8px] -top-[-44px] h-9 w-9 rounded-full "
            style={{
              backgroundColor: colors.habitColors[notifData.habitColor].base,
            }}
          >
            <View className="m-auto bg-transparent">
              <HabitIcon
                icon={notifData.habitIcon}
                lightColor="black"
                darkColor="black"
                strokeWidth={2}
              />
            </View>
          </View>
        </View>
        <View className="ml-4 flex flex-1 flex-col">
          <Text className="flex-row">
            <Text className="text-base font-semibold">
              {personData.displayName}
            </Text>
            <Text className="text-base"> nudged you to complete </Text>
            <Text className="text-base font-semibold">
              {notifData.habitTitle}
            </Text>
          </Text>
          <Text className="text-xs text-stone-400">
            {notifData.sentAt.toLocaleString()}
          </Text>
          <View className="mt-2 flex flex-row bg-transparent">
            <DismissButton
              atomToSetOnClick={deleteNotificationAtom}
              notificationId={notifId}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
