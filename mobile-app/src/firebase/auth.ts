import { firestore } from "@/src/firebase/config";
import { FirebaseError } from "firebase/app";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { UserIdT, userT, userWithIdT } from "../lib/db_types";
import { userDataConverter } from "./helper";

export const handleFirebaseAuthSignUp = async (data: {
  email: string;
  password: string;
}): Promise<boolean> => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    return true;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      switch (errorCode) {
        case "auth/missing-email":
          Alert.alert("Please enter an email");
          break;
        case AuthErrorCodes.EMAIL_EXISTS:
          Alert.alert("Email already in use");
        case AuthErrorCodes.INVALID_EMAIL:
          Alert.alert("Invalid email");
        case AuthErrorCodes.WEAK_PASSWORD:
          Alert.alert("Weak password");
        default:
          Alert.alert(
            `An error occurred. Please try again. ${errorMessage} "${errorCode}"`,
          );
      }
    } else {
      Alert.alert(`An error occurred. Please try again.`);
    }
    return false;
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
