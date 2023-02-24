import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";

import { store } from "@utils/slices";
import {
  handleBeforeunload,
  refreshAccessToken,
  setGlobalDarkMode,
} from "@utils/functions";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    refreshAccessToken();
  }, []);

  useEffect(() => {
    const isOnIOS =
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/Safari/i);
    const pageReloadEventName = isOnIOS ? "pagehide" : "beforeunload";

    window.addEventListener(pageReloadEventName, (event) => {
      handleBeforeunload(event);
    });
  }, []);

  useEffect(() => {
    let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const colorTheme = sessionStorage.getItem("color-theme");
    if (colorTheme) {
      isDarkMode = colorTheme === "dark";
    }
    setGlobalDarkMode(isDarkMode);
    setLoaded(true);
  }, []);

  return isLoaded ? (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) : null;
}
