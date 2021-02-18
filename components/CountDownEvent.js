import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { Block, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { formatTr } from "../i18n/I18nProvider";
import CountDown from "react-native-countdown-component";
import { API_URL } from "../config/config.app";
import { getToken } from "../store/mock/token";

const { width } = Dimensions.get("screen");

function CountDownEvent(props) {
  const { times } = props;
  return (
    <>
      <LinearGradient
        colors={["#00cef2", "#00c4b7", "#00d184"]}
        style={linerStyle.linearGradient}
      >
        <Image
          source={require("../assets/images/flashsale_head.png")}
          style={{
            width: width - 50,
            height: 45,
            alignSelf: "center",
            marginTop: 20,
          }}
        />
        <Image
          source={require("../assets/images/onsale.png")}
          style={{
            width: 120,
            height: 50,
            marginTop: 20,
            marginLeft: 30,
          }}
        />
        {/* CountDownTime */}
        <Block style={linerStyle.BlockTime}>
          <CountDown
            size={22}
            until={parseInt(times)}
            digitStyle={{
              backgroundColor: "#ff4545",
              height: 30,
              width: 40,
              elevation: 10,
            }}
            style={{
              marginLeft: 20,
              marginBottom: 20,
            }}
            digitTxtStyle={{
              color: "white",
              fontSize: 18,
              fontFamily: "kanitRegular",
            }}
            timeToShow={["H", "M", "S"]}
            timeLabelStyle={{
              color: "white",
              fontWeight: "bold",
            }}
            timeLabels={{ d: null, h: null, m: null, s: null }}
            separatorStyle={{ color: "white", marginBottom: 3.5 }}
            showSeparator
          />
          <Image source={require("../assets/icons/arrow_right.png")} />
        </Block>
      </LinearGradient>
    </>
  );
}

const linerStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    justifyContent: "flex-end",
    height: 150,
  },
  BlockTime: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginBottom: 5,
    marginRight: 5,
  },
});

export default CountDownEvent;
