import About from "./components/About";
import AIPractise from "./components/AI-practise";
import Banner from "./components/banner";
import ContactForm from "./components/ContactForm";
import CourseForYou from "./components/CourseForYou";
import HowItWorking from "./components/HowItWorking";
import PricingSection from "./components/Pricing";
import CertificatesSection from "./components/Sertificate";
import WhySection from "./components/Why";

export default function MainPage() {
  return (
    <div className="mt-28 max-sm:mt-20">
      <Banner />
      <HowItWorking />
      <AIPractise />
      <WhySection />
      <About/>
      <CourseForYou />
      <CertificatesSection/>
      <PricingSection/>
      <ContactForm/>
    </div>
  );
}
