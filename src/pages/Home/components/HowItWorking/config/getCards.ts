import Theori from "../images/theori.svg";
import Practise from "../images/practise.svg";
import Load from "../images/load.svg";
import Ai from "../images/ai.svg";

export default function getCards() {
  return [
    {
      name: "Theori",
      img: Theori,
      title: "Смотри теорию",
      text: "Узнаешь, как и почему\nработает сварка",
    },
    {
      name: "Practise",
      img: Practise,
      title: "Практикуйся",
      text: "Отрабатывай приёмы сварки",
    },
    {
      name: "Load",
      img: Load,
      title: `Загружай\nфото швов`,
      text: "Получай обратную связь по фото.",
    },
    {
      name: "Ai",
      img: Ai,
      title: "Получай\nразбор от ИИ",
      text: "ИИ укажет на ошибки\nи подскажет улучшения",
    },
  ];
}
