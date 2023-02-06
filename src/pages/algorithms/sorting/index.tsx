import { MyHead } from "@components/common";
import { pages } from "@utils/constants";
import style from "@styles/default.module.scss";
import { BarBlock } from "@components/algorithms/sorting/BarBlock/BarBlock";
import { useState } from "react";

const { sorting } = pages;

const SortingIndex: React.FC = () => {
  const [values, setValues] = useState<number[]>([7, 4, 5, 1, 3, 6, 2]);

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
