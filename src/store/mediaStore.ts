/* eslint-disable no-plusplus */
import { create } from 'zustand';

import { endpoints_minchin, createAxiosInstance } from 'src/utils/axiosInstance';

interface MediaState {
  loading: boolean;
  error: string | null;
  uploadImage: (file: string) => Promise<string | null>;
}

const base64ToBlob = (base64: string, mimeType: string) => {
  const bytes = atob(base64.split(',')[1]);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i);
  }
  return new Blob([arr], { type: mimeType });
};

export const useMediaStore = create<MediaState>((set) => ({
  loading: false,
  error: null,
  uploadImage: async (avatar: string) => {
    try {
      if (typeof avatar === 'string' && avatar.startsWith('data:image')) {
        const formData = new FormData();
        const type = avatar.split(';')[0].split('/')[1];
        const imageBlob = base64ToBlob(avatar, `image/${type}`);
        const filename = `avatar-${Date.now()}.${type}`;

        formData.append('file', imageBlob, filename);
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(endpoints_minchin.media.upload, formData);
        return response.data.url;
      }
      return null;
    } catch (err) {
      set({ error: 'Error al subir la imagen' });
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
