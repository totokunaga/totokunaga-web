import { MyHead } from "@components/common";
import {
  barBlockBottomOffset,
  barIconSize,
  BAR_BLOCK_WRAPPER,
  defaultBarWidth,
  defaultHeightUnit,
  maxBars,
  pages,
  spaceBetweenBars,
} from "@utils/constants";
import style from "@styles/default.module.scss";
import { BarBlock } from "@components/algorithms/sorting/BarBlock/BarBlock";
import { useEffect, useState } from "react";
import { SortingControlSection } from "@components/algorithms";
import {
  bubblesort,
  shuffle,
} from "@utils/functions/pages/algorithms/sorting/algorithms";

const { sorting } = pages;

const minBars = 7;

const SortingIndex: React.FC = () => {
  const [values, setValues] = useState<number[]>([]);
  const [barWidth, setBarWidth] = useState<number>(0);
  const [heightUnit, setHeightUnit] = useState<number>(0);

  useEffect(() => {
    const wrapperElement = document.getElementById(BAR_BLOCK_WRAPPER);
    if (wrapperElement) {
      const parentWidth = wrapperElement.clientWidth;
      const parentHeight = wrapperElement.clientHeight;

      const barWidth = Math.min(
        Math.floor(parentWidth / minBars),
        defaultBarWidth
      );
      const numBars = Math.min(
        Math.floor(parentWidth / (barWidth + spaceBetweenBars)),
        maxBars
      );

      const heightUnit = Math.min(
        Math.floor(
          (parentHeight - barBlockBottomOffset - barIconSize) / numBars
        ),
        defaultHeightUnit
      );

      const randomValues = Array.from({ length: numBars }, () => null).map(
        (_, i) => i + 1
      );
      shuffle(randomValues);

      setBarWidth(barWidth);
      setHeightUnit(heightUnit);
      setValues(randomValues);
    }
  }, []);

  return (
    <>
      <MyHead {...sorting} />
      <div
        className={style.root}
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <h3 style={{ marginBottom: 8 }}>Sorting</h3>
        <SortingControlSection />
        <div id={BAR_BLOCK_WRAPPER} style={{ display: "flex", flex: 1 }}>
          <BarBlock
            values={values}
            barWidth={barWidth}
            heightUnit={heightUnit}
          />
        </div>
      </div>
    </>
  );
};

export default SortingIndex;
