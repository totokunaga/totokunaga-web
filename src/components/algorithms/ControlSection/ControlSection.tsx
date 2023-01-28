import {
  Button,
  buttonColor,
  buttonType,
  DropdownList,
} from "@components/common";
import style from "@styles/default.module.css";
import { pathfindingText } from "@utils/constants";
import {
  algorithmOptions,
  CELL_SIZE,
  Pathfinding,
  Speed,
  speedOptions,
} from "@utils/pathfinding";
import { Cell, cellTypes } from "../Cell";
import Triangle from "../Triangle";

const ControlSection: React.FC<{
  onStartClick: () => void;
  onClearClick: () => void;
  onChangeAlgorithm: (value: Pathfinding) => void;
  onChangeAlgorithmSpeed: (value: Speed) => void;
  algorithm: any;
  algorithmSpeed: Speed;
  algorithmExecuted: boolean;
}> = ({
  onStartClick,
  onClearClick,
  onChangeAlgorithm,
  onChangeAlgorithmSpeed,
  algorithm,
  algorithmSpeed,
  algorithmExecuted,
}) => {
  return (
    <div className={style.horizontallyAligned}>
      <Button
        onClick={onStartClick}
        type={buttonType.FLAT}
        colorType={buttonColor.PINK}
        margin={"8px 0"}
      >
        <div className={style.horizontallyAligned}>
          <div style={{ margin: "0 15px 5px 0" }}>
            <Triangle />
          </div>
          <span>{pathfindingText.startButton}</span>
        </div>
      </Button>
      <Button
        onClick={onClearClick}
        type={buttonType.FLAT}
        colorType={buttonColor.NAVY}
        margin={"8px 0 8px 8px"}
        fontWeight={400}
      >
        {pathfindingText.clearButton}
      </Button>
      <DropdownList
        title={pathfindingText.dropdownListAlgorithm}
        value={algorithm}
        items={algorithmOptions}
        disabled={algorithmExecuted}
        optionHandler={onChangeAlgorithm}
      />
      <DropdownList
        title={pathfindingText.dropdownListSpeed}
        value={algorithmSpeed}
        items={speedOptions}
        disabled={algorithmExecuted}
        optionHandler={onChangeAlgorithmSpeed}
      />

      <div style={{ display: "flex", margin: "8px 0 8px 8px" }}>
        {cellTypes.map(
          ({ type, name }, i) =>
            i > 0 && (
              <div key={type} className={style.horizontallyAligned}>
                <Cell size={0.8 * CELL_SIZE} status={type} disabled={true} />
                <span style={{ margin: "0px 10px 0px 5px" }}>{name}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ControlSection;
