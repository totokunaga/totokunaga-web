import { Icon } from "../Icon";
import style from "@styles/default.module.scss";
import textStyle from "@styles/text.module.scss";
import buttonStyle from "../Button/button.module.scss";
import { useSelector } from "react-redux";
import { selectWindow } from "@utils/slices";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "../Button";
import loginButtonStyle from "./loginButton.module.scss";
import { resetAuth, selectAuth } from "@utils/slices/authSlice";
import { useModalOutsideClick } from "@utils/hooks";
import { useDispatch } from "react-redux";
import { oauthLogout } from "@utils/functions";
import { AvatorImage } from "./AvatorImage";

type LoginButtonProp = {
  isAuth: boolean;
  avatorImagePath?: string;
  setLoginModalShown: Dispatch<SetStateAction<boolean>>;
};

export const LoginButton: React.FC<LoginButtonProp> = ({
  isAuth,
  avatorImagePath,
  setLoginModalShown,
}) => {
  const [isUserAccountShown, setUserAccountShown] = useState(false);
  const { isDarkMode } = useSelector(selectWindow);
  const { username, oauthProvider, accessToken } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const modalClassName = useMemo(() => {
    const classes = [loginButtonStyle.user_modal];
    if (!isUserAccountShown) classes.push(loginButtonStyle.hidden);
    return classes.join(" ");
  }, [isUserAccountShown]);

  const onLoginUserIcon = useCallback(() => {
    setUserAccountShown(!isUserAccountShown);
  }, [isAuth, avatorImagePath, isUserAccountShown]);

  const onLogout = useCallback(async () => {
    if (accessToken) {
      await oauthLogout(accessToken);
    }
  }, [dispatch, accessToken]);

  useModalOutsideClick(
    modalRef,
    () => {
      if (isUserAccountShown) {
        setUserAccountShown(!isUserAccountShown);
      }
    },
    isUserAccountShown
  );

  return (
    <div className={style.desktop_only} style={{ margin: "auto" }}>
      {isAuth ? (
        <div
          ref={modalRef}
          style={{
            display: "flex",
            margin: "auto auto auto 0.75em",
            position: "relative",
          }}
        >
          <AvatorImage
            avatorImagePath={avatorImagePath}
            isDarkMode={isDarkMode}
            onClick={onLoginUserIcon}
          />
          <div className={modalClassName}>
            <div className={textStyle.normal} style={{ marginBottom: ".5em" }}>
              Welcome, <b>{username}</b>
            </div>
            <div
              className={textStyle.normal}
              style={{ marginBottom: "1.25em" }}
            >
              You are on a <b>{oauthProvider}</b> account
            </div>
            <Button width={"100%"} onClick={onLogout} padding={".5em 1em"}>
              <Icon icon={"logout"} width={"1.75em"} marginRight={"0.5em"} />
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            cursor: "pointer",
          }}
          className={`${buttonStyle.login}`}
          onClick={() => setLoginModalShown(true)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon
              icon={isDarkMode ? "person" : "dark-person"}
              width={"2em"}
              margin={"auto .5em auto auto"}
            />
            <span className={textStyle.normal}>Login</span>
          </div>
        </div>
      )}
    </div>
  );
};
