import { useState } from "react";
import { Check } from "lucide-react";
import Button from "../../../../shared/components/Button";
import useContactStore from "./store/contactStore";
import useSendOrder from "./hooks/useSendOrder";

export default function ContactForm() {
  const [agreed, setAgreed] = useState(false);
  const [phoneAgreed, setPhoneAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const {mutate: sendOrder} = useSendOrder()

  // Получаем состояние из store
  const {
    name,
    email,
    phone,
    nameEr,
    emailEr,
    phoneEr,
    setName,
    setEmail,
    setPhone,
    clearForm,
    validateForm,
  } = useContactStore();

  // Обработчик изменений в полях ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Обновляем соответствующее поле
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone": {
        // Форматируем телефон (только цифры)
        const phoneNumber = value.replace(/\D/g, "");
        setPhone(phoneNumber);
        break;
      }
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка согласий
    if (!agreed) {
      setSubmitStatus({
        type: "error",
        message: "Необходимо согласие на обработку персональных данных",
      });
      return;
    }

    // Валидация формы через store
    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message: "Пожалуйста, исправьте ошибки в форме",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      // Подготавливаем данные для отправки
      const formData = {
        name,
        email,
        phone,
        agreed,
        phoneAgreed,
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
      };

      // Сохраняем в localStorage
      const existingData = localStorage.getItem("formSubmissions");
      const submissions = existingData ? JSON.parse(existingData) : [];
      submissions.push(formData);
      localStorage.setItem("formSubmissions", JSON.stringify(submissions));

      setSubmitStatus({
        type: "success",
        message: "Форма успешно отправлена!",
      });

      sendOrder({ ...formData});
      console.log(formData)

      // Очищаем форму
      clearForm();
      setAgreed(false);
      setPhoneAgreed(false);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Произошла ошибка при отправке формы",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-23 max-sm:mt-16 max-sm:px-4">
      <div className="max-w-4xl w-full bg-deepBlue rounded-2xl p-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Поможем решить
              <br />
              все вопросы
            </h2>
            <p className="text-white text-lg leading-relaxed">
              Если вы хотите больше узнать об обучении, оставьте заявку - и мы с
              вами свяжемся
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                placeholder="Имя"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-deepBlue focus:border-transparent ${
                  nameEr ? "border-red-500" : "border-gray-200"
                }`}
              />
              {nameEr && <p className="mt-1 text-xs text-red-500">{nameEr}</p>}
            </div>

            <div className="grid grid-cols-2 max-sm:flex max-sm:flex-col gap-3">
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handleInputChange}
                  placeholder="Телефон"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-deepBlue focus:border-transparent ${
                    phoneEr ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {phoneEr && (
                  <p className="mt-1 text-xs text-red-500">{phoneEr}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Электронная почта"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-deepBlue focus:border-transparent ${
                    emailEr ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {emailEr && (
                  <p className="mt-1 text-xs text-red-500">{emailEr}</p>
                )}
              </div>
            </div>

            {/* Чекбоксы */}
            <div
              className="flex items-start gap-2 cursor-pointer group"
              onClick={() => setAgreed(!agreed)}
            >
              <button
                type="button"
                className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors pointer-events-none ${
                  agreed
                    ? "bg-deepBlue border-deepBlue"
                    : "bg-white border-gray-300"
                }`}
                aria-hidden="true"
              >
                {agreed && <Check className="w-3 h-3 text-white" />}
              </button>
              <span className="text-sm text-white group-hover:text-white transition-colors">
                Я соглашаюсь на обработку персональных данных
              </span>
            </div>

            <Button
              text={isSubmitting ? "Отправка..." : "Отправить"}
              twclass={`!min-w-0 !w-full !px-8 !py-3 !font-medium !rounded-lg !text-xl !border-2 ${
                agreed
                  ? "!text-orange hover:!text-white"
                  : "!text-gray-300 hover:!text-gray-300 !border-gray-300 hover:!bg-transparent disabled"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            />

            {submitStatus.message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div
              className="flex items-start gap-2 cursor-pointer group"
              onClick={() => setPhoneAgreed(!phoneAgreed)}
            >
              <button
                type="button"
                className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors pointer-events-none ${
                  phoneAgreed
                    ? "bg-orange border-orange"
                    : "bg-white border-gray-300"
                }`}
                aria-hidden="true"
              >
                {phoneAgreed && <Check className="w-3 h-3 text-white" />}
              </button>
              <span className="text-sm text-white group-hover:text-white transition-colors">
                Я согласен получать рекламу и звонки
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
