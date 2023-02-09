import { useMemo } from "react";
import neumorphic from "@styles/neumorphic.module.scss";
import style from "./bar.module.scss";
import { CSSStyle, SortingAnimationType } from "@utils/types";

type BarProp = CSSStyle & {
  status?: SortingAnimationType;
  width?: number | string;
  height?: number | string;
  direction?: "horizontal" | "vertical";
  value?: string | number;
  translate: { x: number; y: number };
};

export const TestBar: React.FC<BarProp> = ({
  status = "normal",
  width = 150,
  height = 50,
  direction = "vertical",
  value,
  transition,
  translate,
}) => {
  const barClassName = useMemo(() => {
    const classes = [neumorphic.root, style.bar];
    if (status !== "normal") classes.push(style[status]);
    return classes.join(" ");
  }, [status]);

  const underbarClassName = useMemo(() => {
    const classes = [style.line];
    if (status === "range" || status === "focus" || status === "compare") {
      classes.push(style.visible);
    }
    return classes.join(" ");
  }, [status]);

  const isLargeEnough = useMemo(
    () => width > 18 && height > 32,
    [width, height]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        transform: `translate(${translate.x * 100}%, ${translate.y * 100}%)`,
        transition,
      }}
    >
      <div
        className={barClassName}
        style={{
          width: direction === "horizontal" ? width : height,
          height: direction === "horizontal" ? height : width,
          padding: "10%",
          borderRadius: 10,
          display: "flex",
          alignItems: isLargeEnough ? undefined : "center",
          justifyContent: "center",
          transform: "scaleY(-1) scaleX(-1)",
        }}
      >
        {isLargeEnough && <span style={{ fontWeight: 500 }}>{value}</span>}
      </div>
      {status === "done" && (
        <div
          className={style.checkmark}
          style={{
            marginTop: "min(4.5vw, 16px)",
            transform: "rotate(135deg)",
          }}
        />
      )}
    </div>
  );
};
