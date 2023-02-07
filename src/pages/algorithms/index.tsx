import { MiniPathfinding, MiniSorting } from "@components/algorithms";
import { Panel } from "@components/algorithms/Panel";
import { MyHead } from "@components/common";
import defaultStyle from "@styles/default.module.scss";
import { pages, paths } from "@utils/constants";
import { useRouter } from "next/router";

const { pathfinding, sorting } = paths;
const { algorithms } = pages;

const AlgorithmIndex: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <MyHead {...algorithms} />
      <div className={defaultStyle.root}>
        <h2 style={{ marginBottom: 32, textAlign: "center" }}>
          Algorithm Visualizer
        </h2>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ marginBottom: 8 }}>
            Visualizes / Animates famous algorithms
          </p>
          <p>Click panels to proceed</p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            maxWidth: 1024,
            margin: "0px auto",
          }}
        >
          <Panel
            title={"Pathfinding"}
            onClick={() => router.push(pathfinding)}
            component={<MiniPathfinding />}
          />
          <Panel
            title={"Sorting"}
            onClick={() => router.push(sorting)}
            component={<MiniSorting />}
          />
          <Panel title={"Searching"} disabled={true} />
        </div>
      </div>
    </>
  );
};

export default AlgorithmIndex;
