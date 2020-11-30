import React from "react";
import { Platform, StatusBar } from "react-native";
import { Block, GalioProvider } from "galio-framework";
import { materialTheme } from "./constants";
import { NavigationContainer } from "@react-navigation/native";
import Screens from "./navigation/Screens";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./store/rootDuck";

//SET STATE (store)
const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
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
}
