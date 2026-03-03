import { Link } from "react-router";
import Button from "../../../../shared/components/Button";
import bg from "./images/bg.jpg";
import tools from "./images/tools.svg";
export default function Banner() {
  return (
    <section className="banner">
      <div className="container">
        <div
          className={`w-full h-180 rounded-[45px] relative overflow-hidden bg-cover pt-45 pl-20 pb-25 flex flex-col justify-between items-start`}
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="text">
            <h1 className="text-6xl text-white uppercase mb-4">
              Освой сварку
              <br />с AI-помощником
            </h1>
            <p className="text-4xl text-stone-300">
              Профессия, практика и технологии в одном курсе
            </p>
          </div>
          <Link to={"/buy-access"}>
            <Button text={"Начать обучение"} />
            <img className="absolute bottom-0 right-0" src={tools} alt="" />
          </Link>
        </div>
      </div>
    </section>
  );
}
