import { allHabitsT, HabitIdT, habitT } from "@/src/lib/db_types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useMyHabitsQuery from "./useMyHabitsQuery";

/**
 * fetch a single habit by id.
 * please note that the logged in user must be a participant in the habit
 */
export default function useMyHabitQuery({
  habitId,
}: {
  habitId: HabitIdT;
}): UseQueryResult<habitT, Error> {
  // get all habits instead of fetching just the one we need
  // this allows us to use the react query cache instead of making another request
  const allHabitsQuery: UseQueryResult<allHabitsT, Error> = useMyHabitsQuery();

  const habitQuery = useQuery<habitT, Error>({
    queryKey: ["habit", habitId],
    queryFn: () => {
      if (allHabitsQuery.data && allHabitsQuery.data[habitId]) {
        return allHabitsQuery.data[habitId];
      } else {
        throw new Error("Habit not found");
      }
    },
    enabled: !!allHabitsQuery.data,
  });

  return habitQuery;
}
