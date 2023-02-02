import React, { ReactNode, useMemo } from "react";
import style from "@styles/neumorphic.module.scss";

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
  const typeClassName = useMemo(() => type !== "normal" && style[type], [type]);

  return (
    <button
      className={`${style.root} ${style.button} ${typeClassName}`}
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
