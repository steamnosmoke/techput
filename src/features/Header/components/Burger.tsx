import { useEffect, useState } from "react";
import useMenuStore from "../store/useMenuStore";

export default function Burger() {
  const isOpen = useMenuStore((s) => s.isOpen);
  const toggleMenu = useMenuStore((s) => s.toggleMenu);

  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isOpen) setHasInteracted(true);
  }, [isOpen]);

  const getClass = (type: "upper" | "middle" | "lower") => {
    if (!hasInteracted) return ""; // 👈 без анимации при первом рендере
    return `${type}${isOpen ? "-open" : "-close"}`;
  };

  return (
    <div
      className="w-5 h-3 flex flex-col justify-between cursor-pointer"
      onClick={() => {
        setHasInteracted(true);
        toggleMenu();
      }}
    >
      <div className={`${getClass("upper")} w-full h-0.5 bg-white`} />
      <div className={`${getClass("middle")} w-full h-0.5 bg-white`} />
      <div className={`${getClass("lower")} w-full h-0.5 bg-white`} />
    </div>
  );
}
