import { store } from "@utils/slices";
import { setGlobalDarkMode } from "@utils/functions";
import textStyle from "@styles/text.module.scss";
import menuStyle from "./menu.module.scss";
import { MenuContentProp } from "./Menu";
import { resetAuth } from "@utils/slices/authSlice";
import { oauthLogout } from "@utils/functions";
import { Icon } from "../Icon";
import { normalIconSize } from "@utils/constants";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../Button";
import { AvatorImage } from "../LoginButton/AvatorImage";

export const getMenuContents = (
  setLoginModalShown: Dispatch<SetStateAction<boolean>>,
  setMenuShown: Dispatch<SetStateAction<boolean>>
) => {
  const { isDarkMode } = store.getState().window;
  const { username, oauthProvider, accessToken, isAuth, avatorImagePath } =
    store.getState().auth;

  const contents: MenuContentProp[] = [
    {
      content: (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {avatorImagePath && (
              <AvatorImage
                isDarkMode={isDarkMode}
                avatorImagePath={avatorImagePath}
                imageSize={60}
                marginRight="1rem"
              />
            )}
            <div>
              Welcome, <b>{username || "Guest"}</b>
            </div>
          </div>
          {oauthProvider ? (
            <div className={textStyle.normal} style={{ marginTop: "0.5em" }}>
              You are on a <b>{oauthProvider}</b> account
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                cursor: "pointer",
                marginTop: ".75rem",
              }}
            >
              <Button
                flexGrow={1}
                padding={".5em"}
                color={isDarkMode ? "#ddddde" : "#000f23"}
                onClick={() => {
                  setLoginModalShown(true);
                  setMenuShown(false);
                }}
              >
                <Icon
                  icon={isDarkMode ? "person" : "dark-person"}
                  width={"2em"}
                  margin={"auto .5em auto auto"}
                />
                <span className={textStyle.normal}>Login</span>
              </Button>
            </div>
          )}
        </>
      ),
    },
    // Divider
    {
      content: (
        <div
          style={{
            border: `solid 1px ${isDarkMode ? "#ddddde" : "#000f23"}`,
            width: "100%",
            margin: ".25rem 0",
          }}
        />
      ),
    },
    // Author header
    {
      content: <h4 style={{ margin: ".25em 0 .75em 0" }}>About author</h4>,
      classname: menuStyle.slim,
    },
    {
      content: <span>Go to totokunaga Top</span>,
      onClick: () => (window.location.href = "https://totokunaga.com"),
    },
    {
      content: (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() =>
            (window.location.href =
              "https://www.linkedin.com/in/tomoya-tokunaga")
          }
        >
          <Icon icon={"linkedin"} width={normalIconSize} marginRight={".5em"} />
          <span style={{ textDecoration: "underline" }}>@tomoya-tokunaga</span>
        </div>
      ),
      onClick: () =>
        (window.location.href = "https://www.linkedin.com/in/tomoya-tokunaga"),
    },
    {
      content: (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() =>
            (window.location.href = "https://github.com/totokunaga")
          }
        >
          <Icon icon={"github"} width={normalIconSize} marginRight={".5em"} />
          <span style={{ textDecoration: "underline" }}>@totokunaga</span>
        </div>
      ),
      onClick: () => (window.location.href = "https://github.com/totokunaga"),
    },
    // Miscs
    {
      content: (
        <div
          style={{
            border: `solid 1px ${isDarkMode ? "#ddddde" : "#000f23"}`,
            width: "100%",
            margin: ".25rem 0",
          }}
        />
      ),
    },
    {
      content: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon
            icon={"appearance"}
            width={normalIconSize}
            marginRight={".75em"}
          />
          Appearance
        </div>
      ),
      onClick: () => setGlobalDarkMode(!isDarkMode),
    },
  ];

  if (isAuth) {
    const authContents: MenuContentProp[] = [
      {
        content: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon
              icon={"logout"}
              width={normalIconSize}
              marginRight={".75em"}
            />
            Logout
          </div>
        ),
        onClick: async () => {
          if (accessToken) {
            await oauthLogout(accessToken);
          }
        },
      },
    ];
    contents.push(...authContents);
  }

  return contents;
};
