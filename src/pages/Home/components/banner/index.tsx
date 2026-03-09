import { Link } from "react-router";
import Button from "../../../../shared/components/Button";
import bg from "./images/bg.jpg";
import tools from "./images/tools.svg";
export default function Banner() {
  return (
    <section className="banner">
      <div className="container">
        <div
          className={`w-full min-h-180 max-sm:min-h-80 rounded-4xl max-sm:rounded-2xl relative overflow-hidden bg-cover pt-45 max-sm:pt-10 pl-20 max-sm:px-6 pb-25 max-sm:pb-10 flex flex-col justify-between items-start`}
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div>
            <h1 className="text-6xl max-sm:text-2xl text-white uppercase mb-4 max-sm:mb-2">
              Освой сварку
              <br />с AI-помощником
            </h1>
            <p className="text-4xl max-sm:text-xl text-stone-300">
              Профессия, практика и технологии в одном курсе
            </p>
          </div>
          <Link to={"/buy-access"}>
            <Button
              text={"Начать обучение"}
              twclass="max-sm:!text-xl max-sm:!w-full max-sm:!border-2"
            />
          </Link>
          <img
            className="absolute bottom-0 right-0 max-sm:w-0 max-sm:h-0"
            src={tools}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
