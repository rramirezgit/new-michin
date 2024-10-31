import type { IconButtonProps } from '@mui/material/IconButton';

import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

export type MenuButtonProps = IconButtonProps;

export function MenuButton({ sx, ...other }: IconButtonProps) {
  return (
    <IconButton sx={sx} {...other}>
      <SvgIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
        >
          <path
            d="M7.1875 10.6299H35.1875M12.4375 21.1299H35.1875M17.6875 31.6299H35.1875"
            stroke="white"
            strokeWidth="2.47059"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SvgIcon>
    </IconButton>
  );
}
