import { UserIdT } from "@/src/lib/db_types";
import { useQuery } from "@tanstack/react-query";
import { fetchHabitsForUser } from "../api/fetchHabitsForUser";

export default function useHabitsQuery({ userId }: { userId: UserIdT }) {
  const query = useQuery({
    queryKey: ["habits", userId],
    queryFn: () => fetchHabitsForUser({ userId }),
  });
  return query;
}
