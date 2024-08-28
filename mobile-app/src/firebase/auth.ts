import { FirebaseError } from "firebase/app";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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

export const handleFirebaseAuthLogIn = async (data: {
  email: string;
  password: string;
}) => {
  const auth = getAuth();

  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case "auth/missing-email":
          throw new Error("Please enter an email");
        case AuthErrorCodes.INVALID_EMAIL:
          throw new Error("User does not exist");
        case AuthErrorCodes.INVALID_PASSWORD:
          throw new Error("Wrong password please try again");
        case AuthErrorCodes.INVALID_IDP_RESPONSE:
          throw new Error("Wrong email or password please try again");
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

export const signoutUserFirebase = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};
