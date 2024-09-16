import { firestore } from "@/src/firebase/config";
import { allHabitsT, HabitIdT, habitT, UserIdT } from "@/src/lib/db_types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  onSnapshot,
  Query,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useEffect } from "react";

// export function useSubscribeToHabits({ userId }: { userId: UserIdT }) {
//   const habitsCollection = collection(firestore, "habits");

//   const firebaseQuery = query(
//     habitsCollection,
//     where(`participants.${userId}`, "!=", null),
//   );

//   const queryClient = useQueryClient();

//   const unsubscribe = onSnapshot(firebaseQuery, (firebaseQuerySnapshot) => {
//     const habits: allHabitsT = {};
//     firebaseQuerySnapshot.forEach((doc) => {
//       const data = doc.data();
//       habits[doc.id as HabitIdT] = {
//         ...data,
//         createdAt: new Date(data.createdAt),
//       } as habitT;
//     });
//     queryClient.setQueryData(["habits"], habits);
//   });

//   useEffect(() => {
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return useQuery<allHabitsT, Error, allHabitsT, string[]>({
//     queryKey: ["habits"],
//   });
// }

// export function useFirestoreQuery<T>({
//   queryKey,
//   subscribe,
//   firestoreQuery,
//   processSnapshot,
//   defaultValue,
// }: {
//   queryKey: string[];
//   subscribe: boolean;
//   firestoreQuery: Query<DocumentData, DocumentData>;
//   processSnapshot: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => T;
//   defaultValue: T;
// }) {
//   if (subscribe) {
//     return useFirebaseSubscription<T>({
//       queryKey,
//       firestoreQuery,
//       processSnapshot,
//       defaultValue,
//     });
//   } else {
//     return useQuery<T, Error, T, string[]>({
//       queryKey,
//       queryFn: () => getDocs(firestoreQuery).then(processSnapshot),
//     });
//   }
// }

// export function useFirestoreDoc<T>({
//   queryKey,
//   subscribe,
//   firestoreDoc,
//   processSnapshot,
//   defaultValue,
// }: {
//   queryKey: string[];
//   subscribe: boolean;
//   firestoreDoc: DocumentReference<T>;
//   processSnapshot: (snapshot: DocumentData) => T;
//   defaultValue: T;
// }) {
//   if (subscribe) {
//     return useFirebaseSubscription<T>({
//       queryKey,
//       firestoreQuery: firestoreDoc,
//       processSnapshot,
//       defaultValue,
//     });
//   } else {
//     return useQuery<T, Error, T, string[]>({
//       queryKey,
//       queryFn: () => getDoc(firestoreDoc).then(processSnapshot),
//     });
//   }
// }

export function useHabitsForUser({
  userId,
  subscribe,
}: {
  userId: UserIdT;
  subscribe: boolean;
}) {
  const firebaseQuery = query(
    collection(firestore, "habits"),
    where(`participants.${userId}`, "!=", null),
  );

  const processSnapshot = (
    snapshot: QuerySnapshot<DocumentData, DocumentData>,
  ) => {
    const habits: allHabitsT = {};
    snapshot.forEach((doc) => {
      const data = doc.data();
      habits[doc.id as HabitIdT] = {
        ...data,
        createdAt: new Date(data.createdAt),
      } as habitT;
    });
    return habits;
  };

  if (subscribe) {
    return useFirebaseSubscription<allHabitsT>({
      queryKey: ["habits", userId],
      firestoreQuery: firebaseQuery,
      processSnapshot,
      defaultValue: {},
    });
  } else {
    return useQuery<allHabitsT, Error, allHabitsT, string[]>({
      queryKey: ["habits", userId],
      queryFn: () => getDocs(firebaseQuery).then(processSnapshot),
    });
  }
}

export function useSubscribeToHabits({ userId }: { userId: UserIdT }) {
  return useFirebaseSubscription<allHabitsT>({
    queryKey: ["habits"],
    defaultValue: {},
    firestoreQuery: query(
      collection(firestore, "habits"),
      where(`participants.${userId}`, "!=", null),
    ),
    processSnapshot: (snapshot) => {
      const habits: allHabitsT = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        habits[doc.id as HabitIdT] = {
          ...data,
          createdAt: new Date(data.createdAt),
        } as habitT;
      });
      return habits;
    },
  });
}

export function useFirebaseSubscription<T>({
  queryKey,
  defaultValue,
  firestoreQuery,
  processSnapshot,
}: {
  queryKey: string[];
  defaultValue: T;
  firestoreQuery: Query<DocumentData, DocumentData>;
  processSnapshot: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => T;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onSnapshot(firestoreQuery, (firebaseQuerySnapshot) => {
      const data = processSnapshot(firebaseQuerySnapshot);
      queryClient.setQueryData(queryKey, data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return useQuery<T, Error, T, string[]>({
    queryKey,
    queryFn: () => {
      // Fake query function to satisfy the useQuery hook
      return (queryClient.getQueryData(queryKey) as T) || defaultValue;
    },
    // never automatically refetch since data is updated via subscription
    staleTime: Infinity,
    refetchInterval: undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

// export async function fetchHabitsForUser({
//   userId,
// }: {
//   userId: UserIdT;
// }): Promise<allHabitsT> {
//   const habitsCollection = collection(firestore, "habits");

//   const firebaseQuery = query(
//     habitsCollection,
//     where(`participants.${userId}`, "!=", null),
//   );

//   const mutation = useMutateHabits({ userId });

//   const unsub = onSnapshot(firebaseQuery, (firebaseQuerySnapshot) => {
//     const habits: allHabitsT = {};
//     firebaseQuerySnapshot.forEach((doc) => {
//       const data = doc.data();
//       habits[doc.id as HabitIdT] = {
//         ...data,
//         createdAt: new Date(data.createdAt),
//       } as habitT;
//     });
//   });

//   return habits;
// }
