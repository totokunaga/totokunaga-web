import React, { useMemo } from "react";
import style from "./arrow.module.css";

type Direction = "right" | "left" | "up" | "down";

export const Arrow: React.FC<{
  size?: number;
  direction?: Direction;
  thickness?: number | string;
}> = ({ size = 5, direction = "right", thickness = 3 }) => {
  const marginOption = useMemo<Record<Direction, string>>(() => {
    return {
      right: `0 ${size}px 0 0`,
      left: `0 0 0 ${size}px`,
      up: `${size}px 0 0 0`,
      down: `0 0 ${size}px 0`,
    };
  }, [size]);

  return (
    <div
      className={`${style.arrow} ${style[direction]}`}
      style={{
        padding: size,
        margin: marginOption[direction],
        borderWidth: `0 ${thickness}px ${thickness}px 0`,
      }}
    />
  );
};
