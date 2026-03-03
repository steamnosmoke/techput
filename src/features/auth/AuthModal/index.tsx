import { useEffect, useState } from "react";

import { useAuthStore } from "../store/authStore";
import { useLogin } from "./hooks/useAuth";

import type { TModalProps } from "../types/types";


import AuthInputs from "./components/AuthInputs";
import Button from "../../../shared/components/Button";
import { useOpenModal } from "../utils/useOpenModal";

export default function AuthModal({
  onClose,
  onSwitchToRegister,
}: TModalProps) {
  const [closing, setClosing] = useState(false);

  const { mutate: login } = useLogin();

  const email = useAuthStore((s) => s.email);
  const password = useAuthStore((s) => s.password);
  const error = useAuthStore((s) => s.error);

  const setError = useAuthStore((s) => s.setError);
  const setId = useAuthStore((s) => s.setId);
  const setName = useAuthStore((s) => s.setName);

  const onLogin = () => {
    login(
      { email, password },
      {
        onSuccess: (userData) => {
          setId(userData.id);
          setName(userData.name);
          onClose();
        },
        onError: (err) => {
          setError(err.message);
        },
      }
    );
  };

  const onClickClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  useEffect(() => {
    setClosing(false);
  }, []);

  useOpenModal();
  return (
    <div
      className={`modal-overlay fixed top-0 left-0  w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-1000 transition-all duration-200 ${
        closing ? "close" : ""
      }`}
      onClick={onClickClose}
    >
      <div
        className="modal relative bg-white py-8 px-16 rounded-xl w-full max-w-120 shadow-[0_8px_24px_rgba(0,0,0,0.2)] text-center flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <img
          src={close}
          className="absolute top-4 right-4 w-3 h-3 cursor-pointer transition-all duration-100 hover:opacity-60"
          onClick={onClickClose}
        /> */}
        <h2 className="title text-xl my-4 text-black">Вход</h2>

        <AuthInputs />

        {error && <p className="error text-red-500 text-base mb-4">{error}</p>}

        <Button
          twclass=" !min-w-0 !py-2 !w-60 !text-lg !text-orange !border-2 hover:!text-white"
          text="Войти"
          onClick={onLogin}
        />

        <p className="to-register mt-4 text-base text-black">
          Нет аккаунта?{" "}
          <span
            className="to-register-button text-black font-bold underline cursor-pointer transition-all duration-200 hover:opacity-70"
            onClick={onSwitchToRegister}
          >
            Зарегистрируйтесь
          </span>
        </p>
      </div>
    </div>
  );
}
