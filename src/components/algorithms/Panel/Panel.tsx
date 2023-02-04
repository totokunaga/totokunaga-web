import { ReactNode, useMemo } from "react";
import neumorphic from "@styles/neumorphic.module.scss";
import style from "./panel.module.scss";

type PanelProp = {
  title: string;
  onClick?: () => void;
  component?: ReactNode;
};

export const Panel: React.FC<PanelProp> = ({ title, onClick, component }) => {
  const className = useMemo(() => {
    const classes = [neumorphic.root, style.panel];
    return classes.join(" ");
  }, []);

  return (
    <div className={className} onClick={onClick}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4 style={{ textAlign: "center" }}>{title}</h4>
        {component}
      </div>
    </div>
  );
};
