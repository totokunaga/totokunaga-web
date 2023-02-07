import { spaceBetweenBars } from "@utils/constants";
import { animateBars, initBars } from "@utils/functions";
import { InnerValue, SortingAlgorithm, SortingAnimation } from "@utils/types";
import { useEffect, useState } from "react";
import { Bar } from "../sorting";

const values = [4, 2, 5, 3, 1];
const miniBarWrapperId = "mini-bar-wrapper";
const mobileMarginX = 4;
const mobileMarginTop = 4;
const marginX = 24;
const marginTop = 16;

const animations: SortingAnimation[] = [
  { type: "swap", positionOne: 0, positionTwo: 4, duration: 500 },
];

export const MiniSorting: React.FC = () => {
  const [barInfo, setBarInfo] = useState<InnerValue[]>([]);
  const [barIds, setBarIds] = useState<number[]>([]);
  const [doneAnimation, setDoneAnimation] = useState(true);

  const [barWidth, setBarWidth] = useState(0);
  const [heightUnit, setHeightUnit] = useState(0);
  const [margin, setMargin] = useState({ x: 0, top: 0 });

  useEffect(() => {
    const n = values.length;
    const wrapperElement = document.getElementById(miniBarWrapperId);
    if (wrapperElement) {
      const parentHeight = wrapperElement.clientHeight;
      const parentWidth = wrapperElement.clientWidth;
      const margin = {
        x: parentWidth < 175 ? mobileMarginX : marginX,
        top: parentWidth < 175 ? mobileMarginTop : marginTop,
      };

      const heightUnit = Math.floor((parentHeight - 32 - margin.top) / n);
      const barWidth = Math.floor(
        (parentWidth - (n - 1) * spaceBetweenBars - margin.x * 2) / n
      );

      setBarWidth(barWidth);
      setHeightUnit(heightUnit);
      setBarInfo(initBars(values, barWidth, heightUnit, margin.x, false));
      setBarIds(values.map((_, i) => i));
      setMargin(margin);
    }
  }, []);

  useEffect(() => {
    if (barInfo.length && barIds.length && doneAnimation) {
      setDoneAnimation(false);
      // const animations: SortingAnimation[] = [];

      let timeoutAmount = 0;
      let baseBarIds = barIds;
      let baseBarInfo = barInfo;
      animations.forEach((animation, i) => {
        timeoutAmount += animation.duration;
        setTimeout(() => {
          const [newBarInfo, newBarIds] = animateBars(
            baseBarInfo,
            baseBarIds,
            barWidth,
            animation,
            margin.x,
            false
          );
          baseBarIds = newBarIds;
          baseBarInfo = newBarInfo;
          setBarInfo(newBarInfo);
          setBarIds(newBarIds);

          if (i === animations.length - 1) {
            // setDoneAnimation(true);
          }
        }, timeoutAmount);
      });
    }
  }, [barInfo, doneAnimation]);

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
      {barInfo.map(({ value, status, left }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: 0,
            left,
            transition: `left 0.5s ease-in-out, background-color 0.5s`,
          }}
        >
          <Bar
            status={status}
            height={value * heightUnit}
            width={barWidth}
            direction={"horizontal"}
          />
        </div>
      ))}
    </div>
  );
};
