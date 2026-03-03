import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-[300px] right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 animate-in slide-in-from-top duration-200">
      <div className="max-w-[850px] mx-auto px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0C0D33]">
            Электроды для ручной дуговой сварки
          </h2>
          <p className="text-sm text-gray-500">Глава 2 — Оборудование</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-[#0C0D33] transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#DD6207] text-white rounded-lg hover:bg-[#c45506] transition-colors text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            <span>Завершить</span>
          </button>

          <button className="p-2 text-gray-400 hover:text-[#0C0D33] transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
