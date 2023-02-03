import style from "@styles/default.module.scss";
import textStyle from "@styles/text.module.scss";
import neumorphic from "@styles/neumorphic.module.scss";
import { Icon, MyHead, ProgressSteps, RadioBlock } from "@components/common";
import { pages, paths } from "@utils/constants";
import { useRouter } from "next/router";
import { Accordion } from "@components/common/Accordion";
import { Experience } from "@components/me";

const frontendSkills = ["React + NextJS", "Cypress", "SCSS/SASS"];
const backendSkills = ["ExpressJS", "MySQL", "cassandra", "TypeORM", "OAuth"];
const cloudSkills = ["Kubernetes", "GCP", "Docker"];
const neumorphicDown = [neumorphic.root, neumorphic.down].join(" ");

const { root } = pages;

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
            <p style={{ marginBottom: 12 }}>
              I&apos;m Tomoya Tokunaga, a software engineer based in Tokyo,
              Japan.
            </p>
            <p style={{ marginBottom: 12 }}>
              Currently working at Rakuten Mobile as a lead developer of web
              applications for B2C customers.
            </p>
            <p>
              All my personal projects, past experiences and skills/technologies
              are listed below.
            </p>
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
              items={[
                {
                  name: "rm",
                  component: (
                    <Experience
                      entityName="Rakuten Mobile"
                      title="Lead developer"
                      periods={[
                        "Oct, 2021 - current",
                        "Oct, 2020 - Sep, 2021 as Frontend developer",
                      ]}
                      accordionTitle={"Projects"}
                      explanations={[
                        {
                          subtitle: "#1. B2C ISP website",
                          content: "hello",
                        },
                      ]}
                    />
                  ),
                },
                {
                  name: "mercari",
                  component: (
                    <Experience
                      entityName="Mercari"
                      title="Internship"
                      periods={["Jul, 2019 - Sep, 2019"]}
                      accordionTitle={"Projects"}
                      explanations={[]}
                    />
                  ),
                },
                {
                  name: "gs",
                  component: (
                    <Experience
                      entityName="Goldman Sachs"
                      title="Internship"
                      periods={["Aug, 2018 - Sep, 2018"]}
                      accordionTitle={"Projects"}
                      explanations={[]}
                    />
                  ),
                },
                {
                  name: "ucsd",
                  component: (
                    <Experience
                      entityName="UC San Diego"
                      title="B.S. Math-Computer Science"
                      periods={["Sep, 2016 - Jun, 2020"]}
                      accordionTitle={"Projects"}
                      explanations={[]}
                    />
                  ),
                },
              ]}
              current={"rm"}
            />
          </div>

          <div style={{ display: "flex" }}>
            <h2 className={textStyle.underline} style={{ marginBottom: 12 }}>
              Skills & Certifications
            </h2>
          </div>
          <div className={neumorphicDown} style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: 8 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: 500 }}>Frontend:</span>
              </div>
              <RadioBlock
                items={frontendSkills}
                value={null}
                fontColor={neumorphic.navy}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: 500 }}>Backend:</span>
              </div>
              <RadioBlock
                items={backendSkills}
                value={null}
                fontColor={neumorphic.navy}
              />
            </div>

            <div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: 500 }}>Cloud:</span>
              </div>
              <RadioBlock
                items={cloudSkills}
                value={null}
                fontColor={neumorphic.navy}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
