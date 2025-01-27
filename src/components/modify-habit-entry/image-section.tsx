import * as ImagePicker from 'expo-image-picker';
import { CameraIcon, ImageIcon, Trash2Icon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Image as RNImage } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { Button, colors, Image, Pressable, Text, View } from '@/ui';

interface ImageSectionProps {
  image: string | undefined;
  setImage: (image: string | undefined) => void;
}

export function ImageSection({ image, setImage }: ImageSectionProps) {
  const { colorScheme } = useColorScheme();
  const [imageWidth, setImageWidth] = useState(140);
  const [imageHeight, setImageHeight] = useState(140);

  useEffect(() => {
    if (image) {
      RNImage.getSize(
        image,
        (width, height) => {
          const aspectRatio = width / height;
          setImageWidth(140 * aspectRatio);
          setImageHeight(140);
        },
        (error) => {
          console.error('Error getting image size:', error);
        },
      );
    }
  }, [image]);

  const takePhoto = async () => {
    let canTakePhoto = false;

    const permission = await ImagePicker.getCameraPermissionsAsync();
    if (permission.granted) {
      canTakePhoto = true;
    } else if (permission.canAskAgain) {
      const newPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (newPermission.granted) {
        canTakePhoto = true;
      }
    } else {
      showMessage({
        message:
          'Cannot access camera. Please enable camera permissions in settings.',
        type: 'danger',
        duration: 2000,
      });
    }

    if (canTakePhoto) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri || undefined);
      }
    }
  };

  return (
    <View className="flex flex-col gap-2">
      <Text className="">Attach Image</Text>
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          className="mx-auto rounded-lg"
          style={{
            height: imageHeight,
            width: imageWidth,
          }}
        />
      ) : (
        <Pressable onPress={takePhoto}>
          <View className="mx-auto h-[140px] w-[140px] rounded-lg bg-neutral-200 dark:border dark:border-stone-700 dark:bg-transparent">
            <ImageIcon
              size={32}
              className="m-auto"
              color={
                colorScheme === 'dark' ? colors.stone[700] : colors.neutral[300]
              }
              strokeWidth={1}
            />
          </View>
        </Pressable>
      )}
      <View className="flex-row items-center space-x-4">
        <Button
          icon={image ? Trash2Icon : CameraIcon}
          label={image ? 'Delete Photo' : 'Take Photo'}
          variant={image ? 'destructive' : 'default'}
          className="w-full"
          onPress={image ? () => setImage(undefined) : takePhoto}
        />
      </View>
    </View>
  );
}
