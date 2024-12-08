import { ActivityIndicator, View } from 'react-native';

export const LoadingSpinner = () => {
  return (
    <View className="m-2 h-fit w-fit flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
};
