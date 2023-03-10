import { setGlobalDarkMode } from "@utils/functions";
import { selectWindow } from "@utils/slices";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Button } from "../Button";
import { Icon } from "../Icon";
import style from "@styles/default.module.scss";
import buttonStyle from "../Button/button.module.scss";
import { normalIconSize } from "@utils/constants";

export const ThemeButton: React.FC = () => {
  const { isDarkMode } = useSelector(selectWindow);

  const onAppearance = useCallback(() => {
    if (isDarkMode) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    setGlobalDarkMode(!isDarkMode);
  }, [isDarkMode]);

  const themeButtonClass = useMemo(() => {
    const classes = [buttonStyle.appearance_setting, style.desktop_only];
    return classes.join(" ");
  }, []);

  return (
    <Button
      type={"flat"}
      padding={"1em"}
      margin={"auto"}
      onClick={onAppearance}
      className={themeButtonClass}
    >
      <Icon
        icon={isDarkMode ? "sun" : "moon"}
        height={normalIconSize}
        width={normalIconSize}
      />
    </Button>
  );
};
