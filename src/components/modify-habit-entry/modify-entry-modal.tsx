/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { SaveIcon, XIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  type HabitCompletionWithDateInfoT,
  type HabitEntryT,
  type HabitT,
  type UserIdT,
} from '@/api';
import { useModifyHabitEntry } from '@/api/habits/use-modify-entry';
import { colors, Header, Modal, type ModalMethods, Text, View } from '@/ui';

import { CompletionsSection } from './completions-section';
import { DayNavigation } from './day-navigation';
import { ImageSection } from './image-section';
import { type NoteFormType, noteSchema, NoteSection } from './note-section';

interface ModifyEntryModalProps {
  modal: ModalMethods;
  habit: HabitT;
  completions: HabitCompletionWithDateInfoT[];
  selectedDayIndex: number;
  setSelectedDayIndex: (index: number) => void;
}
export function ModifyEntryModal({
  modal,
  habit,
  completions,
  selectedDayIndex,
  setSelectedDayIndex,
}: ModifyEntryModalProps) {
  const { colorScheme } = useColorScheme();
  const modifyEntry = useModifyHabitEntry();
  const selectedCompletion = completions[selectedDayIndex];

  const [numberOfCompletions, setNumberOfCompletions] = useState<number>(
    selectedCompletion.numberOfCompletions,
  );
  const [image, setImage] = useState<string | undefined>(
    selectedCompletion.image ?? undefined,
  );
  const {
    control: noteControl,
    handleSubmit: handleNoteSubmit,
    watch,
    reset: resetForm,
  } = useForm<NoteFormType>({
    resolver: zodResolver(noteSchema),
    defaultValues: { note: selectedCompletion.note },
  });

  // Update form when selected day changes
  useEffect(() => {
    setNumberOfCompletions(selectedCompletion.numberOfCompletions);
    setImage(selectedCompletion.image ?? undefined);
    resetForm({ note: selectedCompletion.note ?? '' });
  }, [
    selectedCompletion.numberOfCompletions,
    selectedCompletion.image,
    selectedCompletion.note,
    resetForm,
  ]);

  const resetStates = () => {
    setNumberOfCompletions(selectedCompletion.numberOfCompletions);
    resetForm({ note: selectedCompletion.note ?? '' });
    setImage(selectedCompletion.image ?? undefined);
  };

  const hasUnsavedChanges = useCallback(() => {
    const currentNote = watch('note');
    return (
      numberOfCompletions !== selectedCompletion.numberOfCompletions ||
      currentNote !== (selectedCompletion.note ?? '') ||
      image !== (selectedCompletion.image ?? undefined)
    );
  }, [watch, selectedCompletion, numberOfCompletions, image]);

  const handleCancel = () => {
    resetStates();
    setSelectedDayIndex(completions.length - 1);
    modal.dismiss();
  };

  const handleSave = handleNoteSubmit(async (data) => {
    const modifiedEntry: HabitEntryT = {
      numberOfCompletions: numberOfCompletions,
      note: data.note !== '' ? data.note : undefined,
      image: image !== '' ? image : undefined,
    };

    await modifyEntry.mutateAsync({
      habitId: habit.id,
      userId: '1' as UserIdT,
      date: selectedCompletion.date,
      modifiedEntry: modifiedEntry,
    });

    resetStates();
    setSelectedDayIndex(completions.length - 1);
    modal.dismiss();
  });

  return (
    <Modal
      ref={modal.ref}
      enableDynamicSizing={false}
      snapPoints={['90%']}
      enablePanDownToClose={false}
      disableBackdropPress={true}
      hideCloseButton={true}
      backgroundStyle={{
        backgroundColor:
          colorScheme === 'dark' ? colors.neutral[800] : colors.white,
      }}
    >
      <View className="flex-1 px-4">
        <Header
          leftButton={{
            icon: XIcon,
            text: 'Cancel',
            onPress: handleCancel,
          }}
          title="Modify Habit Entry"
          rightButton={{ icon: SaveIcon, text: 'Save', onPress: handleSave }}
        />
        <View className="flex flex-col gap-4">
          <View className="-mb-2 flex flex-col">
            <DayNavigation
              selectedDayIndex={selectedDayIndex}
              datesList={completions.map(
                (completion) => new Date(completion.date),
              )}
              hasUnsavedChanges={hasUnsavedChanges()}
              onDayChange={setSelectedDayIndex}
              resetStates={resetStates}
            />
            <Text className="text-center text-sm text-orange-500 dark:text-orange-500">
              {hasUnsavedChanges() ? 'You have unsaved changes' : ' '}
            </Text>
          </View>
          <CompletionsSection
            numberOfCompletions={numberOfCompletions}
            setNumberOfCompletions={setNumberOfCompletions}
            allowMultipleCompletions={habit.settings.allowMultipleCompletions}
          />
          <NoteSection control={noteControl} />
          <ImageSection image={image} setImage={setImage} />
        </View>
      </View>
    </Modal>
  );
}
