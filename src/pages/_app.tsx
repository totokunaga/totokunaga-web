import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@utils/slices";
import { useWindowSize } from "@utils/hooks";

export default function App({ Component, pageProps }: AppProps) {
  const { width, height } = useWindowSize();
  console.log(width, height);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
