import BlueCertificate from "./components/blueCertificate";
import WhiteCertificate from "./components/whiteCertificate";

export default function CertificatesSection() {
  return (
    <section className="mt-23 ml-auto w-full max-sm:mt-16">
      <div className="container flex max-sm:flex-col justify-center items-center gap-40 max-sm:gap-6">
        <div className="max-w-120">
          <h2 className="text-4xl max-sm:text-2xl max-sm:text-center text-gray-900 leading-tight mb-6">
            Выдаём дипломы
            <br />и сертификаты
          </h2>
          <p className="text-gray-600 text-xl max-sm:text-lg leading-relaxed max-sm:text-center">
            После окончания курса вы получите сертификат установленного образца
            - тип документа можно уточнить у консультанта.
          </p>
        </div>

        <div className="relative w-full max-w-150">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background:
                "radial-gradient(circle,rgba(251, 126, 0, 0.8) 0%, rgba(12, 13, 51, 0.9) 85%)",
            }}
          >
            <div className="relative flex items-center justify-center py-8 px-6">
              <div className="translate-x-6"><WhiteCertificate /></div>

              <div className="-translate-x-6"><BlueCertificate /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
