import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useAuthStore } from "../../../auth/store/authStore";
import useGetNavs from "../../config/useGetNavs";
import useMenuStore from "../../store/useMenuStore";

export default function NavMenu() {
  const isOpen = useMenuStore((s) => s.isOpen);
  const toggleMenu = useMenuStore((s) => s.toggleMenu);
  const id = useAuthStore((s) => s.id);
  const navs = useGetNavs(id);

  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    if (isOpen) setHasInteracted(true);

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const getMenuClass = () => {
    if (!hasInteracted) return "translate-x-full"; // 👈 сразу скрыто БЕЗ анимации
    return isOpen ? "menu-open" : "menu-close";
  };

  const getOverlayClass = () => {
    if (!hasInteracted) return "opacity-0";
    return isOpen ? "overlay-open max-sm:block" : "overlay-close max-sm:hidden";
  };

  return (
    <>
      {/* MENU */}
      <div
        className={`nav-menu 
        hidden max-sm:block
        w-[80%] h-screen bg-deepBlue
        fixed z-[1000] top-16 right-0 
        ${getMenuClass()}`}
      >
        <ul className="flex flex-col items-end pt-6 pr-6 gap-6">
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
              <li className="text-white text-right text-xl max-sm:text-lg cursor-pointer transition-all duration-200 hover:text-orange-300">
                {el.name}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>

      {/* OVERLAY */}
      <div
        onClick={() => {
          toggleMenu();
          setHasInteracted(true);
        }}
        className={`bg-black hidden  fixed top-0 left-0 w-screen h-screen z-[999] ${getOverlayClass()}`}
      />
    </>
  );
}
