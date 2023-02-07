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
import { shuffle } from "@utils/functions/pages/algorithms/sorting/algorithms";
import { getBarSizeFromAmount, getDefaultBarSize } from "@utils/functions";
import { useSelector } from "react-redux";
import { selectSortindingController } from "@utils/slices";

const { sorting } = pages;

const SortingIndex: React.FC = () => {
  const [values, setValues] = useState<number[]>([]);
  const [barWidth, setBarWidth] = useState<number>(0);
  const [heightUnit, setHeightUnit] = useState<number>(0);

  const { numberOfBars } = useSelector(selectSortindingController);

  useEffect(() => {
    if (barWidth === 0) {
      const {
        numBars: defaultNumBars,
        barWidth: defaultBarWidth,
        heightUnit: defaultHeightUnit,
      } = getDefaultBarSize();

      const randomValues = Array.from(
        { length: defaultNumBars },
        () => null
      ).map((_, i) => i + 1);
      shuffle(randomValues);

      setBarWidth(defaultBarWidth);
      setHeightUnit(defaultHeightUnit);
      setValues(randomValues);
    } else {
      const { heightUnit: resizedHeightUnit, barWidth: resizedBarWidth } =
        getBarSizeFromAmount(numberOfBars);

      const randomValues = Array.from({ length: numberOfBars }, () => null).map(
        (_, i) => i + 1
      );
      shuffle(randomValues);

      setBarWidth(resizedBarWidth);
      setHeightUnit(resizedHeightUnit);
      setValues(randomValues);
    }
  }, [numberOfBars]);

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
