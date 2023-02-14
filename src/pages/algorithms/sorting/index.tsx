import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { MyHead } from "@components/common";
import { BAR_BLOCK_WRAPPER, pages, paths } from "@utils/constants";
import style from "@styles/default.module.scss";
import { BarBlock } from "@components/algorithms/sorting/BarBlock/BarBlock";
import { SortingControlSection } from "@components/algorithms";
import { shuffle } from "@utils/functions/pages/algorithms/sorting/algorithms";
import { selectSortindingController, selectWindow } from "@utils/slices";
import GraphIcon from "@assets/graph.svg";
import ColoredGraphIcon from "@assets/colored-graph.svg";

const { sorting } = pages;

const SortingIndex: React.FC = () => {
  const [values, setValues] = useState<number[]>([]);

  const { numberOfBars } = useSelector(selectSortindingController);
  const { isDarkMode } = useSelector(selectWindow);
  const router = useRouter();

  useEffect(() => {
    let resizedNumberOfBars = numberOfBars;

    const barBlockWrapper = document.getElementById(BAR_BLOCK_WRAPPER);
    if (barBlockWrapper) {
      const width = barBlockWrapper.clientWidth;
      const isInitialization = values.length === 0;
      if (isInitialization && width > 520) {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
          onClick={() => router.push(paths.algorigthms)}
        >
          <div
            style={{
              width: "min(12.5%, 40px)",
              marginRight: 5,
              cursor: "pointer",
            }}
          >
            {!isDarkMode ? (
              <GraphIcon width={"100%"} height={"100%"} />
            ) : (
              <ColoredGraphIcon width={"100%"} height={"100%"} />
            )}
          </div>
          <h3 style={{ margin: "4px 0 8px 2.5px", cursor: "pointer" }}>
            Sorting
          </h3>
        </div>

        <div className={style.mobile_friendly_flex} style={{ height: "100%" }}>
          <SortingControlSection />
          <div
            id={BAR_BLOCK_WRAPPER}
            style={{ display: "flex", flex: 1, justifyContent: "center" }}
          >
            <BarBlock values={values} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SortingIndex;
