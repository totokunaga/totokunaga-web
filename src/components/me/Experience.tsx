import { Icon, Modal } from "@components/common";
import { Fragment, useCallback, useMemo, useState } from "react";
import neumorphic from "@styles/neumorphic.module.scss";

export type ExperienceProp = {
  entityName: string;
  title: string;
  periods: string[];
  explanations?: Array<{ subtitle: string; content: string }>;
};

export const Experience: React.FC<ExperienceProp> = ({
  periods,
  explanations,
}) => {
  const [isDetailsShown, setDetailsShown] = useState(false);

  const projectDetailsClassName = useMemo(() => {
    const classes = [neumorphic.root, neumorphic.down];
    return classes.join(" ");
  }, []);

  const onClickProjectDetails = useCallback(() => {
    setDetailsShown(!isDetailsShown);
  }, [isDetailsShown]);

  return (
    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: 12 }}>
        {periods.map((exp, i) => (
          <div key={i}>
            <p style={{ fontSize: "max(min(3.5vw, 15px), 14px" }}>{exp}</p>
          </div>
        ))}
      </div>

      {explanations && (
        <div
          className={projectDetailsClassName}
          onClick={onClickProjectDetails}
          style={{
            flex: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <div style={{ flex: 1 }}>
            <span>Click to see project details</span>
          </div>
          <div
            className={`${neumorphic.root} ${neumorphic.icon}`}
            style={{ transform: "rotate(45deg)" }}
          >
            <Icon icon={"close"} width={16} height={16} />
          </div>
          <Modal
            isShown={isDetailsShown}
            onClose={() => setDetailsShown(false)}
          >
            <ExperienceModalContent explanations={explanations} />
          </Modal>
        </div>
      )}
    </div>
  );
};

const ExperienceModalContent: React.FC<Partial<ExperienceProp>> = ({
  explanations,
}) => {
  return (
    <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
      {explanations?.map(({ subtitle, content }, i) => (
        <Fragment key={i}>
          <h4 style={{ marginBottom: 24 }}>{subtitle}</h4>
          <p>{content}</p>
        </Fragment>
      ))}
    </div>
  );
};
