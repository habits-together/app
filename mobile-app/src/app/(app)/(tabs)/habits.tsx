import { habitIdsAtom } from "@/src/atoms/atoms";
import { ScrollView, Text, View } from "@/src/components/Themed";
import { HabitCard } from "@/src/features/habits/components/HabitCard/HabitCard";
import useMyHabitsQuery from "@/src/features/habits/query-hooks/useMyHabitsQuery";
import { HabitIdT } from "@/src/lib/db_types";
import { useAtomValue } from "jotai";

export default function HabitsTab() {
  const habitIds = useAtomValue(habitIdsAtom);
  const { isPending, error, data, isFetching } = useMyHabitsQuery();

  return (
    <ScrollView
      className="flex-1 px-4 pt-2"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {isPending && <Text>Loading...</Text>}
      {isFetching && <Text>Fetching...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {data &&
        (Object.keys(data) as HabitIdT[]).map((id) => (
          <View className="mb-5" key={id}>
            <HabitCard habit={{ ...data[id], id }} />
          </View>
        ))}
    </ScrollView>
  );
}
