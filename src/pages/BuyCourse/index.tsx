import {
  Check,
  X,
  Sparkles,
  BookOpen,
  Video,
  Zap,
  Users,
  Briefcase,
  Cog,
} from "lucide-react";
import { useAuthStore } from "../../features/auth/store/authStore";
import { useModalStore } from "../../app/store/modalStore";
import { useNavigate } from "react-router";

export default function BuyCourse() {
  const userId = useAuthStore((state) => state.id);
  const setStatus = useAuthStore((state) => state.setStatus);
  const openAuthModal = useModalStore((state) => state.openAuthModal);
  const navigate = useNavigate();

  const features = [
    { name: "Теория", free: false, pro: true },
    { name: "Видео", free: false, pro: true },
    { name: "Трехдневная практика", free: false, pro: true },
    { name: "AI анализ", free: "1 в день", pro: "Без ограничений" },
    { name: "AI консультация", free: "5 в день", pro: "Без ограничений" },
    { name: "История прогресса", free: false, pro: true },
    { name: "Обновления", free: false, pro: true },
  ];

  const includes = [
    { icon: BookOpen, text: "8 теоретических разделов" },
    { icon: Video, text: "40+ видео" },
    { icon: Cog, text: "3 дня практики" },
    { icon: Sparkles, text: "AI-помощник 24/7" },
    { icon: Zap, text: "Разбор дефектов" },
    { icon: Check, text: "Обновления материалов" },
  ];

  const audiences = [
    { icon: Users, text: "Начинаете с нуля" },
    { icon: Zap, text: "Уже варите, но хотите улучшить качество" },
    { icon: Briefcase, text: "Готовитесь к работе на производстве" },
  ];

  const onBuy = () => {
    if (userId === "guest") openAuthModal();
    else {
      setStatus(true);
      navigate("/course");
      window.scrollTo(0,0)
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-16 max-sm:mt-10 max-sm:px-3">
      {/* Header */}
      <div className="text-center mb-12 max-sm:mb-8">
        <h1 className="text-3xl max-sm:text-2xl font-bold text-deepBlue mb-4">
          Получите полный доступ к обучению и AI-анализу
        </h1>
        <p className="text-deepBlue text-lg max-sm:text-base max-w-2xl mx-auto">
          Освойте сварку с пониманием процесса, а не методом проб и ошибок.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-3xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10 mb-8">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-8 max-sm:gap-4">
          {/* Free Plan */}
          <div className="p-6 max-sm:p-4 rounded-2xl bg-gray-50">
            <div className="text-center mb-6 max-sm:mb-4">
              <h3 className="text-xl font-bold text-[#0C0D33] mb-2">
                Бесплатно
              </h3>
              <p className="text-gray-500 text-sm max-sm:text-xs">
                Для знакомства с платформой
              </p>
            </div>

            <div className="space-y-4 max-sm:space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 py-2"
                >
                  <span className="text-[#0C0D33] text-sm max-sm:text-xs">
                    {feature.name}
                  </span>

                  {typeof feature.free === "boolean" ? (
                    feature.free ? (
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-700 shrink-0" />
                    )
                  ) : (
                    <span className="text-xs text-gray-500 text-right">
                      {feature.free}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="p-6 max-sm:p-4 rounded-2xl bg-linear-to-br from-[#0C0D33] to-blue-900 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#DD6207] text-xs font-bold px-3 py-1 rounded-full">
              РЕКОМЕНДУЕМ
            </div>

            <div className="text-center max-sm:pt-8 mb-6 max-sm:mb-4">
              <h3 className="text-xl font-bold mb-2">Полный доступ</h3>
              <p className="text-blue-200 text-sm max-sm:text-xs">
                Максимум возможностей
              </p>

              <div className="mt-4">
                <span className="text-4xl max-sm:text-2xl font-bold">
                  9 990 ₽
                </span>
              </div>
            </div>

            <div className="space-y-4 max-sm:space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 py-2"
                >
                  <span className="text-sm max-sm:text-xs">{feature.name}</span>

                  {typeof feature.pro === "boolean" ? (
                    feature.pro ? (
                      <Check className="w-5 h-5 text-green-400 shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-blue-400 shrink-0" />
                    )
                  ) : (
                    <span className="text-xs text-blue-200 text-right">
                      {feature.pro}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Includes + Audience */}
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-8 max-sm:gap-4 mb-8">
        {/* Includes */}
        <div className="bg-white rounded-3xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10">
          <h3 className="text-xl font-bold text-[#0C0D33] mb-6 max-sm:mb-4">
            Что входит
          </h3>

          <div className="space-y-4 max-sm:space-y-3">
            {includes.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 max-sm:w-8 max-sm:h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-[#0C0D33]" />
                </div>
                <span className="text-[#0C0D33] text-sm max-sm:text-xs">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Audience */}
        <div className="bg-white rounded-3xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10">
          <h3 className="text-xl font-bold text-[#0C0D33] mb-6 max-sm:mb-4">
            Для кого
          </h3>

          <div className="space-y-4 max-sm:space-y-3">
            {audiences.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 max-sm:w-8 max-sm:h-8 bg-orange-50 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-[#DD6207]" />
                </div>
                <span className="text-[#0C0D33] text-sm max-sm:text-xs">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          className="bg-[#DD6207] hover:bg-orange-600 text-white px-12 max-sm:px-6 py-5 max-sm:py-4 rounded-2xl font-bold text-xl max-sm:text-base transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 w-auto max-sm:w-full"
          onClick={onBuy}
        >
          Начать обучение
        </button>
      </div>
    </div>
  );
}
