import style from "@styles/default.module.scss";
import textStyle from "@styles/text.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";
import meStyle from "./me.module.scss";
import { Icon, MyHead, ProgressSteps, RadioBlock } from "@components/common";
import { pages, paths } from "@utils/constants";
import { useRouter } from "next/router";
import { Experience } from "@components/me";
import { meTexts } from "@utils/constants";
import { useWindowSize } from "@utils/hooks";
import { useEffect, useState } from "react";

const neumorphicDown = [neumorphic.root, neumorphic.down].join(" ");

const { root } = pages;
const { introduction, experiences, skills } = meTexts;

const Index = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const [profileSize, setProfileSize] = useState(0);

  useEffect(() => {
    if (width) {
      setProfileSize(Math.min(Math.round(width / 4), 126));
    }
  }, [width]);

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
          <div style={{ display: "flex", position: "relative" }}>
            <div className={meStyle.profile_image_wrapper}>
              <div className={neumorphicDown} style={{ padding: 12 }}>
                <img
                  alt={"profile"}
                  src={"/profile.jpg"}
                  width={profileSize}
                  height={profileSize}
                  draggable={false}
                  style={{ borderRadius: 15 }}
                />
              </div>
            </div>
            <div
              className={`${neumorphic.root} ${neumorphic.paragraph} ${meStyle.profile_description_wrapper}`}
            >
              <div className={meStyle.profile_description_float} />
              {introduction.map((text, i) => (
                <p
                  key={i}
                  style={{
                    marginBottom: i !== introduction.length - 1 ? 12 : 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex" }}>
              <h3 className={textStyle.underline} style={{ marginBottom: 20 }}>
                Personal projects
              </h3>
            </div>
            <div style={{ display: "flex" }}>
              <div
                className={`${neumorphic.root} ${neumorphic.chip}`}
                onClick={() => router.push(paths.algorigthms)}
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
              <h3 className={textStyle.underline} style={{ marginBottom: 12 }}>
                Experience & Education
              </h3>
            </div>
            <ProgressSteps
              type={"vertical"}
              items={experiences.map((exp) => {
                return {
                  name: exp.entityName,
                  component: Experience,
                  args: exp,
                };
              })}
              current={experiences[0].entityName}
            />
          </div>

          <div style={{ display: "flex" }}>
            <h3 className={textStyle.underline} style={{ marginBottom: 12 }}>
              Skills & Certifications
            </h3>
          </div>
          <div className={neumorphicDown} style={{ marginBottom: 20 }}>
            {skills.map(({ title, list }, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
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
