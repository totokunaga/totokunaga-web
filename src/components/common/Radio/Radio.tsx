import style from "./radio.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";
import { useMemo } from "react";
import { CSSStyle } from "@utils/types";

export type Size = "slim" | "normal";

type RadioProp = CSSStyle & {
  content?: string;
  checked: boolean;
  sub?: boolean;
  animate?: boolean;
  size?: Size;
  fontColor?: string;
  circleColor?: string;
};

export const Radio: React.FC<RadioProp> = ({
  content,
  checked,
  sub,
  animate,
  size,
  fontColor,
  circleColor,
  ...props
}) => {
  const wrapperClassName = useMemo(() => {
    const classes = [neumorphic.root, neumorphic.radio];
    if (checked) {
      classes.push(neumorphic.down);
      classes.push(neumorphic.checked);
    }
    if (!content) classes.push(neumorphic.no_content);
    if (size === "slim") classes.push(neumorphic.slim);
    return classes.join(" ");
  }, [content, checked, size]);

  const circleClassName = useMemo(() => {
    const classes = [style.radio_circle, neumorphic.radio];
    if (sub) classes.push(style.sub);
    if (animate) classes.push(style.animate);
    if (checked) classes.push(style.checked);
    if (!content) classes.push(style.no_content);
    if (size === "slim") classes.push(style.slim);
    return classes.join(" ");
  }, [sub, animate, checked, content]);

  return (
    <div className={wrapperClassName}>
      <div
        className={circleClassName}
        style={{ backgroundColor: circleColor, ...props }}
      />
      <span>{content}</span>
    </div>
  );
};
