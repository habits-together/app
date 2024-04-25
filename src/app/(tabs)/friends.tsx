import FriendSearchBar from "@/src/components/FriendSearchBar";
import HabitInvite from "@/src/components/HabitInvite";
import { Text, View } from "@/src/components/Themed";
import { IconMusic } from "@tabler/icons-react-native";

export default function FriendsTab() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold">New friend requests</Text>
      <Text className="text-2xl font-bold">New habit invite</Text>

      <View className="">
        <HabitInvite title="Play Guitar" color="purple" icon={IconMusic} numberOfParticipants={3} inviterUserName="blaze_kush" />
      </View>

      <Text className="text-2xl font-bold">My friends</Text>
      <FriendSearchBar />
    </View>
  );
}
