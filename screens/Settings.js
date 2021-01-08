import React, { useState } from "react";
import {
  StyleSheet,
  Switch,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import materialTheme from "../constants/Theme";
import { Picker } from "@react-native-picker/picker";
import { connect } from "react-redux";
import * as i18n from "../store/ducks/i18n";
// import { formatTr } from "../i18n/I18nProvider";

const { width } = Dimensions.get("screen");

function Settings(props) {
  const [state, setState] = useState({});
  const toggleSwitch = (switchNumber) =>
    setState({ [switchNumber]: !state[switchNumber] });

  const renderItem = ({ item }) => {
    // const { navigate } = this.props.navigation;

    switch (item.type) {
      case "switch":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text size={14}>{item.title}</Text>
            <Switch
              onValueChange={() => toggleSwitch(item.id)}
              ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
              thumbColor={
                Platform.OS === "android"
                  ? materialTheme.COLORS.SWITCH_OFF
                  : null
              }
              trackColor={{
                false: materialTheme.COLORS.SWITCH_OFF,
                true: materialTheme.COLORS.SWITCH_ON,
              }}
              value={state[item.id]}
            />
          </Block>
        );
      case "button":
        return (
          <Block style={styles.rows}>
            {/* <TouchableOpacity onPress={() => props.navigate('Pro')}> */}
            <TouchableOpacity>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text size={14}>{item.title}</Text>
                <Icon
                  name="angle-right"
                  family="font-awesome"
                  style={{ paddingRight: 5 }}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        );
      default:
        break;
    }
  };
  // var title1 = formatTr("hello1").toString();
  const recommended = [
    { title: "Use FaceID to sign in", id: "face", type: "switch" },
    { title: "Auto-Lock security", id: "autolock", type: "switch" },
    { title: "Notifications", id: "Notifications", type: "button" },
  ];
  return (
    <View
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.settings}
    >
      <FlatList
        data={recommended}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <Block style={styles.title}>
            <Text
              bold
              center
              size={theme.SIZES.BASE}
              style={{ paddingBottom: 5 }}
            >
              Recommended Settings
            </Text>
            <Text center muted size={12}>
              These are the most important settings
            </Text>
          </Block>
        }
      />
      {/* Select Language */}
      <Block style={styles.title}>
        <Text bold center size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
          Language Settings
        </Text>
        <Text center muted size={12}>
          Please select your language
        </Text>
      </Block>
      <Picker
        selectedValue={props.lang}
        style={{ height: 50, width: width }}
        itemStyle={{ fontSize: 12 }}
        onValueChange={(value) => {
          props.setLanguage(value);
        }}
      >
        <Picker.Item label="Thai" value="th" />
        <Picker.Item label="English" value="en" />
      </Picker>
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
