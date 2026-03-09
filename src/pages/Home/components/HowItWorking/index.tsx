import getCards from "./config/getCards";

export default function HowItWorking() {
  const cards = getCards();
  return (
    <section className="how w-full mt-23 max-sm:mt-8">
      <div className="container">
        <h2 className="w-full text-center text-black text-5xl max-sm:text-2xl mb-10 max-sm:mb-5">
          Как это работает?
        </h2>
        <ul className="flex max-sm:flex-col justify-between gap-10 max-sm:gap-2.5 items-center">
          {cards.map((el, key) => (
            <li
              key={key}
              className="flex flex-column pb-12 pt-12.5 max-sm:pt-2 px-12 bg-deepBlue w-82.5 max-sm:w-full h-109 max-sm:h-60 rounded-4xl max-sm:rounded-2xl overflow-hidden relative z-0 group"
            >
              <img
                src={el.img}
                className="max-h-40 max-sm:max-h-20 mx-auto max-sm:mt-4 max-sm:opacity-70"
              />
              <div
                className="absolute bg-[linear-gradient(0deg,rgba(221,98,8,0.7)_0%,rgba(27,19,48,0)_87%)] max-sm:bg-[linear-gradient(0deg,rgba(221,98,8,0.7)_10%,rgba(27,19,48,0)_100%)] h-full w-full z-2 top-50 max-sm:top-15 left-0 pt-35 max-sm:pt-12 text-white text-center px-4 max-sm:px-2 transition-all duration-600 ease-in-out group-hover:top-5 group-hover:pt-50"
                style={{ whiteSpace: "pre-wrap" }}
              >
                <h4 className="text-3xl max-sm:text-2xl mb-5 max-sm:mb-1 min-h-18 max-sm:min-h-12 flex flex-col justify-center cursor-default  max-sm:whitespace-normal whitespace-pre-wrap">
                  {el.title}
                </h4>
                <p className="text-2xl max-sm:text-xl cursor-default">
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
