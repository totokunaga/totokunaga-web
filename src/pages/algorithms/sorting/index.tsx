import { MyHead } from "@components/common";
import { BAR_BLOCK_WRAPPER, pages } from "@utils/constants";
import style from "@styles/default.module.scss";
import { BarBlock } from "@components/algorithms/sorting/BarBlock/BarBlock";
import { useEffect, useState } from "react";
import { SortingControlSection } from "@components/algorithms";
import { shuffle } from "@utils/functions/pages/algorithms/sorting/algorithms";
import { getBarSizeFromAmount } from "@utils/functions";
import { useSelector } from "react-redux";
import { selectSortindingController } from "@utils/slices";

const { sorting } = pages;

const SortingIndex: React.FC = () => {
  const [values, setValues] = useState<number[]>([]);
  const [barWidth, setBarWidth] = useState(0);
  const [heightUnit, setHeightUnit] = useState(0);

  const { numberOfBars } = useSelector(selectSortindingController);

  useEffect(() => {
    let resizedBarWidth = 0;
    let resizedHeightUnit = 0;
    let resizedNumberOfBars = numberOfBars;

    if (barWidth === 0) {
      const wrapperElement = document.getElementById(BAR_BLOCK_WRAPPER);
      if (wrapperElement) {
        const parentWidth = wrapperElement.clientWidth;
        resizedNumberOfBars = parentWidth < 520 ? 7 : 15;
      }
    }

    const { heightUnit: generatedHeightUnit, barWidth: generatedBarWidth } =
      getBarSizeFromAmount(resizedNumberOfBars);

    resizedBarWidth = generatedBarWidth;
    resizedHeightUnit = generatedHeightUnit;

    const randomValues = Array.from(
      { length: resizedNumberOfBars },
      () => null
    ).map((_, i) => i + 1);

    shuffle(randomValues);

    setBarWidth(resizedBarWidth);
    setHeightUnit(resizedHeightUnit);
    setValues(randomValues);
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
