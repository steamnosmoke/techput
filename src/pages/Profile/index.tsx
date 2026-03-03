import {
  Play,
  Video,
  Trophy,
  CheckCircle2,
  Clock,
  TrendingUp,
  BookOpen,
  Activity,
  Award,
} from "lucide-react";
import { useAuthStore } from "../../features/auth/store/authStore";
import getActions from "./config/getActions";
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

  const quickActions = getActions();

  const achievements = getAchivments();

  const analysisHistory = getHistory();

  return (
    <div className=" mx-auto px-4 py-8 mt-16">
      <div className="container">
        {/* Hero Block */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0C0D33]/10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-[#0C0D33] mb-2">
                Привет, {name.length > 0 ? name : email} 👋
              </h1>
              <p className="text-gray-600 mb-1">
                Вы прошли{" "}
                <span className="font-semibold text-[#0C0D33]">34%</span> курса
              </p>
              <Button
                text="Выйти"
                twclass={
                  "!min-w-0 !text-lg !text-orange !py-1 !border-2 !px-16 hover:!text-white"
                }
                onClick={onLogOut}
              />
            </div>
            <Link to={"/course"}>
              <button className="bg-[#DD6207] hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Продолжить обучение
              </button>
            </Link>
          </div>
        </div>

        {/* Progress & Activity Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Progress Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0C0D33]/10">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-[#DD6207]" />
              <h2 className="text-xl font-bold text-[#0C0D33]">Ваш прогресс</h2>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Общий прогресс</span>
                <span className="font-semibold text-[#0C0D33]">34%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[34%] bg-linear-to-r from-[#DD6207] to-orange-400 rounded-full" />
              </div>
            </div>

            {/* Mini Chart */}
            <div className="flex items-end gap-2 h-24 mb-6">
              {[45, 52, 48, 61, 58, 72, 68, 75].map((value, i) => (
                <div
                  key={i}
                  className="flex-1 bg-linear-to-t from-[#0C0D33] to-blue-500 rounded-t-lg transition-all duration-300 hover:from-[#DD6207] hover:to-orange-400"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <BookOpen className="w-5 h-5 text-[#0C0D33] mx-auto mb-1" />
                <p className="text-2xl font-bold text-[#0C0D33]">6/8</p>
                <p className="text-xs text-gray-500">Теория</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Activity className="w-5 h-5 text-[#DD6207] mx-auto mb-1" />
                <p className="text-2xl font-bold text-[#0C0D33]">9</p>
                <p className="text-xs text-gray-500">AI-анализов</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Award className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-[#0C0D33]">72%</p>
                <p className="text-xs text-gray-500">Качество швов</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-xl">
              <TrendingUp className="w-4 h-4 inline mr-1 text-[#DD6207]" />
              Вы улучшили качество швов на{" "}
              <span className="font-semibold text-[#DD6207]">18%</span> за
              последние 2 недели.
            </p>
          </div>

          {/* Last Activity Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0C0D33]/10">
            <h2 className="text-xl font-bold text-[#0C0D33] mb-6">
              Последняя активность
            </h2>

            <div className="bg-linear-to-br from-[#0C0D33] to-blue-900 rounded-2xl p-6 text-white mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#DD6207] text-xs font-semibold px-3 py-1 rounded-full">
                  Раздел 4
                </span>
                <span className="text-blue-200 text-sm">Режимы сварки</span>
              </div>
              <h3 className="text-lg font-semibold mb-4">
                Подбор тока для стали 5 мм
              </h3>
              <div className="flex items-center gap-3 text-sm text-blue-200 mb-4">
                <Video className="w-4 h-4" />
                <span>Видеоурок • 12 мин</span>
              </div>
              <Link to={"/course"}>
                <button className="bg-white text-[#0C0D33] px-6 py-2 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Продолжить
                </button>
              </Link>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-[#DD6207]" />
                <h3 className="font-semibold text-[#0C0D33]">Достижения</h3>
              </div>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      achievement.completed ? "bg-orange-50" : "bg-gray-50"
                    }`}
                  >
                    {achievement.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#DD6207]" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                    <span
                      className={`text-sm ${achievement.completed ? "text-[#0C0D33] font-medium" : "text-gray-500"}`}
                    >
                      {achievement.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Быстрые действия
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link to={"/ai-assistant"}>
                <button
                  key={index}
                  className="bg-white rounded-2xl p-6 text-left transition-all duration-200 hover:shadow-xl hover:shadow-[#DD6207]/20 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#DD6207] transition-colors">
                    <action.icon className="w-6 h-6 text-[#0C0D33] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-[#0C0D33] mb-1">
                    {action.label}
                  </h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Analysis History */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0C0D33]/10">
          <h2 className="text-xl font-bold text-[#0C0D33] mb-6">
            История анализов
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Дата
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Тип
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Результат
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Качество
                  </th>
                </tr>
              </thead>
              <tbody>
                {analysisHistory.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-[#0C0D33]">{item.date}</td>
                    <td className="py-4 px-4">
                      <span className="bg-blue-50 text-[#0C0D33] text-xs font-medium px-3 py-1 rounded-full">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{item.result}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`font-semibold ${
                          parseInt(item.quality) >= 80
                            ? "text-green-500"
                            : parseInt(item.quality) >= 60
                              ? "text-[#DD6207]"
                              : "text-red-500"
                        }`}
                      >
                        {item.quality}
                      </span>
                    </td>
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
