import Divider from "@/src/components/Divider";
import Icon from "@/src/components/Icon";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import colors from "@/src/constants/colors";
import {
  IconArrowForwardUp,
  IconCheck,
  IconSelector,
  IconX,
} from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useContext, useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { IconContext } from "./_layout";
import { IconButton } from "./icon-button";
import { icons } from "./icons";
import RoundedButton from "@/src/components/RoundedButton";

export default function Createhabit({ habitid }: { habitid: String }) {
  const { colorScheme } = useColorScheme();
  const borderColor = DefaultColors[colorScheme].tint;
  const { icon } = useContext(IconContext);
  const [habitName, setHabitName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("red");
  const [goalType, setGoalType] = useState("Daily");
  const [completion, setCompletion] = useState(1);
  const [failedRequirements, setFailedRequirements] = useState(false);

  const needsTag = icon === "default";
  const needsName = habitName === "";
  const canCreateHabit = !needsTag && !needsName;


  // generate plural texts
  const pluralize = (count: number, singularText: string, pluralText: string) => {
    if (count === 1) {
      return `${count} ${singularText}`;
    } else {
      return `${count} ${pluralText}`;
    }
  };

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
        {
          <RoundedButton
            text="Cancel"
            icon={IconX}
            onPress={() => {
              router.back();
            }}
          />
        }
        <Text className="text-base font-semibold">
          {habitid ? "Edit" : "New"} habit
        </Text>
        {
          <RoundedButton
            text={habitid ? "Done" : "Next"}
            icon={habitid ? IconCheck : IconArrowForwardUp}
            onPress={() => {
              if (canCreateHabit) {
                setFailedRequirements(false);
                alert("create/edit habit");
              } else {
                setFailedRequirements(true);
                alert(
                  `can't create habit:\n${
                    needsTag ? " - missing tag\n" : ""
                  }${needsName ? " - missing name" : ""}`,
                );
              }
            }}
          />
        }
      </View>

      {/* Icon & Name */}
      <View className="flex flex-col gap-y-2">
        <Text className="text-base font-semibold">Icon & Name</Text>
        <View className="flex flex-row">
          <IconButton
            icon={icons[icon]}
            onPress={() => {
              router.push("/habits/habiticons");
            }}
            required={needsTag && failedRequirements}
          />
          <TextInput
            className="ml-2 h-10 flex-1 rounded-lg border px-3"
            numberOfLines={1}
            style={{
              borderColor,
              color: DefaultColors[colorScheme].text,
              backgroundColor:
                needsName && failedRequirements
                  ? colors.habitColors.red.base
                  : colors.transparent,
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
                    {pluralize(completion, "completion", "completions")}
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
const colorNames = Object.keys(colors.habitColors) as (keyof typeof colors.habitColors)[];
