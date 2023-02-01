import { Cell, cellTypes } from "../Cell";
import defaultStyle from "@styles/default.module.scss";
import { Checkbox, NeumorphicButton } from "@components/common";
import { useCallback } from "react";
import { ClearableCellType } from "@utils/types";
import { useSelector } from "react-redux";
import {
  selectPathfindingController,
  setClearableCells,
  setClearExecuted,
} from "@utils/slices";
import { useDispatch } from "react-redux";

export const ClearModalContent: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { clearableCells } = useSelector(selectPathfindingController);

  const onChecked = useCallback(
    (value: ClearableCellType) => {
      const newClearableCells = { ...clearableCells };
      newClearableCells[value] = !clearableCells[value];
      dispatch(setClearableCells(newClearableCells));
    },
    [clearableCells]
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
            checked={clearableCells[name]}
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
            dispatch(setClearExecuted(true));
            onClose();
          }}
          fontSize={16}
          fontWeight={700}
        />
      </div>
    </div>
  );
};
