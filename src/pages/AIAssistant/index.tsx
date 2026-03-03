import { useState } from "react";
import {
  Upload,
  AlertCircle,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  Send,
  MessageSquare,
} from "lucide-react";

import photo from "./images/photo.png"

export default function AIAssistant() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { type: "user" | "ai"; text: string }[]
  >([]);

  const handleUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    setChatMessages((prev) => [...prev, { type: "user", text: textInput }]);
    setTextInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Я проанализировал ваше описание. Рекомендую загрузить фото шва для точной диагностики дефектов. Вы также можете описать проблему подробнее — какой материал свариваете, какой ток используете, какие дефекты наблюдаете?",
        },
      ]);
    }, 1000);
  };

  const defects = [
    {
      title: "Подрез",
      cause: "повышенный ток и большой угол наклона",
      recommendation: "уменьшить ток на 10–15%",
    },
    {
      title: "Поры",
      cause: "недостаточная очистка поверхности",
      recommendation: "очистить металл и проверить подачу газа",
    },
  ];

  const parameters = [
    {
      name: "Ток",
      status: "needs_adjustment",
      current: "180А",
      recommended: "155-165А",
    },
    {
      name: "Скорость сварки",
      status: "ok",
      current: "25 см/мин",
      recommended: "25 см/мин",
    },
    {
      name: "Угол электрода",
      status: "needs_adjustment",
      current: "75°",
      recommended: "60-70°",
    },
    {
      name: "Чистота поверхности",
      status: "needs_adjustment",
      current: "—",
      recommended: "Очистить от ржавчины",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-deepBlue mb-4">
          AI-помощник анализа швов
        </h1>
        <p className="text-deepBLue text-lg max-w-2xl mx-auto">
          Загрузите фото сварного шва. AI определит дефекты и объяснит причину.
        </p>
      </div>

      {/* Text Input Section */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-[#0C0D33]/10 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-[#DD6207]" />
          <h3 className="font-semibold text-[#0C0D33]">
            Задайте свой вопрос
          </h3>
        </div>

        {/* Chat Messages */}
        {chatMessages.length > 0 && (
          <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.type === "user"
                      ? "bg-[#0C0D33] text-white"
                      : "bg-gray-100 text-[#0C0D33]"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleTextSubmit} className="flex gap-3">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Опишите дефект шва или задайте вопрос AI..."
            className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-[#DD6207] focus:outline-none transition-colors text-[#0C0D33]"
          />
          <button
            type="submit"
            className="bg-[#DD6207] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Отправить
          </button>
        </form>
      </div>

      {!showResults ? (
        /* Upload Zone */
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0C0D33]/10">
          <div
            onClick={handleUpload}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleUpload();
            }}
            className={`border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-[#DD6207] bg-orange-50"
                : "border-[#0C0D33] hover:border-[#DD6207] hover:bg-gray-50"
            }`}
          >
            {isAnalyzing ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-[#0C0D33] border-t-[#DD6207] rounded-full animate-spin mb-4" />
                <p className="text-[#0C0D33] font-semibold">
                  Анализируем шов...
                </p>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-gradient-to-br from-[#0C0D33] to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <p className="text-xl font-semibold text-[#0C0D33] mb-2">
                  Перетащите изображение сюда
                </p>
                <p className="text-gray-500 mb-4">или нажмите для загрузки</p>
                <p className="text-sm text-gray-400">Поддержка JPG / PNG</p>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Analysis Results */
        <div className="space-y-6">
          {/* Image & Summary */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0C0D33]/10">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image */}
              <div className="md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video">
                  <img
                    src={photo}
                    alt="Сварной шов"
                    className="w-full h-full object-cover"
                  />
                  {/* Defect Markers */}
                  <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-[#DD6207] rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse">
                    1
                  </div>
                  <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-[#DD6207] rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse">
                    2
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0C0D33]">
                      Результат анализа
                    </h2>
                    <p className="text-gray-500">
                      Обнаружено:{" "}
                      <span className="font-semibold text-red-500">
                        2 дефекта
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-[#0C0D33] mb-4">
                    Общая оценка
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-[#DD6207]">72%</div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-[72%] bg-gradient-to-r from-red-500 via-[#DD6207] to-green-500 rounded-full" />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Требуется улучшение
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Defect Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {defects.map((defect, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl shadow-[#0C0D33]/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#DD6207] rounded-xl flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#0C0D33]">
                    {defect.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Причина:</p>
                    <p className="text-[#0C0D33]">{defect.cause}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-green-700">
                      <span className="font-semibold">Рекомендация:</span>{" "}
                      {defect.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Parameters to Change */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0C0D33]/10">
            <h3 className="text-xl font-bold text-[#0C0D33] mb-6">
              Что изменить
            </h3>
            <div className="space-y-4">
              {parameters.map((param, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    {param.status === "ok" ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-[#DD6207]" />
                    )}
                    <span className="font-medium text-[#0C0D33]">
                      {param.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 line-through">
                      {param.current}
                    </span>
                    <span className="text-[#DD6207] font-semibold">
                      {param.recommended}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setShowResults(false)}
            className="w-full bg-[#DD6207] hover:bg-orange-600 text-white py-5 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Загрузить новый шов после корректировки
          </button>
        </div>
      )}
    </div>
  );
};
