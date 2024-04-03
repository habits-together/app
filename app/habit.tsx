import { Text, View } from '@/components/Themed';
import { HabitCard } from '@/components/HabitCard';
import { IconBook, IconCalendarMonth, IconChevronLeft, IconEdit, IconHistory, IconShare2, IconTrash, IconUserPlus } from '@tabler/icons-react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import Icon from '@/components/Icon';
import { Pressable } from 'react-native';
import IconButton from '@/components/IconButton';

const habits = [
  {
    title: 'Read for 15 minutes',
    description: 'Read for at least 15 minutes every day',
    icon: IconBook,
    color: "fuchsia",
    participants: [1, 2], // should be user objects
    id: 1,
  }
];

export default function Habit() {
  const params = useLocalSearchParams();
  const { id } = params;
  // in the future, get habit based off id
  const habit = habits[0];

  return (
    <View className='flex-1 p-4 pt-12'
      style={{ gap: 40 }}>
      <View className="flex flex-column"
        style={{ gap: 20 }}>
        {/* Back Button */}
        <Link href="/" asChild>
          <Pressable>
            <View className='flex flex-row content-center'>
              <Icon icon={IconChevronLeft} />
              <Text className='text-base'>Back</Text>
            </View>
          </Pressable>
        </Link>

        {/* Title */}
        <View>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center flex-1"
              style={{ gap: 10 }}>
              <Icon size={32} icon={habit.icon} />
              <Text
                numberOfLines={1}
                className="text-black dark:text-white font-bold text-xl mb-1 flex-1"
              >
                {habit.title}
              </Text>
            </View>
          </View>
          <Text>{habit.description}</Text>
        </View>

        {/* Edit/Delete Buttons */}
        <View className="flex flex-row"
          style={{ gap: 10 }}>
          <IconButton icon={IconEdit} text="Edit habit" />
          <IconButton icon={IconTrash} text="Delete habit" />
        </View>

        {/* Heatmap */}
        <View>
          <HabitCard title={habit.title} color={"fuchsia"} icon={habit.icon} displayType='view-habit-page' />
        </View>

        {/* Full/Edit Heatmap Buttons */}
        <View className="flex flex-row"
          style={{ gap: 10 }}>
          <IconButton icon={IconHistory} text="Full history" />
          <IconButton icon={IconCalendarMonth} text="Edit dates" />
        </View>
      </View>

      {/* Participants */}
      <View className="flex flex-column"
        style={{ gap: 20 }}>
        <Text
          className="text-black dark:text-white font-bold text-xl mb-1"
        >
        Participants ({habit.participants.length})
        </Text>
        {/* add participant cards */}
      </View>

      {/* Invite/Share Buttons*/}
      <View className="flex flex-row"
        style={{ gap: 10 }}>
        <IconButton icon={IconUserPlus} text="Invite friends" />
        <IconButton icon={IconShare2} text="Share link" />
      </View>
    </View>
  )
}
