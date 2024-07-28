import { useAtomValue } from "jotai";
import { notificationTypeAtom } from "../atoms/atoms";
import { Text } from "./Themed";
import { FriendRequest } from "./notification-components/FriendRequest";
import { HabitInvite } from "./notification-components/HabitInvite";
import { Nudge } from "./notification-components/Nudge";
import { NotificationIdT } from "../lib/db_types";

export default function NotificationComponent({
  notificationId,
}: {
  notificationId: NotificationIdT;
}) {
  const notificationType = useAtomValue(notificationTypeAtom(notificationId));

  switch (notificationType) {
    case "friendRequest":
      return <FriendRequest notifId={notificationId} />;
    case "habitInvite":
      return <HabitInvite notifId={notificationId} />;
    case "nudge":
      return <Nudge notifId={notificationId} />;
    default:
      return <Text>Unknown notification type</Text>;
  }
}
