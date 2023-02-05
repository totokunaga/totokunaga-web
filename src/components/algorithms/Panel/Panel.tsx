import { ReactNode, useMemo } from "react";
import neumorphic from "@styles/neumorphic.module.scss";
import style from "./panel.module.scss";
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
      <div style={{ display: "flex", flexDirection: "column" }}>
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
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              icon={"warning"}
              width={"10rem"}
              height={"10rem"}
              fill={defaultStyle.greyLight3}
            />
            <p style={{ color: defaultStyle.greyLight3 }}>Under development</p>
          </div>
        )}
      </div>
    </div>
  );
};
