/* eslint-disable max-lines-per-function */
import { PenIcon } from 'lucide-react-native';
import React, { useState } from 'react';

import { type HabitCompletionWithDateInfoT, type HabitT } from '@/api';
import { Pressable, Text, useModal, View } from '@/ui';

import { ModifyEntryModal } from './modify-entry-modal';

export interface ModifyEntryProps {
  habit: HabitT;
  completions: HabitCompletionWithDateInfoT[];
}
export default function ModifyHabitEntry({
  habit,
  completions,
}: ModifyEntryProps) {
  const modal = useModal();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(
    completions.length - 1,
  );

  return (
    <>
      <View className="flex flex-row justify-end">
        <Pressable
          className="flex flex-row items-center gap-2 rounded-full border px-4 py-1"
          style={{ borderColor: habit.color.text }}
          onPress={modal.present}
        >
          <PenIcon size={16} color={habit.color.text} />
          <Text className="" style={{ color: habit.color.text }}>
            Modify entry or add note/image
          </Text>
        </Pressable>
      </View>

      <ModifyEntryModal
        modal={modal}
        habit={habit}
        completions={completions}
        selectedDayIndex={selectedDayIndex}
        setSelectedDayIndex={setSelectedDayIndex}
      />
    </>
  );
}