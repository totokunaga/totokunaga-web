import { useMemo } from "react";
import neumorphic from "@styles/neumorphic.module.scss";
import style from "./bar.module.scss";

type BarProp = {
  width?: number;
  height?: number;
  direction?: "horizontal" | "vertical";
  value?: string | number;
};

export const Bar: React.FC<BarProp> = ({
  width = 150,
  height = 50,
  direction = "vertical",
  value,
}) => {
  const barClassName = useMemo(() => {
    const classes = [neumorphic.root];
    return classes.join(" ");
  }, []);

  return (
    // <div style={{ display: "flex" }}>
    <div
      className={barClassName}
      style={{
        width: direction === "horizontal" ? width : height,
        height: direction === "horizontal" ? height : width,
        padding: 12,
        borderRadius: 10,
        textAlign: "center",
      }}
    >
      <span>{value}</span>
    </div>
    // </div>
  );
};
