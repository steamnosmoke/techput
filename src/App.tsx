import RoutesComponent from "./app/routes";
import { useModalStore } from "./app/store/modalStore";
import AuthModal from "./features/auth/AuthModal";
import RegisterModal from "./features/auth/RegisterModal";
import Footer from "./features/Footer";
import Header from "./features/Header";

export default function App() {
  const openAuthModal = useModalStore((state) => state.openAuthModal);
  const openRegisterModal = useModalStore((state) => state.openRegisterModal);
  const closeModals = useModalStore((state) => state.closeModals);
  const isAuthModalOpen = useModalStore((state) => state.isAuthModalOpen);
  const isRegisterModalOpen = useModalStore(
    (state) => state.isRegisterModalOpen,
  );
  return (
    <>
      <Header />
      <RoutesComponent />
      <Footer />
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => closeModals()}
          onSwitchToRegister={() => openRegisterModal()}
        />
      )}
      {isRegisterModalOpen && (
        <RegisterModal
          onClose={() => closeModals()}
          onSwitchToLogin={() => openAuthModal()}
        />
      )}
    </>
  );
}
