// import React from "react";
import I18n from "ex-react-native-i18n";
// import { Localization } from "expo-localization";
import { useSelector } from "react-redux";
// import { IntlProvider } from "react-intl";

import en from "./messages/en.json";
import th from "./messages/th.json";

I18n.translations = {
  en,
  th,
};

export function formatTr(name) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  //// const messages = allMessages[locale];
  I18n.locale = locale.substring(0, 2);
  I18n.initAsync();
  return I18n.t(name, locale);
}

//#region Backup getLanguage
// const getLanguage = async () => {
//   try {
//     const choice = await Localization.locale;
//     I18n.locale = choice.substring(0, 2);
//     I18n.initAsync();
//   } catch (error) {
//     console.log(error, "Error");
//   }
// };
// getLanguage();
//#endregion
