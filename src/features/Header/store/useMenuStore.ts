import { create } from "zustand";
import type { TMenuStore } from "../types";

const useMenuStore = create<TMenuStore>()((set) => ({
  isOpen: false,
  toggleMenu: (v) => set({ isOpen: v }),
}));

export default useMenuStore;
