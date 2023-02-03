export const pages = {
  root: {
    root: "/",
    title: "About | Tomoya Tokunaga",
  },
  algorithms: {
    path: "/algorithms",
    title: "Algorithm",
    pathfinding: {
      path: "/algorithms/pathfinding",
      title: "Algorithm | Pathfinding",
      headerTitle: "Pathfinding",
    },
  },
  me: {
    root: "/me",
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
};
export const paths = { ...pathFirstLevel, ...pathSecondLevel };
