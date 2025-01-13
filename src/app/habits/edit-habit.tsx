/* eslint-disable max-lines-per-function */
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { CheckIcon, Trash2Icon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import {
  habitColorNames,
  habitCreationSchema,
  type HabitCreationT,
  type HabitT,
  useCreateHabit,
  useEditHabit,
} from '@/api';
import { useDeleteHabit } from '@/api/habits/use-delete-habit';
import { HabitIcon, habitIcons } from '@/components/habit-icon';
import {
  Button,
  colors,
  ControlledInput,
  Modal,
  Pressable,
  ScreenContainer,
  ScrollView,
  Switch,
  Text,
  useModal,
  View,
} from '@/ui';
import { Header } from '@/ui/header';

/**
 * This is for editing or creating a habit. Pass in query params:
 *
 * mode: 'edit' | 'create'
 *
 * habitJson: JSON.stringify(HabitT)
 */
export default function EditHabit() {
  const { colorScheme } = useColorScheme();
  const iconModal = useModal();

  const { mode, habitJson } = useLocalSearchParams<{
    mode: 'edit' | 'create';
    habitJson: string;
  }>();
  const parsedHabit: HabitT = mode === 'edit' ? JSON.parse(habitJson) : null;

  const createHabit = useCreateHabit();
  const updateHabit = useEditHabit();
  const deleteHabit = useDeleteHabit();

  const { control, handleSubmit, setValue, watch } = useForm<HabitCreationT>({
    resolver: zodResolver(habitCreationSchema),
    defaultValues: {
      icon: (mode === 'edit'
        ? parsedHabit.icon
        : 'diamond') as keyof typeof habitIcons,
      title: mode === 'edit' ? parsedHabit.title : '',
      description: mode === 'edit' ? parsedHabit.description : '',
      colorName: mode === 'edit' ? parsedHabit.colorName : 'red',
      allowMultipleCompletions:
        mode === 'edit' ? parsedHabit.settings.allowMultipleCompletions : false,
    },
  });

  const selectedColor = watch('colorName');
  const selectedIcon = watch('icon');
  const allowMultipleCompletions = watch('allowMultipleCompletions');

  const onSubmit = (data: HabitCreationT) => {
    if (mode === 'edit') {
      updateHabit.mutate({
        habitId: parsedHabit.id,
        newHabitInfo: data,
      });
    } else {
      createHabit.mutate({
        habitCreationInfo: data,
      });
    }
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to delete this habit? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteHabit.mutate({ habitId: parsedHabit.id });
            router.back();
          },
        },
      ],
    );
  };

  return (
    <ScreenContainer>
      <Header
        leftButton={'cancel'}
        title={mode === 'create' ? 'New Habit' : 'Edit Habit'}
      />
      <ScrollView>
        <View className="flex flex-col gap-4">
          <View className="flex flex-col gap-2">
            <Text className="">Icon</Text>
            <View className="flex-row items-center justify-center gap-2">
              <Pressable
                className="h-12 w-12 rounded-lg border border-slate-200 bg-white p-2 dark:border-stone-700 dark:bg-transparent dark:text-white"
                onPress={iconModal.present}
              >
                <HabitIcon
                  icon={selectedIcon}
                  size={24}
                  color={colorScheme === 'dark' ? colors.white : colors.black}
                />
              </Pressable>
              <Button
                variant="outline"
                className="flex-1"
                label="Select Icon"
                onPress={iconModal.present}
              />
            </View>
          </View>
          <View className="flex flex-col gap-2">
            <Text className="">Title</Text>
            <ControlledInput
              control={control}
              name="title"
              placeholder="Enter title"
            />
          </View>
          <View className="flex flex-col gap-2">
            <Text className="">Description</Text>
            <ControlledInput
              control={control}
              name="description"
              placeholder="Enter description"
              multiline
              style={{ height: 80 }}
            />
          </View>
          <View className="flex h-40 flex-col gap-2">
            <Text className="">Color</Text>
            <View className="flex max-w-full flex-1 flex-wrap">
              {habitColorNames.map((col) => (
                <Pressable
                  className="aspect-square p-1"
                  key={col}
                  style={{
                    width: '11.1%',
                  }}
                  onPress={() => setValue('colorName', col)}
                >
                  <View
                    className="flex h-full w-full items-center justify-center rounded-full"
                    style={{
                      backgroundColor:
                        col === 'stone'
                          ? colors.stone[400]
                          : colors.habitColors[col]?.base,
                    }}
                  >
                    {col === selectedColor ? (
                      <CheckIcon size={24} color="white" />
                    ) : null}
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
          <View className="flex flex-col gap-2">
            <Text className="">More Settings</Text>
            <View className="flex-row items-center justify-center">
              <Switch.Root
                checked={allowMultipleCompletions}
                onChange={(value) =>
                  setValue('allowMultipleCompletions', value)
                }
                accessibilityLabel="Allow multiple completions per day"
                className="flex w-full flex-row justify-between"
              >
                <Switch.Label text="Allow multiple completions per day" />
                <Switch.Icon checked={allowMultipleCompletions} />
              </Switch.Root>
            </View>
          </View>
          {mode === 'edit' && (
            <Button
              icon={Trash2Icon}
              label="Delete Habit"
              onPress={handleDelete}
              variant="destructive"
            />
          )}
          <Button
            label={mode === 'edit' ? 'Save Changes' : 'Create Habit'}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>

      <Modal
        ref={iconModal.ref}
        snapPoints={['80%']}
        enableDynamicSizing={false}
        backgroundStyle={{
          backgroundColor:
            colorScheme === 'dark' ? colors.neutral[800] : colors.white,
        }}
      >
        <BottomSheetScrollView className="flex flex-1 px-4">
          <View className="flex-row flex-wrap justify-center gap-4 pb-10">
            {Object.keys(habitIcons).map((icon) => (
              <Pressable
                key={icon}
                className="h-16 w-16 items-center justify-center rounded-lg border border-slate-200 dark:border-stone-700"
                onPress={() => {
                  setValue('icon', icon as keyof typeof habitIcons);
                  iconModal.dismiss();
                }}
              >
                <HabitIcon
                  icon={icon as keyof typeof habitIcons}
                  size={24}
                  color={colorScheme === 'dark' ? colors.white : colors.black}
                />
              </Pressable>
            ))}
          </View>
        </BottomSheetScrollView>
      </Modal>
    </ScreenContainer>
  );
}
