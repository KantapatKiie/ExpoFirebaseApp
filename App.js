import React from "react";
import { Platform, StatusBar } from "react-native";
import { Block, GalioProvider } from "galio-framework";
import { materialTheme } from "./constants";
import { NavigationContainer } from "@react-navigation/native";
import Screens from "./navigation/Screens";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./store/rootDuck";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

// import axios from "axios";
// import curlirize from 'axios-curlirize';
// curlirize(axios);

//SET STATE (store)
const store = createStore(rootReducer);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this._loadingFont = this._loadingFont.bind(this);
    this.state = {
      loadingFont: true,
    };
  }
  componentDidMount() {
    this._loadingFont();
  }
  async _loadingFont() {
    await Font.loadAsync({
      kanitLight: require("./assets/fonts/Kanit-Light.ttf"),
      kanitBold: require("./assets/fonts/Kanit-Bold.ttf"),
      kanitRegular: require("./assets/fonts/Kanit-Regular.ttf"),
      kanitItalic: require("./assets/fonts/Kanit-Italic.ttf"),
    });
    this.setState({ loadingFont: false });
  }
  
  render() {
    const { loadingFont } = this.state;
    if (loadingFont) {
      return <AppLoading />;
    }
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



