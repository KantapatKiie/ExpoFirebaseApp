import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions,
} from "react-native";
import moment from "moment";
import "moment-duration-format";
import { Block } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import { LinearGradient } from "expo-linear-gradient";
import WangdekInfo from "../../components/WangdekInfo";
import CountDown from "react-native-countdown-component";

const { height, width } = Dimensions.get("screen");

function News(props) {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ backgroundColor: "white" }}>
          {/* Title */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Notifications")}
          >
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
          </TouchableOpacity>
          {/* Flash Sale Count Down */}
          <TouchableHighlight
            onPress={() => props.navigation.navigate("Flashsale Product")}
          >
            <LinearGradient
              colors={["#00cef2", "#00c4b7", "#00d184"]}
              style={linerStyle.linearGradient}
            >
              <Image
                source={require("../../assets/images/flashsale_head.png")}
                style={{
                  width: width - 80,
                  height: 40,
                  alignSelf: "center",
                  marginTop: 20,
                }}
              />
              <Image
                source={require("../../assets/images/onsale.png")}
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
                  until={60000}
                  digitStyle={{
                    backgroundColor: "#ff4545",
                    height: 30,
                    width: 40,
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
                  // onFinish={() => alert("Finished")}
                />
                <Text style={timeStyle.timeTextArrow}>{">"}</Text>
              </Block>
            </LinearGradient>
          </TouchableHighlight>
          {/* Promotopn Sale */}
          <Block
            style={{
              width: width,
              paddingTop: 5,
              backgroundColor: "white",
            }}
          >
            {/* Image Show */}
            <Image
              source={require("../../assets/images/HowTo/banner-1.jpg")}
              style={{
                width: width,
                height: 350,
              }}
            />
          </Block>
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default News;

const linerStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    justifyContent: "flex-end",
    height: 145,
  },
  BlockTime: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginRight: 35,
    marginBottom: 5,
  },
});

const timeStyle = StyleSheet.create({
  timeText: {
    fontWeight: "800",
    fontSize: 20,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "kanitRegular",
  },
  timeTextArrow: {
    fontWeight: "500",
    fontSize: 22,
    color: "white",
    paddingLeft: 10,
    paddingRight: 2,
    marginBottom: 4,
    fontFamily: "kanitRegular",
  },
  timeTextBlock: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 7,
    fontFamily: "kanitRegular",
  },
});
