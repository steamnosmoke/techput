import useClickProfile from "../hooks/useClickProfile";
import type { TNav } from "../types";

export default function useGetNavs(id: string): TNav[] {
  const onClickProfile = useClickProfile();
  const navsGuest: TNav[] = [
    { name: "AI-Помощник", href: "/ai-assistant", action: () => {} },
    { name: "Купить доступ", href: "/buy-access", action: () => {} },
    { name: "Войти", href: "/profile", action: onClickProfile },
  ];

  const navsUser: TNav[] = [
    { name: "AI-Помощник", href: "/ai-assistant", action: () => {} },
    { name: "Курс", href: "/course", action: () => {} },
    { name: "Профиль", href: "/profile", action: onClickProfile },
  ];

  return id !== "guest" ? navsUser : navsGuest;
}