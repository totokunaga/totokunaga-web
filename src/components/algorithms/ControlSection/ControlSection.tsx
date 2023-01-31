import {
  Button,
  buttonColor,
  buttonType,
  DropdownList,
  Modal,
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
import { useEffect, useState } from "react";
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
  const [isShown, setShown] = useState(false);
  useEffect(() => {
    console.log(isShown);
  }, [isShown]);

  return (
    <div className={style.mobileHorizontallyAligned}>
      <div className={style.horizontallyAligned}>
        <Button
          onClick={onStartClick}
          type={buttonType.FLAT}
          colorType={buttonColor.PINK}
          margin={"0px 8px 8px 0px"}
        >
          <div className={style.horizontallyAligned}>
            <div style={{ margin: "0 15px 5px 0" }}>
              <Triangle />
            </div>
            <span>{pathfindingText.startButton}</span>
          </div>
        </Button>
        <Button
          onClick={() => {
            onClearClick();
            setShown(true);
          }}
          type={buttonType.FLAT}
          colorType={buttonColor.NAVY}
          margin={"0px 8px 8px 0px"}
          fontWeight={400}
        >
          {pathfindingText.clearButton}
        </Button>
      </div>
      <div className={style.horizontallyAligned}>
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
      </div>

      <div style={{ display: "flex", margin: "0px 8px 8px 0px" }}>
        {cellTypes.map(
          ({ type, name }, i) =>
            i > 1 && ( // TODO: Stop using a magic number
              <div key={type} className={style.horizontallyAligned}>
                <Cell size={0.8 * CELL_SIZE} status={type} disabled={true} />
                <span style={{ margin: "0px 10px 0px 5px" }}>{name}</span>
              </div>
            )
        )}
      </div>

      <Modal isShown={isShown} onClose={() => setShown(false)}>
        {"hello"}
      </Modal>
    </div>
  );
};

export default ControlSection;
