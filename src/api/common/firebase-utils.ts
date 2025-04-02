import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '@/api';

export const uploadImageToStorage = async (
  uri: string, // local path from expo-image-picker
  path: string,
): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, blob);

  return getDownloadURL(imageRef);
};
