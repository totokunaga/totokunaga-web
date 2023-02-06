import { MyHead } from "@components/common";
import { pages } from "@utils/constants";
import style from "@styles/default.module.scss";
import { BarBlock } from "@components/algorithms/sorting/BarBlock/BarBlock";
import { useEffect, useState } from "react";
import { quicksort } from "@utils/functions/pages/algorithms/sorting/algorithms/quick-sort";

const { sorting } = pages;

const SortingIndex: React.FC = () => {
  const [values, setValues] = useState<number[]>([7, 4, 5, 1, 3, 6, 2]);

  useEffect(() => {
    const copy = [...values];
    console.log(quicksort(copy));
  }, []);

  return (
    <>
      <MyHead {...sorting} />
      <div
        className={style.root}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3 style={{ marginBottom: 8 }}>Sorting</h3>
        <div style={{ display: "flex" }}>
          <BarBlock values={values} />
        </div>
      </div>
    </>
  );
};

export default SortingIndex;
