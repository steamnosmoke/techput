import { useEffect } from "react";
import { NavLink } from "react-router";
import { useAuthStore } from "../../../auth/store/authStore";
import useGetNavs from "../../config/useGetNavs";
import useMenuStore from "../../store/useMenuStore";

export default function NavMenu() {
  const isOpen = useMenuStore((s) => s.isOpen);
  const toggleMenu = useMenuStore((s) => s.toggleMenu);
  const id = useAuthStore((s) => s.id);
  const navs = useGetNavs(id);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`nav-menu w-[60%] h-screen bg-deepBlue fixed z-[1000] top-16 right-0 ${
          isOpen ? "menu-open" : "menu-close"
        }`}
      >
        <ul className="flex flex-col items-end justify-start pt-4 pr-8 gap-7.5">
          {navs.map((el, key) => (
            <NavLink
              key={key}
              to={el.href}
              onClick={(e) => {
                if (el.href === "/profile" && id === "guest") {
                  e.preventDefault();
                }
                el.action();
                toggleMenu();
              }}
            >
              <li className="text-white text-right text-xl cursor-pointer transition-all ease-in duration-200 hover:text-orange-300">
                {el.name}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>

      <div
        className={`bg-black fixed top-0 left-0 w-screen h-screen ${
          isOpen ? "overlay-open" : "overlay-close"
        }`} onClick={toggleMenu}
      ></div>
    </>
  );
}
