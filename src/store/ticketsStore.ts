import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';
import { create } from 'zustand';

import { getStorage, setStorage } from 'src/hooks/use-local-storage';

import { useCityStore } from './useCityStore';
import { KeysLocalStorage } from './localStorage';
import { endpoints_minchin, createAxiosInstance } from '../utils/axiosInstance';

export type Product = {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  access: boolean;
  age: string;
  infoTag: string;
  descriptionTag: string;
  longDescription: string;
  includedItems: string;
  image: string;
  rfc: string;
  descSchedule: string;
};

export type SelectedTicket = {
  product?: Product | null;
  reserveId?: string;
  adultCount?: number;
  childCount?: number;
  availabilityId?: string;
  time?: string;
  availableSlots?: number;
  reserverId?: string;
};
// Define el tipo para un horario individual
export type Schedule = {
  availabilityId: string;
  date: string;
  startTime: string;
  endTime: string;
  availableSlots: number;
};

// Define el tipo para la respuesta completa de fetchSchedules
type FetchSchedulesResponse = {
  productId: string;
  sku: string;
  name: string;
  schedules: Schedule[];
};

export interface OrderCheckout {
  sourceId?: string;
  deviceSessionId?: string;
  store?: string;
  eventDate?: string;
  responsive?: boolean;
  noticeOfPrivacy?: boolean;
  regulation?: boolean;
  products?: {
    id?: string;
    availabilityId?: string;
    reserveId?: string;
    quantity?: number;
  }[];
  attendees?: {
    name?: string;
    birthDate?: string;
    kind?: 'ADULT' | 'CHILD';
  }[];
  customer?: {
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    zipCode?: string;
    birthDate?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
  };
}

type State = {
  loading: boolean;
  totalPeople: number;
  maxAdultCount: number;
  maxChildCount: number;
  totalPrice: number;
  orderCheckout: OrderCheckout;
  idTicketSelected: string;
  products: Product[];
  selectedTickets: SelectedTicket[];
  dateSelected: string;
  activeFilter: string;
  isCartOpen: boolean; // Nuevo estado para el carrito
  cartButtonRef: React.RefObject<HTMLButtonElement> | null;
  checkout: {
    activeStep: number;
    completed: boolean;
    previousStep: number;
  };
};

type Checkout = {
  activeStep?: number;
  completed?: boolean;
};

export type TReserverData = {
  availabilityId: string;
  quantity: number;
  sku: string;
};

type AllTerms = {
  noticeOfPrivacy: boolean;
  responsive: boolean;
  regulation: boolean;
};

type Action = {
  setIdTicketSelected: (idTicketSelected: string) => void;
  fetchProducts: () => Promise<void>;
  setSelectedTickets: (tickets: SelectedTicket[]) => void;
  setActiveFilter: (filter: string) => void;
  setCartButtonRef: (ref: React.RefObject<HTMLButtonElement>) => void;
  toggleCart: () => void;
  fetchSchedules: (sku: string, date: string, city: string) => Promise<Schedule[]>;
  setDateSelected: (date: string | Dayjs) => void;
  setActiveStep: (checkout: Checkout) => void;
  createReserve: (
    reserverData: TReserverData[],
    eventDate: string
  ) => Promise<{ reserveId: any; sku: string }[]>;
  setAttendees: (attendees: OrderCheckout['attendees']) => void;
  setCustumerData: (customer: OrderCheckout['customer']) => void;
  setOrderCheckout: (orderCheckout: OrderCheckout) => void;
  setAllTerms: ({ noticeOfPrivacy, responsive, regulation }: AllTerms) => void;
  createOrder: (orderCheckout: OrderCheckout) => Promise<void>;
  reload: () => void;
};

