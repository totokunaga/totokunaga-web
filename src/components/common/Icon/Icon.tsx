import StarIcon from "@assets/star.svg";
import SettingIcon from "@assets/settings-sharp.svg";
import SharpSettingIcon from "@assets/cog-outline.svg";
import PlayIcon from "@assets/play.svg";
import TrashBinIcon from "@assets/trash-bin.svg";

type IconType = "star" | "setting" | "play" | "sharp-setting" | "trash-bin";

const Icons: Record<IconType, any> = {
  star: StarIcon,
  setting: SettingIcon,
  play: PlayIcon,
  "sharp-setting": SharpSettingIcon,
  "trash-bin": TrashBinIcon,
};

type IconProp = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  icon: IconType;
};

export const Icon: React.FC<IconProp> = ({
  icon,
  height = 16,
  width = 16,
  fill,
}) => {
  const Component = Icons[icon];
  return (
    <Component
      width={width}
      height={height}
      style={{ display: "block", fill }}
    />
  );
};
