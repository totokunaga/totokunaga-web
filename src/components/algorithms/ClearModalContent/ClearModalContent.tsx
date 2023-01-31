import { Cell, cellTypes } from "../Cell";
import defaultStyle from "@styles/default.module.scss";
import { Checkbox, NeumorphicButton } from "@components/common";
import { useCallback, useState } from "react";
import { ClearableCellType } from "@utils/types";

export const ClearModalContent: React.FC<{
  onClearClick: (checked: Record<ClearableCellType, boolean>) => any;
  onClose: () => void;
}> = ({ onClearClick, onClose }) => {
  const [checked, setChecked] = useState<Record<ClearableCellType, boolean>>({
    Blocked: false,
    Visited: true,
    Path: true,
  });

  const onChecked = useCallback(
    (value: ClearableCellType) => {
      checked[value] = !checked[value];
      setChecked({ ...checked });
    },
    [checked]
  );

  return (
    <div>
      <p style={{ marginBottom: 12 }}>
        The selected cells below are going to be cleared.
      </p>
      <p style={{ marginBottom: 24 }}>Are you sure to proceed?</p>
      {cellTypes.map(({ type, name }, i) => (
        <div
          key={type}
          className={defaultStyle.horizontallyAligned}
          style={{ marginBottom: 8 }}
        >
          <Checkbox
            checked={checked[name]}
            onChecked={() => onChecked(name)}
            value={0}
          />
          <div
            className={defaultStyle.horizontallyAligned}
            style={{ cursor: "pointer" }}
            onClick={() => onChecked(name)}
          >
            <Cell size={30} status={type} disabled={true} />
            <span style={{ margin: "0px 0px 0px 8px" }}>{name}</span>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <NeumorphicButton
          onClick={() => {
            onClearClick(checked);
            onClose();
          }}
          fontSize={16}
          fontWeight={700}
        />
      </div>
    </div>
  );
};
