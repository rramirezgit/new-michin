/* eslint-disable perfectionist/sort-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import type { Product, Schedule } from 'src/store/ticketsStore';
import { toast } from 'src/components/snackbar';

import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

import { Alert, Box, Button, Typography } from '@mui/material';

import { useCityStore } from 'src/store/useCityStore';
import { useTicketStore } from 'src/store/ticketsStore';

// Importa SunIcon según tu estructura de archivos
import SunIcon from 'src/components/svg/Sun';
import { Image } from 'src/components/image';
import { useCheckout } from '../util/useChekout';

interface Props {
  ticket: Product;
  onTimeClick: ({
    time,
    availableSlots,
    availabilityId,
    sku,
  }: {
    time: string;
    availableSlots: number;
    availabilityId: string;
    sku: string;
  }) => void;
}

export default function TimeSelection({ onTimeClick, ticket }: Props) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const { fetchSchedules, selectedTickets } = useTicketStore();
  const { city } = useCityStore();

  const selectedTime = selectedTickets.find((ticketg) => ticketg.product?.sku === ticket.sku)?.time;

  const availableSlots = selectedTickets.find(
    (ticketg) => ticketg.product?.sku === ticket.sku
  )?.availableSlots;

  const { isAvailableSlots } = useCheckout();

  const noAvailableSlots = isAvailableSlots({ ticket });

  const handleFetchSchedules = async () => {
    if (schedules?.length === 0) {
      if (city !== '') {
        const fetchedSchedules = await fetchSchedules(
          ticket.sku,
          dayjs().format('YYYY-MM-DD'),
          city
        );
        setSchedules(fetchedSchedules);
      }
    }
  };

  useEffect(() => {
    if (city !== '') {
      handleFetchSchedules();
    }
  }, [city]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        p: 2,
        borderRadius: '16px',
        boxShadow: '2.152px 2.152px 32.276px 0px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, width: { xs: '100%', md: 'auto' } }}
        >
          <SunIcon />
          <Box>
            <Typography
              sx={{
                color: 'common.darkerBlue',
                fontFamily: 'Futura Md BT',
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              Horarios de Ingreso
            </Typography>
            <Typography
              sx={{
                color: '#919EAB',
                fontFamily: 'Futura Bk BT',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              Abierto de 10:00 a 18:00
            </Typography>
          </Box>
        </Box>
        {availableSlots && (
          <Box
            sx={{
              backgroundColor: noAvailableSlots ? '#ac1f1f' : '#F28C00',
              borderRadius: '8px',
              padding: '4px 25px',
              display: 'flex',
              width: { xs: '100%', md: 'auto' },
              flexDirection: { xs: 'row', md: 'column' },
              justifyContent: { xs: 'center', md: 'flex-end' },
              gap: { xs: 1, md: 0 },
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: '#fff',
                fontFamily: 'Futura Md BT',
                fontSize: { xs: 14, md: 12 },
                fontWeight: 500,
              }}
            >
              {noAvailableSlots ? 'No hay lugares disponibles' : 'Disponible'}
            </Typography>
            {availableSlots && !noAvailableSlots && (
              <Typography
                sx={{
                  color: '#fff',
                  fontFamily: 'Futura-Bold',
                  fontSize: { xs: 14, md: 12 },
                  fontWeight: 500,
                }}
              >
                {availableSlots} {availableSlots === 1 ? 'lugar' : 'lugares'}
              </Typography>
            )}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          height: schedules?.length === 0 ? '100%' : 'auto',
        }}
      >
        {schedules?.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Image
              src="/assets/icons/checkout/calendar.svg"
              alt="calendar"
              width={97}
              height={97}
            />
            <Typography
              sx={{ color: '#919EAB', fontFamily: 'Futura Md BT', fontSize: 16, fontWeight: 400 }}
            >
              Ups! No se encuentra
            </Typography>
            <Typography
              sx={{ color: '#919EAB', fontFamily: 'Futura Md BT', fontSize: 16, fontWeight: 400 }}
            >
              disponibilidad para la fecha seleccionada
            </Typography>
          </Box>
        ) : (
          schedules?.map((schedule) => (
            <Button
              key={schedule.startTime}
              variant={selectedTime === schedule.startTime ? 'contained' : 'outlined'}
              onClick={() => {
                onTimeClick({
                  time: `${schedule.startTime} a ${schedule.endTime}`,
                  availableSlots: schedule.availableSlots,
                  availabilityId: schedule.availabilityId,
                  sku: ticket.sku,
                });
              }}
              sx={{
                minWidth: '100px',
                height: '38px',
                color:
                  selectedTime === `${schedule.startTime} a ${schedule.endTime}`
                    ? '#fff'
                    : '#919EAB',
                border: '0.971px solid rgba(231, 231, 231, 0.60)',
                borderRadius: '9px',
                fontFamily: 'Futura Md BT',
                backgroundColor:
                  selectedTime === `${schedule.startTime} a ${schedule.endTime}`
                    ? '#2DCDFF'
                    : '#fff',
                fontWeight: 400,
                fontSize: 13,
                '&:hover': {
                  backgroundColor:
                    selectedTime === `${schedule.startTime} a ${schedule.endTime}`
                      ? '#2DCDFF'
                      : '#EDEDED',
                  color:
                    selectedTime === `${schedule.startTime} a ${schedule.endTime}`
                      ? '#fff'
                      : '#333',
                },
              }}
            >
              {`${schedule.startTime} a ${schedule.endTime}`}
            </Button>
          ))
        )}
      </Box>
    </Box>
  );
}
