import { ReactNode, useMemo } from "react";
import style from "./modal.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";
import { Icon } from "../Icon";

export type ModalProp = {
  isShown: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string | number;
};

export const Modal: React.FC<ModalProp> = ({
  isShown,
  onClose,
  maxWidth,
  children,
}) => {
  const modalClassName = useMemo(() => {
    const classes = [style.modal];
    if (!isShown) classes.push(style.hidden);

    return classes.join(" ");
  }, [isShown]);

  const modalContentClassName = useMemo(() => {
    const classes = [style.modal_content];
    if (!isShown) classes.push(style.hidden);

    return classes.join(" ");
  }, [isShown]);

  return (
    <div className={modalClassName} onClick={onClose}>
      <div
        className={modalContentClassName}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth }}
      >
        <div
          className={`${neumorphic.root} ${neumorphic.icon}`}
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            borderRadius: 50,
            cursor: "pointer",
          }}
        >
          <Icon icon={"close"} width={20} height={20} />
        </div>
        {children}
      </div>
    </div>
  );
};
