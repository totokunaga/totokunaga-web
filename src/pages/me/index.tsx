import style from "@styles/default.module.scss";
import textStyle from "@styles/text.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";
import meStyle from "./me.module.scss";
import { Icon, MyHead, ProgressSteps, RadioBlock } from "@components/common";
import { pages, paths } from "@utils/constants";
import { useRouter } from "next/router";
import { Experience } from "@components/me";
import { meTexts } from "@utils/constants";
import { useEffect, useMemo, useState } from "react";

const neumorphicDown = [neumorphic.root, neumorphic.down].join(" ");

const { root } = pages;
const { introduction, experiences, skills } = meTexts;

const greeting = {
  en: "Hello,",
  ja: "こんにちは",
};

const Index = () => {
  const router = useRouter();

  const [typewriterLang, setTypewriterLang] = useState<"ja" | "en">("en");
  const [typewriterVal, setTypewriterVal] = useState("");
  const [typewriterHeight, setTypewriterHeight] = useState(0);

  useEffect(() => {
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
      setTypewriterHeight(greetingElement.clientHeight * 0.75);
    }
  }, [typewriterLang]);

  useEffect(() => {
    const charArr = Array.from(greeting[typewriterLang]);
    const forwardTimeoutAmount = 400;
    const backwardTimeoutAmount = 100;

    let timeoutAmount = 1000;
    charArr.forEach((_, i) => {
      timeoutAmount += forwardTimeoutAmount * 0.35;
      setTimeout(() => {
        setTypewriterVal(charArr.slice(0, i + 1).join(""));
      }, timeoutAmount);
    });

    timeoutAmount += 4000;
    charArr.forEach((_, i) => {
      timeoutAmount += backwardTimeoutAmount;
      setTimeout(() => {
        setTypewriterVal(charArr.slice(0, charArr.length - i - 1).join(""));
      }, timeoutAmount);
    });

    setTimeout(() => {
      setTypewriterLang(typewriterLang === "en" ? "ja" : "en");
    }, timeoutAmount);
  }, [typewriterLang]);

  const introductionClassName = useMemo(() => {
    const classes = [
      neumorphic.root,
      neumorphic.paragraph,
      meStyle.profile_description_wrapper,
    ];
    return classes.join(" ");
  }, []);

  return (
    <>
      <MyHead {...root} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={style.root}>
          <div
            id={"greeting"}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              height: "min(12.5vw, 7rem)",
            }}
          >
            <h1
              style={{
                marginRight: "0.5rem",
                fontSize:
                  typewriterLang === "ja" ? "min(8.5vw, 5.5rem)" : undefined,
                fontFamily:
                  typewriterLang === "ja"
                    ? `'Noto Sans JP', sans-serif`
                    : undefined,
              }}
            >
              {typewriterVal}
            </h1>
            <div
              className={style.typewriter}
              style={{ height: typewriterHeight }}
            />
          </div>

          <div style={{ display: "flex", position: "relative" }}>
            <div className={meStyle.profile_image_wrapper}>
              <div className={neumorphicDown} style={{ padding: "10%" }}>
                <img
                  alt={"profile"}
                  src={"/profile.jpg"}
                  className={meStyle.profile_image}
                  draggable={false}
                />
              </div>
            </div>
            <div className={introductionClassName}>
              <div className={meStyle.profile_description_float} />
              {introduction.map((text, i) => (
                <p
                  key={i}
                  style={{
                    marginBottom: i !== introduction.length - 1 ? "0.85em" : 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 50 }}>
            <div style={{ display: "flex" }}>
              <h3 className={textStyle.underline}>Personal projects</h3>
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
                <span className={textStyle.normal}>Algorithm Visualizer</span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 50 }}>
            <div style={{ display: "flex" }}>
              <h3 className={textStyle.underline}>Experience & Education</h3>
            </div>
            <ProgressSteps
              type={"vertical"}
              items={experiences.map((exp) => {
                return {
                  name: exp.entityName,
                  component: <Experience {...exp} />,
                  title: (
                    <div>
                      <h4>
                        {exp.entityName}
                        <span
                          style={{
                            fontWeight: 300,
                            fontSize: "0.85em",
                            marginLeft: 5,
                          }}
                        >
                          - {exp.title}
                        </span>
                      </h4>
                    </div>
                  ),
                };
              })}
              current={experiences[0].entityName}
            />
          </div>

          <div style={{ display: "flex" }}>
            <h3 className={textStyle.underline}>Skills & Certifications</h3>
          </div>
          <div className={neumorphicDown} style={{ marginBottom: "1rem" }}>
            {skills.map(({ title, list }, i) => (
              <div
                key={i}
                style={{ marginBottom: i < skills.length - 1 ? "0.85rem" : 0 }}
              >
                <p
                  className={textStyle.normal}
                  style={{
                    fontWeight: 500,
                    marginBottom: "1em",
                    display: "flex",
                  }}
                >
                  {title}:
                </p>
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
