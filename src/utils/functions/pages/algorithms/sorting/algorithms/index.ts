export * from "./selection-sort";
export * from "./quick-sort";

export const swap = <T>(values: T[], i: number, j: number) => {
  const temp = values[i];
  values[i] = values[j];
  values[j] = temp;
};
