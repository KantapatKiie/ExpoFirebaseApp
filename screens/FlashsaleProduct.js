import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import * as auth from "../store/ducks/auth.duck";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import * as ActionFlashsaleProduct from "../actions//action-flashsale-product/ActionFlashsaleProduct";
import { Icon } from "../components/";
import { formatTr } from "../i18n/I18nProvider";
import moment from "moment";
import { Block, Text } from "galio-framework";
import WangdekInfo from "../components/WangdekInfo";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar, Colors } from 'react-native-paper';

const { height, width } = Dimensions.get("screen");

function FlashsaleProduct(props) {
  const { objFlashsaleProductHD } = useSelector((state) => ({
    objFlashsaleProductHD: state.actionFlashsaleProduct.objFlashsaleProductHD,
  }));

  useEffect(() => {
    CountdownTime();
  }, []);

  //FlatList Coupon
  const ListItemCoupon = ({ item }) => {
    return (
      <Block style={styles.itemCoupon}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Basket")}>
          <Image
            source={item.uri}
            style={{ width: 170, height: 80, margin: 10 }}
          />
        </TouchableOpacity>
      </Block>
    );
  };

  //#region CountDown-Date
  const [stateTime, setStateTime] = useState({
    eventDate: moment.duration().add({ hours: 12, minutes: 34, seconds: 56 }), // add 9 full days, 3 hours, 40 minutes and 50 seconds
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const CountdownTime = async () => {
    await setInterval(() => {
      let { eventDate } = stateTime;
      eventDate = eventDate.subtract(1, "s");
      const hours = eventDate.hours();
      const mins = eventDate.minutes();
      const secs = eventDate.seconds();

      setStateTime({
        hours,
        mins,
        secs,
        eventDate,
      });
    }, 1000);
  };
  //#endregion

  const [progressValue ,setProgressValue] = useState(0.65);
  const onLoadMoreProduct = () => {
      console.log("load More");
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            stickySectionHeadersEnabled={false}
            sections={COUPON_LIST}
            renderSectionHeader={({ section }) => (
              <>
                {/* Coupon */}
                <Block style={styles.containerHeader}>
                  <Image
                    source={require("../assets/images/coupon/couponhead.png")}
                    style={{
                      width: width - 200,
                      height: 25,
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  />
                  {section.horizontal ? (
                    <FlatList
                      horizontal
                      data={section.data}
                      renderItem={({ item }) => <ListItemCoupon item={item} />}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : null}
                </Block>

                {/* Flash Sale Count Down */}
                <TouchableHighlight>
                  <LinearGradient
                    colors={["#00cef2", "#00c4b7", "#00d184"]}
                    style={linerStyle.linearGradient}
                  >
                    <Image
                      source={require("../assets/images/flashsale_head.png")}
                      style={{
                        width: width - 200,
                        height: 25,
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    />
                    <Text
                        style={{
                          fontFamily: "kanitRegular",
                          color: "white",
                          fontSize: 18,
                          marginLeft: 25,
                          marginTop: 17,
                        }}
                      >
                        Ends in
                      </Text>
                    {/* CountDownTime */}
                    <Block row>
                      <Block style={linerStyle.BlockTime}>
                        {/* HH */}
                        <Block style={timeStyle.timerow1}>
                          <Text style={timeStyle.timeText}>
                            {stateTime.hours.toString().substring(1, 2) !== ""
                              ? stateTime.hours.toString().substring(0, 1)
                              : "0"}
                          </Text>
                        </Block>
                        <Block style={timeStyle.timerow2}>
                          <Text style={timeStyle.timeText}>
                            {stateTime.hours.toString().substring(1, 2) !== ""
                              ? stateTime.hours.toString().substring(1, 2)
                              : stateTime.hours.toString().substring(0, 1)}
                          </Text>
                        </Block>
                        <Text style={timeStyle.timeTextBlock}>:</Text>
                        {/* MM */}
                        <Block style={timeStyle.timerow3}>
                          <Text style={timeStyle.timeText}>
                            {stateTime.mins.toString().substring(1, 2) !== ""
                              ? stateTime.mins.toString().substring(0, 1)
                              : "0"}
                          </Text>
                        </Block>
                        <Block style={timeStyle.timerow4}>
                          <Text style={timeStyle.timeText}>
                            {stateTime.mins.toString().substring(1, 2) !== ""
                              ? stateTime.mins.toString().substring(1, 2)
                              : stateTime.mins.toString().substring(0, 1)}
                          </Text>
                        </Block>
                        <Text style={timeStyle.timeTextBlock}>:</Text>
                        {/* SS */}
                        <Block style={timeStyle.timerow5}>
                          <Text style={timeStyle.timeText}>
                            {stateTime.secs.toString().substring(1, 2) !== ""
                              ? stateTime.secs.toString().substring(0, 1)
                              : "0"}
                          </Text>
                        </Block>
                        <View style={timeStyle.timerow6}>
                          <Text style={timeStyle.timeText}>
                            {stateTime.secs.toString().substring(1, 2) !== ""
                              ? stateTime.secs.toString().substring(1, 2)
                              : stateTime.secs.toString().substring(0, 1)}
                          </Text>
                        </View>
                      </Block>
                      
                      <Block
                        style={{
                          borderLeftWidth: 1,
                          borderLeftColor: "#e0e0e0",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "kanitRegular",
                            color: "white",
                            fontSize: 18,
                            marginLeft: 20,
                            borderBottomWidth: 5,
                            borderBottomColor: "yellow",
                            borderRadius: 4,
                            alignItems:"flex-start"
                          }}
                        >
                          00:00 พรุ่งนี้
                        </Text>
                      </Block>
                    </Block>
                  </LinearGradient>
                </TouchableHighlight>
              </>
            )}
            renderSectionFooter={() => (
              <>
                {/* Product List */}
                <Block flex style={{ backgroundColor: "white", marginTop: 15 }}>
                  <Block row style={{ margin: 10 }}>
                    <ImageBackground
                      source={require("../assets/images/bg-p.jpg")}
                      style={{
                        width: 120,
                        height: 100,
                        alignSelf: "center",
                      }}
                    >
                      <Block
                        style={{
                          backgroundColor: "#ff0000",
                          width: 40,
                          height: 37,
                          alignSelf: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "kanitBold",
                            color: "white",
                            fontSize: 12.5,
                            textAlign: "center",
                            marginTop: 9,
                          }}
                        >
                          -50%
                        </Text>
                      </Block>
                    </ImageBackground>
                    {/* Detaill */}
                    <Block flex style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          fontFamily: "kanitRegular",
                          color: "black",
                          fontSize: 15,
                        }}
                      >
                        Enchantimals Starling Startfish
                      </Text>
                      <Text
                        style={{
                          fontFamily: "kanitRegular",
                          color: "black",
                          fontSize: 15,
                          borderBottomWidth: 1,
                          marginTop: 5,
                          borderBottomColor: "#e0e0e0",
                        }}
                      >
                        ราคา : ฿6,990
                      </Text>
                      <ProgressBar
                        progress={progressValue}
                        color={progressValue === 1 ? Colors.red800 : "#00b1ba"}
                        style={{ borderRadius: 20, height: 10, marginTop: 15 }}
                      />
                      <Text
                        style={{
                          fontFamily: "kanitRegular",
                          color: "black",
                          fontSize: 15,
                          textAlign: "right",
                          marginTop: 5,
                        }}
                      >
                        ขายแล้ว 250 ชิ้น
                      </Text>
                    </Block>
                  </Block>
                  <TouchableOpacity onPress={onLoadMoreProduct}>
                    <Block style={{ width: 90, alignSelf: "center" }}>
                      <Text
                        style={{
                          fontFamily: "kanitRegular",
                          color: "black",
                          fontSize: 16,
                          borderBottomWidth: 5,
                          borderBottomColor: "red",
                          borderRadius: 4,
                          marginTop: 30,
                          marginBottom: 40,
                        }}
                      >
                        โหลดเพิ่มเติม
                      </Text>
                    </Block>
                  </TouchableOpacity>
                </Block>
                {/* Bottom info */}
                <WangdekInfo />
              </>
            )}
            renderItem={({ item, section }) => {
              if (section.horizontal) {
                return null;
              }
              return null;
            }}
          />
        </SafeAreaView>
      </View>
    </>
  );
}

export default connect(null, ActionFlashsaleProduct.actions)(FlashsaleProduct);

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
  containerHeader: {
    backgroundColor: "#4967ad",
  },
  itemCoupon: {
    margin: 5,
  },
});

const linerStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    justifyContent: "flex-start",
    height: 150,
  },
  BlockTime: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginTop: 10,
    width:width / 1.6
  },
});

