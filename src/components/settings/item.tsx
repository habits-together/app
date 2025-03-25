import * as React from 'react';
import { ActivityIndicator } from 'react-native';

import { Pressable, Text, View } from '@/ui';

type ItemProps = {
  text: string;
  loading?: boolean;
  value?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
};

export const Item = ({
  text,
  loading = false,
  value,
  icon,
  onPress,
}: ItemProps) => {
  const isPressable = onPress !== undefined;

  return (
    <Pressable
      disabled={loading} // Disable button while loading
      onPress={onPress}
      pointerEvents={isPressable ? 'auto' : 'none'}
      className="flex-1 flex-row items-center justify-between px-4 py-2"
    >
      <View className="flex-row items-center">
        {icon && <View className="pr-2">{icon}</View>}
        {loading ? (
          <ActivityIndicator size="small" color="gray" />
        ) : (
          <Text>{text}</Text>
        )}
      </View>

      <View className="flex-row items-center">
        {!loading && (
          <Text className="text-neutral-600 dark:text-white">{value}</Text>
        )}
        {isPressable && !loading && (
          <View className="pl-2">{/* <ArrowRight /> */}</View>
        )}
      </View>
    </Pressable>
  );
};
