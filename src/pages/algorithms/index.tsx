import defaultStyle from "@styles/default.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";
import { paths } from "@utils/constants";
import { useRouter } from "next/router";

const { pathfinding } = paths;

const AlgorithmIndex: React.FC = () => {
  const router = useRouter();

  return (
    <div className={defaultStyle.root}>
      <h2 style={{ marginBottom: 16, textAlign: "center" }}>
        Algorithm Visualizer
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginBottom: 16,
        }}
      >
        <div
          className={neumorphic.root}
          onClick={() => router.push(pathfinding)}
        >
          Pathfinding
        </div>
        <div className={neumorphic.root}>Sorting</div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <div className={neumorphic.root}>Searching</div>
      </div>
    </div>
  );
};

export default AlgorithmIndex;
