import { create } from 'zustand';

import { getStorage, setStorage } from 'src/hooks/use-local-storage';

import { endpoints_minchin, createAxiosInstance } from 'src/utils/axiosInstance';

import { useUserStore } from './UserStore';
import { useTicketStore } from './ticketsStore';
import { KeysLocalStorage, removeAllStorage } from './localStorage';

type DataSignup = {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  zipCode: string;
  country: string;
  state: string;
  city: string;
};

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  userAuth0: string | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (dataSignup: DataSignup) => Promise<void>;
  logout: () => void;
  sendEmailChangePassword: (email: string) => Promise<void>;
  validatePasswordChange: (token: string, email: string, password: string) => Promise<void>;
  getUserAuth0: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => {
  let initialAccessToken = null;
  let initialAuthenticated = false;
  if (typeof window !== 'undefined') {
    initialAccessToken = getStorage(KeysLocalStorage.keyAccessToken);
    initialAuthenticated = getStorage(KeysLocalStorage.keyAuthenticated) === 'true';
  }

  return {
    loading: false,
    isAuthenticated: initialAuthenticated,
    userAuth0: null,
    accessToken: initialAccessToken,
    login: async (email, password) => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(endpoints_minchin.auth.login, {
          email,
          password,
        });
        set({ isAuthenticated: true, accessToken: response.data.access_token });
        if (typeof window !== 'undefined') {
          setStorage(KeysLocalStorage.keyAccessToken, response.data.access_token);
          setStorage(KeysLocalStorage.keyAuthenticated, 'true');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(KeysLocalStorage.keyAuthenticated);
        }
      }
    },

    getUserAuth0: async () => {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(endpoints_minchin.auth.meAuth0);
      set({ userAuth0: response.data });
    },
    signup: async (dataSignup: DataSignup) => {
      const axiosInstance = createAxiosInstance();
      try {
        const response = await axiosInstance.post(endpoints_minchin.auth.signup, dataSignup);
        set({ isAuthenticated: true, accessToken: response.data.access_token });
        if (typeof window !== 'undefined') {
          setStorage(KeysLocalStorage.keyAccessToken, response.data.access_token);
          setStorage(KeysLocalStorage.keyAuthenticated, 'true');
        }
      } catch (error) {
        console.error('Error al registrar:', error);
        throw error;
      }
    },
    logout: () => {
      set({ isAuthenticated: false, userAuth0: null, accessToken: null });
      useUserStore.getState().logout();
      useTicketStore.getState().reload();
      removeAllStorage();
    },
    sendEmailChangePassword: async (email) => {
      const axiosInstance = createAxiosInstance();
      try {
        const response = await axiosInstance.post(endpoints_minchin.auth.changePassword, { email });
        return response.data;
      } catch (error) {
        console.error('Error al enviar el correo para cambiar la contraseña:', error);
        throw error;
      }
    },
    validatePasswordChange: async (token, email, password) => {
      const axiosInstance = createAxiosInstance();
      try {
        const response = await axiosInstance.post(endpoints_minchin.auth.validatePassword, {
          token,
          email,
          password,
        });
        return response.data;
      } catch (error) {
        console.error('Error al validar el cambio de contraseña:', error);
        throw error;
      }
    },
  };
});

export default useAuthStore;
