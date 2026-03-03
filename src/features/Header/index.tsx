
import { Link, NavLink } from "react-router";
import { useAuthStore } from "../auth/store/authStore";
import useClickProfile from "./hooks/useClickProfile";

export default function Header() {
  const onClickProfile = useClickProfile();
  const navsGuest = [
    { name: "AI-Помощник", href: "/ai-assistant", action: () => {} },
    { name: "Купить доступ", href: "/buy-access", action: () => {} },
    { name: "Войти", href: "/profile", action: onClickProfile },
  ];
  const navsUser = [
    { name: "AI-Помощник", href: "/ai-assistant", action: () => {} },
    { name: "Курс", href: "/course", action: () => {} },
    { name: "Профиль", href: "/profile", action: onClickProfile },
  ];
  const id = useAuthStore((s) => s.id);
  return (
    <div className="w-full h-20 bg-deepBlue fixed z-1000 top-0">
      <div className="container h-full flex items-center justify-between">
        <Link to={"/"} className="cursor-pointer">
          <p className="text-4xl !font-nk text-white uppercase" >Тех.Путь</p>
        </Link>

        <ul className="flex items-center justify-between gap-7.5">
          {id !== "guest"
            ? navsUser.map((el, key) => (
                <NavLink
                  key={key}
                  to={el.href}
                  onClick={(e) => {
                    if (el.href === "/profile" && id === "guest") {
                      e.preventDefault();
                    }
                    el.action();
                  }}
                >
                  <li className="text-white text-center text-xl cursor-pointer transition-all ease-in duration-200 hover:text-orange-300">
                    {el.name}
                  </li>
                </NavLink>
              ))
            : navsGuest.map((el, key) => (
                <NavLink
                  key={key}
                  to={el.href}
                  onClick={(e) => {
                    if (el.href === "/profile" && id === "guest") {
                      e.preventDefault();
                    }
                    el.action();
                  }}
                >
                  <li className="text-white text-center text-xl cursor-pointer transition-all ease-in duration-200 hover:text-orange-300">
                    {el.name}
                  </li>
                </NavLink>
              ))}
        </ul>
      </div>
    </div>
  );
}
