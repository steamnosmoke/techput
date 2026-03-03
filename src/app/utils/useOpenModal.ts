import { useEffect, useRef } from "react";

export function useOpenModal() {
  const scrollY = useRef(0);

  useEffect(() => {

    scrollY.current = window.scrollY;

    const body = document.body;

    body.style.overflow = "hidden";
    body.style.top = `-${scrollY.current}px`;
    body.style.paddingRight = '19px';

    return () => {
      body.style.overflow = "";
      body.style.top = "";
      body.style.paddingRight = "";

      window.scrollTo(0, scrollY.current);
    };
  }, []);
}
