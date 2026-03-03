import { useAuthStore } from "../../store/authStore";
import type { TInputs } from "../../types/types";

export default function useAuthInputs(): TInputs[] {
  const email = useAuthStore((s) => s.email);
  const password = useAuthStore((s) => s.password);
  const setEmail = useAuthStore((s) => s.setEmail);
  const setPassword = useAuthStore((s) => s.setPassword);

  return [
    {
      type: "email",
      label: "email",
      value: email,
      placeholder: "example@swarka.ru",
      func: setEmail,
    },
    {
      type: "password",
      label: "Password",
      value: password,
      placeholder: "Password123!",
      func: setPassword,
    },
  ];
}
