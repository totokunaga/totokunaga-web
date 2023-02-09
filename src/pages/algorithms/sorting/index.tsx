import { MyHead } from "@components/common";
import { BAR_BLOCK_WRAPPER, pages } from "@utils/constants";
import style from "@styles/default.module.scss";
import { BarBlock } from "@components/algorithms/sorting/BarBlock/BarBlock";
import { useEffect, useState } from "react";
import { SortingControlSection } from "@components/algorithms";
import { shuffle } from "@utils/functions/pages/algorithms/sorting/algorithms";
import { useSelector } from "react-redux";
import { selectSortindingController } from "@utils/slices";

const { sorting } = pages;

const SortingIndex: React.FC = () => {
  const [values, setValues] = useState<number[]>([]);

  const { numberOfBars } = useSelector(selectSortindingController);

  useEffect(() => {
    let resizedNumberOfBars = numberOfBars;

    const barBlockWrapper = document.getElementById(BAR_BLOCK_WRAPPER);
    if (barBlockWrapper) {
      const width = barBlockWrapper.clientWidth;
      if (width > 520) {
        resizedNumberOfBars = 13;
      }
    }

    const randomValues = Array.from(
      { length: resizedNumberOfBars },
      () => null
    ).map((_, i) => i + 1);

    shuffle(randomValues);

    setValues(randomValues);
  }, [numberOfBars]);

  return (
    <>
      <MyHead {...sorting} />
      <div
        className={style.root}
        style={{
          display: "flex",
          flexDirection: "column",
          height: `100dvh`,
        }}
      >
        <h3 style={{ marginBottom: 8 }}>Sorting</h3>
        <SortingControlSection />
        <div id={BAR_BLOCK_WRAPPER} style={{ display: "flex", flex: 1 }}>
          <BarBlock values={values} />
        </div>
      </div>
    </>
  );
};

export default SortingIndex;
