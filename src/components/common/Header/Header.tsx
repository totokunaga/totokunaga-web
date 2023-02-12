import { ReactNode } from "react";
import { useRouter } from "next/router";
import headerStyle from "./header.module.scss";
import { paths } from "@utils/constants";

export const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const router = useRouter();

  return (
    <div className={headerStyle.wrapper}>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => router.push(paths.root)}
      >
        <div className={headerStyle.icon_wrapper}>
          <img alt={"t"} src={"/t-icon.png"} width={"100%"} draggable={false} />
        </div>
        <h4 style={{ margin: "0px 0px 0px 5px" }}>
          <span style={{ color: "#07F9FF" }}>to</span>
          <span style={{ color: "#1A96E9" }}>tokunaga</span>
        </h4>
        {children}
      </div>
    </div>
  );
};
