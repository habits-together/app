import { View, Text } from "@/src/components/Themed";
import colors from "../constants/colors";
import { useEffect, useState } from "react";
import { getMockNotifications, NotificationData } from "../lib/mockData";
import { NotifProfilePicture } from "./ProfilePicture";
import Divider from "./Divider";
import { HabitReminder, HabitInvite, FriendRequest } from "./NotificationComponents";

// fetch all invites a user has received
export default function NotificationList() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      // we would fetch the list from the db and set it here
      const notifs = await getMockNotifications();
      setNotifications(notifs);
    };
    fetchNotifications();
  }, []);

  const deleteNotification = (id: number) => {
    console.log("Notification deleted");
    // delete in db
    setNotifications((prevNotifs) =>
      prevNotifs.filter((notif) => notif.id !== id),
    );
  };
  const confirmNotification = (id: number) => {
    console.log("Notification confirmed");
    // confirm in db
    setNotifications((prevNotifs) =>
      prevNotifs.filter((invite) => invite.id !== id),
    );
  };

  if (notifications.length === 0) {
    return (
      <View className="">
        <Text className="mt-8 text-center text-base font-medium text-stone-400">
          You’re all caught up 🎉
        </Text>

      </View>
    );
  }
  return (
    <View>
      <Divider/>
      <View className="flex flex-col">
        {notifications.map((notif) => (
          <View key={notif.id}>
            <View className="px-4">
              {(notif.type === "friendRequest") &&
                <FriendRequest
                displayName={notif.displayName}
                mutualCount={notif.mutualCount}
                profilePic={
                  <NotifProfilePicture picUrl={notif.profilePicUrl} />
                }
                deleteInvite={() => confirmNotification(notif.id)}
                confirmInvite={() => deleteNotification(notif.id)}
              />
              }
              {(notif.type === "habitInvite") &&
                <HabitInvite
                  title={notif.title}
                  color={notif.color as keyof typeof colors.habitColors}
                  icon={notif.icon}
                  numberOfParticipants={notif.numberOfParticipants}
                  displayName={notif.displayName}
                  profilePic={<NotifProfilePicture picUrl={notif.profilePicUrl} />}
                  confirmInvite={() => confirmNotification(notif.id)}
                  deleteInvite={() => deleteNotification(notif.id)}
                />
              }
              {(notif.type === "habitReminder") &&
                <HabitReminder
                  title={notif.title}
                  color={notif.color as keyof typeof colors.habitColors}
                  icon={notif.icon}
                  timeSent={notif.timeSent}
                  displayName={notif.displayName}
                  profilePic={
                    <NotifProfilePicture picUrl={notif.profilePicUrl} />
                  }
                  deleteInvite={() => deleteNotification(notif.id)}
                />
              }
            </View>
            <View className="mt-2.5">
              <Divider />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
