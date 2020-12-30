import { registerRootComponent } from 'expo';
import App from './App';
export { default as I18nProvider } from "./i18n/I18nProvider";
 
registerRootComponent(App);

// import { AppRegistry } from 'react-native';
// import App from './src/App';
// AppRegistry.registerComponent('RNI18nExample', () => App);