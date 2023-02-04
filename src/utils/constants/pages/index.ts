export const pages = {
  root: {
    title: "About | Tomoya Tokunaga",
  },
  algorithms: {
    title: "Algoritems Visualizer",
  },
  pathfinding: {
    title: "Algorithm Visualizer | Pathfinding",
  },
  me: {
    title: "Tomoya Tokunaga",
  },
};

const pathFirstLevel = {
  root: "/",
  me: "/",
  algorigthms: "/algorithms",
};
const pathSecondLevel = {
  pathfinding: pathFirstLevel.algorigthms + "/pathfinding",
  searching: pathFirstLevel.algorigthms + "/searching",
  sorting: pathFirstLevel.algorigthms + "/sorting",
};
export const paths = { ...pathFirstLevel, ...pathSecondLevel };

export * from "./me";
export * from "./algorithms";
