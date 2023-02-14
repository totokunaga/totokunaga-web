export type DeviceType = "SMARTPHONE" | "TABLET" | "DESKTOP";
export const SMARTPHONE = "SMARTPHONE";
export const TABLET = "TABLET";
export const DESKTOP = "DESKTOP";

export type Lang = "ja" | "en";

export type CSSStyle = {
  margin?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  fontSize?: number | string;
  fontWeight?: number | string;
  fontFamily?: string;
  color?: string;
  fill?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: number | string;
  borderColor?: string;
  cursor?: string;
  flexGrow?: number;
  transition?: string;
};

export * from "./pages";
