/* eslint-disable consistent-return */
import type { SxProps } from '@mui/material';

import { useRef, useState } from 'react';

import { Box } from '@mui/material';

import { uuidv4 } from 'src/utils/uuidv4';

import { Lightbox, useLightBox } from 'src/components/lightbox';

import BotonCarrusel from '../michin/DescubreNuestraDiversidad/carrusel/Boton';

type Props = {
  children: any[];
  trendding?: boolean;
  sx?: SxProps;
  dataCarrousel?: any;
};

export default function CarouselMichinVertical({
  children,
  trendding,
  sx,
  dataCarrousel = [],
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const id = uuidv4();
  const [zIndices, setZIndices] = useState(children.map((_, index) => index));

  const lightbox = useLightBox(
    dataCarrousel.map((child: any) => ({
      type: 'image',
      src: child.urlstring,
      title: child.title,
      description: child.description,
    }))
  );

  const handleZIndexChange = (direction: 'up' | 'down') => {
    setZIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      if (direction === 'up') {
        newIndices.push(newIndices.shift() as number);
      } else {
        newIndices.unshift(newIndices.pop() as number);
      }
      return newIndices;
    });
  };

  return (
    <Box
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: {
          xs: '330px',
          sm: '400px',
          md: '430px',
          // lg: '550px',
        },
        width: '100%',
        overflow: 'hidden',
        borderRadius: '22.513px',
        ...sx,
      }}
    >
      <Box
        ref={boxRef}
        id={id}
        sx={{
          overflowY: children.length > 1 ? 'auto' : 'hidden',
          scrollSnapType: 'y mandatory',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          paddingTop: '200px', // Increased padding to accommodate overlap
          // paddingBottom: '200px', // Increased padding to accommodate overlap
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE
          WebkitOverflowScrolling: 'touch', // iOS smooth scrolling
          cursor: 'default',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {children.map((child, index) => (
          <Box
            onClick={() => {
              lightbox.onOpen(dataCarrousel[index].urlstring);
            }}
            key={index}
            sx={{
              top: index + zIndices[index] * 50, // Overlapping items
              zIndex: zIndices[index],
              transform:
                zIndices[index] === 2
                  ? 'scale(1.1)'
                  : zIndices[index] === 1
                    ? 'scale(1.05)'
                    : 'scale(1)',
              width: '100%',
              position: 'absolute',
              transition: 'top 0.3s, z-index 0.3s', // Adding smooth transitions
              touchAction: 'manipulation', // Improve touch performance
            }}
          >
            {child}
          </Box>
        ))}
      </Box>
      {children.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 2,
            right: {
              xs: '2%',
              sm: '4%',
              md: '12%',
              lg: '20%',
              xl: '25%',
            },
            top: {
              xs: '68%',
              sm: '58%',
              md: '55%',
              lg: '56%',
            },

            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <BotonCarrusel
            onClick={() => {
              handleZIndexChange('down');
            }}
            direction="up"
          />
          <BotonCarrusel
            onClick={() => {
              handleZIndexChange('up');
            }}
            showLeftIcon
            direction="down"
          />
        </Box>
      )}

      <Lightbox
        open={lightbox.open}
        close={lightbox.onClose}
        slides={dataCarrousel.map((child: any) => ({
          type: 'image',
          src: child.urlstring,
          title: child.title,
          description: child.description,
        }))}
        index={lightbox.selected}
        // disableZoom={state.disableZoom}
        disableTotal
        disableVideo
        // disableCaptions={state.disableCaptions}
        disableSlideshow
        // disableThumbnails={state.disableThumbnails}
        disableFullscreen
      />
    </Box>
  );
}
