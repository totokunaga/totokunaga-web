import { ReactNode, useCallback, useMemo, useState } from "react";
import neumorphic from "@styles/neumorphic.module.scss";
import style from "./accordion.module.scss";
import text from "./text.module.scss";
import { Icon } from "../Icon";

type AccordionProp = {
  name: string;
  componentId: string;
  children?: ReactNode;
  onResize?: (value: number) => void;
};

export const Accordion: React.FC<AccordionProp> = ({
  name,
  children,
  componentId,
  onResize,
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
    const contentPadding = 24;
    if (contentElement) {
      const currentHeight = contentElement.scrollHeight || 0;
      if (!opened) {
        contentElement.style.maxHeight = `${currentHeight}px`;
        onResize && onResize(currentHeight - contentPadding);
      } else {
        contentElement.style.maxHeight = "0px";
        onResize && onResize((currentHeight - contentPadding) * -1);
      }
    }
    setOpened(!opened);
  }, [opened, onResize]);

  return (
    <div className={wrapperClassName} onClick={onClick}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <p className={text.smallest} style={{ fontWeight: 400, flexGrow: 1 }}>
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
