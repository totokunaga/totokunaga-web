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
  order,
  name,
  title,
  focused,
  component,
  isLastStep,
}) => {
  const [lineHeight, setLineHeight] = useState(0);
  const componentId = useMemo(() => name + " " + String(order), [name]);

  // useEffect(() => {
  //   const stepLineWrapper = document.getElementById(componentId);
  //   if (stepLineWrapper) {
  //     setLineHeight(stepLineWrapper.clientHeight);
  //   }
  // }, []);

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
      <div id={componentId} style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "100%" }}>
          <div
            className={lineClassName}
            style={{
              margin: "5px 30px 5px 13.5px",
              height: isLastStep ? 0 : lineHeight,
              opacity: isLastStep ? 0 : 1,
            }}
          />
          {component}
        </div>
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
