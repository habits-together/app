import { Text, View } from "@/src/components/Themed";
import { useEffect, useState } from "react";
import colors from "../constants/colors";
import { NotificationData, getMockNotifications } from "../lib/mockData";
import Divider from "./Divider";
import {
  FriendRequest,
  HabitInvite,
  HabitReminder,
} from "./NotificationComponents";
import { NotifProfilePicture } from "./ProfilePicture";
import { notificationIdsAtom } from "../atoms/atoms";
import { useAtomValue } from "jotai";
import NotificationComponent from "./NotificationComponent";

// fetch all invites a user has received
export default function NotificationList() {
  const notificationIds = useAtomValue(notificationIdsAtom);

  if (notificationIds.length === 0) {
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
      <Divider />
      <View className="flex flex-col">
        {notificationIds.map((id) => (
          <View key={id}>
            <View className="px-4">
              <NotificationComponent notificationId={id} />
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
