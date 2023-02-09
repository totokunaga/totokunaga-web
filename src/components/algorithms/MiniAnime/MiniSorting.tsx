import { spaceBetweenBars } from "@utils/constants";
import {
  animateBars,
  animateTestBars,
  getSortingAnimation,
  initBars,
  initTestBars,
  swapBars,
} from "@utils/functions";
import {
  bubblesort,
  shuffle,
} from "@utils/functions/pages/algorithms/sorting/algorithms";
import { useWindowSize } from "@utils/hooks";
import {
  InnerValue,
  SortableBar,
  SortingAnimation,
  SortingAnimationType,
} from "@utils/types";
import { Fragment, useEffect, useState } from "react";
import { Bar, TestBar } from "../sorting";

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

      const animations = bubblesort(values)
        .filter(({ type }) => type === "swap")
        .map((a) => ({ ...a, duration: 750 }));

      let timeoutAmount = 0;
      animations.forEach((animation) => {
        timeoutAmount += animation.duration;
        setTimeout(() => {
          animateTestBars(newBars, newIndexes, animation);
          setBars([...newBars]);
          setIndexes([...newIndexes]);
        }, timeoutAmount);
      });

      newIndexes.forEach((i) => {
        timeoutAmount += 500;
        setTimeout(() => {
          animateTestBars(
            newBars,
            newIndexes,
            getSortingAnimation("done", [i], 100)
          );
          setBars([...newBars]);
          setIndexes([...newIndexes]);
        }, timeoutAmount);
      });

      timeoutAmount += 1000;
      const shuffleAnimations = shuffle(values);
      shuffleAnimations.forEach((animation, i) => {
        timeoutAmount += animation.duration;
        setTimeout(() => {
          animateTestBars(newBars, newIndexes, animation);
          setBars([...newBars]);
          setIndexes([...newIndexes]);

          if (i === shuffleAnimations.length - 1) {
            setReset(true);
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
        position: "relative",
        flexDirection: "row-reverse",
        transform: "scaleX(-1) scaleY(-1)",
      }}
    >
      {bars.map(({ value, status, relativeIndex }, i) => {
        return (
          <Fragment key={i}>
            <TestBar
              status={status}
              height={`${Math.floor(16 * value)}%`}
              width={"80%"}
              direction={"horizontal"}
              translate={{ x: relativeIndex, y: 0 }}
              transition={"all 0.75s ease-in-out"}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
