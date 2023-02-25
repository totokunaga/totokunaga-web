import { MutableRefObject, useEffect } from "react";

export const useModalOutsideClick = (
  ref: MutableRefObject<any>,
  callback: () => void,
  isShown: boolean
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    if (isShown) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isShown]);
};
