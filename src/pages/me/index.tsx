import style from "@styles/default.module.scss";
import textStyle from "@styles/text.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";
import meStyle from "./me.module.scss";
import {
  Header,
  Icon,
  MyHead,
  ProgressSteps,
  RadioBlock,
} from "@components/common";
import {
  greeting,
  iconLSize,
  normalIconSize,
  pages,
  paths,
} from "@utils/constants";
import { useRouter } from "next/router";
import { Experience } from "@components/me";
import { meTexts } from "@utils/constants";
import { useEffect, useMemo, useState } from "react";
import ColoredGraphIcon from "@assets/colored-graph.svg";
import { Lang } from "@utils/types";
import { useSelector } from "react-redux";
import { selectWindow } from "@utils/slices";

const neumorphicDown = [neumorphic.root, neumorphic.down].join(" ");

const { root } = pages;
const { introduction, experiences, skills } = meTexts;

const Index = () => {
  const router = useRouter();
  const { isDarkMode } = useSelector(selectWindow);

  const [typewriterLang, setTypewriterLang] = useState<Lang>("en");
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

    let timeoutAmount = 500;
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
    const classes = [meStyle.profile_description_wrapper];
    return classes.join(" ");
  }, []);

  return (
    <>
      <MyHead {...root} />
      <Header />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={meStyle.top_bg} />
        <div
          className={style.triangle}
          style={{ top: "min(49.8vw, 9.9rem)" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={style.root}>
          <div style={{ display: "flex" }}>
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
                    typewriterLang === "ja" ? "min(8vw, 4.5rem)" : undefined,
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto 0px auto auto",
              }}
            >
              <img
                alt={"profile"}
                src={"/profile.jpg"}
                className={meStyle.profile_image}
                draggable={false}
                style={{ zIndex: 1 }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: ".5rem",
                  fill: isDarkMode ? "#ddddde" : "#000f23",
                }}
              >
                <Icon
                  icon={"github"}
                  width={iconLSize}
                  cursor={"pointer"}
                  marginRight={"0.5rem"}
                  onClick={() =>
                    (window.location.href = "https://github.com/totokunaga")
                  }
                />
                <Icon
                  icon={"linkedin"}
                  width={iconLSize}
                  cursor={"pointer"}
                  onClick={() =>
                    (window.location.href =
                      "https://www.linkedin.com/in/tomoya-tokunaga")
                  }
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div className={introductionClassName}>
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
            <div
              onClick={() => router.push(paths.algorigthms)}
              className={`${neumorphic.root}`}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1.5rem",
                borderRadius: "1em",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <div style={{ width: "min(12.5%, 48px)", marginRight: 12 }}>
                <ColoredGraphIcon width={"100%"} height={"100%"} />
              </div>
              <span className={textStyle.larger} style={{ fontWeight: 500 }}>
                Algorithm Visualizer
              </span>
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
                  name: exp.entityName + "-" + exp.title,
                  component: <Experience {...exp} />,
                  title: (
                    <div>
                      <h4 style={{ marginBottom: 0 }}>
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
              current={experiences[0].entityName + "-" + experiences[0].title}
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
                  {title}
                </p>
                <RadioBlock items={list} value={null} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
