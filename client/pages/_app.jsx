import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { Provider } from "react-redux";
import { GeneralProvider } from "../contexts/general";
import { wrapper } from "@/app/store";

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <Head>
        <title>Goliath</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light">
        <NextUIProvider>
          <GeneralProvider>
            {getLayout(<Component {...props.pageProps} />)}
          </GeneralProvider>
        </NextUIProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
