import { iconLSize } from "@utils/constants";
import { selectWindow } from "@utils/slices";
import { useSelector } from "react-redux";
import { Icon } from "../Icon";
type MenuButtonProp = {
  onClick: () => void;
};

export const MenuButton: React.FC<MenuButtonProp> = ({ onClick }) => {
  const { isDarkMode } = useSelector(selectWindow);

  return (
    <>
      <Icon
        icon={isDarkMode ? "dark-menu" : "menu"}
        width={iconLSize}
        cursor={"pointer"}
        onClick={onClick}
        marginLeft={"1rem"}
      />
    </>
  );
};
