import React from "react";
import style from "./neumorphicButton.module.scss";
import { ButtonProp } from "./interfaces";

export const NeumorphicButton: React.FC<ButtonProp> = ({
  onClick,
  margin,
  fontWeight,
  fontSize,
}) => {
  return (
    <button
      className={style.btn}
      onClick={onClick}
      style={{ margin, fontWeight, fontSize }}
    >
      {"Clear selected cells"}
    </button>
  );
};
