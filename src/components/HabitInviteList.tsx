import { View } from "@/src/components/Themed";
import HabitInvite from "@/src/components/HabitInvite";
import colors from "../constants/colors";
import mocInvites from "../lib/mockHabitData";
import { useState } from "react";
import { HabitInviteData } from "../lib/mockHabitData";


// fetch all invites a user has received
export default function HabitInviteList() {
    const [invites, setInvites] = useState<HabitInviteData[]>(mocInvites);
    const deleteInvite = (id: number) => { // Function now takes an ID
        console.log("Invite deleted");
        setInvites(prevInvites => prevInvites.filter(invite => invite.id !== id));
    };
    const confirmInvite = (id: number) => {
        // confirm the invite
        console.log("Invite confirmed");
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