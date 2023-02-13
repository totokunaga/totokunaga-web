import { ExperienceProp } from "@components/me";
import { Lang } from "@utils/types";

export const meRootId = "me-root";

export const greeting: Record<Lang, string> = {
  en: "Hello,",
  ja: "こんにちは",
};

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
      periods: ["Oct, 2021 - current"],
      explanations: [
        {
          subtitle: "#1. B2C ISP website",
          content: Array.from({ length: 500 }, () => "Hello World"),
        },
      ],
    },
    {
      entityName: "Rakuten Mobile",
      title: "Software engineer",
      periods: ["Oct, 2020 - Sep, 2021"],
      explanations: [
        {
          subtitle: "#1. B2C ISP website",
          content: Array.from({ length: 500 }, () => "Hello World"),
        },
      ],
    },
    // {
    //   entityName: "Mercari",
    //   title: "Internship",
    //   periods: ["Jul, 2019 - Sep, 2019"],
    //   explanations: [
    //     {
    //       subtitle: "Mercari intern project",
    //       content: "hello",
    //     },
    //   ],
    // },
    // {
    //   entityName: "Goldman Sachs",
    //   title: "Internship",
    //   periods: ["Aug, 2018 - Sep, 2018"],
    //   explanations: [
    //     {
    //       subtitle: "Goldman Sachs intern project",
    //       content: "hello",
    //     },
    //   ],
    // },
    {
      entityName: "UC San Diego",
      title: "B.S. Math-Computer Science",
      periods: ["Class of 2020"],
    },
  ] as ExperienceProp[],
  skills: [
    {
      title: "Programming Language",
      list: ["JavaScript/TypeScript", "Python"],
    },
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
