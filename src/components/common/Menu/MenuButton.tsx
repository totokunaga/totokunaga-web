import { useCallback, useState } from "react";

import { normalIconSize } from "@utils/constants";
import { Icon } from "../Icon";
type MenuButtonProp = {
  onClick: () => void;
};

export const MenuButton: React.FC<MenuButtonProp> = ({ onClick }) => {
  return (
    <>
      <Icon
        icon={"menu"}
        width={normalIconSize}
        cursor={"pointer"}
        onClick={onClick}
      />
    </>
  );
};
