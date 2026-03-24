import { Home, ChevronRight} from "lucide-react";

export const ContentHeader = () => {

  return (
    <div className="mb-8">

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap max-sm:text-xs">
        <a className="flex items-center gap-1 text-gray-400">
          <Home className="w-4 h-4" />
          <span>Главная</span>
        </a>
        <ChevronRight className="w-4 h-4 text-gray-300" />
        <span className="text-gray-400">Обучение</span>
        <ChevronRight className="w-4 h-4 text-gray-300" />
        <span className="text-gray-400">Глава 2</span>
        <ChevronRight className="w-4 h-4 text-gray-300" />
        <span className="text-[#0C0D33] font-medium">Электроды</span>
      </nav>

      {/* Title */}
      <div
        className="flex items-start justify-between gap-8 
      max-sm:flex-col max-sm:gap-4"
      >
        <div className="flex-1">
          <h1
            className="text-3xl font-bold text-[#0C0D33] mb-3 
          max-sm:text-xl"
          >
            Электроды для ручной дуговой сварки
          </h1>
          <p
            className="text-gray-600 text-lg leading-relaxed 
          max-sm:text-sm"
          >
            Изучите классификацию, маркировку и правила выбора электродов.
          </p>
        </div>

        <div className="w-48 flex-shrink-0 max-sm:w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Прогресс главы</span>
            <span className="text-sm font-semibold text-[#DD6207]">60%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[60%] bg-[#DD6207]" />
          </div>
        </div>
      </div>
    </div>
  );
};
