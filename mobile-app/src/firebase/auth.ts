import { firestore } from "@/src/firebase/config";
import { FirebaseError } from "firebase/app";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserIdT, userT, userWithIdT } from "../lib/db_types";
import { userDataConverter } from "./helper";

export const handleFirebaseAuthSignUp = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, data.email, data.password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      switch (errorCode) {
        case "auth/missing-email":
          throw new Error("Please enter an email");
        case AuthErrorCodes.EMAIL_EXISTS:
          throw new Error("Email already in use");
        case AuthErrorCodes.INVALID_EMAIL:
          throw new Error("Invalid email");
        case AuthErrorCodes.WEAK_PASSWORD:
          throw new Error("Weak password");
        default:
          throw new Error(
            `An error occurred. Please try again. ${errorMessage} "${errorCode}"`,
          );
      }
    } else {
      throw new Error(`An error occurred. Please try again.`);
    }
  }
};

export const handleDatabaseLogin = async (): Promise<userWithIdT> => {
  const auth = getAuth();
  if (auth.currentUser) {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data: userT = userDataConverter.fromFirestore(docSnap);
      const typed_data: userWithIdT = {
        ...data,
        id: auth.currentUser.uid as UserIdT,
      };
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

export const signoutUserFirebase = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
