import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "../store/authStore";
import { useRegister } from "./hooks/UseRegister";

import type { TModalProps } from "../types/types";
import { useOpenModal } from "../utils/useOpenModal";

import RegisterInputs from "./components/RegisterInputs";
import Button from "../../../shared/components/Button";

export default function RegisterModal({
  onClose,
  onSwitchToLogin,
}: TModalProps) {
  const navigate = useNavigate();

  const { mutate: register, isPending, error: mutationError } = useRegister();

  const email = useAuthStore((s) => s.email);
  const phone = useAuthStore((s) => s.phone);
  const name = useAuthStore((s) => s.name);
  const password = useAuthStore((s) => s.password);
  const confirm = useAuthStore((s) => s.confirm);
  const storeError = useAuthStore((state) => state.error);

  const setError = useAuthStore((state) => state.setError);
  const setPhone = useAuthStore((state) => state.setPhone);
  const setName = useAuthStore((state) => state.setName);
  const setId = useAuthStore((state) => state.setId);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const setConfirm = useAuthStore((state) => state.setConfirm);

  const [closing, setClosing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setError("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setName("");
    setPhone("");
  }, []);

  useEffect(() => {
    if (mutationError) {
      setError(mutationError.message);
    }
  }, [mutationError, setError]);

  // Функция валидации
  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Проверка имени
    if (!name.trim()) {
      errors.name = "Имя обязательно для заполнения";
    } else if (name.length < 2) {
      errors.name = "Имя должно содержать минимум 2 символа";
    } else if (name.length > 50) {
      errors.name = "Имя не должно превышать 50 символов";
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name)) {
      errors.name = "Имя может содержать только буквы, пробелы и дефисы";
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email обязателен для заполнения";
    } else if (!emailRegex.test(email)) {
      errors.email = "Введите корректный email адрес";
    }

    // Проверка телефона
    const phoneRegex = /^[\d+\-\s()]+$/;
    const cleanPhone = phone.replace(/[\s\-()]/g, "");

    if (!phone.trim()) {
      errors.phone = "Номер телефона обязателен для заполнения";
    } else if (!phoneRegex.test(phone)) {
      errors.phone =
        "Номер телефона может содержать только цифры и символы +, -, (, )";
    } else if (cleanPhone.length < 10) {
      errors.phone = "Номер телефона должен содержать минимум 10 цифр";
    } else if (cleanPhone.length > 15) {
      errors.phone = "Номер телефона не должен превышать 15 цифр";
    }

    // Проверка пароля
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!password) {
      errors.password = "Пароль обязателен для заполнения";
    } else if (password.length < 6) {
      errors.password = "Пароль должен содержать минимум 6 символов";
    } else if (password.length > 50) {
      errors.password = "Пароль не должен превышать 50 символов";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ (@$!%*?&)";
    }

    // Проверка подтверждения пароля
    if (!confirm) {
      errors.confirm = "Подтверждение пароля обязательно";
    } else if (password !== confirm) {
      errors.confirm = "Пароли не совпадают";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = () => {
    // Очищаем предыдущие ошибки
    setError("");
    setFieldErrors({});

    // Валидация
    if (!validateForm()) {
      return;
    }

    register(
      { email, password, confirm, name, phone },
      {
        onSuccess: (userData) => {
          setName(userData.name);
          setId(userData.id);
          handleClose();
          setTimeout(() => {
            navigate("/profile");
          }, 300);
        },
        onError: (error) => {
          setError(error.message);
        },
      },
    );
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useOpenModal();

  const displayError = storeError || mutationError?.message || "";

  return (
    <div
      className={`modal-overlay fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-1000 transition-all duration-200 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`modal relative bg-white py-8 max-sm:py-4 px-16 max-sm:px-4 rounded-xl w-full max-w-120 max-sm:max-w-90 shadow-[0_8px_24px_rgba(0,0,0,0.2)] text-center flex flex-col items-center gap-4 max-sm:gap-2 transition-all duration-200 ${
          closing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="title text-xl mb-4 max-sm:mb-2 text-black">
          Регистрация
        </h2>

        <RegisterInputs fieldErrors={fieldErrors} />

        {displayError && (
          <p className="error text-red-500 text-sm mb-2 animate-shake">
            {displayError}
          </p>
        )}

        <Button
          twclass="!min-w-0 !py-2 !px-2 !w-60 !text-lg max-sm:!text-base !text-orange !border-2 hover:!text-white disabled:opacity-50 disabled:cursor-not-allowed !my-2"
          text={isPending ? "Регистрация..." : "Зарегистрироваться"}
          onClick={handleRegister}
          disabled={isPending}
        />

        <p className="to-login mt-4 text-base text-black">
          Уже есть аккаунт? <br className="hidden max-sm:block" />
          <button
            className="text-black font-bold underline cursor-pointer transition-all duration-200 hover:opacity-70 bg-transparent border-none p-0"
            onClick={onSwitchToLogin}
            disabled={isPending}
          >
            Войти
          </button>
        </p>
      </div>
    </div>
  );
}
