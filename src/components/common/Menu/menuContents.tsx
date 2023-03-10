import { store } from "@utils/slices";
import textStyle from "@styles/text.module.scss";
import menuStyle from "./menu.module.scss";
import { MenuContentProp } from "./Menu";
import { resetAuth } from "@utils/slices/authSlice";
import { oauthLogout } from "@utils/functions";
import { Icon } from "../Icon";
import { normalIconSize } from "@utils/constants";

export const getMenuContents = () => {
  const { isDarkMode } = store.getState().window;
  const { username, oauthProvider, accessToken, isAuth } =
    store.getState().auth;

  const contents: MenuContentProp[] = [
    {
      content: (
        <>
          <span>
            Welcome, <b>{username || "Guest"}</b>
          </span>
          {oauthProvider && (
            <div className={textStyle.normal} style={{ marginTop: "0.25em" }}>
              You are on a <b>{oauthProvider}</b> account
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
  ];

  if (isAuth) {
    const authContents: MenuContentProp[] = [
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
          <span className={textStyle.medium} style={{ fontWeight: 500 }}>
            Logout
          </span>
        ),
        onClick: async () => {
          if (accessToken) {
            store.dispatch(resetAuth());
            await oauthLogout(accessToken);
          }
        },
      },
    ];
    contents.push(...authContents);
  }

  return contents;
};
