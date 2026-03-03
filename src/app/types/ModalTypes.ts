export type TAuthModalStore = {
  isAuthModalOpen: boolean;
  isRegisterModalOpen: boolean;
  openAuthModal: () => void;
  openRegisterModal: () => void;
  closeModals: () => void;
};