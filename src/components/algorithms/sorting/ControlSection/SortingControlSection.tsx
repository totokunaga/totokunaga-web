import { useCallback, useState } from "react";
import { Button, Icon, Modal } from "@components/common";
import defaultStyle from "@styles/default.module.scss";
import style from "./controlSection.module.scss";
import { useSelector } from "react-redux";
import {
  selectSortindingController,
  setBarRandamized,
  setSortingAlgorithmExecuted,
} from "@utils/slices";
import { useDispatch } from "react-redux";
import { SortingConfigModalContent } from "../ConfigModalContent";

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

export const SortingControlSection: React.FC = () => {
  const [isConfigModalShown, setConfigModalShown] = useState(false);

  const dispatch = useDispatch();
  const { algorithm, algorithmExecuted, randomizeExecuted } = useSelector(
    selectSortindingController
  );

  const onStart = useCallback(() => {
    if (!algorithmExecuted) {
      dispatch(setSortingAlgorithmExecuted(true));
    }
  }, [dispatch]);

  const onRandomize = useCallback(() => {
    if (!randomizeExecuted) {
      dispatch(setBarRandamized(true));
    }
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={onStart}
          type={"secondary"}
          className={leftmostFirstRowButtonClassName}
        >
          <div className={defaultStyle.horizontallyAligned}>
            <Icon icon={"play"} height={20} margin={"0 12px 0 0"} />
            <span>{"Start"}</span>
          </div>
        </Button>

        <Button
          onClick={onRandomize}
          type={"primary"}
          className={rightmostFirstRowButtonClassName}
        >
          <div className={defaultStyle.horizontallyAligned}>
            <Icon icon={"shuffle"} height={20} margin={"0 12px 0 0"} />
            <span>{"Randomize"}</span>
          </div>
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <Button
          className={leftmostSecondRowButtonClassName}
          onClick={() => setConfigModalShown(true)}
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

      <Modal
        isShown={isConfigModalShown}
        onClose={() => setConfigModalShown(false)}
      >
        <SortingConfigModalContent onClose={() => setConfigModalShown(false)} />
      </Modal>
    </div>
  );
};
