import React from "react";
import { Platform, StatusBar } from "react-native";
import { Block, GalioProvider } from "galio-framework";
import { materialTheme } from "./constants";
import { NavigationContainer } from "@react-navigation/native";
import Screens from "./navigation/Screens";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./store/rootDuck";

import enMessages from "./i18n/messages/en.json";
import thMessages from "./i18n/messages/th.json";

const allMessages = {
  en: enMessages,
  th: thMessages,
};

//SET STATE (store)
const store = createStore(rootReducer);

export default function App(props) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GalioProvider theme={materialTheme}>
          <Block flex>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    </Provider>
  );
}
