import { create } from "zustand";
import type { TMenuStore } from "../types";

const useMenuStore = create<TMenuStore>()((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useMenuStore;