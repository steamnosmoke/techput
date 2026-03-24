import { create } from "zustand";

type State = {
  isOpen: boolean;
  isMounted: boolean;
  open: () => void;
  close: () => void;
};

const useCourseMenuStore = create<State>((set) => ({
  isOpen: false,
  isMounted: false,
  open: () => set({ isOpen: true, isMounted: true }),
  close: () => set({ isOpen: false }),
}));

export default useCourseMenuStore;
