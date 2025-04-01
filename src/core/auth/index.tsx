import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';

import { type UserIdT } from '@/api/users';

import { auth, db } from '../../api/common/firebase';
import { createSelectors } from '../utils';

interface AuthState {
  user: User | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set) => ({
  user: null,
  status: 'idle',

  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      set({
        user: userCredential.user,
        status: 'signIn',
      });
    } catch (error) {
      console.error('SignIn Error:', error);
      throw error;
    }
  },

  signUp: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      set({
        user: userCredential.user,
        status: 'signIn',
      });
    } catch (error) {
      console.error('SignUp Error:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, status: 'signOut' });
    } catch (error) {
      console.error('SignOut Error:', error);
    }
  },

  hydrate: () => {
    set({ status: 'idle' });

    // Subscribe to Firebase auth state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user, status: 'signIn' });
      } else {
        set({ user: null, status: 'signOut' });
      }
    });
  },
}));

export const useAuth = createSelectors(_useAuth);

// Functions for easier usage in components
export const signOut = () => _useAuth.getState().signOut();
export const signIn = (email: string, password: string) =>
  _useAuth.getState().signIn(email, password);
export const hydrateAuth = () => _useAuth.getState().hydrate();

export const checkIfUserExistsInFirestore = async (): Promise<boolean> => {
  const userId = _useAuth.getState().user?.uid;
  if (!userId) return false;
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists();
  } catch (error) {
    console.error('Error checking if user exists in Firestore:', error);
    return false;
  }
};
export const getCurrentUser = (): User => {
  const user = _useAuth.getState().user;
  // if you are trying to get current user, we assume you are logged in
  if (!user) throw new Error('User not logged in');
  return user;
};
export const getCurrentUserId = (): UserIdT => {
  return getCurrentUser().uid as UserIdT;
};