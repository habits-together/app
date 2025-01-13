import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';

import { type HabitT } from '@/api';
import { getTranslucentColor } from '@/core/get-translucent-color';
import { Text, View } from '@/ui';

import { HabitIcon } from './habit-icon';

export default function HabitInfoCard({ habit }: { habit: HabitT }) {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className="flex flex-col gap-2 rounded-xl p-4"
      style={{
        backgroundColor:
          colorScheme === 'dark'
            ? getTranslucentColor(habit.color.base, 0.05)
            : habit.color.light,
        borderColor: colorScheme === 'dark' ? habit.color.base : 'transparent',
        borderWidth: colorScheme === 'dark' ? 1 : 0,
      }}
    >
      <View className="flex flex-row items-center gap-2">
        <HabitIcon
          icon={habit.icon}
          size={24}
          color={colorScheme === 'dark' ? colors.white : colors.black}
          strokeWidth={2}
        />
        <Text className="text-xl font-semibold">{habit.title}</Text>
      </View>
      {habit.description && (
        <Text className="text-base">{habit.description}</Text>
      )}
      <Text
        className="text-sm"
        style={{
          color: colorScheme === 'dark' ? colors.stone[400] : habit.color.text,
        }}
      >
        {habit.settings.allowMultipleCompletions
          ? 'Multiple completions allowed per day'
          : 'One completion per day limit'}
      </Text>
      <Text
        className="text-sm"
        style={{
          color: colorScheme === 'dark' ? colors.stone[400] : habit.color.text,
        }}
      >
        Created{' '}
        {new Date(habit.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
    </View>
  );
}
