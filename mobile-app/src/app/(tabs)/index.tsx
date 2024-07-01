import { habitIdsAtom } from "@/src/atoms/atoms";
import { HabitCard } from "@/src/components/habit-components/HabitCard";
import { ScrollView, View } from "@/src/components/Themed";
import { useAtomValue } from "jotai";
import { Suspense } from "react";

export default function HabitsTab() {
  const habitIds = useAtomValue(habitIdsAtom);

  return (
    <ScrollView
      className="flex-1 px-4 pt-2"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {habitIds.map((id) => (
        <Suspense key={id} fallback={<></>}>
          <View className="mb-5">
            <HabitCard habitId={id} />
          </View>
        </Suspense>
      ))}
    </ScrollView>
  );
}
