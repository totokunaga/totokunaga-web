import { Cell } from "@components/algorithms";
import { Panel } from "@components/algorithms/Panel";
import { MyHead } from "@components/common";
import defaultStyle from "@styles/default.module.scss";
import { pages, paths } from "@utils/constants";
import { initMatrix } from "@utils/functions";
import { BLOCKED, EMPTY } from "@utils/types";
import { useRouter } from "next/router";
import { useMemo } from "react";

const { pathfinding } = paths;
const { algorithms } = pages;

const MiniGrid: React.FC = () => {
  const matrix = useMemo(() => initMatrix(5, 5, 0), []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      {matrix.map((row, r) => (
        <div style={{ display: "flex" }}>
          {row.map((col, c) => {
            const isStart = r === 2 && c == 0;
            const isEnd = r === 4 && c == 4;
            return (
              <Cell
                status={c === 2 && r > 0 && r < 4 ? BLOCKED : EMPTY}
                isStart={isStart}
                isEnd={isEnd}
                size={"min(10vw, 35px)"}
                cursor={"default"}
                margin={2.5}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const AlgorithmIndex: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <MyHead {...algorithms} />
      <div className={defaultStyle.root}>
        <h2 style={{ marginBottom: 32, textAlign: "center" }}>
          Algorithm Visualizer
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <Panel
            title={"Pathfinding"}
            onClick={() => router.push(pathfinding)}
            component={<MiniGrid />}
          />
          <Panel title={"Sorting"} />
          <Panel title={"Searching"} />
        </div>
      </div>
    </>
  );
};

export default AlgorithmIndex;
