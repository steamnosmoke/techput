import getCards from "./config/getCards";

export default function HowItWorking() {
  const cards = getCards();
  return (
    <section className="how w-full h-135 mt-23">
      <div className="container">
        <h2 className="w-full text-center text-black text-5xl mb-10">
          Как это работает?
        </h2>
        <ul className="flex justify-between gap-10 items-center">
          {cards.map((el, key) => (
            <li
              key={key}
              className="flex flex-column pb-12 pt-17.5 px-12 bg-deepBlue w-82.5 h-109 rounded-4xl overflow-hidden relative z-0 group"
            >
              <img src={el.img} className="max-h-40 mx-auto" />
              <div
                className="absolute bg-[linear-gradient(0deg,rgba(221,98,8,0.7)_0%,rgba(27,19,48,0)_100%)] h-full w-full z-2 top-50 left-0 pt-35 text-white text-center px-4 transition-all duration-600 ease-in-out group-hover:top-5"
                style={{ whiteSpace: "pre-wrap" }}
              >
                <h4 className="text-3xl mb-5 min-h-18 flex flex-col justify-center cursor-default">
                  {el.title.replace("_", " ")}
                </h4>
                <p className="text-2xl cursor-default">{el.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
