import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import { type HabitCompletionWithDateInfoT } from '@/api';
import { Pressable, Text, View } from '@/ui';

interface DayNavigationProps {
  selectedDayIndex: number;
  completions: HabitCompletionWithDateInfoT[];
  hasUnsavedChanges: boolean;
  onDayChange: (index: number) => void;
  resetStates: () => void;
}
export function DayNavigation({
  selectedDayIndex,
  completions,
  hasUnsavedChanges,
  onDayChange,
  resetStates,
}: DayNavigationProps) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-col gap-2">
      <View className="flex-row items-center justify-center">
        <Pressable
          className="rounded-lg border border-slate-200 px-4 py-2 dark:border-stone-700 dark:bg-transparent"
          onPress={() => {
            onDayChange(selectedDayIndex - 1);
            resetStates();
          }}
          disabled={selectedDayIndex === 0 || hasUnsavedChanges}
          style={{
            opacity: selectedDayIndex === 0 || hasUnsavedChanges ? 0.3 : 1,
          }}
        >
          <ArrowLeftIcon
            size={16}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </Pressable>
        <Text className="w-32 text-center font-bold">
          {new Date(
            new Date(completions[selectedDayIndex].date).setDate(
              new Date(completions[selectedDayIndex].date).getDate() + 1,
            ),
          ).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
        <Pressable
          className="rounded-lg border border-slate-200 px-4 py-2 dark:border-stone-700 dark:bg-transparent"
          onPress={() => onDayChange(selectedDayIndex + 1)}
          disabled={
            selectedDayIndex === completions.length - 1 || hasUnsavedChanges
          }
          style={{
            opacity:
              selectedDayIndex === completions.length - 1 || hasUnsavedChanges
                ? 0.3
                : 1,
          }}
        >
          <ArrowRightIcon
            size={16}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </Pressable>
      </View>
      <Text className="text-center text-sm text-orange-500 dark:text-orange-500">
        {hasUnsavedChanges ? 'You have unsaved changes' : ' '}
      </Text>
    </View>
  );
}
