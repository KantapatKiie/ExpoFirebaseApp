import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  UIManager,
  Image,
  Dimensions,
} from "react-native";
import * as ActionForgetPassword from "../actions/action-forgetPassword/ActionForgetPassword";
import { Block } from "galio-framework";
import { Icon } from "../components";
import { formatTr } from "../i18n/I18nProvider";
import WangdekInfo from "../components/WangdekInfo";

const { height, width } = Dimensions.get("screen");

function Notifications(props) {
  const { objForgetPassword } = useSelector((state) => ({
    objForgetPassword: state.actionForgetPassword.objForgetPassword,
  }));

  const [stateObj, setStateObj] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{height:height /2, backgroundColor:"white"}}>
          {/* Title */}
          <Block
            row
            style={{
              paddingTop: 20,
              paddingLeft: 20,
              paddingBottom: 20,
              backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              {"<  "}Notifications
            </Text>
          </Block>
          <Block
            style={{
              width: width,
              height: 45,
              paddingTop: 10,
              backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "left",
                marginLeft: 40,
              }}
            >
              News
            </Text>
          </Block>
          <Block
            style={{
              width: width,
              height: 45,
              paddingTop: 10,
              backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "left",
                marginLeft: 15,
                marginLeft: 40,
              }}
            >
              Activities
            </Text>
          </Block>
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  container2: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 25,
    paddingLeft: 25,
  },
  inputView: {
    width: "95%",
    backgroundColor: "#ffffff",
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1.4,
    borderColor: "#e0e0e0",
  },
  inputViewRequired: {
    width: "95%",
    backgroundColor: "#ffffff",
    borderColor: "red",
    borderWidth: 1.4,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 15,
    fontFamily: "kanitRegular",
  },
  rowTouch: {
    flexDirection: "column",
  },
  forgot: {
    color: "black",
    fontSize: 14,
    alignItems: "flex-end",
    fontFamily: "kanitRegular",
    borderBottomWidth: 1,
  },
  forgetButton: {
    width: "60%",
    backgroundColor: "#0ec99a",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 25,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
