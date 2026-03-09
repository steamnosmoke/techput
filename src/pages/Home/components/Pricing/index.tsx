import { Link } from "react-router";
import Button from "../../../../shared/components/Button";
import PricingCard from "./components/PricingCard";
import getPoints from "./config/getPoints";

export default function PricingSection() {
  const features = getPoints();

  return (
    <div className="w-full mt-23 max-sm:mt-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 bg-deepBlue rounded-3xl px-12  py-8 max-sm:px-4 max-sm:py-6 max-lg:grid-cols-1">
          <div className="flex flex-col">
            <h2 className="text-white text-4xl max-sm:text-2xl font-bold mb-6 leading-tight">
              Сколько стоят курсы и что входит
              <span className="hidden max-sm:inline-block">&nbsp;</span>
              <br className="max-sm:hidden" />в стоимость
            </h2>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="text-gray-400 text-xl max-sm:text-base flex items-start"
                >
                  <span className="text-gray-400 mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <div className="text-white text-3xl max-sm:text-2xl font-bold mb-1">
                9 990 ₽ за весь курс
              </div>
              <div className="text-gray-400 text-lg max-sm:text-base mb-6">
                Доступ открывается сразу после оплаты.
              </div>
              <Link to={"/buy-access"}>
                <Button
                  text={"Начать обучение"}
                  twclass="!text-2xl max-sm:!text-xl max-sm:!min-w-full max-sm:!border-2"
                />
              </Link>
            </div>
          </div>
          <div className="relative flex items-end justify-center max-sm:hidden">
            <PricingCard />
          </div>
        </div>
      </div>
    </div>
  );
}
