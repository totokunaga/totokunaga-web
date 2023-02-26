import { setGlobalDarkMode } from "@utils/functions";
import { selectWindow } from "@utils/slices";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Button } from "../Button";
import { Icon } from "../Icon";
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

  return (
    <Button
      type={"flat"}
      padding={"1em"}
      margin={"auto"}
      onClick={onAppearance}
      className={buttonStyle.appearance_setting}
    >
      <Icon
        icon={isDarkMode ? "sun" : "moon"}
        height={normalIconSize}
        width={normalIconSize}
      />
    </Button>
  );
};
