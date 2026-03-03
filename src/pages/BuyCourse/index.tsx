import {
  Check,
  X,
  Sparkles,
  BookOpen,
  Video,
  Zap,
  Users,
  Briefcase,
} from "lucide-react";

export default function BuyCourse() {
  const features = [
    { name: "Теория", free: false, pro: true },
    { name: "Видео", free: false, pro: true },
    { name: "AI анализ", free: "1 в день", pro: "Без ограничений" },
    { name: "AI консультация", free: "5 в день", pro: "Без ограничений" },
    { name: "История прогресса", free: false, pro: true },
    { name: "Обновления", free: false, pro: true },
  ];

  const includes = [
    { icon: BookOpen, text: "8 теоретических разделов" },
    { icon: Video, text: "40+ видео" },
    { icon: Sparkles, text: "AI-помощник 24/7" },
    { icon: Zap, text: "Разбор дефектов" },
    { icon: Check, text: "Обновления материалов" },
  ];

  const audiences = [
    { icon: Users, text: "Начинаете с нуля" },
    { icon: Zap, text: "Уже варите, но хотите улучшить качество" },
    { icon: Briefcase, text: "Готовитесь к работе на производстве" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-deepBlue mb-4">
          Получите полный доступ к обучению и AI-анализу
        </h1>
        <p className="text-deepBlue text-lg max-w-2xl mx-auto">
          Освойте сварку с пониманием процесса, а не методом проб и ошибок.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0C0D33]/10 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="p-6 rounded-2xl bg-gray-50">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#0C0D33] mb-2">
                Бесплатно
              </h3>
              <p className="text-gray-500">Для знакомства с платформой</p>
            </div>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-[#0C0D33]">{feature.name}</span>
                  {typeof feature.free === "boolean" ? (
                    feature.free ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300" />
                    )
                  ) : (
                    <span className="text-sm text-gray-500">
                      {feature.free}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0C0D33] to-blue-900 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#DD6207] text-xs font-bold px-3 py-1 rounded-full">
              РЕКОМЕНДУЕМ
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Полный доступ</h3>
              <p className="text-blue-200">Максимум возможностей</p>
              <div className="mt-4">
                <span className="text-4xl font-bold">2 990 ₽</span>
                <span className="text-blue-200">/мес</span>
              </div>
            </div>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <span>{feature.name}</span>
                  {typeof feature.pro === "boolean" ? (
                    feature.pro ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <X className="w-5 h-5 text-blue-400" />
                    )
                  ) : (
                    <span className="text-sm text-blue-200">{feature.pro}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0C0D33]/10">
          <h3 className="text-xl font-bold text-[#0C0D33] mb-6">Что входит</h3>
          <div className="space-y-4">
            {includes.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#0C0D33]" />
                </div>
                <span className="text-[#0C0D33]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* For Whom */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0C0D33]/10">
          <h3 className="text-xl font-bold text-[#0C0D33] mb-6">Для кого</h3>
          <div className="space-y-4">
            {audiences.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#DD6207]" />
                </div>
                <span className="text-[#0C0D33]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button className="bg-[#DD6207] hover:bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
          Начать обучение
        </button>
      </div>
    </div>
  );
}
