import "../styles/globals.scss";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  <ApolloProvider client={apolloClient}>
    return <Component {...pageProps} />;
  </ApolloProvider>;
}

export default MyApp;
