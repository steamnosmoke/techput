import { AlertTriangle, Lightbulb, Upload, Video } from "lucide-react";

export default function getActions() {
  return [
    {
      icon: Upload,
      label: "Загрузить шов в AI",
      description: "Анализ качества",
    },
    {
      icon: Video,
      label: "Пересмотреть видео",
      description: "Теория и практика",
    },
    {
      icon: AlertTriangle,
      label: "Разобрать дефекты",
      description: "Библиотека ошибок",
    },
    {
      icon: Lightbulb,
      label: "Посмотреть рекомендации",
      description: "Персональные советы",
    },
  ];
}
