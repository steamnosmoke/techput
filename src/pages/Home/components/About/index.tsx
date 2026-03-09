import getCards from "./config/getCards";

export default function About() {
  const cards = getCards();
  return (
    <section className="mt-23 relative max-sm:mt-6">
      <div className="container">
        <h2 className="text-5xl max-sm:text-2xl text-center mb-10 sticky top-[10%] ">
          О профессии
        </h2>
        <ul className="w-full flex flex-col gap-3 sticky top-[18%]">
          {cards.map((el, key) => (
            <li
              key={key}
              className={`pt-18 max-sm:pt-4 pl-18 max-sm:pl-4 pr-40 max-sm:pr-4 h-105 max-sm:h-40 sticky top-[18%] flex justify-between  max-sm:rounded-3xl`}
              style={{
                background: `url(${el.bg})`,
                backgroundPosition: "right",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className={`w-[60%] ${key === 3 ? "text-black" : "text-white"}`}
              >
                <h4 className=" text-4xl max-sm:text-lg mb-7.5 max-sm:mb-3 max-w-120">
                  {key !== 4
                    ? el.title.split(" ").map((word, i) => (
                        <span key={i} className=" font-nk!">
                          {word}
                          {i ===
                          Math.floor(el.title.split(" ").length / 2) - 1 ? (
                            <br />
                          ) : (
                            " "
                          )}
                        </span>
                      ))
                    : el.title}
                </h4>
                <p className="text-xl max-sm:text-base max-sm:hidden">
                  {el.text}
                </p>
              </div>
              {el.pic && (
                <img
                  className="w-70 h-70 max-sm:w-30 max-sm:h-30"
                  src={el.pic}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
