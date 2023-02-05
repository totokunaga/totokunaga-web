import { useEffect, useMemo, useState } from "react";
import { Bar } from "../Bar";
import style from "../Bar/bar.module.scss";

type BarBlockProp = {
  barWidth?: number;
  values: number[];
  swapAnimationSpeed?: number;
};

type InnerValue = {
  value: number;
  position: number;
  size: number;
  left: number | string;
};

const heightUnit = 45;
const spaceAmount = 8;

const swapInnerValues = (
  innerValues: InnerValue[],
  i: number,
  j: number,
  heightUnit: number,
  spaceAmount: number
) => {
  innerValues[i].position = j;
  innerValues[j].position = i;
  innerValues[i].left = (heightUnit + spaceAmount) * j;
  innerValues[j].left = (heightUnit + spaceAmount) * i;
  return innerValues;
};

export const BarBlock: React.FC<BarBlockProp> = ({
  barWidth,
  values,
  swapAnimationSpeed = 0.5,
}) => {
  const [innerValues, setInnerValues] = useState<InnerValue[]>(
    values.map((v, i) => ({
      value: v,
      position: i,
      size: heightUnit * v,
      left: (heightUnit + spaceAmount) * i,
    }))
  );

  const barBlockClassName = useMemo(() => {
    const classes = [style.barblock];
    return classes.join(" ");
  }, []);

  const barClassName = useMemo(() => {
    const classes = [style.bar];
    return classes.join(" ");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setInnerValues([
        ...swapInnerValues(innerValues, 0, 2, heightUnit, spaceAmount),
      ]);
    }, 400);
  }, []);

  return (
    <div className={barBlockClassName}>
      {innerValues.map(({ value, size, left }, i) => (
        <div
          key={i}
          className={barClassName}
          style={{
            bottom: 0,
            left,
            transition: `all ${swapAnimationSpeed}s ease-in-out`,
          }}
        >
          <Bar
            height={size}
            width={heightUnit}
            direction={"horizontal"}
            value={value}
          />
        </div>
      ))}
    </div>
  );
};
