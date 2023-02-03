import { useMemo } from "react";
import style from "./checkbox.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";

type CheckboxProp = {
  checked: boolean;
  onChecked: () => void;
  value: any;
};

const HiddenInput: React.FC<{
  checked: boolean;
  value: any;
  onChecked: () => void;
}> = ({ checked, onChecked, value }) => {
  return (
    <input
      type={"checkbox"}
      className={style.hidden_input}
      checked={checked}
      onChange={onChecked}
      value={value}
    />
  );
};

const StyledInput: React.FC<{
  checked: boolean;
  onClicked: () => void;
}> = ({ checked, onClicked }) => {
  const wrapperClassName = useMemo(() => {
    const classes = [neumorphic.root, neumorphic.checkbox];
    if (checked) classes.push(neumorphic.checked);
    return classes.join(" ");
  }, [checked]);

  const checkmarkClassName = useMemo(() => {
    const classes = [style.checkmark];
    if (checked) classes.push(style.checked);
    return classes.join(" ");
  }, [checked]);

  return (
    <div className={wrapperClassName} onClick={onClicked}>
      <div className={checkmarkClassName} />
    </div>
  );
};

export const Checkbox: React.FC<CheckboxProp> = ({
  checked,
  onChecked,
  value,
}) => {
  return (
    <div>
      <HiddenInput checked={checked} value={value} onChecked={onChecked} />
      <StyledInput checked={checked} onClicked={onChecked} />
    </div>
  );
};
