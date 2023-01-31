import { ReactNode } from "react";

export type ButtonType = "text" | "flat" | "floating";
export type ButtonColor = "pink" | "navy";

export const buttonType: Record<"TEXT" | "FLAT" | "FLOAT", ButtonType> = {
  TEXT: "text",
  FLAT: "flat",
  FLOAT: "floating",
};

export const buttonColor: Record<"PINK" | "NAVY", ButtonColor> = {
  PINK: "pink",
  NAVY: "navy",
};

export interface ButtonProp {
  type?: ButtonType;
  onClick?: () => any;
  colorType?: ButtonColor;
  children?: ReactNode;
  margin?: number | string;
  fontWeight?: number | string;
  fontSize?: number | string;
}
