import { sortingAnimationSpeed } from "@utils/constants";
import { SortingAnimation } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation } from "..";

export const shuffle = (values: number[]): SortingAnimation[] => {
  const n = values.length;
  const animations: SortingAnimation[] = [];
  animations.push(getSortingAnimation("reset", [], 0));

  for (let i = n - 1; i > 0; i--) {
    const randomIdx = Math.floor(Math.random() * i);
    animations.push(
      getSortingAnimation("move", [randomIdx, i], sortingAnimationSpeed.move)
    );
    swap(values, i, randomIdx);
  }

  return animations;
};
