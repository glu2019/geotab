import React from "react";
import { Provider } from "react-redux";
import store from "../src/store/index";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export const axiosMock = new MockAdapter(axios);

export const withStore = (node: React.ReactNode) => {
  return <Provider store={store}>{node}</Provider>;
};
