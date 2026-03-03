import { Link } from "react-router";
import Button from "../../../../shared/components/Button";
import PricingCard from "./components/PricingCard";
import getPoints from "./config/getPoints";

export default function PricingSection() {
  const features = getPoints();

  return (
    <div className="w-full mt-23">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 bg-deepBlue rounded-3xl px-12 py-8">
          <div className="flex flex-col">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Сколько стоят курсы и что входит
              <br />в стоимость
            </h2>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="text-gray-400 text-xl flex items-start"
                >
                  <span className="text-gray-400 mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <div className="text-white text-3xl font-bold mb-1">
                2 990 ₽ / месяц
              </div>
              <div className="text-gray-400 text-lg mb-6">
                Доступ открывается сразу после оплаты.
              </div>
              <Link to={"/buy-access"}>
                <Button text={"Начать обучение"} twclass="!text-2xl" />
              </Link>
            </div>
          </div>
          <div className="relative flex items-end justify-center lg:justify-end">
            <PricingCard />
          </div>
        </div>
      </div>
    </div>
  );
}
