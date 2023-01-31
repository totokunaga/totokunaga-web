import { ReactNode } from "react";
import style from "./modal.module.css";

export type ModalProp = {
  isShown: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal: React.FC<ModalProp> = ({ isShown, onClose, children }) => {
  return (
    <div
      className={isShown ? style.modal : style.modal_hidden}
      onClick={onClose}
    >
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
