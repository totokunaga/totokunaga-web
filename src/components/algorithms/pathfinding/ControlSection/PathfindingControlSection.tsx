import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Icon, Modal } from "@components/common";
import { pathfindingText } from "@utils/constants";
import {
  selectPathfindingController,
  setPathfindingAlgorithmExecuted,
} from "@utils/slices";
import { ClearModalContent } from "../ClearModalContent";
import { ConfigModalContent } from "../ConfigModalContent";
import defaultStyle from "@styles/default.module.scss";
import style from "./controlSection.module.scss";
import { useDispatch } from "react-redux";

const leftmostFirstRowButtonClassName = [
  style.first_row_button,
  style.leftmost,
].join(" ");
const rightmostFirstRowButtonClassName = [
  style.first_row_button,
  style.rightmost,
].join(" ");
const leftmostSecondRowButtonClassName = [
  style.second_row_button,
  style.leftmost,
].join(" ");

export const PathfindingControlSection: React.FC = () => {
  const [isClearModalShown, setClearModalShown] = useState(false);
  const [isConfigModalShown, setConfigModalShown] = useState(false);

  const dispatch = useDispatch();
  const { algorithm, algorithmExecuted } = useSelector(
    selectPathfindingController
  );

  const onStartClick = useCallback(() => {
    if (!algorithmExecuted) {
      dispatch(setPathfindingAlgorithmExecuted(true));
    }
  }, [dispatch, algorithmExecuted]);

  const onClearClick = useCallback(() => {
    if (!algorithmExecuted) {
      setClearModalShown(true);
    }
  }, [dispatch, algorithmExecuted]);

  return (
    <div className={style.wrapper}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={onStartClick}
          type={"secondary"}
          className={leftmostFirstRowButtonClassName}
        >
          <div className={defaultStyle.horizontallyAligned}>
            <Icon icon={"play"} height={20} margin={"0 12px 0 0"} />
            <span>{pathfindingText.startButton}</span>
          </div>
        </Button>

        <Button
          onClick={onClearClick}
          type={"primary"}
          className={rightmostFirstRowButtonClassName}
        >
          <div className={defaultStyle.horizontallyAligned}>
            <Icon icon={"trash-bin"} height={20} margin={"0 12px 0 0"} />
            <span>{pathfindingText.clearButton}</span>
          </div>
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <Button
          className={leftmostSecondRowButtonClassName}
          onClick={() => {
            setConfigModalShown(true);
          }}
          type={"normal"}
          padding={"12px 24px"}
          fontWeight={400}
        >
          <div className={defaultStyle.horizontallyAligned}>
            <Icon icon={"sharp-setting"} width={24} animation={"rotate"} />
            <span style={{ margin: "0px 8px" }}>Algorithm:</span>
            <span className={defaultStyle.code} style={{ fontSize: 20 }}>
              {algorithm}
            </span>
          </div>
        </Button>
      </div>

      {isClearModalShown && (
        <Modal
          isShown={isClearModalShown}
          onClose={() => setClearModalShown(false)}
        >
          <ClearModalContent onClose={() => setClearModalShown(false)} />
        </Modal>
      )}

      <Modal
        isShown={isConfigModalShown}
        onClose={() => setConfigModalShown(false)}
      >
        <ConfigModalContent onClose={() => setConfigModalShown(false)} />
      </Modal>
    </div>
  );
};
