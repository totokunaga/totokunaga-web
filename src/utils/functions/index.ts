import { setDarkMode, store } from "@utils/slices";

export * from "./pages";
export * from "./auth";

export const initMatrix = <T>(
  rowSize: number,
  colSize: number,
  initialValue: T
) => {
  const matrix: T[][] = Array.from({ length: rowSize }, () =>
    Array.from({ length: colSize }, () => initialValue)
  );

  return matrix;
};

export const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export const isiOSDevice = () => {
  return Boolean(
    navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/Safari/i)
  );
};

export const setGlobalDarkMode = (isDarkMode: boolean) => {
  const { dispatch } = store;
  dispatch(setDarkMode(isDarkMode));
  sessionStorage.setItem("color-theme", isDarkMode ? "dark" : "light");

  if (isDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("style", "color-scheme: dark;");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.setAttribute("style", "color-scheme: light;");
  }
};
