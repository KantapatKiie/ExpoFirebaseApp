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
import { Block } from "galio-framework";
import { Icon } from "../../components";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import MattelLogo from "../../constants/MattelLogo";

const { height, width } = Dimensions.get("screen");


function AboutUs(props) {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ backgroundColor: "white" }}>
          {/* Title */}
          <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
            <Block
              row
              style={{
                paddingTop: 20,
                paddingLeft: 20,
                paddingBottom: 20,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                }}
              >
                {"<  "}เกี่ยวกับเรา
              </Text>
            </Block>
          </TouchableOpacity>
          <Block style={{ marginLeft: 20 }}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ alignSelf: "center" }}
            />
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 25,
                textAlign: "left",
                marginTop: 20,
              }}
            >
              บริษัท วังเด็กทอยส์แลนด์ จำกัด
            </Text>
            <Text
              style={{
                color: "red",
                fontFamily: "kanitRegular",
                fontSize: 20,
                textAlign: "left",
              }}
            >
              Wangdek Toysland Co,Ltd.
            </Text>
          </Block>
          {/* Notification-1 */}
          <Block style={{ marginLeft: 20, marginBottom: 20 }}>
            <Text
              style={{
                color: "#4a4a4a",
                fontFamily: "kanitRegular",
                fontSize: 17,
                textAlign: "left",
                marginTop: 20,
              }}
            >
              {formatTr("NOTIFICATION_TEXT1").toString()}
            </Text>
          </Block>
          <Image
            source={require("../../assets/iconBrand/aboutus.png")}
            style={{ width: width, height: 200 }}
          />
          {/* Notification-2 */}
          <Block
            style={{
              backgroundColor: "#e807d2",
              borderRadius: 20,
              width: 170,
              height: 50,
              alignSelf: "center",
              marginTop: 40,
              marginBottom: 25,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: "kanitBold",
                fontSize: 32,
              }}
            >
              ในปี 2550
            </Text>
          </Block>
          <Block style={{ marginLeft: 20 }}>
            <Text
              style={{
                color: "#4a4a4a",
                fontFamily: "kanitRegular",
                fontSize: 17,
                textAlign: "left",
                marginTop: 20,
              }}
            >
              {formatTr("NOTIFICATION_TEXT2").toString()}
            </Text>
          </Block>
          <Block row style={{ marginTop: 25, marginBottom: 25 }}>
            <Block flex>
              <Image
                source={require("../../assets/iconBrand/brand-01.png")}
                style={{ width: 120, height: 50 }}
              />
              <Image
                source={require("../../assets/iconBrand/brand-07.png")}
                style={{ width: 120, height: 50 }}
              />
              <Image
                source={require("../../assets/iconBrand/brand-03.png")}
                style={{ width: 120, height: 50 }}
              />
            </Block>
            <Block flex>
              <Image
                source={require("../../assets/iconBrand/brand-04.png")}
                style={{ width: 120, height: 50 }}
              />
              <Image
                source={require("../../assets/iconBrand/brand-08.png")}
                style={{ width: 120, height: 50 }}
              />
              <Image
                source={require("../../assets/iconBrand/brand-02.png")}
                style={{ width: 120, height: 50 }}
              />
            </Block>
            <Block flex>
              <Image
                source={require("../../assets/iconBrand/brand-06.png")}
                style={{ width: 120, height: 50 }}
              />
              <Image
                source={require("../../assets/iconBrand/brand-09.png")}
                style={{ width: 120, height: 50 }}
              />
              <Image
                source={require("../../assets/iconBrand/brand-10.png")}
                style={{ width: 120, height: 50 }}
              />
            </Block>
          </Block>
          {/* Notification-3 */}
          <Block
            style={{
              backgroundColor: "#e807d2",
              borderRadius: 20,
              width: 170,
              height: 50,
              alignSelf: "center",
              marginTop: 40,
              marginBottom: 25,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: "kanitBold",
                fontSize: 32,
              }}
            >
              ในปี 2552
            </Text>
          </Block>
          <Block style={{ marginLeft: 20, marginBottom: 25 }}>
            <Text
              style={{
                color: "#4a4a4a",
                fontFamily: "kanitRegular",
                fontSize: 17,
                textAlign: "left",
                marginTop: 20,
              }}
            >
              {formatTr("NOTIFICATION_TEXT3").toString()}
            </Text>
          </Block>
          <Image
            source={require("../../assets/iconBrand/brand-05.png")}
            style={{
              width: 200,
              height: 100,
              alignSelf: "center",
              marginTop: 25,
              marginBottom: 25,
            }}
          />
          <Block style={{ marginLeft: 20, marginBottom: 40 }}>
            <Text
              style={{
                color: "#4a4a4a",
                fontFamily: "kanitRegular",
                fontSize: 17,
                textAlign: "left",
                marginTop: 20,
              }}
            >
              {formatTr("NOTIFICATION_TEXT4").toString()}
            </Text>
          </Block>
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
});
