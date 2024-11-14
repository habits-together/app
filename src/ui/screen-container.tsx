import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FocusAwareStatusBar } from './focus-aware-status-bar';

/**
 * Adds top padding (safe area inset), horizontal padding, and the FocusAwareStatusBar
 */
export const ScreenContainer = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & ViewProps) => {
  const { top: safeTopPadding } = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-slate-50 px-3 dark:bg-stone-900"
      style={{ paddingTop: safeTopPadding }}
      {...props}
    >
      <FocusAwareStatusBar />
      {children}
    </View>
  );
};
