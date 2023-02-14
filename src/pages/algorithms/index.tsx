import { MiniPathfinding, MiniSorting } from "@components/algorithms";
import { Panel } from "@components/algorithms/Panel";
import { Header, MyHead } from "@components/common";
import { pages, paths } from "@utils/constants";
import { useRouter } from "next/router";
import style from "@styles/default.module.scss";
import algorithmStyle from "./algorithms.module.scss";
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
        <div className={algorithmStyle.header_row}>
          <h2 style={{ textAlign: "center" }}>Algorithm Visualizer</h2>
          <div
            style={{ width: "min(30%, 128px)", margin: "1.5rem auto 0 auto" }}
          >
            <ColoredGraphIcon width={"100%"} height={"100%"} />
          </div>
        </div>
        <div
          style={{
            color: style.greyLight1,
            position: "relative",
            textAlign: "center",
            marginBottom: "min(25vw, 12.5rem)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={style.triangle} />
          <div className={algorithmStyle.mobile_disappearing}>
            <p style={{ marginBottom: "0.75em" }}>
              Visualize / Animate famous algorithms
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
