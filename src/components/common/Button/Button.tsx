import React from "react";
import style from "./button.module.scss";
import { buttonColor, ButtonColor, ButtonProp, ButtonType } from "./interfaces";

const buttonClasses: Record<ButtonType, string> = {
  text: style.textbutton,
  flat: style.flatbutton,
  floating: style.floatingbutton,
};

const buttonColorClass: Record<ButtonColor, string> = {
  pink: style.pinkbutton,
  navy: style.navybutton,
};

const { NAVY } = buttonColor;

export const Button: React.FC<ButtonProp> = (props) => {
  const {
    onClick,
    type,
    children,
    colorType = NAVY,
    margin,
    fontWeight,
  } = props;

  return (
    <button
      className={`${buttonClasses[type]} ${buttonColorClass[colorType]}`}
      onClick={onClick}
      style={{ margin, fontWeight }}
    >
      {children}
    </button>
  );
};
