import { View } from "@/src/components/Themed";
import HabitInvite from "@/src/components/HabitInvite";
import colors from "../constants/colors";
import mocInvites from "../lib/mockHabitData";
import { useState } from "react";
import { HabitInviteData } from "../lib/mockHabitData";


// fetch all invites a user has received
export default function HabitInviteList() {
    const [invites, setInvites] = useState<HabitInviteData[]>(mocInvites);
    const deleteInvite = (id: number) => {
        console.log("Invite deleted");
        // delete in db
        setInvites(prevInvites => prevInvites.filter(invite => invite.id !== id));
    };
    const confirmInvite = (id: number) => {
        console.log("Invite confirmed");
        // confirm in db
        setInvites(prevInvites => prevInvites.filter(invite => invite.id !== id));
    }
    return (
        <View className="flex flex-col my-1">
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