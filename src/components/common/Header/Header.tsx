import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import headerStyle from "./header.module.scss";
import buttonStyle from "../Button/button.module.scss";
import { paths } from "@utils/constants";
import TIcon from "@assets/t-icon.svg";
import TIconDark from "@assets/t-icon-dark.svg";
import { Button } from "../Button";
import { useSelector } from "react-redux";
import { selectWindow } from "@utils/slices";
import {
  getGoogleOAuthURL,
  oauthLogin,
  onFacebookLogin,
  onFacebookLogout,
} from "@utils/functions";
import { ThemeButton } from "../ThemeButton";
import { Icon } from "../Icon";
import { Modal } from "../Modal";
import { LoginModalContent } from "./LoginModalContent";

const headerId = "my-header";

export const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [isLoginModalShown, setLoginModalShown] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const router = useRouter();
  const { isDarkMode } = useSelector(selectWindow);

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
            width: "100%",
          }}
        >
          <div
            className={headerStyle.icon_wrapper}
            onClick={() => router.push(paths.root)}
            style={{ cursor: "pointer" }}
          >
            {!isDarkMode ? (
              <TIconDark width={"100%"} height={"100%"} />
            ) : (
              <TIcon width={"100%"} height={"100%"} />
            )}
          </div>
          <h4
            style={{ margin: "0px 0px 0px 5px", cursor: "pointer" }}
            onClick={() => router.push(paths.root)}
          >
            <span className={headerStyle.logo_text}>to</span>
            <span className={`${headerStyle.logo_text} ${headerStyle.dark}`}>
              tokunaga
            </span>
          </h4>
          {children}

          <div
            style={{
              margin: "auto 0px auto auto",
              display: "flex",
              cursor: "default",
            }}
          >
            <Button
              type={"flat"}
              margin={"0 1em 0 0"}
              padding={".5em 1.25em"}
              className={buttonStyle.login}
              // onClick={() => oauthLogin("google")}
              onClick={() => setLoginModalShown(true)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Icon
                  icon={"person"}
                  width={"2em"}
                  fill={"#e6e7ed"}
                  margin={"auto .5em auto auto"}
                />
                <span>Login</span>
              </div>
            </Button>
            <ThemeButton />
          </div>
        </div>
      </div>
      <Modal
        isShown={isLoginModalShown}
        onClose={() => setLoginModalShown(false)}
        maxWidth={520}
      >
        <LoginModalContent onClose={() => setLoginModalShown(false)} />
      </Modal>
    </>
  );
};
