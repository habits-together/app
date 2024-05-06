import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import {
  IconArrowForwardUp,
  IconCheck,
  IconSelector,
  IconTag,
  IconX,
} from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { TextInput, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import colors from "@/src/constants/colors";
import Divider from "@/src/components/Divider";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { IconContext } from "./_layout";

export default function Createhabit({ habitid }: { habitid: String }) {
  const { colorScheme } = useColorScheme();
  const borderColor = DefaultColors[colorScheme].tint;
  const { icon, setIcon } = useContext(IconContext);
  const [habitName, setHabitName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("red");
  const [goalType, setGoalType] = useState("Daily");
  const [completion, setCompletion] = useState(1);

  useEffect(() => {
    if (habitid) {
      // Update icon, habitName, description, color, goalType, and completion
      // after querying for habit using habitid
    }
  }, []);

  return (
    <View className="flex flex-1 flex-col gap-y-5 px-5 pt-11">
      {/* Header */}
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          className="flex w-28 flex-row items-center justify-center rounded-2xl border px-2 py-1"
          style={{ borderColor }}
          onPress={() => {
            router.back();
          }}
        >
          <Icon icon={IconX} size={20} />
          <Text className="ml-1 text-base font-semibold">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold">
          {habitid ? "Edit" : "New"} habit
        </Text>
        <TouchableOpacity
          className="flex w-28 flex-row items-center justify-center rounded-2xl border px-2 py-1"
          style={{ borderColor }}
          onPress={() => {
            alert("create/edit habit");
          }}
        >
          <Icon icon={habitid ? IconCheck : IconArrowForwardUp} size={20} />
          <Text className="ml-1 text-base font-semibold">
            {habitid ? "Done" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Icon & Name */}
      <View className="flex flex-col gap-y-2">
        <Text className="text-base font-semibold">Icon & Name</Text>
        <View className="flex flex-row gap-x-2">
          <TouchableOpacity
            className="flex h-10 w-10 items-center justify-center rounded-lg border p-2"
            style={{ borderColor }}
            onPress={() => {
              router.push("/habits/habiticons");
            }}
          >
            <Icon icon={IconTag} size={20} />
          </TouchableOpacity>
          <TextInput
            className="h-10 flex-1 rounded-lg border px-3"
            numberOfLines={1}
            style={{
              borderColor,
              color: DefaultColors[colorScheme].text,
            }}
            placeholder="Ex. Workout"
            placeholderTextColor={DefaultColors[colorScheme].placeholder}
            value={habitName}
            onChangeText={(text) => setHabitName(text)}
          ></TextInput>
        </View>
      </View>

      {/* Description */}
      <View className="flex flex-col gap-y-2">
        <Text className="text-base font-semibold">Description (optional)</Text>
        <TextInput
          className="h-10 rounded-lg border px-3"
          style={{
            borderColor,
            color: DefaultColors[colorScheme].text,
          }}
          maxLength={50}
          value={description}
          onChangeText={(text) => setDescription(text)}
        ></TextInput>
      </View>

      {/* Colour */}
      <View className="flex flex-col gap-y-1">
        <Text className="text-base font-semibold">Color</Text>
        <View className="flex flex-row flex-wrap justify-between gap-x-1 gap-y-1">
          {colorNames.map((col, idx) => (
            <TouchableOpacity
              className="flex h-9 w-9 items-center justify-center rounded-full"
              key={idx}
              style={{
                backgroundColor:
                  col === "stone"
                    ? colors.stone[400]
                    : colors.habitColors[col]?.base,
              }}
              onPress={() => {
                setColor(col);
              }}
            >
              {col === color ? <Icon icon={IconCheck} /> : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Goal */}
      <View className="flex flex-col gap-y-2">
        <Text className="text-base font-semibold">Goal</Text>
        <View className="rounded-lg border" style={{ borderColor }}>
          <View
            className="flex flex-row justify-between p-2"
            style={{ backgroundColor: colors.transparent }}
          >
            <Text className="text-base font-semibold">Goal type</Text>
            <Menu onSelect={(val) => setGoalType(val)}>
              <MenuTrigger>
                <View className="flex flex-row">
                  <Text className="text-base text-stone-400">
                    {goalType} goal
                  </Text>
                  <Icon
                    icon={IconSelector}
                    darkColor={colors.stone[400]}
                    lightColor={colors.stone[400]}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value="Daily" text="Daily goal" />
                <MenuOption value="Weekly" text="Weekly goal" />
              </MenuOptions>
            </Menu>
          </View>
          <Divider />
          <View
            className="flex flex-row justify-between p-2"
            style={{ backgroundColor: colors.transparent }}
          >
            <Text className="text-base font-semibold">{goalType} goal</Text>
            <Menu onSelect={(val) => setCompletion(val)}>
              <MenuTrigger>
                <View className="flex flex-row">
                  <Text className="text-base text-stone-400">
                    {completion} completion
                  </Text>
                  <Icon
                    icon={IconSelector}
                    darkColor={colors.stone[400]}
                    lightColor={colors.stone[400]}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions>
                {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20,
                ].map((num) => (
                  <MenuOption key={num} value={num} text={`${num}`} />
                ))}
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>
    </View>
  );
}

const colorNames = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "stone",
];
