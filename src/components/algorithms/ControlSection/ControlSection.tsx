import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Icon, Modal } from "@components/common";
import style from "@styles/default.module.scss";
import { pathfindingText } from "@utils/constants";
import { selectPathfindingController } from "@utils/slices";
import { ClearModalContent } from "../ClearModalContent";
import { ConfigModalContent } from "../ConfigModalContent";

const ControlSection: React.FC<{
  onStartClick: () => void;
  algorithmExecuted: boolean;
}> = ({ onStartClick, algorithmExecuted }) => {
  const [isClearModalShown, setClearModalShown] = useState(false);
  const [isConfigModalShown, setConfigModalShown] = useState(false);

  const { algorithm } = useSelector(selectPathfindingController);

  return (
    <div className={style.mobileHorizontallyAligned}>
      <div className={style.horizontallyAligned}>
        <Button
          onClick={onStartClick}
          type={"secondary"}
          margin={"0px 8px 12px 0px"}
        >
          <div className={style.horizontallyAligned}>
            <div style={{ margin: "0 12px 0px 0" }}>
              <Icon icon={"play"} width={20} height={20} />
            </div>
            <span>{pathfindingText.startButton}</span>
          </div>
        </Button>
        <Button
          onClick={() => {
            setClearModalShown(true);
          }}
          type={"primary"}
          margin={"0px 8px 12px 0px"}
        >
          <div className={style.horizontallyAligned}>
            <div style={{ margin: "0 12px 0px 0" }}>
              <Icon icon={"trash-bin"} width={20} height={20} />
            </div>
            <span>{pathfindingText.clearButton}</span>
          </div>
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <Button
          onClick={() => {
            setConfigModalShown(true);
          }}
          type={"normal"}
          margin={`0px 0px 12px 0px`}
          padding={"12px 24px"}
          fontWeight={400}
        >
          <div className={style.horizontallyAligned}>
            <Icon icon={"sharp-setting"} width={24} height={24} />
            <span style={{ margin: "0px 8px" }}>Algorithm:</span>
            <span className={style.code} style={{ fontSize: 20 }}>
              {algorithm}
            </span>
          </div>
        </Button>
      </div>

      <Modal
        isShown={isClearModalShown}
        onClose={() => setClearModalShown(false)}
      >
        <ClearModalContent onClose={() => setClearModalShown(false)} />
      </Modal>

      <Modal
        isShown={isConfigModalShown}
        onClose={() => setConfigModalShown(false)}
      >
        <ConfigModalContent onClose={() => setConfigModalShown(false)} />
      </Modal>
    </div>
  );
};

export default ControlSection;
