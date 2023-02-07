import { spaceBetweenBars } from "@utils/constants";
import { useEffect, useState } from "react";
import { Bar } from "../sorting";

const values = [4, 2, 5, 3, 1];
const miniBarWrapperId = "mini-bar-wrapper";

export const MiniSorting: React.FC = () => {
  const [barWidth, setBarWidth] = useState(0);
  const [heightUnit, setHeightUnit] = useState(0);
  const [wrapperMargin, setWrapperMargin] = useState({ x: 0, top: 0 });

  useEffect(() => {
    const n = values.length;
    const wrapperElement = document.getElementById(miniBarWrapperId);
    if (wrapperElement) {
      const parentHeight = wrapperElement.clientHeight;
      const parentWidth = wrapperElement.clientWidth;
      const margin = {
        x: parentWidth < 175 ? 4 : 24,
        top: parentWidth < 175 ? 4 : 16,
      };

      const heightUnit = Math.floor((parentHeight - 32 - margin.top) / n);
      const barWidth = Math.floor(
        (parentWidth - (n - 1) * spaceBetweenBars - margin.x * 2) / n
      );

      setBarWidth(barWidth);
      setHeightUnit(heightUnit);
      setWrapperMargin(margin);
    }
  }, []);

  return (
    <div
      id={miniBarWrapperId}
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: 0,
            left: (barWidth + spaceBetweenBars) * i + wrapperMargin.x,
          }}
        >
          <Bar
            height={v * heightUnit}
            width={barWidth}
            direction={"horizontal"}
          />
        </div>
      ))}
    </div>
  );
};
