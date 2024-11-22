/* eslint-disable perfectionist/sort-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import type { Product, Schedule } from 'src/store/ticketsStore';

import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

import { Box, Alert, Button, Typography } from '@mui/material';

import { useCityStore } from 'src/store/useCityStore';
import { useTicketStore } from 'src/store/ticketsStore';

// Importa SunIcon según tu estructura de archivos
import SunIcon from 'src/components/svg/Sun';
import { Image } from 'src/components/image';
import { toast } from 'sonner';
import { useResponsive } from 'src/hooks/use-responsive';
import { useCheckout } from '../util/useChekout';

interface Props {
  ticket: Product;
  accessTime?: string | undefined;
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

export default function TimeSelection({ onTimeClick, ticket, accessTime }: Props) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [errorTime, setErrorTime] = useState<boolean>(false);
  const { fetchSchedules, selectedTickets, dateSelected } = useTicketStore();
  const { city, schedulesByDay } = useCityStore();

  const [noAvailableSlots, setNoAvailableSlots] = useState<boolean | 0 | undefined>(false);

  const mdUp = useResponsive('up', 'md');

  const selectedTime = selectedTickets.find((ticketg) => ticketg.product?.sku === ticket.sku)?.time;

  const availableSlots = selectedTickets.find(
    (ticketg) => ticketg.product?.sku === ticket.sku
  )?.availableSlots;

  const { isAvailableSlots } = useCheckout();

  const handleFetchSchedules = async () => {
    if (city !== '') {
      const fetchedSchedules = await fetchSchedules(
        ticket.sku,
        dayjs(dateSelected || dayjs().add(1, 'day')).format('YYYY-MM-DD'),
        city
      );
      setSchedules(fetchedSchedules);
    }
  };

  useEffect(() => {
    setNoAvailableSlots(isAvailableSlots({ ticket }));
    // Validar si el selectedTime tiene aún disponibles
    const selectedSchedule = schedules?.find(
      (schedule) => `${schedule.startTime} a ${schedule.endTime}` === selectedTime
    );
    if (selectedSchedule && selectedSchedule?.availableSlots <= 0) {
      setErrorTime(true);
    } else {
      setErrorTime(false);
    }
  }, [city, ticket, schedules, selectedTime]);

  useEffect(() => {
    handleFetchSchedules();
  }, [dateSelected]);

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
            {/* <Typography
              sx={{
                color: '#919EAB',
                fontFamily: 'Futura Bk BT',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              Abierto de {schedulesByDay.accessOpen} - {schedulesByDay.accessClose}
            </Typography> */}
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor:
              noAvailableSlots || availableSlots === 0 || errorTime ? '#ac1f1f' : '#F28C00',
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
            {noAvailableSlots || availableSlots === 0 || errorTime
              ? 'No hay lugares disponibles'
              : 'Disponible'}
          </Typography>
          {availableSlots && !errorTime ? (
            <Typography
              sx={{
                color: '#fff',
                fontFamily: 'Futura-Bold',
                fontSize: { xs: 14, md: 12 },
                fontWeight: 500,
              }}
            >
              {availableSlots} {availableSlots < 1 ? 'lugar' : 'lugares'}
            </Typography>
          ) : null}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          height: schedules?.length === 0 ? '100%' : 'auto',
        }}
      >
        {schedules?.length === 0 || !schedules ? (
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
                if (accessTime && !ticket.access) {
                  const initialTimeSelected = parseInt(accessTime?.slice(0, 3), 10);
                  const currentTime = parseInt(schedule.startTime.slice(0, 3), 10);
                  if (initialTimeSelected > currentTime) {
                    toast.custom(
                      (t) => (
                        <Alert severity="error">
                          {!mdUp
                            ? `${schedule.startTime} a ${schedule.endTime} es antes de la hora de ingreso.`
                            : `El horario ${schedule.startTime} a ${schedule.endTime} es antes de la hora de ingreso. modifica tu horario de acceso o selecciona otro horario para la interacción.`}
                        </Alert>
                      ),
                      { duration: 9000, position: 'bottom-left' }
                    );
                    return;
                  }
                }
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
      {ticket && !ticket.access && (
        <Alert severity="info">Recordar llegar 10 minutos antes de la actividad.</Alert>
      )}
    </Box>
  );
}
