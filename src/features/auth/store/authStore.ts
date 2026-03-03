import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TAuthStore } from "../types/AuthTypes";

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set) => ({
      id : "guest",
      name: "",
      email: "",
      password: "",
      confirm: "",
      error: "",

      setEmail: (email) => set({ email }),
      setName: (name) => set({ name }),
      setPassword: (password) => set({ password }),
      setConfirm: (confirm) => set({ confirm }),
      logOut: () =>
        set({
          id: "guest",
        }),
      setId: (id) => set({ id }),
      setError: (error) => set({ error }),
    }),
    {
      name: "swarka-user-storage",
      partialize: (state) => ({
        id: state.id,
      }),
    }
  )
);
