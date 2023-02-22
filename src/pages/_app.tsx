import "@styles/globals.scss";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { store } from "@utils/slices";
import { setGlobalDarkMode } from "@utils/functions";
import { oauthNounceCookieKey, serverEndpointPaths } from "@utils/constants";
import { serverInstance } from "@utils/api";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookies = new Cookies();
    const cookieNounce = cookies.get(oauthNounceCookieKey);
    const { nounce } = router.query;

    if (cookieNounce && nounce && cookieNounce === nounce) {
      cookies.remove(oauthNounceCookieKey);
      // request a cookie of access token
      serverInstance.get(serverEndpointPaths.getAccessToken).then(() => {
        serverInstance.get("http://localhost:4000/api/health");
      });
    }
  }, [router]);

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
