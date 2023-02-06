import style from "./icon.module.scss";
import StarIcon from "@assets/star.svg";
import SettingIcon from "@assets/settings-sharp.svg";
import SharpSettingIcon from "@assets/cog-outline.svg";
import PlayIcon from "@assets/play.svg";
import TrashBinIcon from "@assets/trash-bin.svg";
import RocketIcon from "@assets/rocket-outline.svg";
import CloseIcon from "@assets/close.svg";
import WarningIcon from "@assets/warning.svg";
import { CSSStyle } from "@utils/types";

type IconType =
  | "star"
  | "setting"
  | "play"
  | "sharp-setting"
  | "trash-bin"
  | "close"
  | "warning"
  | "rocket";

type AnimationType = "rotate" | "shake";

const Icons: Record<IconType, any> = {
  star: StarIcon,
  setting: SettingIcon,
  play: PlayIcon,
  "sharp-setting": SharpSettingIcon,
  "trash-bin": TrashBinIcon,
  rocket: RocketIcon,
  close: CloseIcon,
  warning: WarningIcon,
};

type IconProp = CSSStyle & {
  width?: number | string;
  height?: number | string;
  fill?: string;
  icon: IconType;
  animation?: AnimationType;
};

export const Icon: React.FC<IconProp> = ({
  icon,
  height,
  width,
  fill,
  animation,
  margin,
}) => {
  const Component = Icons[icon];
  return (
    <div className={animation && style[animation]} style={{ margin }}>
      <Component
        width={width || height}
        height={height || width}
        style={{ display: "block", fill }}
      />
    </div>
  );
};
