import { View } from "@/src/components/Themed";
import HabitInvite from "@/src/components/HabitInvite";
import { IconMusic, IconMoodTongue } from "@tabler/icons-react-native";

// fetch all invites a user has received
export default function HabitInviteList() {
    return (
        <View className="flex flex-col my-1">
            <HabitInvite title="Play Guitar" color="purple" icon={IconMusic} numberOfParticipants={3} inviterUserName="blaze_kush" />
            <HabitInvite title="Yum Yum" color="red" icon={IconMoodTongue} numberOfParticipants={10} inviterUserName="blaze_kush" />
        </View>
    );
}