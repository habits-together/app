import {
  acceptHabitInviteAtom,
  deleteNotificationAtom,
  getUserInfoAtom,
  habitNotificationAtom,
  userPictureAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { NotificationIdT } from "@/src/lib/db_types";
import { useAtomValue } from "jotai";
import { HabitIcon } from "../Icon";
import { NotifProfilePicture } from "../ProfilePicture";
import { Text, View } from "../Themed";
import { ConfirmButton, DeleteButton } from "./ConfirmDeleteButton";

export function HabitInvite({ notifId }: { notifId: NotificationIdT }) {
  const notifData = useAtomValue(habitNotificationAtom(notifId));
  const personData = useAtomValue(getUserInfoAtom(notifData.senderId));
  const personImage = useAtomValue(userPictureAtom(personData.id));

  return (
    <View className="mt-2 flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="items-top flex flex-row">
        <View>
          <NotifProfilePicture picUrl={personImage} />
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
            <Text className="text-base"> invited you to join </Text>
            <Text className="text-base font-semibold">
              {notifData.habitTitle}
            </Text>
          </Text>
          <Text className="text-xs text-stone-400">
            {notifData.numberOfParticipants} other participant
            {notifData.numberOfParticipants > 1 ? "s" : ""}
          </Text>
          <View className="mt-2 flex flex-row bg-transparent">
            <ConfirmButton
              atomToSetOnClick={acceptHabitInviteAtom}
              notificationId={notifId}
            />
            <DeleteButton
              atomToSetOnClick={deleteNotificationAtom}
              notificationId={notifId}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
