import { Link, NavLink } from "react-router";
import { useAuthStore } from "../auth/store/authStore";
import Burger from "./components/Burger";
import useGetNavs from "./config/useGetNavs";
import useMenuStore from "./store/useMenuStore";

export default function Header() {
  const id = useAuthStore((s) => s.id);
  const navs = useGetNavs(id);
  const toggleMenu = useMenuStore((s) => s.toggleMenu);

  return (
    <header className="fixed left-1/2 top-4 max-md:inset-0 w-[calc(100%-24px)] max-md:w-full h-20 md:-translate-x-1/2 max-sm:h-16 z-50">
      <div className="container w-full! h-full flex items-center justify-between relative bg-deepBlue/80 px-10! md:rounded-4xl mx-auto! backdrop-blur-sm md:border-4 md:border-deepBlue">
        <Link
          to="/"
          className="cursor-pointer"
          onClick={() => toggleMenu(false)}
        >
          <p className="text-4xl max-sm:text-xl font-nk! text-white uppercase">
            Тех.Путь
          </p>
        </Link>

        <div className="block max-sm:hidden">
          <ul className="flex items-center justify-between gap-7.5">
            {navs.map((el, key) => (
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

        <div className="hidden max-sm:block">
          <Burger />
        </div>
      </div>
    </header>
  );
}
