import { create } from 'zustand';

import { endpoints_minchin, createAxiosInstance } from 'src/utils/axiosInstance';

export type City = 'CDMX' | 'GDL' | 'PUE' | '';

type ScheduleByDay = {
  accessOpen: string;
  accessClose: string;
};

type Schedules = {
  id: string;
  day: string;
  ticketOfficeOpen: string;
  ticketOfficeClose: string;
  accessOpen: string;
  accessClose: string;
  store: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type State = {
  city: City;
  schedules: Schedules[];
  schedulesByDay: ScheduleByDay;
  loading: boolean;
};

type Action = {
  setCity: (city: City) => void;
  getSchedules: () => Promise<void>;
  getSchedulesByDay: () => Promise<void>;
};

export const STORAGE_KEY_CITY = 'selectedCity';

export const useCityStore = create<State & Action>((set, get) => {
  let initialCity: City = '';

  if (typeof window !== 'undefined') {
    const storedCity = localStorage.getItem(STORAGE_KEY_CITY) as City;
    initialCity = storedCity || '';
  }

  return {
    city: initialCity,
    schedules: [],
    schedulesByDay: {
      accessOpen: '',
      accessClose: '',
    },
    loading: false,
    setCity: (city: City) => {
      localStorage.setItem(STORAGE_KEY_CITY, city);
      set({ city });
    },
    getSchedules: async () => {
      try {
        set({ loading: true });
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
          endpoints_minchin.facilitiesSchedule.findAll.replace(':storeId', get().city)
        );

        set({ schedules: response.data as Schedules[], loading: false });
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    },
    getSchedulesByDay: async () => {
      try {
        set({ loading: true });
        const axiosInstance = createAxiosInstance();
        const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase(); // 'lunes'

        const response = await axiosInstance.get(
          endpoints_minchin.facilitiesSchedule.byDay
            .replace(':storeId', get().city)
            .replace(':day', today)
        );

        set({ schedulesByDay: response.data as ScheduleByDay, loading: false });
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    },
  };
});
