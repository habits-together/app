
import { habitIdsAtom } from "@/src/atoms/atoms";
import { HabitCard } from "@/src/components/HabitCard";
import { ScrollView, View } from "@/src/components/Themed";
import { useAtom, useAtomValue } from "jotai";

export default function HabitsTab() {
  const habitIds = useAtomValue(habitIdsAtom);

  return (
    <ScrollView
      className="flex-1 px-4 pt-2"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {habitIds.map((id) => (
        <View key={id} className="mb-5">
          <HabitCard habitId={id} />
        </View>
      ))}
    </ScrollView>
  );
}
