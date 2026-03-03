import { Link } from "react-router";
import Button from "../../../../shared/components/Button";
import getCards from "./config/getCards";
import large from "./images/1.png";

export default function WhySection() {
  const cards = getCards();
  return (
    <section className="why mt-23">
      <div className="container">
        <h2 className="text-black text-5xl text-center mb-12">
          Почему нам доверяют обучение профессии
        </h2>

        <div className="grid grid-cols-3 gap-7.5 justify-center">
          <div className="col-span-3 w-full h-180 shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)] rounded-[45px] pl-12 pt-18 pb-6 flex items-center justify-between gap-6">
            <div className="text w-[40%]">
              <h4 className="text-black text-3xl mb-4">
                Фокус на реальной профессии,
                <br />а не на теории
              </h4>
              <p className="text-black text-2xl mb-12">
                Вы учитесь тому, с чем действительно сталкиваются на
                производстве: оборудование, ошибки, требования и рабочие
                ситуации. Без абстрактных примеров и устаревших схем.
              </p>
              <Link to={"/buy-access"}>
                <Button
                  text={"Посмотреть, как проходит обучение"}
                  twclass={
                    "!text-orange !text-2xl !font-bold hover:!text-white"
                  }
                />
              </Link>
            </div>
            <div className="right w-[50%] h-122.5 rounded-l-[45px] p-8 pt-15 bg-orange">
              <img src={large} alt="" />
            </div>
          </div>

          {cards.map((el, key) => (
            <div
              key={key}
              className={`w-110 h-110 shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)] rounded-[45px] p-10 grid grid-rows-[200px,80px,56px] justify-items-center-safe align-middle gap-3 bg-${el.bg} ${el.col ? "text-white" : ""}`}
            >
              <img className="" src={el.img} alt="" />
              <h4 className="text-center text-3xl h-20">{el.title}</h4>
              <p className="text-center text-xl">{el.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
