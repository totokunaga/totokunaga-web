import {
  Button,
  buttonColor,
  buttonType,
  DropdownList,
  Modal,
} from "@components/common";
import style from "@styles/default.module.scss";
import { pathfindingText } from "@utils/constants";
import {
  algorithmOptions,
  CELL_SIZE,
  Pathfinding,
  Speed,
  speedOptions,
} from "@utils/pathfinding";
import {
  selectPathfindingController,
  setPathfindingAlgorithm,
  setPathfindingAlgorithmSpeed,
} from "@utils/slices";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Cell, cellTypes } from "../Cell";
import { ClearModalContent } from "../ClearModalContent";
import Triangle from "../Triangle";

const ControlSection: React.FC<{
  onStartClick: () => void;
  algorithmExecuted: boolean;
}> = ({ onStartClick, algorithmExecuted }) => {
  const [isShown, setShown] = useState(false);

  const dispatch = useDispatch();
  const { algorithm, algorithmSpeed } = useSelector(
    selectPathfindingController
  );

  const onChangeAlgorithm = useCallback((value: Pathfinding) => {
    dispatch(setPathfindingAlgorithm(value));
  }, []);

  const onChangeAlgorithmSpeed = useCallback((value: Speed) => {
    dispatch(setPathfindingAlgorithmSpeed(value));
  }, []);

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
        {cellTypes.map(({ type, name }, i) => (
          <div key={type} className={style.horizontallyAligned}>
            <Cell size={0.8 * CELL_SIZE} status={type} disabled={true} />
            <span style={{ margin: "0px 10px 0px 5px" }}>{name}</span>
          </div>
        ))}
      </div>

      <Modal isShown={isShown} onClose={() => setShown(false)}>
        <ClearModalContent onClose={() => setShown(false)} />
      </Modal>
    </div>
  );
};

export default ControlSection;
