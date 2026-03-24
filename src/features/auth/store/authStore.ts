import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TAuthStore } from "../types/AuthTypes";

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set) => ({
      id: "guest",
      name: "",
      email: "",
      password: "",
      confirm: "",
      error: "",
      phone: "",
      status: false,

      setEmail: (email) => set({ email, error: "" }), // Очищаем ошибку при изменении
      setPhone: (phone) => set({ phone, error: "" }),
      setStatus: (status) => set({ status, error: "" }),
      setName: (name) => set({ name, error: "" }),
      setPassword: (password) => set({ password, error: "" }),
      setConfirm: (confirm) => set({ confirm, error: "" }),
      logOut: () =>
        set({
          id: "guest",
          name: "",
          email: "",
          password: "",
          confirm: "",
          phone: "",
          error: "",
          status: false,
        }),
      setId: (id) => set({ id }),
      setError: (error) => set({ error }),
    }),
    {
      name: "swarka-user-storage",
      partialize: (state) => ({
        id: state.id,
      }),
    },
  ),
);
