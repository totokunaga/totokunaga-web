import { ReactNode, useEffect, useMemo, useState } from "react";
import { Radio } from "../Radio";
import neumorphic from "@styles/neumorphic.module.scss";

type Direction = "horizontal" | "vertical";

type ProgressStepProp = {
  type: Direction;
  items: Array<{ name: string | number; component: ReactNode }>;
  current: string | number;
};

type StepProp = {
  name: string | number;
  type: Direction;
  focused: boolean;
  component: ReactNode;
  isLastStep?: boolean;
};

const Step: React.FC<StepProp> = ({
  name,
  type,
  focused,
  component,
  isLastStep,
}) => {
  const [lineHeight, setLineHeight] = useState(0);
  const componentId = useMemo(() => String(name), [name]);

  const wrapperStyle = useMemo(() => {
    const horizontalStyle = {};
    const verticalStyle = {
      display: "flex",
    };
    return type === "horizontal" ? horizontalStyle : verticalStyle;
  }, [type]);

  const radioWrapperStyle = useMemo(() => {
    const horizontalStyle = {};
    const verticalStyle = {
      marginRight: 16,
    };

    return type === "horizontal" ? horizontalStyle : verticalStyle;
  }, [type]);

  const lineClassName = useMemo(() => {
    const classes = [neumorphic.root, neumorphic.line];
    if (focused) classes.push(neumorphic.animate);
    return classes.join(" ");
  }, [focused]);

  useEffect(() => {
    const marginY = 5;
    const stepHeight = 32;
    const componentElement = document.getElementById(componentId);
    const lineHeight =
      (componentElement?.clientHeight || 0) - 2 * marginY - stepHeight / 2;
    setLineHeight(lineHeight);
  }, [componentId]);

  return (
    <div style={wrapperStyle}>
      <div style={{ ...radioWrapperStyle }}>
        <Radio checked={true} animate={focused} />
        {!isLastStep && (
          <div className={lineClassName} style={{ height: lineHeight }} />
        )}
      </div>
      <div id={componentId} style={{ flexGrow: 1, maxWidth: 700 }}>
        {component}
      </div>
    </div>
  );
};

export const ProgressSteps: React.FC<ProgressStepProp> = ({
  type,
  items,
  current,
}) => {
  return (
    <div>
      {items.map(({ name, component }, i) => (
        <Step
          key={name}
          name={name}
          type={type}
          focused={name === current}
          component={component}
          isLastStep={i === items.length - 1}
        />
      ))}
    </div>
  );
};
