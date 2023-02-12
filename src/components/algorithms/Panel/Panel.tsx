import { ReactNode, useMemo } from "react";
import neumorphic from "@styles/neumorphic.module.scss";
import style from "./panel.module.scss";
import text from "@styles/text.module.scss";
import defaultStyle from "@styles/default.module.scss";
import { Icon } from "@components/common";

type PanelProp = {
  title: string;
  onClick?: () => void;
  component?: ReactNode;
  disabled?: boolean;
};

export const Panel: React.FC<PanelProp> = ({
  title,
  onClick,
  component,
  disabled,
}) => {
  const className = useMemo(() => {
    const classes = [neumorphic.root, style.panel];
    if (disabled) classes.push(neumorphic.down);
    return classes.join(" ");
  }, []);

  return (
    <div
      className={className}
      onClick={onClick}
      style={{ cursor: !disabled ? "pointer" : "default" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <h4
          style={{
            textAlign: "center",
            color: disabled ? defaultStyle.greyLight3 : undefined,
          }}
        >
          {title}
        </h4>
        {!disabled ? (
          component
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              className={text.larger}
              style={{ color: defaultStyle.greyLight3, textAlign: "center" }}
            >
              (Under development)
            </p>
            <Icon
              icon={"warning"}
              width={"85%"}
              height={"85%"}
              margin={"0 auto"}
              fill={defaultStyle.greyLight3}
            />
          </div>
        )}
      </div>
    </div>
  );
};
