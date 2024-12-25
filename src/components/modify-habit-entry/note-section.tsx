import { type Control } from 'react-hook-form';
import { z } from 'zod';

import { ControlledInput, Text, View } from '@/ui';

export const noteSchema = z.object({
  note: z.string(),
});
export type NoteFormType = z.infer<typeof noteSchema>;

interface NoteSectionProps {
  control: Control<NoteFormType>;
}
export function NoteSection({ control }: NoteSectionProps) {
  return (
    <View className="flex flex-col gap-2">
      <View>
        <Text className="">Add a Note</Text>
      </View>
      <ControlledInput
        control={control}
        name="note"
        multiline
        className="h-20 rounded-lg border border-slate-200 p-2 dark:border-stone-700 dark:text-white"
        placeholder="Write your note here..."
      />
    </View>
  );
}
