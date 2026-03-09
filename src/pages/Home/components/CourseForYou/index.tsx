import getCards from "./config/getCards";

export default function CourseForYou() {
  const cards = getCards();
  return (
    <section className="course mt-23 max-sm:mt-16">
      <div className="container">
        <h2 className="text-black text-4xl max-sm:text-2xl text-left max-sm:text-center">
          Курс подойдет, если вы
        </h2>
        <ul className="flex flex-wrap gap-22 max-sm:gap-12 mt-12 max-sm:mt-6 items-center justify-between">
          {cards.map((el, key) => (
            <li
              key={key}
              className="flex justify-between items-start max-sm:items-center gap-9 max-sm:gap-2 max-w-155 w-full border-deepBlue max-sm:flex-col "
            >
              <img
                className="w-40 h-40 max-sm:w-20 max-sm:h-20 "
                src={el.img}
                alt=""
              />
              <div className="text">
                <h5 className="text-black text-2xl max-sm:text-lg mb-2 max-sm:text-center">
                  {el.title}
                </h5>
                <p className="text stone-400 text-base max-sm:text-center">
                  {el.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
