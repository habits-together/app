import { cssInterop } from 'nativewind';
import Svg from 'react-native-svg';

export * from './button';
export { default as colors } from './colors';
export * from './focus-aware-status-bar';
export * from './header';
export * from './image';
export * from './input';
export * from './list';
export * from './loading-spinner';
export * from './modal';
export * from './progress-bar';
export * from './screen-container';
export * from './select';
export * from './text';
export * from './utils';

// export base components from react-native
export {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: 'style',
  },
});
