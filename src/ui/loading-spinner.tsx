import { ActivityIndicator, View } from 'react-native';

export const LoadingSpinner = ({
  size = 'small',
}: {
  size?: 'small' | 'large';
}) => {
  return (
    <View className="m-2 h-fit w-fit flex-1 items-center justify-center">
      <ActivityIndicator size={size} />
    </View>
  );
};
