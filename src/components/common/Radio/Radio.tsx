import style from "./radio.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";
import { useMemo } from "react";

export type Size = "Slim" | "Normal";

type RadioProp = {
  content?: any;
  checked: boolean;
  pushed?: boolean;
  sub?: boolean;
  animate?: boolean;
  size?: Size;
  fontColor?: string;
};

export const Radio: React.FC<RadioProp> = ({
  content,
  checked,
  pushed,
  sub,
  animate,
  size,
  fontColor,
}) => {
  const wrapperClassName = useMemo(() => {
    const classes = [neumorphic.root, neumorphic.radio];
    if (pushed) classes.push(neumorphic.down);
    if (!content) classes.push(neumorphic.no_content);
    if (size === "Slim") classes.push(neumorphic.slim);
    return classes.join(" ");
  }, [content]);

  const circleClassName = useMemo(() => {
    const classes = [style.radio_circle, neumorphic.radio];
    if (sub) classes.push(style.sub);
    if (animate) classes.push(style.animate);
    if (checked) classes.push(style.checked);
    if (!content) classes.push(style.no_content);
    if (size === "Slim") classes.push(style.slim);
    return classes.join(" ");
  }, [sub, animate, checked, content]);

  return (
    <div className={wrapperClassName} style={{ color: fontColor }}>
      <div className={circleClassName} />
      <span>{content}</span>
    </div>
  );
};
