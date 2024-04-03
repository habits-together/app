
import { Text, View } from '@/components/Themed';
import { HabitCard } from '@/components/HabitCard';
import { IconBook } from '@tabler/icons-react-native';

export default function HabitsTab() {
  return (
    <View className='flex-1 p-4'>
      <HabitCard title='Read for 15 minutes' color="fuchsia" icon={IconBook} displayType="habit-tab" />
    </View>
  );
}
