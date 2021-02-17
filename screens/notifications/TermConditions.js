import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Block } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";

const { width } = Dimensions.get("screen");

function TermConditions(props) {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Title */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Flash Sale")}
        >
          <Block row style={styles.title}>
            <Block style={{height:40}}>
            <Text style={styles.fontTitle}>{"< Term & Conditions"}</Text>
            </Block>
          </Block>
        </TouchableOpacity>
        <Block style={{ margin: 15 }}>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 15,
              textAlign: "justify",
              marginTop: 10,
            }}
          >
            {formatTr("TERM_CONDITIONS_TEXT1").toString()}
          </Text>
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default TermConditions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: width,
  },
  title:{
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: "white",
    borderBottomWidth:0.5,
    borderBottomColor:"#e0e0e0"
  },
  fontTitle:{
    color: "black",
    fontFamily: "kanitRegular",
    fontSize: 18,
  }
});
