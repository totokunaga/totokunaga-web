export type DeviceType = "SMARTPHONE" | "TABLET" | "DESKTOP";
export const SMARTPHONE = "SMARTPHONE";
export const TABLET = "TABLET";
export const DESKTOP = "DESKTOP";

export type ClearableCellType = "Blocked" | "Visited" | "Path";
export type CellType = "Selected" | "Empty" | ClearableCellType;
