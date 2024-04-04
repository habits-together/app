import { View } from '@/components/Themed';
import { HabitCard } from '@/components/HabitCard';
import { IconBook } from '@tabler/icons-react-native';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

const habits = [
  {
    title: 'Read for 15 minutes',
    icon: IconBook,
    color: "fuchsia",
    id: 1,
  }
];

export default function HabitsTab() {
  return (
    <View className='flex-1 p-4'>
      {habits.map(habit => {
        return (
          <Link
            push
            href={{
              pathname: "/viewhabit",
              params: { id: habit.id }
            }}
            asChild
            key={habit.id}>
            <Pressable>
              <HabitCard
                title={habit.title}
                color="fuchsia"
                icon={habit.icon}
                displayType="habit-tab"
              />
            </Pressable>
          </Link>
        )
      })}
    </View >
  );
}
