import { create } from 'zustand';

export type City = 'CDMX' | 'GDL' | 'PUE' | '';

type State = {
  city: City;
};

type Action = {
  setCity: (city: City) => void;
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
    setCity: (city: City) => {
      localStorage.setItem(STORAGE_KEY_CITY, city);
      set({ city });
    },
  };
});
