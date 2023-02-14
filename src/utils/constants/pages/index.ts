export const pages = {
  root: {
    title: "Tomoya Tokunaga",
    description: "Welcome to Tomoya's website",
  },
  algorithms: {
    title: "Algoritems Visualizer",
    description: "Let's visually understand algorithms",
  },
  pathfinding: {
    title: "Pathfinding",
    description: "Visualize pathfinding algorithms",
  },
  sorting: {
    title: "Sorting",
    description: "Visualize sorting algorithms",
  },
  me: {
    title: "Tomoya Tokunaga",
    description: "Welcome to Tomoya's website",
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
