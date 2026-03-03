import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../auth/store/authStore";
import { useModalStore } from "../../../app/store/modalStore";

export default function useClickProfile() {
  const navigate = useNavigate();
  const id = useAuthStore((s) => s.id);

  const openAuthModal = useModalStore((s) => s.openAuthModal);

  const onClickProfile = useCallback(() => {
    if (id !== "guest") {
      window.scrollTo(0, 0);
      navigate("/profile");
    } else {
      openAuthModal();
    }
  }, [id, navigate, openAuthModal]);

  return onClickProfile;
}
