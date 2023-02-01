import React, { ReactNode } from "react";
import style from "./button.module.scss";

type NeumorphicButtonProp = {
  onClick?: () => any;
  children?: ReactNode;
  margin?: number | string;
  padding?: number | string;
  fontWeight?: number | string;
  fontSize?: number | string;
  backgroundColor?: string;
  flexGrow?: number;
  type?: "secondary" | "normal" | "primary";
};

export const Button: React.FC<NeumorphicButtonProp> = ({
  onClick,
  margin,
  padding,
  fontWeight,
  fontSize,
  backgroundColor,
  flexGrow = 1,
  type = "normal",
  children,
}) => {
  return (
    <button
      className={`${style.btn} ${type !== "normal" && style[type]}`}
      onClick={onClick}
      style={{
        margin,
        padding,
        fontWeight,
        fontSize,
        backgroundColor,
        flexGrow,
      }}
    >
      {children}
    </button>
  );
};
