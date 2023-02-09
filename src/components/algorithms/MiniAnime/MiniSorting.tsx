import { sortingTransitionSpeed } from "@utils/constants";
import {
  animateTestBars,
  getSortingAnimation,
  getSortingAnimation2,
  initTestBars,
} from "@utils/functions";
import {
  bubblesort,
  shuffle,
} from "@utils/functions/pages/algorithms/sorting/algorithms";
import {
  SortableBar,
  SortingAnimation,
  SortingAnimationType,
  SortingPrevAnimationType,
} from "@utils/types";
import { Fragment, useEffect, useState } from "react";
import { TestBar } from "../sorting";

const values = [4, 1, 5, 3, 2];

export const MiniSorting: React.FC = () => {
  const [bars, setBars] = useState<SortableBar[]>([]);
  const [indexes, setIndexes] = useState<number[]>([]);
  const [isReset, setReset] = useState(true);

  useEffect(() => {
    if (isReset) {
      setReset(false);
      let newBars = bars.length ? [...bars] : initTestBars(values);
      let newIndexes = indexes.length ? [...indexes] : values.map((_, i) => i);

      setBars(newBars);
      setIndexes(newIndexes);

      const bubblesortAnimations = bubblesort(values);
      let animations = bubblesortAnimations.filter(
        ({ type }) => type === "swap"
      );

      let prevAnimation = new SortingPrevAnimationType("none");
      const filteredAnimations: SortingAnimation[] = [];
      animations.forEach((animation) => {
        animation.duration = sortingTransitionSpeed[prevAnimation.type] * 1250;
        filteredAnimations.push(animation);
        prevAnimation.type = animation.type;
        filteredAnimations.push(
          getSortingAnimation2(
            "clear",
            values.map((_, i) => i),
            prevAnimation
          )
        );
        filteredAnimations[filteredAnimations.length - 1].duration =
          sortingTransitionSpeed[prevAnimation.type] * 1250;
        prevAnimation.type = "clear";
        return animation;
      });
      animations = filteredAnimations;

      let timeoutAmount = 500;
      animations.forEach((animation) => {
        timeoutAmount += animation.duration;
        setTimeout(() => {
          animateTestBars(newBars, newIndexes, animation);
          setBars([...newBars]);
          setIndexes([...newIndexes]);
        }, timeoutAmount);
      });

      timeoutAmount += 350;
      newIndexes.forEach((i) => {
        timeoutAmount += 300;
        setTimeout(() => {
          animateTestBars(
            newBars,
            newIndexes,
            getSortingAnimation("done", [i], 100)
          );
          setBars([...newBars]);
          setIndexes([...newIndexes]);

          if (i === newIndexes.length - 1) {
            shuffle(values);
            setTimeout(() => {
              setBars(initTestBars(values));
              setIndexes(values.map((_, i) => i));
            }, 750);

            setTimeout(() => {
              setReset(true);
            }, 1500);
          }
        }, timeoutAmount);
      });
    }
  }, [isReset]);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
      }}
    >
      {bars.map(({ value, status, relativeIndex }, i) => {
        return (
          <Fragment key={i}>
            <TestBar
              status={status}
              height={`${Math.floor((85 / values.length) * value)}%`}
              width={"80%"}
              showValue={false}
              translate={{ x: relativeIndex, y: 0 }}
              transition={`all ${
                sortingTransitionSpeed[status] * 2
              }s ease-in-out`}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
