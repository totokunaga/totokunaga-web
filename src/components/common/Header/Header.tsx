import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import headerStyle from "./header.module.scss";
import { paths } from "@utils/constants";
import TIcon from "@assets/t-icon.svg";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { useSelector } from "react-redux";
import { selectWindow } from "@utils/slices";
import { setGlobalDarkMode } from "@utils/functions";
import buttonStyle from "../Button/button.module.scss";

const headerId = "my-header";

export const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const router = useRouter();
  const { isDarkMode } = useSelector(selectWindow);

  const onAppearance = useCallback(() => {
    if (isDarkMode) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    setGlobalDarkMode(!isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const headerElement = document.getElementById(headerId);
    if (headerElement) {
      setHeaderHeight(headerElement.clientHeight);
    }
  }, []);

  return (
    <>
      <div
        className={headerStyle.wrapper_placeholder}
        style={{ height: headerHeight }}
      />
      <div
        id={headerId}
        className={headerStyle.wrapper}
        style={{ ...(headerHeight ? { position: "fixed", top: 0 } : {}) }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <div
            className={headerStyle.icon_wrapper}
            onClick={() => router.push(paths.root)}
          >
            <TIcon width={"100%"} height={"100%"} />
          </div>
          <h4
            style={{ margin: "0px 0px 0px 5px" }}
            onClick={() => router.push(paths.root)}
          >
            <span style={{ color: "#07F9FF" }}>to</span>
            <span style={{ color: "#1A96E9" }}>tokunaga</span>
          </h4>
          {children}
          <div style={{ margin: "auto 0px auto auto" }}>
            <Button
              type={"flat"}
              padding={"0.75em"}
              onClick={onAppearance}
              className={buttonStyle.appearance_setting}
            >
              <Icon
                icon={isDarkMode ? "sun" : "moon"}
                height={"min(5vw, 1.75em)"}
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
