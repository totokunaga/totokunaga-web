import { Accordion } from "@components/common/Accordion";

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
  accordionTitle,
  onResize,
  componentId,
}) => {
  return (
    <div id={componentId}>
      <div style={{ margin: "6px 0px 4px 0px" }}>
        <p style={{ fontWeight: 500 }}>
          {entityName}{" "}
          <span style={{ fontSize: 15, fontWeight: 300 }}>- {title}</span>
        </p>
      </div>
      <div style={{ marginBottom: 12 }}>
        {periods.map((exp, i) => (
          <div key={i}>
            <p style={{ fontSize: 15 }}>{exp}</p>
          </div>
        ))}
      </div>
      {accordionTitle && explanations && (
        <div style={{ marginBottom: 8 }}>
          <Accordion
            name={accordionTitle}
            componentId={entityName + title}
            onResize={onResize}
          >
            {explanations.map(({ subtitle, content }, i) => (
              <div key={i}>
                <p
                  style={{
                    fontWeight: 500,
                    marginBottom: 10,
                    fontSize: "max(min(3.7vw, 16px), 14px)",
                  }}
                >
                  {subtitle}
                </p>
                <p style={{ fontSize: "max(min(3.75vw, 16px), 14px)" }}>
                  {content}
                </p>
              </div>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};
