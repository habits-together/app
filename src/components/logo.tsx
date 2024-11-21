import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

function Logo(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M6.514 14.743L1.03 17.486 12 22.97l10.971-5.485-5.485-2.743"
        fill="#60A5FA"
      />
      <Path
        d="M6.514 14.743L1.03 17.486 12 22.97l10.971-5.485-5.485-2.743"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.514 9.257L1.03 12 12 17.486 22.971 12l-5.485-2.743"
        fill="#34D399"
      />
      <Path
        d="M6.514 9.257L1.03 12 12 17.486 22.971 12l-5.485-2.743"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 1.029L1.029 6.514 12 12l10.971-5.486L12 1.03z"
        fill="#FB923C"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Logo;
