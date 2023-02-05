import Head from "next/head";
import { MyHeadProp } from "./type";

export const MyHead: React.FC<MyHeadProp> = ({
  title,
  description,
  children,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  );
};
