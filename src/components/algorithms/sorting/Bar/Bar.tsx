import { useMemo } from "react";
import neumorphic from "@styles/neumorphic.module.scss";
import style from "./bar.module.scss";
import { SortingAnimationType } from "@utils/types";

type BarProp = {
  status?: SortingAnimationType;
  width?: number;
  height?: number;
  direction?: "horizontal" | "vertical";
  value?: string | number;
};

export const Bar: React.FC<BarProp> = ({
  status = "normal",
  width = 150,
  height = 50,
  direction = "vertical",
  value,
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
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {status === "done" && (
        <div className={style.checkmark} style={{ marginBottom: 16 }} />
      )}
      <div
        className={barClassName}
        style={{
          width: direction === "horizontal" ? width : height,
          height: direction === "horizontal" ? height : width,
          padding: isLargeEnough ? Math.min(width, height) / 4 : 0,
          borderRadius: 10,
          display: "flex",
          alignItems: isLargeEnough ? undefined : "center",
          justifyContent: "center",
        }}
      >
        {isLargeEnough && <span style={{ fontWeight: 500 }}>{value}</span>}
      </div>
      <div
        className={underbarClassName}
        style={{
          marginTop: 12,
          width: (direction === "horizontal" ? width : height) - 10,
        }}
      />
    </div>
  );
};
