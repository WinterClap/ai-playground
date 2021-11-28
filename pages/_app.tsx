import { GlobalStyle } from "../styles/global";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { Provider } from "react-redux";
import { store } from "../components/store/store";

type ComponentWithLayout = AppProps & {
  Component: AppProps["Component"] & {
    withLayout?: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithLayout) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          {Component.withLayout ? (
            <Component.withLayout>
              <Component {...pageProps} />
            </Component.withLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
