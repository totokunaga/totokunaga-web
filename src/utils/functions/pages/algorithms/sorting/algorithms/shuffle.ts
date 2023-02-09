import { SortingAnimation, SortingPrevAnimationType } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation } from "..";

export const shuffle = (values: number[]): SortingAnimation[] => {
  const n = values.length;
  const animations: SortingAnimation[] = [];
  const prevAnimation = new SortingPrevAnimationType("none");
  animations.push(getSortingAnimation("reset", [], prevAnimation));

  for (let i = n - 1; i > 0; i--) {
    const randomIdx = Math.floor(Math.random() * i);
    animations.push(getSortingAnimation("move", [randomIdx, i], prevAnimation));
    swap(values, i, randomIdx);
  }

  return animations;
};
