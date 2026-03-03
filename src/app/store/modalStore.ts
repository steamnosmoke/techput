import { create } from "zustand";

import type { TAuthModalStore } from "../types/ModalTypes";

export const useModalStore = create<TAuthModalStore>()((set) => ({
  isAuthModalOpen: false,
  isRegisterModalOpen: false,

  openAuthModal: () =>
    set(() => ({
      isAuthModalOpen: true,
      isRegisterModalOpen: false,
    })),
  openRegisterModal: () =>
    set(() => ({
      isAuthModalOpen: false,
      isRegisterModalOpen: true,
    })),
  closeModals: () =>
    set(() => ({
      isAuthModalOpen: false,
      isRegisterModalOpen: false,
    })),
}));
