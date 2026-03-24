import { useAuthStore } from "../../store/authStore";
import type { TInputs } from "../../types/types";

interface RegisterInputsProps {
  fieldErrors?: Record<string, string>;
}

export default function RegisterInputs({
  fieldErrors = {},
}: RegisterInputsProps) {
  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);
  const confirm = useAuthStore((state) => state.confirm);
  const name = useAuthStore((state) => state.name);
  const phone = useAuthStore((state) => state.phone);

  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const setConfirm = useAuthStore((state) => state.setConfirm);
  const setName = useAuthStore((state) => state.setName);
  const setPhone = useAuthStore((state) => state.setPhone);

  const inputs: TInputs[] = [
    {
      type: "text",
      label: "Имя",
      value: name,
      placeholder: "Гарри",
      func: setName,
      fieldName: "name",
    },
    {
      type: "email",
      label: "Email",
      value: email,
      placeholder: "example@techway.ru",
      func: setEmail,
      fieldName: "email",
    },
    {
      type: "tel",
      label: "Номер телефона",
      value: phone,
      placeholder: "+7 (999) 123-45-67",
      func: setPhone,
      fieldName: "phone",
    },
    {
      type: "password",
      label: "Пароль",
      value: password,
      placeholder: "Password123!",
      func: setPassword,
      fieldName: "password",
    },
    {
      type: "password",
      label: "Подтверждение пароля",
      value: confirm,
      placeholder: "Password123!",
      func: setConfirm,
      fieldName: "confirm",
    },
  ];

  return (
    <ul className="list flex flex-col gap-4 max-w-150 w-full">
      {inputs.map((el) => (
        <li key={el.label} className="relative">
          <label
            htmlFor={el.label}
            className="capitalize absolute left-4 top-2 text-[14px] cursor-text"
          >
            {el.label}
          </label>
          <input
            className={`pt-8 px-4 pb-2 border rounded-lg max-w-150 w-full placeholder:text-stone-500 transition-all duration-200 hover:border-black focus:outline-none focus:ring-2 ${
              fieldErrors[el.fieldName]
                ? "border-red-500 focus:ring-red-500"
                : "border-stone-300 focus:ring-orange-500 focus:border-orange-500"
            }`}
            type={el.type}
            name={el.label}
            placeholder={el.placeholder}
            id={el.label}
            value={el.value}
            onChange={(e) => el.func(e.target.value)}
          />
          {fieldErrors[el.fieldName] && (
            <p className="text-red-500 text-xs mt-1 text-left animate-shake">
              {fieldErrors[el.fieldName]}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
