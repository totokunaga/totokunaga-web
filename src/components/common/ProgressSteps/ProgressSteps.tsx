import { useEffect, useMemo, useState } from "react";
import { Radio } from "../Radio";
import neumorphic from "@styles/neumorphic.module.scss";

type Direction = "horizontal" | "vertical";

type ProgressStepProp = {
  type: Direction;
  items: Array<{
    name: string | number;
    component: (arg: any) => any;
    args: any;
  }>;
  current: string | number;
};

type StepProp = {
  order: number;
  name: string | number;
  type: Direction;
  focused: boolean;
  Component: (arg: any) => any;
  args: any;
  isLastStep?: boolean;
};

const Step: React.FC<StepProp> = ({
  order,
  name,
  type,
  focused,
  Component,
  args,
  isLastStep,
}) => {
  const [lineHeight, setLineHeight] = useState(0);
  const [grownHeight, setGrownHeight] = useState(0);
  const componentId = useMemo(() => String(name + order.toString()), [name]);
  const childComponent = useMemo(() => {
    args.componentId = componentId;
    args.onResize = (value: number) => {
      setTimeout(() => setGrownHeight(value), 175);
    };
    return <Component {...args} />;
  }, []);

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
      (componentElement?.clientHeight || 0) -
      2 * marginY -
      stepHeight / 2 +
      grownHeight;
    setLineHeight(lineHeight);
  }, [componentId, grownHeight]);

  return (
    <div style={wrapperStyle}>
      <div style={{ ...radioWrapperStyle }}>
        <Radio checked={true} animate={focused} />
        {!isLastStep && (
          <div className={lineClassName} style={{ height: lineHeight }} />
        )}
      </div>
      <div style={{ flexGrow: 1, maxWidth: 700 }}>{childComponent}</div>
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
      {items.map(({ name, component, args }, i) => (
        <Step
          key={name}
          order={i}
          name={name}
          type={type}
          focused={name === current}
          Component={component}
          args={args}
          isLastStep={i === items.length - 1}
        />
      ))}
    </div>
  );
};
