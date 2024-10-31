import type { City } from 'src/store/useCityStore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { subtitleFont } from 'src/theme/core';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  location: City;
  onChange: (newValue: { value: City; label: string }) => void;
  locationsOptions: {
    value: City;
    label: string;
  }[];
  height?: number;
  bgBolor?: string;
  slotProps?: any;
};

export function LocationSort({
  location,
  onChange,
  locationsOptions,
  height = 25,
  bgBolor,
  slotProps,
}: Props) {
  const popover = usePopover();

  const selectedLocation = locationsOptions.find((option) => option.value === location);

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        onClick={popover.onOpen}
        endIcon={
          <Iconify
            icon={popover.open ? 'iconamoon:arrow-up-2-duotone' : 'iconamoon:arrow-down-2-duotone'}
          />
        }
        sx={(theme) => ({
          color: bgBolor ? 'common.white' : 'common.darkBlue',
          fontWeight: '400',
          fontFamily: subtitleFont,
          fontSize: 12,
          height,
          p: '5.5px',
          borderRadius: 15,

          // bgcolor
          '&.MuiButton-contained': {
            bgcolor: bgBolor || alpha(theme.palette.grey[300], 0.5),
          },
        })}
      >
        <Box component="span" sx={{ ml: 0.5, textTransform: 'capitalize' }}>
          {selectedLocation?.label || 'Location'}
        </Box>
      </Button>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={slotProps}
      >
        <MenuList>
          {locationsOptions.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === location}
              onClick={() => {
                popover.onClose();
                onChange(option);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}
