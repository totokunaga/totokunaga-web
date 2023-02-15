import { MiniPathfinding, MiniSorting } from "@components/algorithms";
import { Panel } from "@components/algorithms/Panel";
import { Header, MyHead } from "@components/common";
import { pages, paths } from "@utils/constants";
import { useRouter } from "next/router";
import style from "@styles/default.module.scss";
import ColoredGraphIcon from "@assets/colored-graph.svg";

const { pathfinding, sorting } = paths;
const { algorithms } = pages;

const AlgorithmIndex: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <MyHead {...algorithms} />
      <div>
        <Header />
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={style.top_bg} />
          <div
            className={style.triangle}
            style={{ top: "min(49.8vw, 9.9rem)" }}
          />
        </div>
        <div
          style={{
            marginBottom: "min(20vw, 10rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Algorithm Visualizer</h2>
          <div style={{ width: "min(30%, 128px)", margin: "1.5rem auto" }}>
            <ColoredGraphIcon width={"100%"} height={"100%"} />
          </div>
          <p style={{ marginBottom: "0.5em" }}>
            Visualize / Animate famous algorithms
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
