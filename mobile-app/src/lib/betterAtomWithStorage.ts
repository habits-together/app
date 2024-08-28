import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { MMKV } from "react-native-mmkv";

export const mmkvStorage = new MMKV();

function getItem(key: string): string | null {
  const value = mmkvStorage.getString(key);
  return value ? value : null;
}

function setItem(key: string, value: string): void {
  mmkvStorage.set(key, value);
}

function removeItem(key: string): void {
  mmkvStorage.delete(key);
}

function clearAll(): void {
  mmkvStorage.clearAll();
}

export const betterAtomWithStorage = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem,
      clearAll,
    })),
    { getOnInit: true },
  );
