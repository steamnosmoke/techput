import { Link } from "react-router";
import Button from "../../../../shared/components/Button";
import getCards from "./config/getCards";
import large from "./images/1.png";

export default function WhySection() {
  const cards = getCards();

  return (
    <section className="why mt-23 max-lg:mt-10">
      <div className="container">
        <h2 className="text-black text-5xl max-sm:text-2xl text-center mb-12 max-sm:mb-6 max-sm:max-w-70 mx-auto">
          Почему нам доверяют обучение профессии
        </h2>

        <div className="grid grid-cols-3 max-sm:flex max-sm:flex-col gap-7.5 max-sm:gap-4 justify-center">
          {/* Большой блок */}
          <div className="col-span-3 max-sm:flex max-sm:flex-col w-full shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)] rounded-[45px] max-sm:rounded-3xl p-12 max-sm:px-0 max-sm:py-4 items-center justify-between gap-6 max-sm:gap-0">
            <div className="left text w-[40%] max-sm:w-full max-sm:px-6">
              <h4 className="text-black text-3xl max-sm:text-xl mb-4">
                Фокус на реальной профессии,
                <br />а не на теории
              </h4>

              <p className="text-black text-2xl max-sm:text-base mb-12 max-sm:mb-6">
                Вы учитесь тому, с чем действительно сталкиваются на
                производстве: оборудование, ошибки, требования и рабочие
                ситуации. Без абстрактных примеров и устаревших схем.
              </p>

              <Link to={"/buy-access"} className="max-sm:hidden">
                <Button
                  text={"Посмотреть, как проходит обучение"}
                  twclass="!text-orange !text-2xl max-sm:!text-base !font-bold hover:!text-white"
                />
              </Link>
            </div>

            <div className="right w-[50%] max-sm:w-full h-122.5 max-sm:h-auto rounded-[35px] max-sm:rounded-none p-8 max-sm:p-4 pt-15 max-sm:pt-4 bg-orange flex justify-center">
              <img src={large} alt="" className="w-full max-w-125" />
            </div>
            <Link to={"/buy-access"} className="max-sm:block hidden mt-3 mx-5">
              <Button
                text={"Посмотреть, как проходит обучение"}
                twclass="!text-orange !text-base !font-bold !border-2 !px-6"
              />
            </Link>
          </div>

          {/* Карточки */}
          {cards.map((el, key) => (
            <div
              key={key}
              className={`w-full max-w-110 mx-auto h-auto shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)] rounded-[45px] max-sm:rounded-3xl p-10 max-sm:p-6 grid grid-rows-[120px_auto_auto] max-sm:grid-rows-[80px_auto_auto] justify-items-center gap-3 bg-${el.bg} ${
                el.col ? "text-white" : ""
              }`}
            >
              <img className="max-sm:w-20" src={el.img} alt="" />

              <h4 className="text-center text-3xl max-sm:text-xl max-sm:text-nowrap">
                {el.title}
              </h4>

              <p className="text-center text-xl max-sm:text-base">
                {el.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
