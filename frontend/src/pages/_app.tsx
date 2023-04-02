import type { AppProps } from "next/app";

import { DefaultSeo } from "next-seo";

import { extendTheme, ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/layout";
import SEO from "../../next-seo.config";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

import theme from "../../theme";
import { createContext, useState } from "react";
import Context from "../components/context";

import React from "react";
import Router from "next/router";
import LoadingSpinner from "../components/loading";

const MyApp = ({ Component, pageProps }: AppProps) => {

  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return(
  <Context>
    <DefaultSeo {...SEO} />
    <ChakraProvider theme={theme}>
        <Layout>
        {loading && <LoadingSpinner />}
        <Component {...pageProps} />
        </Layout>
    </ChakraProvider>
  </Context>
)};

export default MyApp;