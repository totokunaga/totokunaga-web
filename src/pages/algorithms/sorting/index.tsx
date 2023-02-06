import { MyHead } from "@components/common";
import { pages } from "@utils/constants";
import style from "@styles/default.module.scss";
import { BarBlock } from "@components/algorithms/sorting/BarBlock/BarBlock";
import { useEffect, useState } from "react";
import { SortingControlSection } from "@components/algorithms";

const { sorting } = pages;

const SortingIndex: React.FC = () => {
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    setValues([7, 4, 5, 1, 3, 6, 2]);
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
