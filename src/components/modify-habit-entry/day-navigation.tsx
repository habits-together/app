import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import { Pressable, Text, View } from '@/ui';

interface DayNavigationProps {
  selectedDayIndex: number;
  datesList: Date[];
  hasUnsavedChanges: boolean;
  onDayChange: (index: number) => void;
  resetStates: () => void;
}
export function DayNavigation({
  selectedDayIndex,
  datesList,
  hasUnsavedChanges,
  onDayChange,
  resetStates,
}: DayNavigationProps) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-col gap-2">
      <View className="flex-row items-center justify-center">
        {datesList.length > 1 && (
          <Pressable
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 dark:border-stone-700 dark:bg-transparent"
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
        )}
        <Text className="w-32 text-center font-bold">
          {new Date(
            Date.UTC(
              datesList[selectedDayIndex].getUTCFullYear(),
              datesList[selectedDayIndex].getUTCMonth(),
              datesList[selectedDayIndex].getUTCDate(),
            ),
          ).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
          })}
        </Text>
        {datesList.length > 1 && (
          <Pressable
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 dark:border-stone-700 dark:bg-transparent"
            onPress={() => onDayChange(selectedDayIndex + 1)}
            disabled={
              selectedDayIndex === datesList.length - 1 || hasUnsavedChanges
            }
            style={{
              opacity:
                selectedDayIndex === datesList.length - 1 || hasUnsavedChanges
                  ? 0.3
                  : 1,
            }}
          >
            <ArrowRightIcon
              size={16}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
