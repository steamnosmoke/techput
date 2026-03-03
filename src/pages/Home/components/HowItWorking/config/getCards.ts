import Theori from "../images/theori.svg";
import Practise from "../images/practise.svg";
import Load from "../images/load.svg";
import Ai from "../images/ai.svg";

export default function getCards() {
  return [
    {
      name: "Theori",
      img: Theori,
      title: "Смотри_теорию",
      text: "Разберёшь основы сварки. Поймёшь, как и почему работает процесс.",
    },
    {
      name: "Practise",
      img: Practise,
      title: "Практикуйся",
      text: "Закрепляй знания\nна практике, выполняй задания и отрабатывай приёмы сварки в разных условиях.",
    },
    {
      name: "Load",
      img: Load,
      title: `Загружай\nфото швов`,
      text: "Можно загрузить своих швов и получить обратную связь.",
    },
    {
      name: "Ai",
      img: Ai,
      title: "Получай\nразбор от ИИ",
      text: "ИИ анализирует шов, объясняет ошибки и подсказывает, что можно улучшить",
    },
  ];
}
