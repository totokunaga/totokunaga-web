import { ReactNode, useEffect, useMemo, useState } from "react";
import { Radio } from "../Radio";
import neumorphic from "@styles/neumorphic.module.scss";

type Direction = "horizontal" | "vertical";

type ProgressStepProp = {
  type: Direction;
  items: Array<{ name: string; component: ReactNode; title: ReactNode }>;
  current: string | number;
};

type StepProp = {
  order: number;
  name: string | number;
  title: ReactNode;
  type: Direction;
  focused: boolean;
  component: ReactNode;
  isLastStep?: boolean;
};

const Step: React.FC<StepProp> = ({
  title,
  focused,
  component,
  isLastStep,
}) => {
  const lineClassName = useMemo(() => {
    const classes = [neumorphic.root, neumorphic.line];
    if (focused) classes.push(neumorphic.animate);
    return classes.join(" ");
  }, [focused]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: 16 }}>
          <Radio checked={true} animate={focused} />
        </div>
        {title}
      </div>
      <div style={{ position: "relative", margin: "4px 0px 16px 48px" }}>
        {component}
        <div
          className={lineClassName}
          style={{
            position: "absolute",
            top: 0,
            left: -34.5,
            minHeight: isLastStep ? 0 : "100%",
          }}
        />
      </div>
    </>
  );
};

export const ProgressSteps: React.FC<ProgressStepProp> = ({
  type,
  items,
  current,
}) => {
  return (
    <div>
      {items.map(({ name, component, title }, i) => (
        <Step
          key={i}
          order={i}
          name={name}
          type={type}
          focused={name === current}
          component={component}
          title={title}
          isLastStep={i === items.length - 1}
        />
      ))}
    </div>
  );
};
