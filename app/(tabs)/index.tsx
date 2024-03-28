
import { Text, View } from '@/components/Themed';
import { HabitCalender } from '@/components/HabitCalender';

export default function HabitsTab() {
  return (
    <View className='flex-1 bg-grey-50 p-4'>
      <HabitCalender/>
    </View>
  );
}
