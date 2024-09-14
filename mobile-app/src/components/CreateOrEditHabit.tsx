import {
  createNewHabitAtom,
  createOrEditHabitFormAtom,
  editHabitInfoAtom,
} from "@/src/atoms/atoms";
import Divider from "@/src/components/Divider";
import RoundedButton from "@/src/components/RoundedButton";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import colors from "@/src/constants/colors";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import {
  IconArrowForwardUp,
  IconCheck,
  IconSelector,
  IconX,
} from "@tabler/icons-react-native";
import { router } from "expo-router";
import { atom, useAtom, useSetAtom } from "jotai";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { IconButton } from "../app/(app)/habits/icon-button";
import { iconStrNameToTablerIcon } from "../app/(app)/habits/icons";
import { HabitIdT } from "../lib/db_types";
import Icon from "./Icon";

export const tempIconAtom = atom<string>("default");

export default function CreateOrEditHabit({
  habitId = null,
}: {
  habitId?: HabitIdT | null;
}) {
  const { colorScheme } = useColorScheme();
  const [habitInfoForm, setHabitInfoForm] = useAtom(createOrEditHabitFormAtom);
  const setTempIcon = useSetAtom(tempIconAtom);
  useEffect(() => {
    setTempIcon(habitInfoForm.icon);
  }, [habitInfoForm.icon]);

  const borderColor = DefaultColors[colorScheme].tint;
  const needsTag = habitInfoForm.icon === "default";
  const needsName = habitInfoForm.title === "";
  const canCreateHabit = !needsTag && !needsName;

  const editHabit = habitId ? useSetAtom(editHabitInfoAtom(habitId)) : () => {};
  const createNewHabit = useSetAtom(createNewHabitAtom);

  function handleCreateOrEditHabit() {
    habitId ? editHabit(habitInfoForm) : createNewHabit(habitInfoForm);
    resetNavigationStack("/habits");
  }

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
          {habitId ? "Edit" : "New"} habit
        </Text>
        {
          <RoundedButton
            text={habitId ? "Done" : "Next"}
            icon={habitId ? IconCheck : IconArrowForwardUp}
            isDisabled={!canCreateHabit}
            onPress={handleCreateOrEditHabit}
          />
        }
      </View>

      {/* Icon & Name */}
      <View className="flex flex-col">
        <Text className="mb-1 text-base font-semibold">Icon & Name</Text>
        <View className="flex flex-row">
          <IconButton
            icon={iconStrNameToTablerIcon(habitInfoForm.icon)}
            onPress={() => {
              router.push("/habits/habiticons");
            }}
          />
          <TextInput
            className="ml-2 h-10 flex-1 rounded-lg border px-3"
            numberOfLines={1}
            style={{
              borderColor,
              color: DefaultColors[colorScheme].text,
              backgroundColor: colors.transparent,
            }}
            placeholder="Ex. Workout"
            placeholderTextColor={DefaultColors[colorScheme].placeholder}
            value={habitInfoForm.title}
            onChangeText={(text) =>
              setHabitInfoForm((prev) => ({
                ...prev,
                title: text,
              }))
            }
          ></TextInput>
        </View>
      </View>

      {/* Description */}
      <View className="flex flex-col">
        <Text className="mb-1 text-base font-semibold">
          Description (optional)
        </Text>
        <TextInput
          className="h-10 rounded-lg border px-3"
          style={{
            borderColor,
            color: DefaultColors[colorScheme].text,
          }}
          maxLength={50}
          value={habitInfoForm.description}
          onChangeText={(text) =>
            setHabitInfoForm((prev) => ({
              ...prev,
              description: text,
            }))
          }
        ></TextInput>
      </View>

      {/* Colour */}
      <View className="flex flex-col">
        <Text className="mb-1 text-base font-semibold">Color</Text>
        <View className="flex flex-col">
          {[0, 1].map((i) => (
            <View key={i} className="flex max-w-full flex-row gap-x-2">
              {colorNames.slice(i * 9, 9 + i * 9).map((col, idx) => (
                <TouchableOpacity
                  className="flex aspect-square flex-1 items-center justify-center rounded-full"
                  key={idx}
                  style={{
                    backgroundColor:
                      col === "stone"
                        ? colors.stone[400]
                        : colors.habitColors[col]?.base,
                    marginBottom: i === 0 ? 8 : 0,
                  }}
                  onPress={() => {
                    setHabitInfoForm((prev) => ({
                      ...prev,
                      color: col,
                    }));
                  }}
                >
                  {col === habitInfoForm.color ? (
                    <Icon icon={IconCheck} />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Goal */}
      <View className="flex flex-col">
        <Text className="mb-1 text-base font-semibold">Goal</Text>
        <View className="rounded-lg border" style={{ borderColor }}>
          <View
            className="flex flex-row justify-between p-2"
            style={{ backgroundColor: colors.transparent }}
          >
            <Text className="text-base font-semibold">Goal type</Text>
            <Menu
              onSelect={(val) =>
                setHabitInfoForm((prev) => ({
                  ...prev,
                  goal: {
                    period: val,
                    completionsPerPeriod: prev.goal.completionsPerPeriod,
                  },
                }))
              }
            >
              <MenuTrigger>
                <View className="flex flex-row">
                  <Text className="text-base text-stone-400">
                    {habitInfoForm.goal.period} goal
                  </Text>
                  <Icon
                    icon={IconSelector}
                    darkColor={colors.stone[400]}
                    lightColor={colors.stone[400]}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    backgroundColor:
                      colorScheme === "dark" ? colors.stone[800] : colors.white,
                    borderRadius: 8,
                  },
                }}
              >
                <MenuOption value="daily">
                  <Text
                    style={{
                      color:
                        colorScheme === "dark" ? colors.white : colors.black,
                    }}
                  >
                    Daily goal
                  </Text>
                </MenuOption>
                <MenuOption value="weekly">
                  <Text
                    style={{
                      color:
                        colorScheme === "dark" ? colors.white : colors.black,
                    }}
                  >
                    Weekly goal
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <Divider />
          <View
            className="flex flex-row justify-between p-2"
            style={{ backgroundColor: colors.transparent }}
          >
            <Text className="text-base font-semibold">
              {" "}
              Completions per{" "}
              {habitInfoForm.goal.period === "daily" ? "day" : "week"}
            </Text>
            <Menu
              onSelect={(val) =>
                setHabitInfoForm((prev) => ({
                  ...prev,
                  goal: {
                    period: prev.goal.period,
                    completionsPerPeriod: val,
                  },
                }))
              }
            >
              <MenuTrigger>
                <View className="flex flex-row">
                  <Text className="text-base text-stone-400">
                    {`${habitInfoForm.goal.completionsPerPeriod} ${
                      habitInfoForm.goal.completionsPerPeriod === 1
                        ? "completion"
                        : "completions"
                    }`}
                  </Text>
                  <Icon
                    icon={IconSelector}
                    darkColor={colors.stone[400]}
                    lightColor={colors.stone[400]}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    backgroundColor:
                      colorScheme === "dark" ? colors.stone[800] : colors.white,
                    borderRadius: 8,
                  },
                }}
              >
                {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20,
                ].map((num) => (
                  <MenuOption key={num} value={num}>
                    <Text
                      style={{
                        color:
                          colorScheme === "dark" ? colors.white : colors.black,
                      }}
                    >
                      {num}
                    </Text>
                  </MenuOption>
                ))}
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>
    </View>
  );
}
const colorNames = Object.keys(
  colors.habitColors,
) as (keyof typeof colors.habitColors)[];
