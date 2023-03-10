import { ReactNode, useMemo } from "react";
import { Icon } from "../Icon";
import menuStyle from "./menu.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";
import { useSelector } from "react-redux";
import { selectWindow } from "@utils/slices";

export type MenuContentProp = {
  content: ReactNode;
  onClick?: () => void;
  classname?: string;
};

type MenuProp = {
  isShown: boolean;
  onClose: () => void;
  menuContents: MenuContentProp[];
};

export const Menu: React.FC<MenuProp> = ({
  isShown,
  onClose,
  menuContents,
}) => {
  const { isDarkMode } = useSelector(selectWindow);

  const menuWrapperClassName = useMemo(() => {
    const classes = [menuStyle.menu_wrapper];
    if (!isShown) classes.push(menuStyle.hidden);
    return classes.join(" ");
  }, [isShown]);

  const menuClassName = useMemo(() => {
    const classes = [menuStyle.menu];
    if (!isShown) classes.push(menuStyle.hidden);
    return classes.join(" ");
  }, [isShown]);

  return (
    <div className={menuWrapperClassName} onClick={onClose}>
      <div className={menuClassName} onClick={(e) => e.stopPropagation()}>
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
        {menuContents.map(({ content, onClick, classname = "" }, i) => {
          const classes = [menuStyle.menu_content, classname];
          if (onClick) classes.push(menuStyle.clickable);

          return (
            <div
              key={i}
              className={classes.join(" ")}
              onClick={onClick}
              style={{
                fill: isDarkMode ? "#ddddde" : "#000f23",
              }}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
