

export default function getHistory() {
  return [
    { date: "Сегодня", type: "AI-анализ", result: "2 дефекта", quality: "72%" },
    { date: "Вчера", type: "AI-анализ", result: "1 дефект", quality: "85%" },
    {
      date: "2 дня назад",
      type: "AI-анализ",
      result: "Без дефектов",
      quality: "94%",
    },
    {
      date: "3 дня назад",
      type: "AI-анализ",
      result: "3 дефекта",
      quality: "61%",
    },
  ];
}
