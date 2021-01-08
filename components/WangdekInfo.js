import React from "react";
import { StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "@react-navigation/compat";
import { Icon } from "../components/";
import { formatTr } from "../i18n/I18nProvider";
import { Block } from "galio-framework";
import infoList from "../constants/InfoList";

const { width } = Dimensions.get("screen");

function WangdekInfo(props) {
  return (
    <>
      {/* Info */}
      <Block row style={styles2.blockHeader}>
        <Text
          style={{
            textAlign: "left",
            color: "white",
            fontSize: 20,
            fontFamily: "kanitBold",
          }}
        >
          {formatTr("WANGDEK_INFO").toString()}
        </Text>
      </Block>
      {infoList.map((item) => (
        <Block style={styles2.blockHeaderInfo} key={item.key}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Contact")}>
            <Block row middle space="between" style={{ paddingTop: 7 }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                }}
              >
                {item.text}
              </Text>
              <Icon
                name="angle-right"
                family="font-awesome"
                style={{ paddingRight: 5 }}
              />
            </Block>
          </TouchableOpacity>
        </Block>
      ))}
    </>
  );
}

export default withNavigation(WangdekInfo);

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  blockHeader: {
    padding: 8,
    paddingLeft: 15,
    backgroundColor: "#486ec7",
    flexDirection: "column",
  },
  blockHeaderInfo: {
    padding: 8,
    paddingLeft: 15,
    backgroundColor: "#f7f7f7",
    flexDirection: "column",
  },
});
