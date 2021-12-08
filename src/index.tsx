import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "modern-css-reset";
import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import { CONFIG } from "./config";
import "./index.scss";

const client = new ApolloClient({
  uri: CONFIG.graphQLUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
