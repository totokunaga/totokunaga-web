import { ExperienceProp } from "@components/me";

export const meRootId = "me-root";

export const meTexts = {
  introduction: [
    "I'm Tomoya Tokunaga, a software engineer based in Tokyo, Japan.",
    "Currently working at Rakuten Mobile as a lead developer of web applications for B2C customers.",
    "All my personal projects, past experiences and skills/technologies are listed below.",
  ],
  experiences: [
    {
      entityName: "Rakuten Mobile",
      title: "Lead developer",
      periods: [
        "Oct, 2021 - current",
        "Oct, 2020 - Sep, 2021 as Frontend developer",
      ],
      accordionTitle: "Projects",
      explanations: [
        {
          subtitle: "#1. B2C ISP website",
          content: "Hello World",
        },
      ],
    },
    {
      entityName: "Mercari",
      title: "Internship",
      periods: ["Jul, 2019 - Sep, 2019"],
      accordionTitle: "Projects",
      explanations: [
        {
          subtitle: "Mercari intern project",
          content: "hello",
        },
      ],
    },
    {
      entityName: "Goldman Sachs",
      title: "Internship",
      periods: ["Aug, 2018 - Sep, 2018"],
      accordionTitle: "Projects",
      explanations: [
        {
          subtitle: "Goldman Sachs intern project",
          content: "hello",
        },
      ],
    },
    {
      entityName: "UC San Diego",
      title: "B.S. Math-Computer Science",
      periods: ["Class of 2020"],
    },
  ] as ExperienceProp[],
  skills: [
    {
      title: "Frontend",
      list: ["React + NextJS", "Cypress", "SCSS/SASS"],
    },
    {
      title: "Backend",
      list: ["ExpressJS", "MySQL", "cassandra", "TypeORM", "OAuth"],
    },
    {
      title: "Cloud",
      list: ["Kubernetes", "GCP", "Docker"],
    },
  ],
};
