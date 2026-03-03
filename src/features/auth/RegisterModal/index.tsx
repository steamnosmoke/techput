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
  const password = useAuthStore((s) => s.password);
  const confirm = useAuthStore((s) => s.confirm);
  const storeError = useAuthStore((state) => state.error);

  const setError = useAuthStore((state) => state.setError);
  const setName = useAuthStore((state) => state.setName);
  const setId = useAuthStore((state) => state.setId);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const setConfirm = useAuthStore((state) => state.setConfirm);

  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setError("");
    setEmail("");
    setPassword("");
    setConfirm("");
  }, [setError, setEmail, setPassword, setConfirm]);

  useEffect(() => {
    if (mutationError) {
      setError(mutationError.message);
    }
  }, [mutationError, setError]);

  const handleRegister = () => {
    console.log("1. Register clicked", { email, password, confirm });

    if (!email || !password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    register(
      { email, password, confirm },
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
          console.log("2. Registration error:", error);
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
        className={`modal relative bg-white py-8 px-16 rounded-xl w-full max-w-120 shadow-[0_8px_24px_rgba(0,0,0,0.2)] text-center flex flex-col items-center gap-4 transition-all duration-200 ${
          closing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="title text-xl mb-4 text-black">Регистрация</h2>

        <RegisterInputs />

        {displayError && (
          <p className="error text-red-500 text-sm mb-2 animate-shake">
            {displayError}
          </p>
        )}

        <Button
          twclass="!min-w-0 !py-2 !w-60 !text-lg !text-orange !border-2 hover:!text-white disabled:opacity-50 disabled:cursor-not-allowed"
          text={isPending ? "Registration..." : "Зарегистрироваться"}
          onClick={handleRegister}
        />

        <p className="to-login mt-4 text-base text-black">
          Уже есть аккаунт?{" "}
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
