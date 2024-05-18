import { View, Text } from "@/src/components/Themed";
import HabitInvite from "@/src/components/HabitInvite";
import colors from "../constants/colors";
import { useEffect, useState } from "react";
import { getMockHabitInvites, HabitInviteData } from "../lib/mockData";
import { NotifProfilePicture } from "./ProfilePicture";
import Divider from "./Divider";

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
    <View className="flex flex-col">
      {invites.map((invite, index) => (
        <View>
          <View className="px-4">
            <HabitInvite
              key={index}
              title={invite.title}
              color={invite.color as keyof typeof colors.habitColors}
              icon={invite.icon}
              numberOfParticipants={invite.numberOfParticipants}
              displayName={invite.displayName}
              profilePic={<NotifProfilePicture picUrl={invite.profilePicUrl} />}
              confirmInvite={() => confirmInvite(invite.id)}
              deleteInvite={() => deleteInvite(invite.id)}
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
