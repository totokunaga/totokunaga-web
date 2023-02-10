export * from "./pages";

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
