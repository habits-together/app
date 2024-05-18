import { View, Text } from "@/src/components/Themed";
import HabitInvite from "@/src/components/HabitInvite";
import colors from "../constants/colors";
import { useEffect, useState } from "react";
import { getMockReminderInvites, HabitReminderData } from "../lib/mockData";
import { NotifProfilePicture } from "./ProfilePicture";
import Divider from "./Divider";
import HabitReminder from "./HabitReminder";

// fetch all invites a user has received
export default function HabitReminderList() {
  const [reminders, setReminders] = useState<HabitReminderData[]>([]);

  useEffect(() => {
    const fetchHabitReminders = async () => {
      // we would fetch the list from the db and set it here
      const habitReminders = await getMockReminderInvites();
      setReminders(habitReminders);
    };
    fetchHabitReminders();
  }, []);

  const deleteReminder = (id: number) => {
    console.log("Reminder dismissed");
    // delete in db
    setReminders((prevReminders) =>
      prevReminders.filter((reminder) => reminder.id !== id),
    );
  };

  if (reminders.length === 0) {
    return <></>;
  }
  return (
    <View className="flex flex-col">
      {reminders.map((reminder, index) => (
        <View>
          <View className="px-4">
            <HabitReminder
              key={index}
              title={reminder.title}
              color={reminder.color as keyof typeof colors.habitColors}
              icon={reminder.icon}
              timeSent={reminder.timeSent}
              displayName={reminder.displayName}
              profilePic={<NotifProfilePicture picUrl={reminder.profilePicUrl} />}
              deleteInvite={() => deleteReminder(reminder.id)}
            />
          </View>
          <View className="mt-2.5">
            <Divider/>
          </View>
        </View>
      ))}
    </View>
  );
}
