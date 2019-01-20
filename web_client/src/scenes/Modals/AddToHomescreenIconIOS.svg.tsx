import React from 'react';

function AddToHomescreenIconIOS(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" {...props}>
      <g strokeWidth="4px" strokeLinecap="round">
        <line x1={16} x2={48} y1={32} y2={32} />
        <line x1={32} x2={32} y1={16} y2={48} />
      </g>
    </svg>
  );
}

export default AddToHomescreenIconIOS;
