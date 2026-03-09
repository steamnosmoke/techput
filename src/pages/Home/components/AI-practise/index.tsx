import pic from "./images/pic.png";

export default function AIPractise() {
  return (
    <div className="container flex flex-col justify-between items-center gap-5.5 mt-23 max-sm:mt-8">
      <img className="w-175 h-100 max-sm:w-90 max-sm:h-55" src={pic} alt="" />
      <h3 className="text-black text-5xl max-sm:text-2xl text-center max-w-200">
        Искусственный интеллект для&nbsp;точной практики
      </h3>
      <p className="text-3xl max-sm:text-lg text-stone-500 max-w-290 max-sm:max-w-80 text-center">
        AI-помощник анализирует форму шва и характер дефектов, связывает их с
        режимами работы и даёт пояснение. Обратная связь появляется сразу после
        загрузки — это ускоряет обучение и делает прогресс измеримым.
      </p>
    </div>
  );
}
