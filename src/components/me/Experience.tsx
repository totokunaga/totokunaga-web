import { Icon, Modal } from "@components/common";
import { Fragment, useCallback, useMemo, useState } from "react";
import neumorphic from "@styles/neumorphic.module.scss";
import text from "@styles/text.module.scss";

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
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {periods.map((exp, i) => (
          <p
            key={i}
            className={text.smallest}
            style={{ display: "flex", marginBottom: "0.2em" }}
          >
            {exp}
          </p>
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
            marginTop: 10,
          }}
        >
          <div style={{ flex: 1, display: "flex" }}>
            <p className={text.smallest}>Click to see project details</p>
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
    </>
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
