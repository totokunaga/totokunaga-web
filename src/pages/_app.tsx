import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@utils/slices";
import { setGlobalDarkMode } from "@utils/functions";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const colorTheme = localStorage.getItem("color-theme");
    setGlobalDarkMode(colorTheme === "dark");
    setLoaded(true);
  }, []);

  return isLoaded ? (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) : null;
}
