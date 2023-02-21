import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@utils/slices";
import {
  addFacebookScript,
  facebookScriptLoadedHandler,
  setGlobalDarkMode,
} from "@utils/functions";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const colorTheme = sessionStorage.getItem("color-theme");
    if (colorTheme) {
      isDarkMode = colorTheme === "dark";
    }
    setGlobalDarkMode(isDarkMode);
    setLoaded(true);
  }, []);

  useEffect(() => {
    addFacebookScript()
      .then(() => {
        facebookScriptLoadedHandler(FB);
      })
      .catch((e: any) => console.log(e.message));
  }, []);

  return isLoaded ? (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) : null;
}
