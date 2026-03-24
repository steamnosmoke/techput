import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

export const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="
      fixed top-16 right-0 left-0 lg:left-80
      bg-white/95 backdrop-blur-md border-b border-gray-200 
      z-40 animate-in slide-in-from-top duration-200
    "
    >
      <div
        className="
        max-w-[1100px] mx-auto px-8 py-4 
        flex items-center justify-between
        max-sm:px-4 max-sm:py-3
      "
      >
        {/* TEXT */}
        <div>
          <h2 className="text-lg font-bold text-[#0C0D33] max-sm:text-sm">
            Электроды для ручной дуговой сварки
          </h2>
          <p className="text-sm text-gray-500 max-sm:text-xs">
            Глава 2 — Оборудование
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-4 max-sm:gap-2">
          <button className="p-2 text-gray-400 hover:text-[#0C0D33] transition-colors">
            <ChevronLeft className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
          </button>

          <button
            className="
            flex items-center gap-2 px-4 py-2 
            bg-[#DD6207] text-white rounded-lg 
            hover:bg-[#c45506] transition-colors 
            text-sm font-medium
            max-sm:px-3 max-sm:py-1.5 max-sm:text-xs
          "
          >
            <CheckCircle className="w-4 h-4 max-sm:w-3 max-sm:h-3" />
            <span className="max-sm:hidden">Завершить</span>
          </button>

          <button className="p-2 text-gray-400 hover:text-[#0C0D33] transition-colors">
            <ChevronRight className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
