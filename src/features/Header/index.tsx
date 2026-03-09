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
    <div className="w-screen h-20 max-sm:h-16 bg-deepBlue fixed z-1000 top-0">
      <div className="container h-full flex items-center justify-between">
        <Link to="/" className="cursor-pointer" onClick={toggleMenu}>
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
    </div>
  );
}
