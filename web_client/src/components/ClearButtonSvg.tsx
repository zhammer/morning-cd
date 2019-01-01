import React from 'react';
import colors from '../theme';

const ClearButtonSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 100 100' {...props}>
    <circle fill={colors.lightGray} cx={50} cy={50} r={40} />
    <g stroke='#fff' strokeWidth={3}>
      <path d="M35 35l30 30M35 65l30-30" />
    </g>
  </svg>
);

export default ClearButtonSvg;
