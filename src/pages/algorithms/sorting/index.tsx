import { MyHead } from "@components/common";
import { pages } from "@utils/constants";
import style from "@styles/default.module.scss";
import { BarBlock } from "@components/algorithms/sorting/BarBlock/BarBlock";
import { useEffect, useState } from "react";
import { SortingControlSection } from "@components/algorithms";
import { shuffle } from "@utils/functions/pages/algorithms/sorting/algorithms/shuffle";

const { sorting } = pages;
const arr = [7, 4, 5, 1, 3, 6, 2];

const SortingIndex: React.FC = () => {
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    setValues([7, 4, 5, 1, 3, 6, 2]);
    console.log(arr);
    const [a, indexes] = shuffle(arr, [0, 1, 2, 3, 4, 5, 6]);
    console.log(arr);
    console.log(indexes);
  }, []);

  return (
    <>
      <MyHead {...sorting} />
      <div
        className={style.root}
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <h3 style={{ marginBottom: 8 }}>Sorting</h3>
        <SortingControlSection onStartClick={() => {}} />
        <div id={"barblock-wrapper"} style={{ display: "flex", flex: 1 }}>
          <BarBlock values={values} />
        </div>
      </div>
    </>
  );
};

export default SortingIndex;
