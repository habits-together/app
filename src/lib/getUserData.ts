import { firestore } from "@/src/firebase/config";
import { completionT, habitCardDataT, habitInfoT, userT } from "@/src/lib/db_types";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { DocumentReference, getDoc } from "firebase/firestore";
export async function getNudges() {
  // check logged in user
  const auth = getAuth();
  const user = auth.currentUser;
  if (user === null) {
    console.error("No user logged in");
    return [];
  }

  const userDocRef = doc(firestore, "users", user.uid);

  const q = query(
    collection(firestore, "nudges"),
    where("receiver_ref", "==", userDocRef),
  );

  const docs = await getDocs(q);
  let results: DocumentData[] = [];
  docs.forEach((doc) => {
    results.push(doc.data());
  });

  return results;
}


export async function getCommonHabits(uid_other: string) {
  // get your own habits
  const auth = getAuth();
  const user = auth.currentUser;
  if (user === null) {
    console.error("No user logged in");
    return [];
  }

  const usersRef = collection(firestore, "users");
  const userDocRef = doc(usersRef, user.uid);
  const userDocRefOther = doc(usersRef, uid_other);


  const q = query(
    collection(firestore, "habits"),
    where("participants", "array-contains", userDocRef),
    where("participants", "array-contains", userDocRefOther)
  );

  const docs = await getDocs(q);
  let results: DocumentData[] = [];
  docs.forEach((doc) => {
    results.push(doc.data());
  });

  return results;
}


export async function getHabitCardData(
  habit_participation_ref: DocumentReference,

): Promise<habitCardDataT> {
    
    const habit_participation_doc = await getDoc(habit_participation_ref);

  
    let completion_data: completionT[] = [];
    let completion_data_colRef = collection(habit_participation_ref, "completions");
    const query_snapshot = await getDocs(completion_data_colRef);
    query_snapshot.forEach((doc) => {
        completion_data.push(doc.data() as completionT);
    });
    
    

    //get habit info
    if (!habit_participation_doc.exists()) {
        console.error("habit not found");
        return {} as habitCardDataT;
    }

    let habitDoc:DocumentData = await getDoc(habit_participation_doc.data().habit_ref);
    let habitInfo = habitDoc.data() as habitInfoT;

    const habit_participants:DocumentReference[] = habitDoc.data().participants;

    //get participant data
    let participant_data = [];

    for (let i = 0; i < habit_participants.length; i++) {
        let participant_doc = await getDoc(habit_participants[i]);
        let participant_completion_data: completionT[] = [];
        let participant_completion_data_colRef = collection(habit_participants[i], "completions");
        const query_snapshot = await getDocs(participant_completion_data_colRef);
        query_snapshot.forEach((doc) => {
            participant_completion_data.push(doc.data() as completionT);
        });
        if (!participant_doc.exists()) {
            console.error("participant not found");
            return {} as habitCardDataT;
        }
        const info = {created_at:participant_doc.data().created_at,
           display_name:participant_doc.data().display_name,
            picture:participant_doc.data().picture,
            username:participant_doc.data().username,
          } as userT;

        participant_data.push({
            user_info: info,
            completion_data: participant_completion_data,
        });
    }
  return {
        habit_info: habitInfo,
        my_completion_data: completion_data,
        participant_data: participant_data,
          
  } as habitCardDataT;

}


