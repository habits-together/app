// import { currentUserIdAtom } from "@/src/atoms/currentUserAtom";
// import { atomStore } from "@/src/atoms/store";
// import { firestore } from "@/src/firebase/config";
// import { allHabitsT, HabitIdT, habitT } from "@/src/lib/db_types";
// import { useQuery, UseQueryResult } from "@tanstack/react-query";
// import { collection, query, where } from "firebase/firestore";

// export default function useMyHabitsQuery(): UseQueryResult<allHabitsT, Error> {
//   const myUserId = atomStore.get(currentUserIdAtom);

//   const ref = query(
//     collection(firestore, "habits"),
//     where(`participants.${myUserId}`, "!=", null),
//   );

//   const result = useFirestoreQuery(["habits", myUserId], ref);

//   if (result.isPending || result.isError) {
//     const newData = { ...result, data: {} as allHabitsT };
//     return useQuery<allHabitsT, Error>({
//       queryKey: ["habits", myUserId],
//       queryFn: async () => newData,
//     });
//   }

//   const snapshot = result.data;

//   const habits: allHabitsT = {};
//   snapshot.forEach((doc) => {
//     const data = doc.data();
//     habits[doc.id as HabitIdT] = {
//       ...data,
//       createdAt: new Date(data.createdAt),
//     } as habitT;
//   });

//   const newData = { ...result, data: habits };
//   return useQuery<allHabitsT, Error>({
//     queryKey: ["habits", myUserId],
//     queryFn: async () => newData,
//   });

//   // return useSubscribeToHabits({ userId: myUserId });
//   // return useHabitsQuery({ userId: myUserId });
// }
