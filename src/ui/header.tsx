import { router } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

import { Button } from './button';
import { Text } from './text';

type Props = {
  leftButton?:
    | {
        text: string;
        onPress: () => void;
      }
    | 'back'
    | 'cancel';
  title?: string;
  rightButton?: {
    text: string;
    onPress: () => void;
  };
};
export const Header = ({ leftButton, title, rightButton }: Props) => {
  return (
    <View className="flex h-8 flex-row items-center justify-between">
      {leftButton === 'back' ? (
        <BackButton />
      ) : leftButton === 'cancel' ? (
        <CancelButton />
      ) : (
        leftButton && (
          <Button onPress={leftButton.onPress} label={leftButton.text} />
        )
      )}

      {title && ( // center it when there is a left button
        <Text
          className={`text-xl font-semibold ${leftButton && 'absolute left-1/2 -translate-x-1/2'}`}
        >
          {title}
        </Text>
      )}

      {rightButton ? (
        <Button onPress={rightButton.onPress} label={rightButton.text} />
      ) : (
        <View></View>
      )}
    </View>
  );
};

const BackButton = () => {
  return (
    <Button
      onPress={() => {
        router.back();
      }}
      label={'Back'}
    />
  );
};

const CancelButton = () => {
  return (
    <Button
      onPress={() => {
        router.back();
      }}
      label={'Cancel'}
    />
  );
};
