import getCards from "./config/getCards";

export default function About() {
  const cards = getCards();
  return (
    <section className="mt-23 relative">
      <div className="container">
        <h2 className="text-5xl text-center mb-10 sticky top-[10%] ">
          О профессии
        </h2>
        <ul className="w-full flex flex-col gap-3 sticky top-[18%]">
          {cards.map((el, key) => (
            <li
              key={key}
              className={`pt-18 pl-18 pr-40 h-105 sticky top-[18%] flex justify-between`}
              style={{
                background: `url(${el.bg})`,
                backgroundPosition: "right",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className={`w-[60%] ${key === 3 ? "text-black" : "text-white"}`}
              >
                <h4 className=" text-4xl mb-7.5 w-120">
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
                <p className=" text-xl">{el.text}</p>
              </div>
              {el.pic && <img className="w-70 h-70" src={el.pic} />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
