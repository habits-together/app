import { useState } from 'react';

import { Button, Text, View } from '@/ui';

export const ErrorMessage = ({
  error,
  refetch,
}: {
  error: Error;
  refetch: () => void;
}) => {
  const [showStack, setShowStack] = useState(false);

  return (
    <View className="flex flex-1 flex-col items-center justify-center gap-4">
      <Text className="text-center text-red-500 dark:text-red-500">
        {error.name}: {error.message}
      </Text>
      <Button onPress={() => refetch()} label="Retry" className="w-40" />
      <Text
        onPress={() => setShowStack(!showStack)}
        className="text-sm underline opacity-70"
      >
        {showStack ? 'Hide' : 'Show'} Call Stack
      </Text>
      {showStack && <Text className="text-xs opacity-50">{error.stack}</Text>}
    </View>
  );
};
