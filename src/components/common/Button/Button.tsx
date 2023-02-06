import React, { ReactNode, useMemo } from "react";
import style from "@styles/neumorphic.module.scss";
import { CSSStyle } from "@utils/types";

type NeumorphicButtonProp = CSSStyle & {
  onClick?: () => any;
  children?: ReactNode;
  type?: "secondary" | "normal" | "primary";
  className?: string;
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
  className,
  children,
}) => {
  const buttonClassName = useMemo(() => {
    const classes = [style.root, style.button];
    if (type !== "normal") classes.push(style[type]);
    if (className) classes.push(className);
    return classes.join(" ");
  }, [type, className]);

  return (
    <button
      className={buttonClassName}
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
