import { useMemo, useState } from "react";
import {
  Upload,
  AlertCircle,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  Send,
  MessageSquare,
} from "lucide-react";

import photo from "./images/photo.png";
import { analyzeWeld, type AnalyzeWeldResponse } from "./api/analyzeWeld";
import { weldingChat } from "./api/weldingChat";

type ChatMessage = { type: "user" | "ai"; text: string };

export default function AIAssistant() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [analyzeError, setAnalyzeError] = useState("");
  const [analysisResult, setAnalysisResult] =
    useState<AnalyzeWeldResponse | null>(null);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setAnalyzeError("Поддерживаются только JPG, PNG и WEBP");
      return;
    }

    setAnalyzeError("");
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setShowResults(false);
    setAnalysisResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setAnalyzeError("Сначала выберите изображение");
      return;
    }

    try {
      setIsAnalyzing(true);
      setAnalyzeError("");

      const result = await analyzeWeld(selectedFile);

      setAnalysisResult(result);
      setShowResults(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAnalyzeError(
        error?.response?.data?.error ||
          "Не удалось выполнить анализ изображения",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

 const handleTextSubmit = async (e: React.FormEvent) => {
   e.preventDefault();

   if (!textInput.trim()) return;

   const userMessage = textInput;

   setChatMessages((prev) => [
     ...prev,
     {
       type: "user",
       text: userMessage,
     },
   ]);

   setTextInput("");

   try {
     const answer = await weldingChat(userMessage);

     setChatMessages((prev) => [
       ...prev,
       {
         type: "ai",
         text: answer,
       },
     ]);
   } catch {
     setChatMessages((prev) => [
       ...prev,
       {
         type: "ai",
         text: "Ошибка AI сервиса",
       },
     ]);
   }
 };

  const defects = useMemo(() => {
    if (!analysisResult) return [];

    if (
      !analysisResult.hasDefect ||
      analysisResult.defectType === "no_defect"
    ) {
      return [
        {
          title: "Дефекты не обнаружены",
          cause: analysisResult.comment || "Шов визуально выглядит корректно",
          recommendation:
            analysisResult.recommendation ||
            "Сохраняйте текущие параметры сварки",
        },
      ];
    }

    return [
      {
        title:
          defectTypeMap[analysisResult.defectType] || analysisResult.defectType,
        cause:
          analysisResult.comment || "Причина требует дополнительной проверки",
        recommendation:
          analysisResult.recommendation || "Проверьте параметры сварки",
      },
    ];
  }, [analysisResult]);

  const parameters = useMemo(() => {
    if (!analysisResult) return [];

    if (!analysisResult.hasDefect) {
      return [
        {
          name: "Общая оценка шва",
          status: "ok",
          current: "Без отклонений",
          recommended: "Корректировка не требуется",
        },
      ];
    }

    return getParametersByDefect(analysisResult.defectType);
  }, [analysisResult]);

  const score = useMemo(() => {
    if (!analysisResult) return 0;

    if (!analysisResult.hasDefect) return 95;

    switch (analysisResult.severity) {
      case "low":
        return 78;
      case "medium":
        return 62;
      case "high":
        return 38;
      default:
        return 50;
    }
  }, [analysisResult]);

  const scoreText = useMemo(() => {
    if (!analysisResult) return "";

    if (!analysisResult.hasDefect) return "Шов в хорошем состоянии";

    
    switch (analysisResult.severity) {
      case "low":
        return "Есть небольшие отклонения";
      case "medium":
        return "Требуется улучшение";
      case "high":
        return "Требуется срочная корректировка";
      default:
        return "Нужна дополнительная проверка";
    }
  }, [analysisResult]);

  const box = analysisResult?.box;

  const resetAnalysis = () => {
    setShowResults(false);
    setSelectedFile(null);
    setPreviewUrl("");
    setAnalysisResult(null);
    setAnalyzeError("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-16 max-sm:mt-10 max-sm:px-3">
      <div className="text-center mb-10">
        <h1 className="text-3xl max-sm:text-2xl font-bold text-deepBlue mb-4">
          AI-помощник анализа швов
        </h1>
        <p className="text-deepBlue text-lg max-sm:text-base max-w-2xl mx-auto">
          Загрузите фото сварного шва. AI определит дефекты и объяснит причину.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-[#DD6207]" />
          <h3 className="font-semibold text-[#0C0D33]">Задайте свой вопрос</h3>
        </div>

        {chatMessages.length > 0 && (
          <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
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

        <form
          onSubmit={handleTextSubmit}
          className="flex gap-3 max-sm:flex-col"
        >
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Опишите дефект шва или задайте вопрос AI..."
            className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-[#DD6207] focus:outline-none transition-colors text-[#0C0D33]"
          />
          <button
            type="submit"
            className="bg-[#DD6207] hover:bg-orange-600 text-white px-6 py-3 max-sm:w-full rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Отправить
          </button>
        </form>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-3xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const droppedFile = e.dataTransfer.files?.[0] || null;
              handleFileSelect(droppedFile);
            }}
            className={`block border-2 border-dashed rounded-3xl p-16 max-sm:p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-[#DD6207] bg-orange-50"
                : "border-[#0C0D33] hover:border-[#DD6207] hover:bg-gray-50"
            }`}
          >
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
            />

            {isAnalyzing ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-[#0C0D33] border-t-[#DD6207] rounded-full animate-spin mb-4" />
                <p className="text-[#0C0D33] font-semibold">
                  Анализируем шов...
                </p>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-linear-to-br from-[#0C0D33] to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <p className="text-xl max-sm:text-base font-semibold text-[#0C0D33] mb-2">
                  Перетащите изображение сюда
                </p>
                <p className="text-gray-500 mb-4">или нажмите для загрузки</p>
                <p className="text-sm text-gray-400">
                  Поддержка JPG / PNG / WEBP
                </p>

                {selectedFile && (
                  <p className="mt-4 text-sm font-medium text-[#DD6207]">
                    Выбран файл: {selectedFile.name}
                  </p>
                )}
              </>
            )}
          </label>

          {previewUrl && !isAnalyzing && (
            <div className="mt-6">
              <img
                src={previewUrl || photo}
                alt="Сварной шов"
                className="w-full h-full object-cover"
              />

              {box && (
                <div
                  className="absolute border-4 border-red-500 rounded-lg animate-pulse pointer-events-none"
                  style={{
                    left: `${(box.x - box.width / 2) * 100}%`,
                    top: `${(box.y - box.height / 2) * 100}%`,
                    width: `${box.width * 100}%`,
                    height: `${box.height * 100}%`,
                  }}
                />
              )}
            </div>
          )}

          {analyzeError && (
            <p className="mt-4 text-red-500 font-medium">{analyzeError}</p>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile || isAnalyzing}
            className="mt-6 w-full bg-[#DD6207] hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-semibold text-lg"
          >
            {isAnalyzing ? "Анализ..." : "Запустить анализ"}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10">
            <div className="flex flex-row max-sm:flex-col gap-8 max-sm:gap-4">
              <div className="w-1/2 max-sm:w-full">
                <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video">
                  <img
                    src={previewUrl || photo}
                    alt="Сварной шов"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="w-1/2 max-sm:w-full">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      analysisResult?.hasDefect ? "bg-red-100" : "bg-green-100"
                    }`}
                  >
                    <AlertCircle
                      className={`w-6 h-6 ${
                        analysisResult?.hasDefect
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0C0D33]">
                      Результат анализа
                    </h2>
                    <p className="text-gray-500">
                      {analysisResult?.hasDefect ? (
                        <>
                          Обнаружено:{" "}
                          <span className="font-semibold text-red-500">
                            {defects.length} дефект
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold text-green-600">
                          Явных дефектов не обнаружено
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 max-sm:p-4 mb-6">
                  <h3 className="font-semibold text-[#0C0D33] mb-4">
                    Общая оценка
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl max-sm:text-2xl font-bold text-[#DD6207]">
                      {score}%
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-red-500 via-[#DD6207] to-green-500 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{scoreText}</p>
                    </div>
                  </div>

                  {analysisResult && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-[#0C0D33]">
                        <span className="font-semibold">
                          Уверенность модели:
                        </span>{" "}
                        {Math.round(analysisResult.confidence * 100)}%
                      </p>
                      <p className="text-sm text-[#0C0D33]">
                        <span className="font-semibold">Комментарий:</span>{" "}
                        {analysisResult.comment}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 max-sm:gap-4">
            {defects.map((defect, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10"
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

          <div className="bg-white rounded-3xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10">
            <h3 className="text-xl font-bold text-[#0C0D33] mb-6">
              Что изменить
            </h3>
            <div className="space-y-4">
              {parameters.map((param, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-3 p-4 rounded-xl bg-gray-50"
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
                    <span
                      className={
                        param.status === "ok"
                          ? "text-gray-500"
                          : "text-gray-500 line-through"
                      }
                    >
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

          <button
            onClick={resetAnalysis}
            className="w-full bg-[#DD6207] hover:bg-orange-600 text-white py-5 max-sm:py-4 rounded-2xl font-semibold text-lg max-sm:text-base flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Загрузить новый шов после корректировки
          </button>
        </div>
      )}
    </div>
  );
}

const defectTypeMap: Record<string, string> = {
  no_defect: "Дефекты не обнаружены",
  porosity: "Поры",
  crack: "Трещина",
  undercut: "Подрез",
  burn_through: "Прожог",
  lack_of_fusion: "Непровар",
  slag_inclusion: "Шлаковое включение",
  spatter: "Разбрызгивание металла",
  unknown: "Не удалось точно определить дефект",
};

function getParametersByDefect(defectType: string) {
  switch (defectType) {
    case "undercut":
      return [
        {
          name: "Ток",
          status: "needs_adjustment",
          current: "Повышенный",
          recommended: "Уменьшить на 10–15%",
        },
        {
          name: "Угол электрода",
          status: "needs_adjustment",
          current: "Слишком большой",
          recommended: "60–70°",
        },
      ];

    case "porosity":
      return [
        {
          name: "Чистота поверхности",
          status: "needs_adjustment",
          current: "Недостаточная",
          recommended: "Очистить металл",
        },
        {
          name: "Защитный газ",
          status: "needs_adjustment",
          current: "Возможны перебои",
          recommended: "Проверить подачу газа",
        },
      ];

    case "crack":
      return [
        {
          name: "Температурный режим",
          status: "needs_adjustment",
          current: "Нестабильный",
          recommended: "Проверить охлаждение",
        },
        {
          name: "Материал",
          status: "needs_adjustment",
          current: "Требует проверки",
          recommended: "Проверить совместимость",
        },
      ];

    default:
      return [
        {
          name: "Параметры сварки",
          status: "needs_adjustment",
          current: "Требуют проверки",
          recommended: "Проверить вручную",
        },
      ];
  }
}
