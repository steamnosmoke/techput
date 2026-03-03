import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TContactStore } from "../types";

// Валидация email
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Валидация телефона (российские номера)
const validatePhone = (phone: string): boolean => {
  const phoneRegex =
    // eslint-disable-next-line no-useless-escape
    /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
};

// Валидация имени
const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-Zа-яА-Я\s-]+$/.test(name);
};

const useContactStore = create<TContactStore>()(
  persist(
    (set, get) => ({
      // Состояния
      name: "",
      email: "",
      phone: "",
      nameEr: "",
      emailEr: "",
      phoneEr: "",

      // Сеттеры (правильные!)
      setName: (value: string) => set({ name: value }),
      setEmail: (value: string) => set({ email: value }),
      setPhone: (value: string) => set({ phone: value }),

      // Сеттеры для ошибок
      setNameEr: (value: string) => set({ nameEr: value }),
      setEmailEr: (value: string) => set({ emailEr: value }),
      setPhoneEr: (value: string) => set({ phoneEr: value }),

      // Очистить форму
      clearForm: () =>
        set({
          name: "",
          email: "",
          phone: "",
          nameEr: "",
          emailEr: "",
          phoneEr: "",
        }),

      // Очистить ошибки
      clearErrors: () =>
        set({
          nameEr: "",
          emailEr: "",
          phoneEr: "",
        }),

      // Валидация всей формы
      validateForm: () => {
        const { name, email, phone } = get();
        let isValid = true;

        // Валидация имени
        if (!name.trim()) {
          set({ nameEr: "Имя обязательно для заполнения" });
          isValid = false;
        } else if (!validateName(name)) {
          set({
            nameEr: "Имя должно содержать минимум 2 символа и только буквы",
          });
          isValid = false;
        } else {
          set({ nameEr: "" });
        }

        // Валидация email
        if (!email.trim()) {
          set({ emailEr: "Email обязателен для заполнения" });
          isValid = false;
        } else if (!validateEmail(email)) {
          set({ emailEr: "Введите корректный email адрес" });
          isValid = false;
        } else {
          set({ emailEr: "" });
        }

        // Валидация телефона
        if (!phone.trim()) {
          set({ phoneEr: "Телефон обязателен для заполнения" });
          isValid = false;
        } else if (!validatePhone(phone)) {
          set({ phoneEr: "Введите корректный номер телефона" });
          isValid = false;
        } else {
          set({ phoneEr: "" });
        }

        return isValid;
      },
    }),
    {
      name: "contact-form-storage", // ключ в localStorage
      partialize: (state) => ({
        // Сохраняем только поля формы, не ошибки
        name: state.name,
        email: state.email,
        phone: state.phone,
      }),
    },
  ),
);

export default useContactStore;
