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
            backgroundColor: style.deepNavy,
            color: style.greyLight1,
            padding: "0 2em 3em 2em",
            marginBottom: "3em",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Algorithm Visualizer</h2>
          <div style={{ width: "min(30%, 128px)", margin: "1.5rem auto" }}>
            <ColoredGraphIcon width={"100%"} height={"100%"} />
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: 8 }}>
              Visualizes / Animates famous algorithms
            </p>
            <p>Click panels to proceed</p>
          </div>
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