export const useTicketStore = create<State & Action>((set, get): any => {
  let initialSelectedTickets: SelectedTicket[] = [];
  let initialOrderCheckout: OrderCheckout = {
    sourceId: '',
    deviceSessionId: '',
    store: '',
    eventDate: '',
    responsive: false,
    noticeOfPrivacy: false,
    regulation: false,
    products: [],
    attendees: [],
    customer: {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      zipCode: '',
      birthDate: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
    },
  };
  let initialTotalPeople = 0;
  let initialTotalPrice = 0;
  let initialMaxAdultCount = 0;
  let initialMaxChildCount = 0;
  let initialTimeLeft = 10 * 60; // 10 minutos en segundos
  let initialCountdownStarted = false;

  if (typeof window !== 'undefined') {
    const storedTotalPeople = getStorage(KeysLocalStorage.totalPeople);
    const storedTotalPrice = getStorage(KeysLocalStorage.totalPrice);
    const storedOrderCheckout = getStorage(KeysLocalStorage.orderCheckout);
    const storedTickets = getStorage(KeysLocalStorage.selectedTickets);
    const storedMaxAdultCount = getStorage(KeysLocalStorage.maxAdultCount);
    const storedMaxChildCount = getStorage(KeysLocalStorage.maxChildCount);
    const storedTimeLeft = getStorage(KeysLocalStorage.timeLeft);
    const storedCountdownStarted = getStorage(KeysLocalStorage.countdownStarted);

    initialSelectedTickets = storedTickets || [];
    initialOrderCheckout = storedOrderCheckout || initialOrderCheckout;
    initialTotalPeople = storedTotalPeople ? parseInt(storedTotalPeople, 10) : 0;
    initialTotalPrice = storedTotalPrice ? parseInt(storedTotalPrice, 10) : 0;
    initialMaxAdultCount = storedMaxAdultCount ? parseInt(storedMaxAdultCount, 10) : 0;
    initialMaxChildCount = storedMaxChildCount ? parseInt(storedMaxChildCount, 10) : 0;
    initialTimeLeft = storedTimeLeft ? parseInt(storedTimeLeft, 10) : initialTimeLeft;
    initialCountdownStarted = storedCountdownStarted === 'true';
  }

  const initialState = {
    orderCheckout: initialOrderCheckout,
    totalPeople: initialTotalPeople,
    maxAdultCount: initialMaxAdultCount,
    maxChildCount: initialMaxChildCount,
    totalPrice: initialTotalPrice,
    loading: false,
    idTicketSelected: '',
    dateSelected: dayjs().add(1, 'day'),
    products: [],
    selectedTickets: initialSelectedTickets,
    activeFilter: 'accesos',
    schedules: [],
    checkout: {
      activeStep: 0,
      completed: false,
      previousStep: 0,
    },
    cartButtonRef: null,
    isCartOpen: false, // Inicializado como cerrado
    timeLeft: initialTimeLeft,
    countdownStarted: initialCountdownStarted,
  };

  return {
    ...initialState,
    setIdTicketSelected: (idTicketSelected: string) => set({ idTicketSelected }),
    fetchProducts: async () => {
      const axiosInstance = createAxiosInstance();
      const { city } = useCityStore.getState();
      try {
        const response = await axiosInstance.get<Product[]>(
          endpoints_minchin.Products.replace(':storeId', city)
        );
        const sortedProducts = response.data.sort((a, b) => {
          if (a.access === b.access) return 0;
          return a.access ? 1 : -1;
        });
        set({ products: sortedProducts });
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
    setSelectedTickets: (tickets: SelectedTicket[]) => {
      const dataProdutsForCheckout: OrderCheckout['products'] = tickets.map((ticket) => ({
        id: ticket.product?.id || '',
        availabilityId: ticket?.availabilityId || '',
        reserveId: ticket?.reserveId || '',
        quantity: (ticket?.adultCount || 0) + (ticket?.childCount || 0),
      }));

      const sortedTickets = tickets.sort((a, b) => {
        if (a.product?.access === b.product?.access) return 0;
        return a.product?.access ? -1 : 1;
      });

      const maxAdultCount = Math.max(...tickets.map((ticket) => ticket.adultCount || 0));
      const maxChildCount = Math.max(...tickets.map((ticket) => ticket.childCount || 0));
      const totalPeople = maxAdultCount + maxChildCount;

      const totalPrice = tickets.reduce(
        (acc, ticket) =>
          acc +
          (ticket.product?.price || 0) * ((ticket.adultCount || 0) + (ticket.childCount || 0)),
        0
      );

      set({
        selectedTickets: sortedTickets,
        orderCheckout: { products: dataProdutsForCheckout, attendees: [] },
        totalPeople,
        maxAdultCount,
        maxChildCount,
        totalPrice,
      });
      if (typeof window !== 'undefined') {
        setStorage(KeysLocalStorage.selectedTickets, tickets);
        setStorage(KeysLocalStorage.totalPeople, totalPeople.toString());
        setStorage(KeysLocalStorage.totalPrice, totalPrice.toString());
        setStorage(KeysLocalStorage.orderCheckout, get().orderCheckout);
        setStorage(KeysLocalStorage.maxAdultCount, maxAdultCount.toString());
        setStorage(KeysLocalStorage.maxChildCount, maxChildCount.toString());
      }
    },
    setActiveFilter: (filter: string) => set({ activeFilter: filter }),
    setCartButtonRef: (ref: React.RefObject<HTMLButtonElement>) => set({ cartButtonRef: ref }),
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    fetchSchedules: async (sku: string, date: string, city: string): Promise<Schedule[]> => {
      const axiosInstance = createAxiosInstance();
      try {
        const response = await axiosInstance.get<FetchSchedulesResponse>(
          endpoints_minchin.Schedules.replace(':city', city)
            .replace(':sku', sku)
            .replace(':date', date) // '2024-09-01'
        );
        return response.data.schedules;
      } catch (error) {
        console.error('Error al obtener horarios:', error);
        return [];
      }
    },
    setDateSelected: (date: string) => {
      set({ dateSelected: date });
    },
    setActiveStep: ({ activeStep, completed = false }: Checkout) =>
      set({
        checkout: {
          activeStep: activeStep || 0,
          completed,
          previousStep: get().checkout.activeStep,
        },
      }),
    createReserve: async (
      reserverData: TReserverData[],
      eventDate: string
    ): Promise<{ reserveId: any; sku: string }[]> => {
      set({ loading: true });
      const axiosInstance = createAxiosInstance();
      try {
        const promises = reserverData.map(async (data) => {
          const response = await axiosInstance.post(endpoints_minchin.Reserve, {
            availabilityId: data.availabilityId,
            quantity: data.quantity,
          });
          return { reserveId: response.data.reserveId, sku: data.sku };
        });

        const results = await Promise.all(promises);
        const newListTickets = get().selectedTickets.map((ticket: SelectedTicket) => {
          const result = results.find((res) => res.sku === ticket.product?.sku);
          if (result) {
            return { ...ticket, reserveId: result.reserveId };
          }
          return ticket;
        });

        get().setSelectedTickets(newListTickets);
        set({
          orderCheckout: {
            ...get().orderCheckout,
            eventDate: dayjs(eventDate).format('YYYY-MM-DD'),
          },
        });

        return results;
      } catch (error) {
        console.error('Error al crear reserva:', error);
        throw error;
      } finally {
        set({ loading: false });
      }
    },
    setAttendees: (attendees: OrderCheckout['attendees']) => {
      set({ orderCheckout: { ...get().orderCheckout, attendees } });
      if (typeof window !== 'undefined') {
        setStorage(KeysLocalStorage.orderCheckout, { ...get().orderCheckout, attendees });
      }
    },
    setCustumerData: (customer: OrderCheckout['customer']) => {
      set({ orderCheckout: { ...get().orderCheckout, customer } });
      if (typeof window !== 'undefined') {
        setStorage(KeysLocalStorage.orderCheckout, { ...get().orderCheckout, customer });
      }
    },
    setAllTerms: ({ noticeOfPrivacy, responsive, regulation }: AllTerms) => {
      set({
        orderCheckout: {
          ...get().orderCheckout,
          responsive,
          regulation,
          noticeOfPrivacy,
        },
      });
    },
    setOrderCheckout: (orderCheckout: OrderCheckout) => {
      set({ orderCheckout });
    },
    createOrder: async (orderCheckout: OrderCheckout) => {
      const axiosInstance = createAxiosInstance();
      try {
        const response = await axiosInstance.post(endpoints_minchin.Order, orderCheckout);
        return response.data;
      } catch (error) {
        console.error('Error al crear orden:', error);
        return null;
      }
    },

    reload: () => {
      set({
        orderCheckout: undefined,
        totalPeople: 0,
        maxAdultCount: 0,
        maxChildCount: 0,
        totalPrice: 0,
        selectedTickets: [],
        dateSelected: '',
        products: [],
        checkout: {
          activeStep: 0,
          completed: false,
          previousStep: 0,
        },
      });
    },
  };
});
