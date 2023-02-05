import { MyHead } from "@components/common";
import { pages } from "@utils/constants";
import style from "@styles/default.module.scss";
import { BarBlock } from "@components/algorithms/sorting/BarBlock/BarBlock";

const { sorting } = pages;

const SortingIndex: React.FC = () => {
  return (
    <>
      <MyHead {...sorting} />
      <div
        className={style.root}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3 style={{ marginBottom: 8 }}>Sorting</h3>
        <div style={{ display: "flex" }}>
          <BarBlock values={[1, 2, 3]} />
        </div>
      </div>
    </>
  );
};

export default SortingIndex;
