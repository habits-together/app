import { MinusIcon, PlusIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import { Pressable, Text, View } from '@/ui';

interface CompletionsSectionProps {
  numberOfCompletions: number;
  setNumberOfCompletions: (value: number | ((prev: number) => number)) => void;
}
export function CompletionsSection({
  numberOfCompletions,
  setNumberOfCompletions,
}: CompletionsSectionProps) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex flex-col gap-2">
      <Text className="">Number of Completions</Text>
      <View className="flex-row items-center justify-center">
        <Pressable
          className={`h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-stone-700 ${
            numberOfCompletions === 0 ? 'opacity-30' : ''
          }`}
          onPress={() => {
            setNumberOfCompletions((prev) => Math.max(0, prev - 1));
          }}
          disabled={numberOfCompletions === 0}
        >
          <MinusIcon
            size={16}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </Pressable>
        <Text className="w-12 text-center text-2xl">{numberOfCompletions}</Text>
        <Pressable
          className="h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-stone-700"
          onPress={() => {
            setNumberOfCompletions((prev) => prev + 1);
          }}
        >
          <PlusIcon
            size={16}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </Pressable>
      </View>
    </View>
  );
}
