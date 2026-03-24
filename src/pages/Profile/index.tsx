import {
  Play,
  CheckCircle2,
  Clock,
  TrendingUp,
  BookOpen,
  Activity,
  Award,
  Upload,
  AlertTriangle,
  Lightbulb,
  Video,
} from "lucide-react";
import { useAuthStore } from "../../features/auth/store/authStore";
import getAchivments from "./config/getAchivements";
import getHistory from "./config/getHistory";
import Button from "../../shared/components/Button";
import { Link, useNavigate } from "react-router";

export default function Profile() {
  const navigate = useNavigate();

  const name = useAuthStore((s) => s.name);
  const email = useAuthStore((s) => s.email);
  const logOut = useAuthStore((s) => s.logOut);

  const onLogOut = () => {
    logOut();
    navigate("/");
  };

  const quickActions = [
    {
      icon: Upload,
      label: "Загрузить шов в AI",
      description: "Анализ качества",
      link: "/ai-assistant",
    },
    {
      icon: Video,
      label: "Пересмотреть видео",
      description: "Теория и практика",
      link: "/course",
    },
    {
      icon: AlertTriangle,
      label: "Разобрать дефекты",
      description: "Библиотека ошибок",
      link: "/ai-assistant",
    },
    {
      icon: Lightbulb,
      label: "Посмотреть рекомендации",
      description: "Персональные советы",
      link: "/ai-assistant",
    },
  ];
  const achievements = getAchivments();
  const analysisHistory = getHistory();

  return (
    <div className="mx-auto px-4 py-8 mt-16 max-sm:mt-10 max-sm:py-4">
      <div className="container">
        {/* Hero Block */}
        <div className="bg-white rounded-3xl max-sm:rounded-2xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10 mb-8 max-sm:mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-sm:gap-4">
            <div>
              <h1 className="text-3xl max-sm:text-xl font-bold text-[#0C0D33] mb-2">
                Привет, {name.length > 0 ? name : email} 👋
              </h1>

              <p className="text-gray-600 mb-3 max-sm:text-sm">
                Вы прошли{" "}
                <span className="font-semibold text-[#0C0D33]">34%</span> курса
              </p>

              <Button
                text="Выйти"
                twclass="!min-w-0 !text-lg max-sm:!text-sm !text-orange !py-1 !border-2 !px-16 max-sm:!px-6 hover:!text-white"
                onClick={onLogOut}
              />
            </div>

            <Link to={"/course"} className="max-sm:w-full">
              <button className=" cursor-pointer bg-[#DD6207] w-full max-sm:w-full hover:bg-orange-600 text-white px-8 py-4 max-sm:py-3 rounded-2xl font-semibold text-lg max-sm:text-base transition-all duration-200 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Продолжить обучение
              </button>
            </Link>
          </div>
        </div>

        {/* Progress & Activity */}
        <div className="grid md:grid-cols-2 max-sm:grid-cols-1 gap-8 max-sm:gap-4 mb-8 max-sm:mb-4">
          {/* Progress */}
          <div className="bg-white rounded-3xl max-sm:rounded-2xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10">
            <div className="flex items-center gap-2 mb-6 max-sm:mb-4">
              <TrendingUp className="w-6 h-6 text-[#DD6207]" />
              <h2 className="text-xl max-sm:text-base font-bold text-[#0C0D33]">
                Ваш прогресс
              </h2>
            </div>

            <div className="mb-6 max-sm:mb-4">
              <div className="flex justify-between text-sm max-sm:text-xs text-gray-600 mb-2">
                <span>Общий прогресс</span>
                <span className="font-semibold text-[#0C0D33]">34%</span>
              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[34%] bg-linear-to-r from-[#DD6207] to-orange-400 rounded-full" />
              </div>
            </div>

            {/* Chart */}
            <div className="flex items-end gap-2 h-24 max-sm:h-16 mb-6 max-sm:mb-4">
              {[45, 52, 48, 61, 58, 72, 68, 75].map((value, i) => (
                <div
                  key={i}
                  className="flex-1 bg-linear-to-t from-[#0C0D33] to-blue-500 rounded-t-lg"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 max-sm:gap-2">
              <div className="text-center p-3 max-sm:p-2 bg-gray-50 rounded-xl">
                <BookOpen className="w-4 h-4 mx-auto mb-1" />
                <p className="text-lg max-sm:text-sm font-bold">6/8</p>
                <p className="text-xs text-gray-500">Теория</p>
              </div>

              <div className="text-center p-3 max-sm:p-2 bg-gray-50 rounded-xl">
                <Activity className="w-4 h-4 mx-auto mb-1 text-[#DD6207]" />
                <p className="text-lg max-sm:text-sm font-bold">9</p>
                <p className="text-xs text-gray-500">AI</p>
              </div>

              <div className="text-center p-3 max-sm:p-2 bg-gray-50 rounded-xl">
                <Award className="w-4 h-4 mx-auto mb-1 text-green-500" />
                <p className="text-lg max-sm:text-sm font-bold">72%</p>
                <p className="text-xs text-gray-500">Качество</p>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-3xl max-sm:rounded-2xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10">
            <h2 className="text-xl max-sm:text-base font-bold mb-4">
              Последняя активность
            </h2>

            <div className="bg-linear-to-br from-[#0C0D33] to-blue-900 rounded-2xl p-6 max-sm:p-4 text-white mb-4">
              <h3 className="text-lg max-sm:text-sm mb-3">
                Подбор тока для стали 5 мм
              </h3>

              <Link to={"/course"}>
                <button className="cursor-pointer bg-white text-[#0C0D33] px-4 py-2 rounded-xl text-sm flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Продолжить
                </button>
              </Link>
            </div>

            <div className="space-y-2">
              {achievements.map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {a.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#DD6207]" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-400" />
                  )}
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 max-sm:mb-4">
          <h2 className="text-xl max-sm:text-base font-bold text-white mb-4">
            Быстрые действия
          </h2>

          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
            {quickActions.map((action, index) => (
              <button className="bg-white rounded-2xl p-4 text-left w-full transition-all duration-200 hover:bg-blue-900 group" key={index}>
                <Link to={action.link}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-50 rounded-xl">
                      <action.icon className="w-5 h-5 text-[#DD6207]" />
                    </div>
                    <div>
                      <h3 className="font-semibold transition-all duration-200 group-hover:text-stone-100">
                        {action.label}
                      </h3>
                      <p className="text-sm text-gray-500 transition-all duration-200 group-hover:text-stone-200">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl max-sm:rounded-2xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10">
          <h2 className="text-xl max-sm:text-base font-bold mb-4">
            История анализов
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm max-sm:text-xs">
              <thead>
                <tr>
                  <th className="text-left py-2">Дата</th>
                  <th className="text-left py-2">Тип</th>
                  <th className="text-left py-2">Результат</th>
                  <th className="text-left py-2">%</th>
                </tr>
              </thead>
              <tbody>
                {analysisHistory.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2">{item.date}</td>
                    <td>{item.type}</td>
                    <td>{item.result}</td>
                    <td>{item.quality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
