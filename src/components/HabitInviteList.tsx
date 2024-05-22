import HabitInvite from "@/src/components/HabitInvite";
import { Text, View } from "@/src/components/Themed";
import { useEffect, useState } from "react";
import colors from "../constants/colors";
import { HabitInviteData, getMockHabitInvites } from "../lib/mockData";

// fetch all invites a user has received
export default function HabitInviteList() {
  const [invites, setInvites] = useState<HabitInviteData[]>([]);

  useEffect(() => {
    const fetchHabitInvites = async () => {
      // we would fetch the list from the db and set it here
      const habitInvites = await getMockHabitInvites();
      setInvites(habitInvites);
    };
    fetchHabitInvites();
  }, []);

  const deleteInvite = (id: number) => {
    console.log("Invite deleted");
    // delete in db
    setInvites((prevInvites) =>
      prevInvites.filter((invite) => invite.id !== id),
    );
  };
  const confirmInvite = (id: number) => {
    console.log("Invite confirmed");
    // confirm in db
    setInvites((prevInvites) =>
      prevInvites.filter((invite) => invite.id !== id),
    );
  };

  if (invites.length === 0) {
    return <></>;
  }
  return (
    <View className="my-1 flex flex-col">
      <Text className="text-xl font-bold">
        New habit invite{invites.length > 1 && "s"}
      </Text>
      {invites.map((invite, index) => (
        <HabitInvite
          key={index}
          title={invite.title}
          color={invite.color as keyof typeof colors.habitColors}
          icon={invite.icon}
          numberOfParticipants={invite.numberOfParticipants}
          userName={invite.userName}
          confirmInvite={() => confirmInvite(invite.id)}
          deleteInvite={() => deleteInvite(invite.id)}
        />
      ))}
    </View>
  );
}
