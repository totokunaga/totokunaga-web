import style from "./checkbox.module.scss";

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
  return (
    <div
      className={`${style.checkbox} ${checked && style.checked}`}
      onClick={onClicked}
    >
      <div className={`${style.checkmark} ${checked && style.checked}`} />
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
