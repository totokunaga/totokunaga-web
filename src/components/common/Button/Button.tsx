import React, { ReactNode, useMemo } from "react";
import style from "@styles/neumorphic.module.scss";
import buttonStyle from "./button.module.scss";
import { CSSStyle } from "@utils/types";

type ButtonProp = CSSStyle & {
  onClick?: () => any;
  type?: "secondary" | "normal" | "primary" | "flat";
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
};

export const Button: React.FC<ButtonProp> = ({
  onClick,
  margin,
  padding,
  fontWeight,
  fontSize,
  backgroundColor,
  flexGrow = 1,
  type = "normal",
  disabled = false,
  className,
  width,
  children,
  ...props
}) => {
  const buttonClassName = useMemo(() => {
    const classes = [];
    if (!disabled) {
      if (type !== "flat") {
        classes.push(style.root);
        classes.push(style.button);
        if (type !== "normal") classes.push(style[type]);
      } else {
        classes.push(buttonStyle[type]);
      }
    } else {
      classes.push(style.root);
      classes.push(style.button);
      classes.push(style.disabled);
    }
    if (className) classes.push(className);

    return classes.join(" ");
  }, [type, className, disabled]);

  return (
    <button
      className={buttonClassName}
      onClick={() => !disabled && onClick && onClick()}
      style={{
        width,
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
