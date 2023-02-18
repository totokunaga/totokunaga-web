import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import headerStyle from "./header.module.scss";
import { paths } from "@utils/constants";
import TIcon from "@assets/t-icon.svg";
import TIconDark from "@assets/t-icon-dark.svg";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { useSelector } from "react-redux";
import { selectWindow } from "@utils/slices";
import { setGlobalDarkMode } from "@utils/functions";
import buttonStyle from "../Button/button.module.scss";
import { ThemeButton } from "../ThemeButton";

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
            {!isDarkMode ? (
              <TIconDark width={"100%"} height={"100%"} />
            ) : (
              <TIcon width={"100%"} height={"100%"} />
            )}
          </div>
          <h4
            style={{ margin: "0px 0px 0px 5px" }}
            onClick={() => router.push(paths.root)}
          >
            <span className={headerStyle.logo_text}>to</span>
            <span className={`${headerStyle.logo_text} ${headerStyle.dark}`}>
              tokunaga
            </span>
          </h4>
          {children}
          <div style={{ margin: "auto 0px auto auto" }}>
            <ThemeButton />
          </div>
        </div>
      </div>
    </>
  );
};
