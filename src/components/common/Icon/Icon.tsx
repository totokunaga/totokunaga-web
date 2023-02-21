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
import DarkPersonIcon from "@assets/dark-person.svg";
import GoogleIcon from "@assets/google.svg";
import FacebookIcon from "@assets/facebook.svg";
import AppleIcon from "@assets/apple.svg";
import GithubIcon from "@assets/github.svg";

import { CSSStyle } from "@utils/types";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectWindow } from "@utils/slices";

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
  | "dark-person"
  | "google"
  | "facebook"
  | "apple"
  | "github"
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
  "dark-person": DarkPersonIcon,
  facebook: FacebookIcon,
  google: GoogleIcon,
  apple: AppleIcon,
  github: GithubIcon,
};

type IconProp = CSSStyle & {
  width?: number | string;
  height?: number | string;
  fill?: string;
  icon: IconType;
  animation?: AnimationType;
  className?: string;
};

export const Icon: React.FC<IconProp> = ({
  icon,
  height,
  width,
  fill,
  animation,
  margin,
  className,
}) => {
  const { isDarkMode } = useSelector(selectWindow);
  const Component = useMemo(() => Icons[icon], [icon]);
  const iconClassName = useMemo(() => {
    const classes = [];
    if (animation) classes.push(style[animation]);
    if (className) classes.push(className);
    return classes.join(" ");
  }, []);

  return (
    <div className={iconClassName}>
      <Component
        width={width || height}
        height={height || width}
        style={{ display: "block", fill, margin }}
      />
    </div>
  );
};
