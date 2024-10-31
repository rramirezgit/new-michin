/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
import type { ReactNode } from 'react';
/* eslint-disable consistent-return */
import type { SxProps } from '@mui/material';

import { useRef, useState, useEffect } from 'react';

import { Box } from '@mui/material';
// @mui

import { useResponsive } from 'src/hooks/use-responsive';

import { uuidv4 } from 'src/utils/uuidv4';

import BotonCarrusel from '../michin/DescubreNuestraDiversidad/carrusel/Boton';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode[];
  trendding?: boolean;
  sx?: SxProps;
};

export default function CarouselMichinNormal({ children, trendding, sx }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const smUp = useResponsive('up', 'sm');

  const id = uuidv4();

  const [showLeftIcon, setShowLeftIcon] = useState(false);
  const [centeredIndex, setCenteredIndex] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    const element = document.getElementById(id);
    if (element) {
      const x = 300;
      element.scrollBy({
        top: 0,
        left: direction === 'left' ? -x : x,
        behavior: 'smooth',
      });
    }
  };

  const calculateCenteredIndex = () => {
    const element = boxRef.current;
    if (element) {
      const childNodes = Array.from(element.children);
      const parentRect = element.getBoundingClientRect();
      const parentCenter = parentRect.left + parentRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      childNodes.forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(parentCenter - childCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCenteredIndex(closestIndex);
    }
  };

  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      const handleScrollEvent = () => {
        setShowLeftIcon(element.scrollLeft > 0);
        calculateCenteredIndex();
      };

      element.addEventListener('scroll', handleScrollEvent);
      return () => {
        element.removeEventListener('scroll', handleScrollEvent);
      };
    }
  }, [id, smUp]);

  // Add mouse drag functionality
  useEffect(() => {
    const element = boxRef.current;
    if (element) {
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      const handleMouseDown = (e: MouseEvent) => {
        isDown = true;
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
      };

      const handleMouseUp = () => {
        isDown = false;
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed
        element.scrollLeft = scrollLeft - walk;
      };

      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mousemove', handleMouseMove);

      return () => {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const getOpacity = (index: number) => {
    if (children.length <= 3) return 1;
    if (index === centeredIndex) return 1;
    return 0.5;
  };

  const renderChildren = () => children;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Box
        ref={boxRef}
        id={id}
        sx={{
          overflowX: children.length > 4 ? 'auto' : 'hidden',
          scrollSnapType: 'x mandatory',
          padding: '46px',
          gap: {
            xs: 3,
            sm: 2,
            lg: 3,
          },
          display: 'flex',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          cursor: 'grab',
          '&:active': {
            cursor: 'grabbing',
          },
          justifyContent: children.length > 4 ? 'flex-start' : 'center',
        }}
      >
        {renderChildren().map((child, index) => (
          <Box
            key={index}
            sx={{
              flexShrink: 0,
              transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
              opacity: {
                xs: children.length > 3 ? getOpacity(index) : 1,
                sm: 1,
              },
              transform: {
                xs: index === centeredIndex ? 'scale(1.1)' : 'scale(1)',
                sm: 'none',
              },
              scrollSnapAlign: {
                xs: 'center',
                sm: 'none',
              },
            }}
          >
            {child}
          </Box>
        ))}
      </Box>

      <Box>
        {smUp && children.length > 4 && (
          <Box
            display="flex"
            alignItems="cente"
            justifyContent="end"
            sx={{ gap: '20px', marginRight: '100px' }}
          >
            <BotonCarrusel
              onClick={() => handleScroll('left')}
              showLeftIcon={showLeftIcon}
              direction="right"
            />
            <BotonCarrusel onClick={() => handleScroll('right')} showLeftIcon direction="left" />
          </Box>
        )}
      </Box>
    </Box>
  );
}
