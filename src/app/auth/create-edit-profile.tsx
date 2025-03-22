import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Upload } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView } from 'react-native';
import * as z from 'zod';

import { db, storage } from '@/api';
import { useAuth } from '@/core';
import { Button, ControlledInput, Header, ScreenContainer, View } from '@/ui';

const profileSchema = z.object({
  displayName: z.string().min(2, 'Display name is required'),
  username: z.string().min(2, 'Username is required'),
});

type ProfileFormType = z.infer<typeof profileSchema>;

export default function CreateProfile() {
  const router = useRouter();
  const currentUid = useAuth.getState().user?.uid;
  const defaultProfilePic = require('/assets/images/default_profile_pic.png');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { mode } = useLocalSearchParams<{
    mode: 'edit' | 'create';
  }>();

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (mode !== 'edit' || !currentUid) return;

      try {
        const profilePicRef = ref(storage, `profilePics/${currentUid}`);
        const url = await getDownloadURL(profilePicRef);
        setProfileImage(url);
      } catch (error) {
        console.log('No profile image found, using default.');
      }
    };

    fetchProfilePic();
  }, [mode, currentUid]);

  const { handleSubmit, control, setError } = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
      username: '',
    },
  });

  const handleImageUpload = async () => {
    setIsUploading(true);
    try {
      const image:
        | ImagePicker.ImagePickerResult
        | ImagePicker.ImagePickerCanceledResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
        });
      if (image.canceled === true) return;
      setProfileImage(image.assets[0].uri);
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImage || !currentUid) return;

    try {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePics/${currentUid}`);
      await uploadBytes(storageRef, blob);
      return;
    } catch (error) {
      console.error('Failed to upload profile image:', error);
      return;
    }
  };

  const createProfile = async (data: ProfileFormType) => {
    if (!currentUid) return;
    setIsSubmiting(true);
    try {
      // check if username taken
      const usernameQuery = query(
        collection(db, 'users'),
        where('username', '==', data.username),
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        setError('username', {
          type: 'custom',
          message: 'This username is already taken',
        });
        setIsSubmiting(false);
        return;
      }

      // make user in firestore
      const userDocRef = doc(db, 'users', currentUid);

      await setDoc(userDocRef, {
        displayName: data.displayName,
        username: data.username,
        createdAt: serverTimestamp(),
      });

      // upload profile pic to storage
      await uploadProfileImage();

      router.push('/');
    } catch (error) {
      console.error('Error creating profile', error);
      setError('root', {
        type: 'custom',
        message: 'Something went wrong creating profile',
      });
    } finally {
      setIsSubmiting(false);
    }
  };

  const editProfile = async (data: ProfileFormType) => {
    if (!currentUid) return;
    setIsSubmiting(true);
    try {
      // check if username taken
      const usernameQuery = query(
        collection(db, 'users'),
        where('username', '==', data.username),
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        setError('username', {
          type: 'custom',
          message: 'This username is already taken',
        });
        setIsSubmiting(false);
        return;
      }

      // update user document in firestore
      const userDocRef = doc(db, 'users', currentUid);
      
      await updateDoc(userDocRef, {
        displayName: data.displayName,
        username: data.username
      });

      // update profile picture in storage
      await uploadProfileImage();

      router.push('/');
    } catch (error) {
      console.error('Error updating profile', error);
      setError('root', {
        type: 'custom',
        message: 'Something went wrong updating profile',
      });
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <View className="flex flex-1 flex-col gap-4">
          <Header
            title={mode === 'create' ? 'Create Profile' : 'Edit Profile'}
          />

          <View className="flex flex-row items-center gap-4 px-2">
            <Image
              source={profileImage ? { uri: profileImage } : defaultProfilePic}
              className="h-14 w-14 rounded-full"
            />
            <Button
              label="Upload Profile Picture"
              icon={Upload}
              variant="outline"
              className="flex-1"
              textClassName="font-bold"
              loading={isUploading}
              onPress={handleImageUpload}
            />
          </View>
          <ControlledInput
            control={control}
            name="displayName"
            label="Display Name"
          />
          <ControlledInput
            control={control}
            name="username"
            label="Unique Username"
          />

          <Button
            label={mode === 'create' ? 'Complete Profile' : 'Save Changes'}
            loading={isSubmiting}
            onPress={
              mode === 'create'
                ? handleSubmit(createProfile)
                : handleSubmit(editProfile)
            }
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
