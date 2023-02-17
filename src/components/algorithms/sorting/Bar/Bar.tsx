import { useMemo } from "react";
import neumorphic from "@styles/neumorphic.module.scss";
import style from "./bar.module.scss";
import { CSSStyle, SortingAnimationType } from "@utils/types";

type BarProp = CSSStyle & {
  status?: SortingAnimationType;
  width?: number | string;
  height?: number | string;
  value?: number;
  translate: { x: number; y: number };
  showValue: boolean;
  onClickHandler: (value?: number) => void;
};

export const Bar: React.FC<BarProp> = ({
  status = "normal",
  width = 150,
  height = 50,
  value,
  transition,
  translate,
  showValue,
  onClickHandler,
}) => {
  const barClassName = useMemo(() => {
    const classes = [neumorphic.root, style.bar];
    if (status !== "normal") classes.push(style[status]);
    return classes.join(" ");
  }, [status]);

  const isSmallest = useMemo(() => value === 1, [value]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        transform: `translate(${translate.x * 100}%, ${translate.y * 100}%)`,
        transition,
      }}
    >
      <div
        id={"bar-" + value}
        className={barClassName}
        onClick={() => onClickHandler(value)}
        style={{
          width,
          height,
          padding: "0 20%",
          margin: "auto auto 0px auto",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: isSmallest ? "center" : undefined,
          position: "relative",
          cursor: "pointer",
        }}
      >
        {status === "done" && (
          <div
            className={style.checkmark}
            style={{ position: "absolute", top: "max(-7.5vw, -24px)" }}
          />
        )}
        {showValue && (
          <span
            style={{
              fontWeight: 500,
              ...(isSmallest ? {} : { position: "absolute", top: 15 }),
            }}
          >
            {value}
          </span>
        )}
      </div>
    </div>
  );
};
