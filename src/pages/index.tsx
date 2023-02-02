import neumorphic from "@styles/neumorphic.module.scss";
import { MyHead, ProgressSteps, Radio, RadioBlock } from "@components/common";
import { pages } from "@utils/constants";

const Experience: React.FC<{
  entityName: string;
  title: string;
  explanations: string[];
}> = ({ entityName, title, explanations }) => {
  return (
    <div>
      <div style={{ margin: "6px 0px 4px 0px" }}>
        <b>
          {entityName}{" "}
          <span style={{ fontSize: 15, fontWeight: 500 }}>- {title}</span>
        </b>
      </div>
      {explanations.map((exp, i) => (
        <div key={i}>
          <p style={{ fontSize: 15 }}>{exp}</p>
        </div>
      ))}
    </div>
  );
};

const frontendSkills = ["React + NextJS", "Cypress", "SCSS/SASS"];
const backendSkills = ["ExpressJS", "MySQL", "cassandra", "TypeORM", "OAuth"];
const cloudSkills = ["Kubernetes", "GCP", "Docker"];

const Index = () => {
  return (
    <>
      <MyHead {...pages.root} />
      <div style={{ padding: 24 }}>
        <h1 style={{ marginBottom: 16 }}>Hello,</h1>
        <p
          className={`${neumorphic.root} ${neumorphic.paragraph}`}
          style={{ marginBottom: 20 }}
        >
          I&apos;m Tomoya Tokunaga, a software engineer based in Tokyo, Japan.
          <br />
          <br />
          Currently working at Rakuten Mobile as a lead developer of web
          applications for B2C customers.
          <br />
          <br />
          All my personal projects, past experiences and skills/technologies are
          listed below.
        </p>

        <div style={{ marginBottom: 30 }}>
          <h3 style={{ marginBottom: 12 }}>Experience & Education</h3>
          <ProgressSteps
            type={"vertical"}
            items={[
              {
                name: "rm",
                component: (
                  <Experience
                    entityName="Rakuten Mobile"
                    title="Lead developer"
                    explanations={[
                      "Oct, 2021 - current",
                      "Oct, 2020 - Sep, 2021 as Frontend developer",
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
                    explanations={["Jul, 2019 - Sep, 2019"]}
                  />
                ),
              },
              {
                name: "gs",
                component: (
                  <Experience
                    entityName="Goldman Sachs"
                    title="Internship"
                    explanations={["Aug, 2018 - Sep, 2018"]}
                  />
                ),
              },
              {
                name: "ucsd",
                component: (
                  <Experience
                    entityName="UC San Diego"
                    title="B.S. Math-Computer Science"
                    explanations={["Sep, 2016 - Jun, 2020"]}
                  />
                ),
              },
            ]}
            current={"rm"}
          />
        </div>

        <h3 style={{ marginBottom: 12 }}>Skills & Certifications</h3>
        <div
          className={`${neumorphic.root} ${neumorphic.down}`}
          style={{ marginBottom: 20 }}
        >
          <div style={{ marginBottom: 8 }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 500 }}>Frontend:</span>
            </div>
            <RadioBlock
              items={frontendSkills}
              value={null}
              fontColor={neumorphic.primaryDark}
              size={"Slim"}
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 500 }}>Backend:</span>
            </div>
            <RadioBlock
              items={backendSkills}
              value={null}
              fontColor={neumorphic.primaryDark}
              size={"Slim"}
            />
          </div>

          <div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 500 }}>Cloud:</span>
            </div>
            <RadioBlock
              items={cloudSkills}
              value={null}
              fontColor={neumorphic.primaryDark}
              size={"Slim"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
