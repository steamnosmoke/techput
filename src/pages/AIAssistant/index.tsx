import { useMemo, useState, type ChangeEvent } from "react";
import {
  Upload,
  AlertCircle,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  Send,
  MessageSquare,
} from "lucide-react";

import { useChatStore } from "./store/chatStore";

import photo from "./images/photo.png";

import { analyzeWeld, type AnalyzeWeldResponse } from "./api/analyzeWeld";

import { weldingChat } from "./api/weldingChat";

export default function AIAssistant() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [textInput, setTextInput] = useState("");
  const {
    messages,
    addMessage,
    isLoading: isChatLoading,
    setLoading,
  } = useChatStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [analyzeError, setAnalyzeError] = useState("");

  const [analysisResult, setAnalysisResult] =
    useState<AnalyzeWeldResponse | null>(null);

  const firstDefect = analysisResult?.defects?.[0];

  // =====================================
  // FILE SELECT
  // =====================================

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

  // =====================================
  // IMAGE ANALYSIS
  // =====================================

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

  // =====================================
  // CHAT
  // =====================================

  const handleTextSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textInput.trim()) return;

    const userMessage = textInput;

    addMessage({
      role: "user",
      text: userMessage,
    });

    setTextInput("");

    setLoading(true);

    try {
      const updatedMessages = [
        ...messages,
        {
          role: "user" as const,
          text: userMessage,
        },
      ];

      const answer = await weldingChat(updatedMessages);

      addMessage({
        role: "assistant",
        text: answer,
      });
    } catch {
      addMessage({
        role: "assistant",
        text: "Ошибка AI сервиса",
      });
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // DEFECTS
  // =====================================

  const defects = useMemo(() => {
    if (!analysisResult) return [];

    if (!analysisResult.hasDefect) {
      return [
        {
          title: "Дефекты не обнаружены",
          count: 0,
          cause: analysisResult.comment || "Шов визуально выглядит корректно",
          recommendation:
            analysisResult.recommendation || "Корректировка не требуется",
        },
      ];
    }

    const grouped = analysisResult.defects.reduce(
      (acc, defect) => {
        const key = defect.defectType;

        if (!acc[key]) {
          acc[key] = {
            title: defect.defectType,
            count: 1,
            cause: defect.comment,
            recommendation: defect.recommendation,
          };
        } else {
          acc[key].count += 1;
        }

        return acc;
      },
      {} as Record<
        string,
        {
          title: string;
          count: number;
          cause: string;
          recommendation: string;
        }
      >,
    );

    return Object.values(grouped);
  }, [analysisResult]);

  // =====================================
  // PARAMETERS
  // =====================================

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

    return getParametersByDefect(firstDefect?.defectType);
  }, [analysisResult]);

  // =====================================
  // SCORE
  // =====================================

  const score = useMemo(() => {
    if (!analysisResult) return 0;

    if (!analysisResult.hasDefect) return 95;

    const severityScores = {
      low: 78,
      medium: 62,
      high: 38,
    };

    const scores = analysisResult.defects.map((defect) => {
      return (
        severityScores[defect.severity as keyof typeof severityScores] || 50
      );
    });

    const average =
      scores.reduce((acc, value) => acc + value, 0) / scores.length;

    return Math.round(average);
  }, [analysisResult]);

  // =====================================
  // SCORE TEXT
  // =====================================

  const scoreText = useMemo(() => {
    if (!analysisResult) return "";

    if (!analysisResult.hasDefect) {
      return "Шов в хорошем состоянии";
    }

    if (score >= 80) {
      return "Есть небольшие отклонения";
    }

    if (score >= 55) {
      return "Требуется улучшение";
    }

    return "Требуется срочная корректировка";
  }, [analysisResult, score]);

  // =====================================
  // BOX
  // =====================================


  // =====================================
  // RESET
  // =====================================

  const resetAnalysis = () => {
    setShowResults(false);

    setSelectedFile(null);

    setPreviewUrl("");

    setAnalysisResult(null);

    setAnalyzeError("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-16 max-sm:mt-10 max-sm:px-3">
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="text-center mb-10">
        <h1 className="text-3xl max-sm:text-2xl font-bold text-deepBlue mb-4">
          AI-помощник анализа швов
        </h1>

        <p className="text-deepBlue text-lg max-sm:text-base max-w-2xl mx-auto">
          Загрузите фото сварного шва. AI определит дефекты и объяснит причину.
        </p>
      </div>

      {/* ===================================== */}
      {/* CHAT */}
      {/* ===================================== */}

      <div className="bg-white rounded-3xl p-6 pr-2 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-[#DD6207]" />

          <h3 className="font-semibold text-[#0C0D33]">Задайте свой вопрос</h3>
        </div>
        {(messages.length > 0 || isChatLoading) && (
          <div className="space-y-4 mb-4 min-h-80 max-h-120 overflow-y-auto pr-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-[#0C0D33] text-white"
                      : "bg-gray-100 text-[#0C0D33]"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {isChatLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 text-[#0C0D33] px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <span
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
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
            placeholder="Спросите про сварку..."
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

      {/* ===================================== */}
      {/* UPLOAD */}
      {/* ===================================== */}

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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFileSelect(e.target.files?.[0] || null)
              }
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

          {/* ===================================== */}
          {/* PREVIEW */}
          {/* ===================================== */}

          {previewUrl && !isAnalyzing && (
            <div className="mt-6 relative w-full overflow-hidden rounded-2xl">
              <img
                src={previewUrl || photo}
                alt="Сварной шов"
                className="w-full h-auto rounded-2xl"
              />

              {analysisResult?.defects?.map((defect, index) => {
                const box = defect.box;

                if (!box) return null;

                const left = Math.max(
                  0,
                  ((box.x - box.width / 2) / box.imageWidth) * 100,
                );

                const top = Math.max(
                  0,
                  ((box.y - box.height / 2) / box.imageHeight) * 100,
                );

                const width = (box.width / box.imageWidth) * 100;

                const height = (box.height / box.imageHeight) * 100;

                return (
                  <div
                    key={index}
                    className="absolute border-4 border-red-500 rounded-xl animate-pulse pointer-events-none"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${width}%`,
                      height: `${height}%`,
                    }}
                  />
                );
              })}
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
          {/* ===================================== */}
          {/* RESULT */}
          {/* ===================================== */}

          <div className="bg-white rounded-3xl p-8 max-sm:p-4 shadow-xl shadow-[#0C0D33]/10">
            <div className="flex flex-row max-sm:flex-col gap-8 max-sm:gap-4">
              <div className="w-1/2 max-sm:w-full">
                <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={previewUrl || photo}
                    alt="Сварной шов"
                    className="w-full h-full object-cover"
                  />

                  {analysisResult?.defects?.map((defect, index) => {
                    if (!defect.box) return null;

                    const { x, y, width, height, imageWidth, imageHeight } =
                      defect.box;

                    return (
                      <div
                        key={index}
                        className="absolute border-4 border-red-500 rounded-xl animate-pulse pointer-events-none"
                        style={{
                          left: `${((x - width / 2) / imageWidth) * 100}%`,
                          top: `${((y - height / 2) / imageHeight) * 100}%`,
                          width: `${(width / imageWidth) * 100}%`,
                          height: `${(height / imageHeight) * 100}%`,
                        }}
                      />
                    );
                  })}
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
                        <>Обнаружен дефект</>
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
                          style={{
                            width: `${score}%`,
                          }}
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
                        {Math.round((firstDefect?.confidence || 0) * 100)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===================================== */}
          {/* DEFECTS */}
          {/* ===================================== */}

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

                    {defect.count > 1 && (
                      <span className="ml-2 text-sm text-gray-500">
                        × {defect.count}
                      </span>
                    )}
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

          {/* ===================================== */}
          {/* PARAMETERS */}
          {/* ===================================== */}

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

          {/* ===================================== */}
          {/* RESET */}
          {/* ===================================== */}

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

function getParametersByDefect(defectType: string | undefined) {
  switch (defectType) {
    case "Подрез":
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

    case "Пористость":
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
          current: "Нестабильная подача",
          recommended: "Проверить подачу газа",
        },
      ];

    case "Трещина":
      return [
        {
          name: "Температурный режим",
          status: "needs_adjustment",
          current: "Нестабильный",
          recommended: "Контролировать охлаждение",
        },
        {
          name: "Подготовка материала",
          status: "needs_adjustment",
          current: "Недостаточная",
          recommended: "Проверить совместимость металлов",
        },
      ];

    case "Шлаковое включение":
      return [
        {
          name: "Очистка шва",
          status: "needs_adjustment",
          current: "Недостаточная",
          recommended: "Удалять шлак между проходами",
        },
        {
          name: "Техника сварки",
          status: "needs_adjustment",
          current: "Нарушена",
          recommended: "Снизить скорость движения",
        },
      ];

    case "Разбрызгивание металла":
      return [
        {
          name: "Сварочный ток",
          status: "needs_adjustment",
          current: "Завышен",
          recommended: "Уменьшить ток",
        },
        {
          name: "Подача проволоки",
          status: "needs_adjustment",
          current: "Несбалансирована",
          recommended: "Настроить скорость подачи",
        },
      ];

    case "Непровар":
      return [
        {
          name: "Глубина провара",
          status: "needs_adjustment",
          current: "Недостаточная",
          recommended: "Увеличить ток",
        },
        {
          name: "Скорость сварки",
          status: "needs_adjustment",
          current: "Слишком высокая",
          recommended: "Замедлить движение",
        },
      ];

    case "Прожог":
      return [
        {
          name: "Сварочный ток",
          status: "needs_adjustment",
          current: "Слишком высокий",
          recommended: "Снизить ток",
        },
        {
          name: "Толщина металла",
          status: "needs_adjustment",
          current: "Недостаточно учтена",
          recommended: "Использовать меньший нагрев",
        },
      ];

    case "Деформация шва":
      return [
        {
          name: "Тепловложение",
          status: "needs_adjustment",
          current: "Избыточное",
          recommended: "Снизить нагрев",
        },
        {
          name: "Фиксация деталей",
          status: "needs_adjustment",
          current: "Недостаточная",
          recommended: "Использовать зажимы",
        },
      ];

    case "Наплыв":
      return [
        {
          name: "Скорость сварки",
          status: "needs_adjustment",
          current: "Слишком низкая",
          recommended: "Увеличить скорость",
        },
        {
          name: "Количество металла",
          status: "needs_adjustment",
          current: "Избыточное",
          recommended: "Уменьшить подачу",
        },
      ];

    case "Кратер":
      return [
        {
          name: "Завершение шва",
          status: "needs_adjustment",
          current: "Резкое прерывание",
          recommended: "Плавно завершать сварку",
        },
        {
          name: "Заполнение кратера",
          status: "needs_adjustment",
          current: "Недостаточное",
          recommended: "Добавить металл в конце шва",
        },
      ];

    case "Неравномерная ширина":
      return [
        {
          name: "Скорость движения",
          status: "needs_adjustment",
          current: "Нестабильная",
          recommended: "Держать равномерную скорость",
        },
        {
          name: "Положение электрода",
          status: "needs_adjustment",
          current: "Нестабильное",
          recommended: "Стабилизировать угол",
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