const timeStyle = StyleSheet.create({
  timerow1: {
    width: 20,
    height: 30,
    backgroundColor: "#00a9d4",
    borderRadius: 8,
    marginLeft: 25,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
  timerow2: {
    width: 20,
    height: 30,
    backgroundColor: "#1efac2",
    borderRadius: 8,
    marginLeft: 2,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
  timerow3: {
    width: 20,
    height: 30,
    backgroundColor: "#ebdb02",
    borderRadius: 8,
    marginLeft: 1,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
  timerow4: {
    width: 20,
    height: 30,
    backgroundColor: "#e6ad00",
    borderRadius: 8,
    marginLeft: 2,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
  timerow5: {
    width: 20,
    height: 30,
    backgroundColor: "#9700ab",
    borderRadius: 8,
    marginLeft: 1,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
  timerow6: {
    width: 20,
    height: 30,
    backgroundColor: "#d10092",
    borderRadius: 8,
    marginLeft: 2,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
    overflow: "hidden",
  },
  timeText: {
    fontWeight: "800",
    fontSize: 22,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  timeTextArrow: {
    fontWeight: "500",
    fontSize: 22,
    color: "white",
    paddingLeft: 10,
    paddingRight: 3,
    marginBottom: 7,
  },
  timeTextBlock: {
    fontWeight: "bold",
    fontSize: 22,
    color: "white",
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 7,
  },
});

const COUPON_LIST = [
  {
    title: "Discount",
    horizontal: true,
    data: [
      {
        key: "1",
        uri: require("../assets/images/coupon/coupon-1.png"),
      },
      {
        key: "2",
        uri: require("../assets/images/coupon/coupon-2.png"),
      },
    ],
  },
];
