import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export const NavigationFooter = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mb-8">
        <button className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-[#0C0D33] transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Предыдущий урок</span>
        </button>

        <button className="flex items-center gap-2 px-6 py-3 bg-[#DD6207] text-white rounded-xl hover:bg-[#c45506] transition-colors shadow-lg shadow-orange-200 group">
          <span className="font-medium">Следующий урок</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Complete Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
            isCompleted
              ? 'bg-green-100 text-green-700'
              : 'bg-[#0C0D33] text-white hover:bg-[#1a1b4b] shadow-xl shadow-blue-900/20'
          }`}
        >
          <CheckCircle
            className={`w-5 h-5 ${isCompleted ? 'fill-green-700 text-green-700' : ''}`}
          />
          <span>
            {isCompleted ? 'Урок завершён' : 'Отметить как завершено'}
          </span>
        </button>
      </div>

      {/* Practice Task Preview */}
      <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0C0D33] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">ПЗ</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#0C0D33] mb-1">
              Практическое задание
            </h4>
            <p className="text-gray-600 text-sm mb-3">
              Выполните сварку контрольного шва на учебном образце. Загрузите фото
              результата для проверки ИИ-ассистентом.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-[#DD6207] hover:text-[#DD6207] transition-colors">
                Подробнее
              </button>
              <button className="px-4 py-2 bg-[#0C0D33] rounded-lg text-sm font-medium text-white hover:bg-[#1a1b4b] transition-colors">
                Отправить результат в AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
