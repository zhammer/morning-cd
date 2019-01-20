import React from 'react';

function ShareIconIOS(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 -7.5 50 70' {...props}>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M17 10l8-8 8 8M25 32V2.333"
      />
      <path fill="none" d="M0 0h50v50H0z" />
      <path
        d="M17 17H8v32h34V17h-9"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      />
    </svg>
  );
}

export default ShareIconIOS;
