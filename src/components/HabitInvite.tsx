import { View, Text } from "./Themed";
import colors from "../constants/colors";
import { useColorScheme } from "nativewind";
import { Icon as TablerIcon, IconTrash, IconUsers } from "@tabler/icons-react-native";
import Icon from "./Icon";
import { Pressable } from "react-native";

export type HabitInviteProps = {
    title: string;
    color: keyof typeof colors.habitColors;
    icon: TablerIcon;
    numberOfParticipants: number;
    inviterUserName: string;
};

export default function HabitInvite({ title, color, icon, inviterUserName, numberOfParticipants }: HabitInviteProps) {
    const { colorScheme } = useColorScheme();
    const deleteInvite = () => {
        // delete the invite
        console.log("Invite deleted");
    };
    const confirmInvite = () => {
        // confirm the invite
        console.log("Invite confirmed");
    }
    return (
        // wanna remove the my-2 later, for some reason i cant use "gap" in ./HabitInviteList.tsx 
        // gonna look into it later
        <View className="flex flex-row grow-0 items-center rounded-3xl px-3 py-2 my-1"
            style={
                {
                    backgroundColor: colorScheme === "dark"
                        ? colors.stone.light
                        : colors.habitColors[color].faded
                }
            }>
            <View className="rounded-full p-2 mr-4"
                style={
                    {
                        backgroundColor: colors.habitColors[color].base
                    }
                }>
                <Icon icon={icon} lightColor="black" darkColor="black" strokeWidth={2} />
            </View>
            <View className="flex flex-col bg-transparent">
                <View className="flex flex-row justify-between bg-transparent">
                    <Text className="text-lg font-semibold">{title}</Text>
                    <View className="flex flex-row items-center bg-transparent">
                        <Icon icon={IconUsers} size={17} strokeWidth={2.5} />
                        <Text className="pl-0.5 text-base font-extrabold">{numberOfParticipants}</Text>
                    </View>
                </View>
                <Text className="font-medium"
                    style={{
                        color: colorScheme === "dark"
                            ? colors.stone[400]
                            : colors.habitColors[color].text,
                    }}>Invited by {inviterUserName}</Text>
            </View>
            <View className="ml-auto flex flex-row bg-transparent">
                <Pressable className="border px-2.5 py-1.5 rounded-xl flex justify-center"
                    style={
                        {
                            backgroundColor: colorScheme === "dark" ? "transparent" : colors.white,
                            borderColor: colorScheme === "dark"
                                ? colors.stone[300]
                                : colors.stone[400],
                        }
                    }>
                    <Text className="text-white font-semibold"
                        style={
                            {
                                color: colorScheme === "dark" ? colors.stone[100] : colors.black
                            }
                        }
                        onPress={confirmInvite}>Confirm</Text>
                </Pressable>
                <Pressable className="ml-1 border px-1.5 py-1 rounded-xl flex justify-center"
                    style={
                        {
                            backgroundColor: colorScheme === "dark" ? "transparent" : colors.white,
                            borderColor: colorScheme === "dark"
                                ? colors.stone[300]
                                : colors.stone[400],
                        }
                    }
                    onPress={deleteInvite}>
                    <Icon icon={IconTrash} lightColor="black" darkColor="white" size={17} strokeWidth={2.5} />
                </Pressable>
            </View>
        </View>
    );
}
