import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@nextui-org/react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    return (
      <Html className={"h-full"}>
        <Head>
          {/* {CssBaseline.flush()} */}
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body
          className={
            "bg-gray-100 dark:bg-slate-900 text-slate-800 dark:text-white overflow-scroll no-scrollbar"
          }
          style={{ transition: "background-color 0.15s ease" }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
