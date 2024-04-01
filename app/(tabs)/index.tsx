
import { Text, View } from '@/components/Themed';
import { HabitActivity } from '@/components/HabitActivity';

export default function HabitsTab() {
  return (
    <View className='flex-1 p-4'>
      <HabitActivity title='Read for 15 minutes'/>
    </View>
  );
}
