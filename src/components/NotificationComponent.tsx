import { useAtomValue } from "jotai";
import { notificationTypeAtom } from "../atoms/atoms";
import {
  FriendRequest,
  HabitInvite,
  HabitReminder,
} from "./NotificationComponents";
import { Text } from "./Themed";

export default function NotificationComponent({
  notificationId,
}: {
  notificationId: number;
}) {
  const notificationType = useAtomValue(notificationTypeAtom(notificationId));

  switch (notificationType) {
    case "friendRequest":
      return <FriendRequest notifId={notificationId} />;
    case "habitInvite":
      return <HabitInvite notifId={notificationId} />;
    case "habitReminder":
      return <HabitReminder notifId={notificationId} />;
    default:
      return <Text>Unknown notification type</Text>;
  }
}
