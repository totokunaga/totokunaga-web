import { ReactNode } from "react";
import { useRouter } from "next/router";
import headerStyle from "./header.module.scss";
import { paths } from "@utils/constants";
import TIcon from "@assets/t-icon.svg";

export const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const router = useRouter();

  return (
    <div className={headerStyle.wrapper}>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => router.push(paths.root)}
      >
        <div className={headerStyle.icon_wrapper}>
          <TIcon width={"100%"} height={"100%"} />
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
