import { create } from 'zustand';

type State = {
  openMenu: boolean;
};

type Action = {
  setOpenMenu: (openMenu: boolean) => void;
};

export const useMenuStore = create<State & Action>((set) => ({
  /// This is the state
  openMenu: false,

  /// This is the action
  setOpenMenu: (openMenu: boolean) => set({ openMenu }),
}));
