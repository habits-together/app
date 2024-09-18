import { type LucideIcon as LucideIconType } from 'lucide-react-native';
import * as React from 'react';
import { type SvgProps } from 'react-native-svg';

type Props = {
  Icon: LucideIconType;
} & SvgProps;
export const LucideIcon = ({ Icon, ...props }: Props) => {
  return <Icon strokeWidth={2.5} {...props} />;
};
