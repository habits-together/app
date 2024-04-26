import { View, Text } from "@/src/components/Themed";
import React from "react";
import { IconTrash } from "@tabler/icons-react-native";
import Icon from "./Icon";
import { Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import colors from "../constants/colors";


export type FriendRequestProps = {
    inviterDisplayName: string;
    inviterUserName: string;
    profilePic: React.JSX.Element;
};

// fetch all invites a user has received
export default function FriendRequest({ inviterDisplayName, profilePic, inviterUserName }: FriendRequestProps) {
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
        <View className="flex flex-row grow-0 items-center rounded-3xl px-0 py-2"
        >
            <View className="flex flex-row">
                {profilePic}
                <View className="ml-2 flex flex-col">
                    <Text className="text-lg font-semibold">{inviterDisplayName}</Text>
                    <Text className="font-semibold"
                        style={{
                            color: colorScheme === "dark"
                                ? colors.stone[500]
                                : colors.stone[300],
                        }}
                    >{inviterUserName}</Text>
                </View>
            </View>
            <View className="ml-auto flex flex-row">
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
