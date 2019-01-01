import React from 'react';
import colors from '../theme';

// temporary fix until shouldForwardProp typescript is updated
interface SvgStarProps extends React.SVGProps<SVGSVGElement> {
  isDay?: boolean;
}

function SvgStar(props: SvgStarProps) {
  return (
    <svg viewBox="0 0 64 64" {...props}>
      <radialGradient id="star-gradient">
        <stop stopColor={colors.white} offset={0.25} />
        <stop stopColor={colors.yellow} offset={0.75} />
      </radialGradient>
      <path
        fill="url(#star-gradient)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.082 25.697c-2.981-.796-10.308-1.246-14.64-1.44-.622-.028-2.213.587-3.36.24-.397-.12-1.759-.979-1.439-1.68.127-.28.675 1.045.72.24.006-.109-1.065-.58-.72-.72 1.175-1.988-.932-2.028-1.2-3.84.378.022.188.612.72.48-1.058-1.165-.487-2.52-1.92-3.36.338-2.809-1.052-7.412-3.84-9.6h-.48c-.22.323-1.657 1.107-.96.24-1.647.802-1.463 3.194-1.68 5.04-.281-.039-.203-.438-.24-.72-1.802 3.468-2.843 9.154-4.56 13.44-6.859 1.146-14.575-.851-19.2 1.44v1.68c4.135 4.965 10.174 7.035 14.4 11.52-1.038 6.562-4.189 11.011-4.8 18 .346.134.585.374.72.72 2.805.153 3.649-1.443 5.04-2.64 1.104-.951 2.447-1.384 3.6-2.16 2.449-1.649 4.437-4.316 6.72-5.28 1.788-.754 4.253 1.27 5.76 2.4 2.421 1.817 6.203 4.461 7.92 5.76 1.268.959 2.104 2.591 3.84 1.68.726-2.735-1.052-6.491-2.16-9.84-.989-2.988-2.211-5.777-2.88-8.399 2.257-2.961 4.875-4.177 8.64-6.96 2.039-1.509 6.771-4.108 5.999-6.241z"
      />
    </svg>
  );
}

export default SvgStar;
