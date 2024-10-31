import React from 'react';

import { uuidv4 } from 'src/utils/uuidv4';

const SunIcon: React.FC = () => {
  const id = uuidv4();
  const id2 = uuidv4();
  return (
    <svg width="44" height="39" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="2.50195"
        y="0.362549"
        width="37.8686"
        height="37.8686"
        rx="5.68029"
        fill="rgba(255, 249, 235, 1)"
        fillOpacity="0.9"
      />
      <mask
        id={id}
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="44"
        height="24"
      >
        <path d="M43.1284 0.428223H0.674053V23.8113H43.1284V0.428223Z" fill="white" />
      </mask>
      <g mask={`url(#${id})`}>
        <g clipPath={`url(#${id2})`}>
          <path
            d="M21.9071 27.9053C18.9579 27.9053 16.5671 25.5145 16.5671 22.5653C16.5671 19.6161 18.9579 17.2253 21.9071 17.2253C24.8563 17.2253 27.2471 19.6161 27.2471 22.5653C27.2471 25.5145 24.8563 27.9053 21.9071 27.9053Z"
            stroke="#F78E1E"
            strokeWidth="1.58228"
            strokeMiterlimit="10"
          />
          <path
            d="M21.9068 14.2808V11.1216M21.9068 34.0071V30.8562M16.0445 16.702L13.814 14.4715M29.9997 30.6572L27.7609 28.4184M27.7609 16.702L29.9997 14.4715M13.814 30.6572L16.0528 28.4184M30.1821 22.5727H33.3496M10.4641 22.5727H13.615"
            stroke="#F28C00"
            strokeWidth="1.5257"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </g>
      </g>
      <path
        d="M32.0527 27.8608H10.8256"
        stroke="#F78E1E"
        strokeWidth="1.49254"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <clipPath id={id2}>
          <rect
            width="24.4113"
            height="24.4113"
            fill="white"
            transform="matrix(-1 0 0 1 34.1128 10.3589)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SunIcon;
