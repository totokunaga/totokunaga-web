import { CSSStyle } from "@utils/types";
import { useMemo } from "react";
import { Icon } from "../Icon";

type AvatorImageProp = CSSStyle & {
  avatorImagePath?: string;
  isDarkMode: boolean;
  onClick?: () => void;
  imageSize?: number | string;
};

export const AvatorImage: React.FC<AvatorImageProp> = ({
  avatorImagePath,
  isDarkMode,
  onClick,
  imageSize,
  ...props
}) => {
  const iconSize = useMemo(() => imageSize || 37.5, [imageSize]);

  return avatorImagePath ? (
    <img
      alt={"profile"}
      src={avatorImagePath}
      width={iconSize}
      height={iconSize}
      draggable={false}
      style={{
        borderRadius: 100,
        border: "solid 1.5px white",
        cursor: onClick ? "pointer" : "default",
        ...props,
      }}
      onClick={onClick}
    />
  ) : (
    <div onClick={onClick} style={{ ...props }}>
      <Icon
        icon={isDarkMode ? "person" : "dark-person"}
        width={iconSize}
        margin={"auto .5em auto auto"}
        cursor={"pointer"}
      />
    </div>
  );
};
