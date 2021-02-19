import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { connect } from "react-redux";
import * as i18n from "../store/ducks/i18n";
import DropDownPicker from "react-native-dropdown-picker";
import { formatTr } from "../i18n/I18nProvider";

const { width } = Dimensions.get("screen");

function Settings(props) {
  const { lang } = props;
  const [language, setLanguage] = useState(lang);
  const itemLanguage = [
    {
      label: "Thai",
      value: "th-TH",
      hidden: true,
    },
    {
      label: "English",
      value: "en-US",
    },
  ];
  const onChangeLanguage = (item) => {
    setLanguage(item.value);
    props.setLanguage(item.value);
  };

  return (
    <View
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.settings}
    >
      {/* Select Language */}
      <Block style={styles.title}>
        <Text
          bold
          center
          size={18}
          style={{ paddingBottom: 5, fontFamily: "kanitRegular" }}
        >
          Language Settings
        </Text>
        <Text center muted size={14} style={{ fontFamily: "kanitRegular" }}>
          Please select your language
        </Text>
      </Block>
      <DropDownPicker
        items={itemLanguage}
        containerStyle={{ height: 40, width: width - 20, marginTop:10,alignSelf:"center" }}
        style={{ backgroundColor: "#fafafa"}}
        itemStyle={{
          justifyContent: "center",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        placeholderStyle={{
          textAlign: "center",
          color: "gray",
          fontFamily: "kanitRegular",
        }}
        placeholder={"- โปรดเลือก -"}
        labelStyle={{
          textAlign: "left",
          color: "#000",
          fontFamily: "kanitRegular",
        }}
        arrowColor={"white"}
        arrowSize={18}
        arrowStyle={{
          backgroundColor: "#02d483",
          borderRadius: 20,
          color: "white",
        }}
        // defaultValue={lang}
        onChangeItem={onChangeLanguage}
      />
    </View>
  );
}

const mapStateToProps = ({ i18n }) => ({ lang: i18n.lang });

export default connect(mapStateToProps, i18n.actions)(Settings);

const styles = StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  },
});
