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
import LinkedInIcon from "@assets/linkedin.svg";
import LogoutIcon from "@assets/logout.svg";
import MenuIcon from "@assets/menu.svg";
import DarkMenuIcon from "@assets/dark-menu.svg";
import AppearanceIcon from "@assets/contrast.svg";

import { CSSStyle } from "@utils/types";
import { MouseEventHandler, useMemo } from "react";

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
  | "linkedin"
  | "logout"
  | "menu"
  | "dark-menu"
  | "appearance"
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
  linkedin: LinkedInIcon,
  logout: LogoutIcon,
  menu: MenuIcon,
  "dark-menu": DarkMenuIcon,
  appearance: AppearanceIcon,
};

type IconProp = CSSStyle & {
  width?: number | string;
  height?: number | string;
  fill?: string;
  icon: IconType;
  animation?: AnimationType;
  onClick?: MouseEventHandler;
  className?: string;
};

export const Icon: React.FC<IconProp> = ({
  icon,
  height,
  width,
  animation,
  onClick,
  className,
  ...props
}) => {
  const Component = useMemo(() => Icons[icon], [icon]);
  const iconClassName = useMemo(() => {
    const classes = [style.icon];
    if (animation) classes.push(style[animation]);
    if (className) classes.push(className);
    return classes.join(" ");
  }, []);

  return (
    <div className={iconClassName} onClick={onClick}>
      <Component
        width={width || height}
        height={height || width}
        style={{
          display: "block",
          ...props,
        }}
      />
    </div>
  );
};
