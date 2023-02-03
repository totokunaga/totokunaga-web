import { ReactNode, useCallback, useMemo, useState } from "react";
import neumorphic from "@styles/neumorphic.module.scss";
import style from "./accordion.module.scss";
import { Icon } from "../Icon";

type AccordionProp = {
  name: string;
  componentId: string;
  children?: ReactNode;
};

export const Accordion: React.FC<AccordionProp> = ({
  name,
  children,
  componentId,
}) => {
  const [opened, setOpened] = useState(false);

  const wrapperClassName = useMemo(() => {
    const classes = [neumorphic.root, neumorphic.accordion, neumorphic.down];
    return classes.join(" ");
  }, []);

  const iconClassName = useMemo(() => {
    const classes = [style.switch_icon];
    if (opened) classes.push(style.opened);
    return classes.join(" ");
  }, [opened]);

  const contentClassName = useMemo(() => {
    const classes = [style.content];
    if (opened) classes.push(style.opened);
    return classes.join(" ");
  }, [opened]);

  const onClick = useCallback(() => {
    const contentElement = document.getElementById(componentId);
    if (contentElement) {
      if (!opened) {
        const currentHeight = contentElement.scrollHeight || 0;
        contentElement.style.maxHeight = `${currentHeight}px`;
      } else {
        contentElement.style.maxHeight = "0px";
      }
    }
    setOpened(!opened);
  }, [opened]);

  return (
    <div className={wrapperClassName} onClick={onClick}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontWeight: 400,
            flexGrow: 1,
            fontSize: "min(3.75vw, 16px)",
          }}
        >
          {name}
        </p>
        <div className={`${neumorphic.root} ${neumorphic.icon}`}>
          <div className={iconClassName}>
            <Icon icon={"close"} width={16} height={16} />
          </div>
        </div>
      </div>
      <div id={componentId} className={contentClassName}>
        {children}
      </div>
    </div>
  );
};
