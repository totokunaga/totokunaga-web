import style from "@styles/default.module.scss";
import textStyle from "@styles/text.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";
import { Icon, MyHead, ProgressSteps, RadioBlock } from "@components/common";
import { pages, paths } from "@utils/constants";
import { useRouter } from "next/router";
import { Experience } from "@components/me";
import { meTexts } from "./constants";

const neumorphicDown = [neumorphic.root, neumorphic.down].join(" ");

const { root } = pages;
const { introduction, experiences, skills } = meTexts;

const Index = () => {
  const router = useRouter();

  return (
    <>
      <MyHead {...root} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ padding: 24, maxWidth: 900 }}>
          <h1 className={style.font} style={{ marginBottom: 16 }}>
            Hello,
          </h1>
          <div
            className={`${neumorphic.root} ${neumorphic.paragraph}`}
            style={{ marginBottom: 40 }}
          >
            {introduction.map((text, i) => (
              <p
                style={{
                  marginBottom: i !== introduction.length - 1 ? 12 : 0,
                }}
              >
                {text}
              </p>
            ))}
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex" }}>
              <h2 className={textStyle.underline} style={{ marginBottom: 20 }}>
                Personal projects
              </h2>
            </div>
            <div style={{ display: "flex" }}>
              <div
                className={`${neumorphic.root} ${neumorphic.chip}`}
                onClick={() => router.push(paths.pathfinding)}
              >
                <div style={{ marginRight: 8 }}>
                  <Icon
                    icon={"rocket"}
                    width={20}
                    height={20}
                    animation={"shake"}
                  />
                </div>
                <span>Algorithm Visualizer</span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex" }}>
              <h2 className={textStyle.underline} style={{ marginBottom: 12 }}>
                Experience & Education
              </h2>
            </div>
            <ProgressSteps
              type={"vertical"}
              items={experiences.map((exp) => {
                return {
                  name: exp.entityName,
                  component: <Experience {...exp} />,
                };
              })}
              current={experiences[0].entityName}
            />
          </div>

          <div style={{ display: "flex" }}>
            <h2 className={textStyle.underline} style={{ marginBottom: 12 }}>
              Skills & Certifications
            </h2>
          </div>
          <div className={neumorphicDown} style={{ marginBottom: 20 }}>
            {skills.map(({ title, list }) => (
              <div style={{ marginBottom: 8 }}>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 500 }}>{title}:</span>
                </div>
                <RadioBlock
                  items={list}
                  value={null}
                  fontColor={neumorphic.navy}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
