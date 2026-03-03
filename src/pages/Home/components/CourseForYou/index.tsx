import getCards from "./config/getCards";

export default function CourseForYou() {
  const cards = getCards();
  return (
    <section className="course mt-23">
      <div className="container">
        <h2 className="text-black text-4xl text-left">
          Курс подойдет, если вы
        </h2>
        <ul className="flex flex-wrap gap-22 5 mt-12 items-center justify-between">
          {cards.map((el, key) => (
            <li
              key={key}
              className="flex justify-between items-start gap-9 max-w-155 w-full"
            >
              <img className="w-40 h-40" src={el.img} alt="" />
              <div className="text">
                <h5 className="text-black text-2xl mb-2">{el.title}</h5>
                <p className="text stone-400 text-base">{el.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
