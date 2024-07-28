import { auth, firestore } from "@/src/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserIdT, userT, userWithIdT } from "../lib/db_types";
import { userDataConverter } from "./helper";
export const handleDatabaseSignUp = async (data: {
  email: string;
  password: string;
}) => {
  // PUSH TO FIREBASE
  if (auth.currentUser) {
    // BASE DATA FOR NEW USER
    const currentUserData: userT = {
      createdAt: new Date(),
      displayName: data.email,
      picture: "",
      username: auth.currentUser.email as string, //kinda hacky
    };

    // write regular user data doc
    const accDocRef = doc(firestore, "users", auth.currentUser.uid);
    await setDoc(accDocRef, currentUserData);

    console.log("Added User Document written with ID: ", auth.currentUser.uid);
  } else {
    //potential issue: if user gets created but DB write fails
    console.log("An error occurred. Please try again.");
  }
};

export const handleDatabaseLogin = async (): Promise<userWithIdT> => {
  if (auth.currentUser) {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data: userT = userDataConverter.fromFirestore(docSnap);
      const typed_data: userWithIdT = { ...data, id: auth.currentUser.uid as UserIdT};
      return typed_data;
    } else {
      console.log(
        "Critical error: user is authenticated but does not exist in database",
      );
    }
  } else {
    console.log("An error has occured during fetching data during login");
  }

  return {} as userWithIdT;
};
