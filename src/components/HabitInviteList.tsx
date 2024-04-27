import { View } from "@/src/components/Themed";
import HabitInvite from "@/src/components/HabitInvite";
import { IconMusic, IconMoodTongue } from "@tabler/icons-react-native";
import colors from "../constants/colors";

// fetch all invites a user has received
export default function HabitInviteList() {
    const invites = [
        { title: "Play Guitar", color: "purple", icon: IconMusic, numberOfParticipants: 3, userName: "blaze_kush" },
        { title: "Yum Yum", color: "red", icon: IconMoodTongue, numberOfParticipants: 10, userName: "kush_blaze" }
    ];

    const deleteInvite = () => {
        // delete the invite
        console.log("Invite deleted");
    };
    const confirmInvite = () => {
        // confirm the invite
        console.log("Invite confirmed");
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
                    confirmInvite={confirmInvite}
                    deleteInvite={deleteInvite}
                />
            ))}

        </View>
    );
}