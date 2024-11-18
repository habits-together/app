import { type LucideIcon as LucideIconType } from 'lucide-react-native';
import * as React from 'react';
import { type SvgProps } from 'react-native-svg';

type Props = {
  Icon: LucideIconType;
  size?: string | number;
} & SvgProps;
export const LucideIcon = ({ Icon, size, ...props }: Props) => {
  return <Icon strokeWidth={2.5} size={size} {...props} />;
};
