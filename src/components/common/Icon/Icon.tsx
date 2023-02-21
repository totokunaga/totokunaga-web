import style from "./icon.module.scss";
import StarIcon from "@assets/star.svg";
import SettingIcon from "@assets/settings-sharp.svg";
import SharpSettingIcon from "@assets/cog-outline.svg";
import PlayIcon from "@assets/play.svg";
import TrashBinIcon from "@assets/trash-bin.svg";
import RocketIcon from "@assets/rocket-outline.svg";
import CloseIcon from "@assets/close.svg";
import WarningIcon from "@assets/warning.svg";
import ShuffleIcon from "@assets/shuffle.svg";
import ChevronIcon from "@assets/chevron.svg";
import ChevronWhiteIcon from "@assets/chevron-white.svg";
import SunIcon from "@assets/sunny.svg";
import MoonIcon from "@assets/moon.svg";
import PersonIcon from "@assets/person.svg";
import GoogleIcon from "@assets/google.svg";
import FacebookIcon from "@assets/facebook.svg";

import { CSSStyle } from "@utils/types";

export type IconType =
  | "star"
  | "setting"
  | "play"
  | "sharp-setting"
  | "trash-bin"
  | "close"
  | "warning"
  | "shuffle"
  | "chevron"
  | "chevron-white"
  | "sun"
  | "moon"
  | "person"
  | "google"
  | "facebook"
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
  shuffle: ShuffleIcon,
  chevron: ChevronIcon,
  "chevron-white": ChevronWhiteIcon,
  sun: SunIcon,
  moon: MoonIcon,
  person: PersonIcon,
  facebook: FacebookIcon,
  google: GoogleIcon,
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
    <div className={animation && style[animation]}>
      <Component
        width={width || height}
        height={height || width}
        style={{ display: "block", fill, margin }}
      />
    </div>
  );
};
