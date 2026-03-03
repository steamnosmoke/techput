import calendar from "../images/2.png";
import ai from "../images/3.png";
import chat from "../images/4.png";
export default function getCards() {
  return [
    {
      img: calendar,
      title: `Свободный график
без дедлайнов`,
      text: `Обучение легко совмещать
с учебой, работой и личной жизнью`,
      bg: "white",
    },
    {
      img: ai,
      title: `Обратная связь,
а не автопроверка`,
      text: `Работы разбирает AI-помощник.
Вы понимаете, что не так и почему.`,
      bg: "white",
    },
    {
      img: chat,
      title: `Поддержка
на всём пути`,
      text: `Всегда можете задать вопрос
и получить помощь`,
      bg: "deepBlue",
      col: "white",
    },
  ];
}
