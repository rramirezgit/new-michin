/* eslint-disable react-hooks/exhaustive-deps */
import { keyframes } from '@emotion/react';
import { useRef, useState, useEffect } from 'react';

import { Box, Alert } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

interface CountdownLayerProps {
  duration: number;
  step: number;
  activeStep: number;
}

export function CountdownLayer({ duration = 10 * 60, step, activeStep }: CountdownLayerProps) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('timeLeft');
    return savedTime ? parseInt(savedTime, 10) : duration;
  });
  const [visible, setVisible] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Animación para que el componente aparezca suavemente
  const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  useEffect(() => {
    if (activeStep === step && !intervalIdRef.current) {
      setVisible(true);
      setTimeLeft(duration);
      startCountdown();
    } else if (activeStep < step) {
      setVisible(false);
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        localStorage.removeItem('timeLeft');
      }
    }
  }, [activeStep]);

  const startCountdown = () => {
    intervalIdRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        localStorage.setItem('timeLeft', newTime.toString());
        if (newTime <= 0) {
          clearInterval(intervalIdRef.current as NodeJS.Timeout);
          setVisible(false);
          router.push('/product/checkout/time-out');
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };

  if (!visible) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50px',
        right: '20px',
        zIndex: 1300, // Hacer que el componente esté por encima de otros elementos
        animation: `${fadeIn} 0.5s ease-in-out`, // Aplicar animación de entrada
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Alert
        icon={false}
        severity="warning"
        sx={{
          backgroundColor: '#F78E1E',
        }}
      >
        <span
          style={{
            color: '#fff',
            fontFamily: 'Futura Md BT',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '22px',
            letterSpacing: '0px',
          }}
        >
          Tiempo para completar tu reserva:{' '}
        </span>
        <span
          style={{
            color: '#fff',
            fontFamily: 'Futura-Bold',
            fontSize: '17px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '22px',
            letterSpacing: '0px',
          }}
        >
          {minutes}m {seconds < 10 ? `0${seconds}` : seconds}s
        </span>
      </Alert>
    </Box>
  );
}
