import { AlertTriangle, Lightbulb, Info } from 'lucide-react';

interface InfoBlockProps {
  type: 'warning' | 'tip' | 'error';
  children: React.ReactNode;
}

const InfoBlock = ({ type, children }: InfoBlockProps) => {
  const styles = {
    warning: {
      bg: 'bg-orange-50',
      border: 'border-l-[#DD6207]',
      icon: <Info className="w-5 h-5 text-[#DD6207]" />,
      title: 'Важно',
      titleColor: 'text-[#DD6207]',
    },
    tip: {
      bg: 'bg-blue-50',
      border: 'border-l-[#0C0D33]',
      icon: <Lightbulb className="w-5 h-5 text-[#0C0D33]" />,
      title: 'Совет',
      titleColor: 'text-[#0C0D33]',
    },
    error: {
      bg: 'bg-gray-50',
      border: 'border-l-gray-400',
      icon: <AlertTriangle className="w-5 h-5 text-gray-500" />,
      title: 'Частая ошибка',
      titleColor: 'text-gray-600',
    },
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} border-l-4 ${style.border} rounded-r-xl p-5 my-6`}>
      <div className="flex items-start gap-3">
        {style.icon}
        <div>
          <h4 className={`font-semibold ${style.titleColor} mb-1`}>{style.title}</h4>
          <div className="text-gray-700 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface ParameterBlockProps {
  label: string;
  value: string;
}

const ParameterBlock = ({ label, value }: ParameterBlockProps) => (
  <code className="inline-block bg-gray-100 text-[#0C0D33] px-3 py-1 rounded-lg text-sm font-mono">
    <span className="text-gray-500">{label}:</span> {value}
  </code>
);

export const TheoryContent = () => {
  return (
    <article className="max-w-[850px] mx-auto">
      {/* Introduction */}
      <p className="text-lg text-gray-700 leading-[1.7] mb-6">
        Электроды являются расходным материалом, который непосредственно влияет на
        качество сварного шва. Правильный выбор электрода определяет прочность соединения,
        внешний вид шва и производительность работ.
      </p>

      {/* H2 Section */}
      <h2 className="text-2xl font-bold text-[#0C0D33] mt-10 mb-4">
        Классификация электродов
      </h2>

      <p className="text-lg text-gray-700 leading-[1.7] mb-6">
        Электроды классифицируются по нескольким параметрам: типу покрытия, назначению,
        прочности deposited metal и диаметру. Понимание классификации позволяет
        правильно подобрать материал для конкретной задачи.
      </p>

      {/* H3 Section */}
      <h3 className="text-xl font-semibold text-[#0C0D33] mt-8 mb-4">
        По типу покрытия
      </h3>

      <ul className="space-y-3 mb-6">
        <li className="flex items-start gap-3">
          <span className="w-2 h-2 rounded-full bg-[#DD6207] mt-2.5 flex-shrink-0" />
          <span className="text-gray-700 leading-relaxed">
            <strong className="text-[#0C0D33]">Рутиловые (Тип Р)</strong> — универсальные
            электроды для работы с переменным и постоянным током. Обеспечивают
            стабильное горение дуги и хорошее формирование шва.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-2 h-2 rounded-full bg-[#DD6207] mt-2.5 flex-shrink-0" />
          <span className="text-gray-700 leading-relaxed">
            <strong className="text-[#0C0D33]">Основные (Тип Б)</strong> — для критических
            конструкций, требующих высокой пластичности и ударной вязкости шва.
            Работают только на постоянном токе обратной полярности.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-2 h-2 rounded-full bg-[#DD6207] mt-2.5 flex-shrink-0" />
          <span className="text-gray-700 leading-relaxed">
            <strong className="text-[#0C0D33]">Ацетиленовые (Тип А)</strong> — для
            сварки в труднодоступных местах и вертикальных швов. Формируют тонкий
            шлаковый покров.
          </span>
        </li>
      </ul>

      {/* Warning Block */}
      <InfoBlock type="warning">
        Перед началом работы обязательно проверьте срок годности электродов.
        Просроченные электроды необходимо прокалить при температуре{' '}
        <span className="text-[#DD6207] font-semibold">350-400°C</span> в течение{' '}
        <span className="text-[#DD6207] font-semibold">1-2 часов</span>.
      </InfoBlock>

      {/* H2 Section */}
      <h2 className="text-2xl font-bold text-[#0C0D33] mt-10 mb-4">
        Маркировка электродов
      </h2>

      <p className="text-lg text-gray-700 leading-[1.7] mb-6">
        Маркировка электродов по ГОСТ 9467-75 состоит из буквенно-цифрового кода,
        который содержит информацию о прочности, пластичности и типе покрытия.
      </p>

      {/* Parameters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <ParameterBlock label="E46" value="предел текучести 460 МПа" />
        <ParameterBlock label="E50" value="предел текучести 500 МПа" />
        <ParameterBlock label="Р" value="рутиловое покрытие" />
        <ParameterBlock label="Б" value="основное покрытие" />
      </div>

      {/* Tip Block */}
      <InfoBlock type="tip">
        Для сварки конструкций из стали Ст3 и 09Г2С наиболее универсальны электроды
        типа <span className="text-[#0C0D33] font-semibold">Э46А</span> и{' '}
        <span className="text-[#0C0D33] font-semibold">Э50А</span> с рутиловым покрытием.
        Они обеспечивают качественный шов при работе с переменным током.
      </InfoBlock>

      {/* Table */}
      <h3 className="text-xl font-semibold text-[#0C0D33] mt-8 mb-4">
        Режимы сварки в зависимости от диаметра электрода
      </h3>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="text-left px-4 py-3 text-[#0C0D33] font-semibold border-b-2 border-blue-100">
                Диаметр, мм
              </th>
              <th className="text-center px-4 py-3 text-[#0C0D33] font-semibold border-b-2 border-blue-100">
                Ток, А
              </th>
              <th className="text-center px-4 py-3 text-[#0C0D33] font-semibold border-b-2 border-blue-100">
                Напряжение, В
              </th>
              <th className="text-left px-4 py-3 text-[#0C0D33] font-semibold border-b-2 border-blue-100">
                Толщина металла, мм
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-700">2.0</td>
              <td className="px-4 py-3 text-center text-gray-700">55-80</td>
              <td className="px-4 py-3 text-center text-gray-700">20-24</td>
              <td className="px-4 py-3 text-gray-700">1.5-2.0</td>
            </tr>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-700">2.5</td>
              <td className="px-4 py-3 text-center text-gray-700">70-100</td>
              <td className="px-4 py-3 text-center text-gray-700">21-25</td>
              <td className="px-4 py-3 text-gray-700">2.0-4.0</td>
            </tr>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-700">3.0</td>
              <td className="px-4 py-3 text-center text-gray-700">90-140</td>
              <td className="px-4 py-3 text-center text-gray-700">22-26</td>
              <td className="px-4 py-3 text-gray-700">3.0-8.0</td>
            </tr>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-700">4.0</td>
              <td className="px-4 py-3 text-center text-gray-700">130-190</td>
              <td className="px-4 py-3 text-center text-gray-700">23-27</td>
              <td className="px-4 py-3 text-gray-700">6.0-16.0</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-700">5.0</td>
              <td className="px-4 py-3 text-center text-gray-700">180-250</td>
              <td className="px-4 py-3 text-center text-gray-700">24-28</td>
              <td className="px-4 py-3 text-gray-700">12.0-25.0</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Error Block */}
      <InfoBlock type="error">
        Не используйте электроды большего диаметра для тонкого металла — это приведёт
        к прожогу и деформации детали. Для листов толщиной до 3 мм применяйте
        электроды диаметром не более 2.5 мм.
      </InfoBlock>

      {/* H2 Section */}
      <h2 className="text-2xl font-bold text-[#0C0D33] mt-10 mb-4">
        Хранение и подготовка электродов
      </h2>

      <p className="text-lg text-gray-700 leading-[1.7] mb-6">
        Правильное хранение электродов критически важно для качества сварки.
        Влажность покрытия приводит к появлению пор в шве и разбрызгиванию металла.
      </p>

      <ol className="space-y-4 mb-6 list-decimal list-inside">
        <li className="text-gray-700 leading-relaxed pl-2">
          <span className="font-semibold text-[#0C0D33]">Температура хранения:</span>{' '}
          электроды должны храниться в сухом помещении при температуре не ниже 15°C
          и относительной влажности не более 60%.
        </li>
        <li className="text-gray-700 leading-relaxed pl-2">
          <span className="font-semibold text-[#0C0D33]">Упаковка:</span> храните
          электроды в заводской упаковке до момента использования. Открытую тару
          храните в специальных шкафах с подогревом.
        </li>
        <li className="text-gray-700 leading-relaxed pl-2">
          <span className="font-semibold text-[#0C0D33]">Прокалка:</span> перед
          использованием электроды с основным покрытием необходимо прокалить при
          350-400°C в течение 1 часа.
        </li>
        <li className="text-gray-700 leading-relaxed pl-2">
          <span className="font-semibold text-[#0C0D33]">Время использования:</span>{' '}
          после прокалки электроды с основным покрытием следует израсходовать в
          течение 2-4 часов.
        </li>
      </ol>

      {/* Quote */}
      <blockquote className="border-l-4 border-[#DD6207] pl-6 py-2 my-8 bg-orange-50/30 rounded-r-xl">
        <p className="text-gray-700 italic leading-relaxed">
          «Качество сварного шва на 70% зависит от правильного выбора и подготовки
          электродов. Экономия на материалах всегда оборачивается браком и
          переделками.»
        </p>
        <cite className="text-sm text-gray-500 mt-2 block">
          — ГОСТ 9467-75, приложение Б
        </cite>
      </blockquote>

      {/* Image Placeholder */}
      <h3 className="text-xl font-semibold text-[#0C0D33] mt-8 mb-4">
        Конструкция покрытого электрода
      </h3>

      <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
        <img
          src="https://csspicker.dev/api/image/?q=welding+electrode&image_type=photo"
          alt="Конструкция сварочного электрода"
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-sm text-gray-500 text-center -mt-4 mb-8">
        Рис. 1. Сварочный электрод: 1 — стержень, 2 — покрытие, 3 — зажимной хвостовик
      </p>

      {/* Formula */}
      <h3 className="text-xl font-semibold text-[#0C0D33] mt-8 mb-4">
        Расчёт расхода электродов
      </h3>

      <p className="text-lg text-gray-700 leading-[1.7] mb-4">
        Расход электродов на 1 метр шва можно рассчитать по формуле:
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
        <code className="text-xl font-mono text-[#0C0D33]">
          G = F × ρ × K<sub>н</sub>
        </code>
      </div>

      <p className="text-gray-700 leading-relaxed mb-2">
        где:
      </p>
      <ul className="space-y-2 mb-6">
        <li className="text-gray-700">
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">G</code> — масса
          электродов на 1 м шва, кг
        </li>
        <li className="text-gray-700">
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">F</code> — площадь
          поперечного сечения шва, см²
        </li>
        <li className="text-gray-700">
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">ρ</code> — плотность
          металла, г/см³ (для стали 7.85)
        </li>
        <li className="text-gray-700">
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">K<sub>н</sub></code>{' '}
          — коэффициент наплавки (обычно 1.3-1.6)
        </li>
      </ul>
    </article>
  );
};
