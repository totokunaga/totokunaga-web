import { Icon, Modal } from "@components/common";
import { Fragment, useCallback, useMemo, useState } from "react";
import neumorphic from "@styles/neumorphic.module.scss";

export type ExperienceProp = {
  entityName: string;
  title: string;
  periods: string[];
  accordionTitle?: string;
  explanations?: Array<{ subtitle: string; content: string }>;
  onResize?: (value: number) => void;
  componentId: string;
};

export const Experience: React.FC<ExperienceProp> = ({
  entityName,
  title,
  periods,
  explanations,
  componentId,
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
    <div id={componentId}>
      <div style={{ margin: "6px 0px 4px 0px" }}>
        <p style={{ fontWeight: 500, marginRight: 5 }}>
          {entityName}{" "}
          <span style={{ fontSize: 15, fontWeight: 300 }}>- {title}</span>
        </p>
      </div>
      <div style={{ marginBottom: 12 }}>
        {periods.map((exp, i) => (
          <div key={i}>
            <p style={{ fontSize: "max(min(3.5vw, 15px), 14px" }}>{exp}</p>
          </div>
        ))}
      </div>

      {explanations && (
        <>
          <div
            className={projectDetailsClassName}
            onClick={onClickProjectDetails}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              borderRadius: 8,
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
          </div>

          <Modal
            isShown={isDetailsShown}
            onClose={() => setDetailsShown(false)}
          >
            <ExperienceModalContent explanations={explanations} />
          </Modal>
        </>
      )}
    </div>
  );
};

const ExperienceModalContent: React.FC<Partial<ExperienceProp>> = ({
  explanations,
}) => {
  return (
    <>
      {explanations?.map(({ subtitle, content }, i) => (
        <Fragment key={i}>
          <h4 style={{ marginBottom: 24 }}>{subtitle}</h4>
          <p>{content}</p>
        </Fragment>
      ))}
    </>
  );
};
