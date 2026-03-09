export default function BlueCertificate() {
  return (
    <div className="bg-blue-600 rounded-lg shadow-2xl p-5 w-48 transform rotate-3 max-sm:scale-80 max-sm:origin-top z-20 -ml-4">
      <div className="text-white">
        <div className="flex justify-between items-start mb-2">
          <div className="text-[10px] text-blue-200">SWARKA</div>
          <div className="text-[10px] text-blue-200">©</div>
        </div>

        <div className="text-xs font-medium mb-4 tracking-wider">
          СЕРТИФИКАТ
        </div>

        <div className="text-xl font-bold leading-tight mb-1">Фродо</div>
        <div className="text-xl font-bold leading-tight mb-4">Беггинс</div>

        <div className="pt-3 border-t border-blue-500">
          <div className="text-[10px] text-blue-200 mb-0.5">Профессия</div>
          <div className="text-xs font-medium">Сварщик</div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="w-5 h-5 bg-white rounded-full opacity-30"></div>
          <div className="w-5 h-5 bg-white rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  );
}
