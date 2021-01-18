import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import { connect } from "react-redux";
import * as i18n from "../store/ducks/i18n";
import DropDownPicker from "react-native-dropdown-picker";
import { formatTr } from "../i18n/I18nProvider";

const { width } = Dimensions.get("screen");

function Settings(props) {
  const [state, setState] = useState({});
  const toggleSwitch = (switchNumber) =>
    setState({ [switchNumber]: !state[switchNumber] });

  const [language, setLanguage] = useState("th-TH");
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
          size={theme.SIZES.BASE}
          style={{ paddingBottom: 5, fontFamily: "kanitRegular" }}
        >
          Language Settings
        </Text>
        <Text center muted size={13} style={{ fontFamily: "kanitRegular" }}>
          Please select your language
        </Text>
      </Block>
      <DropDownPicker
        items={itemLanguage}
        containerStyle={{ height: 40, width: width - 20, marginTop:10 }}
        style={{ backgroundColor: "#fafafa", marginLeft: 20 }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        placeholderStyle={{
          textAlign: "left",
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
        defaultValue={language}
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
