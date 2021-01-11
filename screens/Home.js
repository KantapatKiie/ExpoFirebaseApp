import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { withNavigation } from "@react-navigation/compat";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import 'moment-duration-format';
import { StatusBar } from "expo-status-bar";
import { Block, Text, Button, theme } from "galio-framework";
import { Icon, Product } from "../components/";
import products from "../constants/products";
import CountDown from "react-native-countdown-component";
import { LinearGradient } from "expo-linear-gradient";
import { formatTr } from "../i18n/I18nProvider";
import * as ActionHome from "../actions/action-home/ActionHome";
import WangdekInfo from "../components/WangdekInfo";

const { width } = Dimensions.get("screen");

function Home(props) {
  const { objHomeHD, disabledInput } = useSelector((state) => ({
    objHomeHD: state.actionHomeHD.objHomeHD,
    disabledInput: state.actionHomeHD.disabledInput,
  }));
  //#region Translate
  var VIEW_ALL = formatTr("VIEW_ALL").toString(); //View all
  var GOOD_PRODUCT = formatTr("GOOD_PRODUCT").toString();
  var POPULAR_PRODUCT = formatTr("POPULAR_PRODUCT").toString();
  var NEWS_RELEASE = formatTr("NEWS_RELEASE").toString();
  var WANGDEK_INFO = formatTr("WANGDEK_INFO").toString();
  var READ_MORE = formatTr("READ_MORE").toString();
  //#endregion

  useEffect(() => {
    CountdownTime();
  }, []);

  //Time Everthing
  let LeftTime = moment(new Date()).format("HH:mm");
  let TimeActDay = moment(new Date()).format("DD");
  let TimeActMonth = moment(new Date()).format("MMM");
  let TimeActivity = moment(new Date()).format("DD MMM YYYY   |   HH:mm ");

  //FlatList Coupon
  const ListItemCoupon = ({ item }) => {
    return (
      <View style={styles2.item}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Basket")}>
          <Image
            source={item.uri}
            style={{ width: 170, height: 80, margin: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  //FlatList Information
  const ListItemInformation = ({ item }) => {
    return (
      <View style={styles2.items}>
        <Block flex>
          {/* Image */}
          <ImageBackground
            source={{
              uri: item.uri,
            }}
            style={styles2.itemPhotos}
          >
            <Block
              style={{
                backgroundColor: item.color,
                width: 45,
                height: 60,
                borderRadius: 10,
                marginTop: 110,
                marginLeft: 5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitRegular",
                  fontSize: 27,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {TimeActDay}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitRegular",
                  fontSize: 17,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {TimeActMonth}
              </Text>
            </Block>
          </ImageBackground>
          {/* Detail */}
          <Block
            style={{ backgroundColor: item.color, padding: 15, width: 300 }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "kanitBold",
              }}
            >
              {item.title}
            </Text>
            <Text style={styles2.TextActivity}>{TimeActivity}</Text>
            <Text style={styles2.TextActivity}>&nbsp;</Text>
            {/* Detail Information */}
            <Text style={styles2.TextActivity}>{item.body}</Text>
            <Text style={styles2.TextActivity}>&nbsp;</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Basket")}
              style={{
                backgroundColor: item.colorEtc,
                borderRadius: 10,
                width: 100,
                Opacity: 0.5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitBold",
                  textAlign: "center",
                  fontSize: 13,
                }}
              >
                {READ_MORE}
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </View>
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

  return (
    <>
      <Block flex center style={styles.home}>
        <View style={styles2.container}>
          <StatusBar style="auto" />
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              // contentContainerStyle={{ paddingHorizontal: 10 }}
              stickySectionHeadersEnabled={false}
              sections={COUPON_LIST}
              renderSectionHeader={({ section }) => (
                <>
                  {/* Festival */}
                  <Block style={styles2.blockHeader}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontFamily: "kanitLight",
                        fontSize: 15,
                      }}
                    >
                      WANGDEKFEST ลดล้างสต็อกครึ่งปี : เริ่ม{LeftTime}
                    </Text>
                  </Block>
                  {/* Flash Sale Count Down */}
                  <TouchableHighlight
                    onPress={() =>
                      props.navigation.navigate("Flashsale Product")
                    }
                  >
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
                        <Text style={{ textAlign: "center", width: 150 }}>
                          {" "}
                        </Text>
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
                        <Text style={timeStyle.timeTextArrow}>{">"}</Text>
                        <CountDown
                          size={22}
                          until={4500}
                          digitStyle={{
                            backgroundColor: "#ffb700",
                            height: 30,
                            width: 45,
                          }}
                          style={{ marginLeft: 20, marginBottom: 20 }}
                          digitTxtStyle={{ color: "black" }}
                          timeToShow={["H", "M", "S"]}
                          timeLabelStyle={{
                            color: "black",
                            fontWeight: "bold",
                          }}
                          timeLabels={{ d: null, h: null, m: null, s: null }}
                          separatorStyle={{ color: "black" }}
                          showSeparator
                          // onFinish={() => alert("Finished")}
                        />
                      </Block>
                    </LinearGradient>
                  </TouchableHighlight>
                  {/* Coupon */}
                  <Block style={styles2.containerHeader}>
                    {section.horizontal ? (
                      <FlatList
                        horizontal
                        data={section.data}
                        renderItem={({ item }) => (
                          <ListItemCoupon item={item} />
                        )}
                        showsHorizontalScrollIndicator={false}
                      />
                    ) : null}
                  </Block>
                </>
              )}
              renderSectionFooter={() => (
                <>
                  {/* Best seller product */}
                  <Block flex style={styles.textContainerBlock1}>
                    <Text
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginTop: 20,
                        fontFamily: "kanitRegular",
                      }}
                    >
                      {GOOD_PRODUCT}
                    </Text>
                    <Block flex style={{ marginTop: 25 }}>
                      <Block flex style={styles.containerBlock}>
                        <Block flex row>
                          <Product
                            product={products[7]}
                            style={{ marginRight: theme.SIZES.BASE }}
                          />
                          <Product product={products[5]} />
                        </Block>
                      </Block>
                      <Block flex style={styles.containerBlock}>
                        <Block flex row>
                          <Product
                            product={products[6]}
                            style={{ marginRight: theme.SIZES.BASE }}
                          />
                          <Product product={products[8]} />
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                  {/* Popular product */}
                  <Block flex style={styles.textContainerBlock2}>
                    <Text style={{ fontSize: 25, fontFamily: "kanitRegular" }}>
                      {POPULAR_PRODUCT}
                    </Text>
                    <Block
                      flex
                      style={{
                        marginTop: 25,
                      }}
                    >
                      <Block flex style={styles.containerBlock}>
                        <Block flex row>
                          <Product
                            product={products[1]}
                            style={{ marginRight: theme.SIZES.BASE }}
                          />
                          <Product product={products[2]} />
                        </Block>
                      </Block>
                    </Block>
                    <Block flex style={styles.containerBlock}>
                      <Block flex row>
                        <Product
                          product={products[3]}
                          style={{ marginRight: theme.SIZES.BASE }}
                        />
                        <Product product={products[4]} />
                      </Block>
                    </Block>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("Basket")}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          paddingBottom: 25,
                          marginTop: 10,
                          color: "black",
                          fontFamily:"kanitRegular"
                        }}
                      >
                        {VIEW_ALL + " >"}
                      </Text>
                    </TouchableOpacity>
                  </Block>
                  {/* Public relations */}
                  <Block flex style={{ backgroundColor: "#F3F3F3" }}>
                    <Text
                      style={{
                        fontSize: 25,
                        color: "black",
                        paddingTop: 25,
                        alignSelf: "center",
                        fontFamily: "kanitRegular",
                      }}
                    >
                      {NEWS_RELEASE}
                    </Text>
                    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
                      <SectionList
                        stickySectionHeadersEnabled={false}
                        sections={INFORMATION}
                        renderSectionHeader={({ section }) => (
                          <>
                            <Block style={styles2.containerHeader2}>
                              {section.horizontal ? (
                                <FlatList
                                  horizontal
                                  data={section.data}
                                  renderItem={({ item }) => (
                                    <ListItemInformation item={item} />
                                  )}
                                  showsHorizontalScrollIndicator={false}
                                />
                              ) : null}
                            </Block>
                          </>
                        )}
                        // renderSectionFooter={() => <></>}
                        renderItem={({ item, section }) => {
                          if (section.horizontal) {
                            return null;
                          }
                          return <ListItemInformation item={item} />;
                        }}
                      />
                    </SafeAreaView>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("Basket")}
                      style={{ marginTop: 25 }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          paddingBottom: 25,
                          color: "black",
                          fontFamily:"kanitRegular"
                          // borderBottomWidth: 2,
                          // borderBottomColor: "#00bcd1",
                        }}
                        size={14}
                        color={theme.COLORS.PRIMARY}
                      >
                        {VIEW_ALL + " >"}
                      </Text>
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
                return <ListItem item={item} />;
              }}
            />
          </SafeAreaView>
        </View>
      </Block>
    </>
  );
}

export default withNavigation(connect(null, ActionHome.actions)(Home));

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

const INFORMATION = [
  {
    title: "Information",
    horizontal: true,
    data: [
      {
        key: "1",
        title: "Activity 1",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#fdb837",
        colorEtc: "#cc952f",
        uri: "https://picsum.photos/id/1/200",
      },
      {
        key: "2",
        title: "Activity 2",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#ec429a",
        colorEtc: "#c93a84",
        uri: "https://picsum.photos/id/10/200",
      },

      {
        key: "3",
        title: "Activity 3",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#10c990",
        colorEtc: "#0c9c6f",
        uri: "https://picsum.photos/id/1002/200",
      },
      {
        key: "4",
        title: "Activity 4",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#fd761a",
        colorEtc: "#c75e16",
        uri: "https://picsum.photos/id/1006/200",
      },
      {
        key: "5",
        title: "Activity 5",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#119bf6",
        colorEtc: "#1080c9",
        uri: "https://picsum.photos/id/1008/200",
      },

      {
        key: "6",
        title: "Activity 6",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#c924a7",
        colorEtc: "#961b7d",
        uri: "https://picsum.photos/id/1008/200",
      },

      {
        key: "7",
        title: "Activity 7",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#fc4353",
        colorEtc: "#ba303c",
        uri: "https://picsum.photos/id/1008/200",
      },
    ],
  },
];

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  containerBlock: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  textContainerBlock1: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#00d184",
    padding: 5,
    // marginTop: 10,
  },
  textContainerBlock2: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    marginTop: 25,
    padding: 5,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width,
    paddingVertical: theme.SIZES.BASE * 1.5,
  },
  BlockInfo: {
    backgroundColor: "#f7f7f7",
    height: 20,
    alignItems: "stretch",
  },
});

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  containerHeader: {
    backgroundColor: "#4967ad",
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
  blockFlashSale: {
    padding: 8,
    backgroundColor: "#1dab98",
    flexDirection: "column",
    height: 100,
  },
  sectionHeader: {
    fontWeight: "500",
    fontSize: 15,
    color: "#f4f4f4",
    marginTop: 5,
    marginBottom: 5,
  },
  item: {
    margin: 5,
  },
  itemPhoto: {
    width: 100,
    height: 100,
  },
  items: {
    margin: 5,
  },
  itemPhotos: {
    width: 300,
    height: 180,
  },
  itemText: {
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
  },
  TextActivity: {
    color: "white",
    fontFamily: "kanitRegular",
  },
});

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
    alignSelf: "stretch",
  },
});

const timeStyle = StyleSheet.create({
  timerow1: {
    width: 25,
    height: 35,
    backgroundColor: "#00a9d4",
    borderRadius: 8,
    marginLeft: 25,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
  timerow2: {
    width: 25,
    height: 35,
    backgroundColor: "#1efac2",
    borderRadius: 8,
    marginLeft: 2,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
  timerow3: {
    width: 25,
    height: 35,
    backgroundColor: "#ebdb02",
    borderRadius: 8,
    marginLeft: 1,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
  timerow4: {
    width: 25,
    height: 35,
    backgroundColor: "#e6ad00",
    borderRadius: 8,
    marginLeft: 2,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
  timerow5: {
    width: 25,
    height: 35,
    backgroundColor: "#9700ab",
    borderRadius: 8,
    marginLeft: 1,
    marginBottom: 5,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
  timerow6: {
    width: 25,
    height: 35,
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
    fontSize: 24,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  timeTextArrow: {
    fontWeight: "500",
    fontSize: 24,
    color: "white",
    paddingLeft: 10,
    paddingRight: 3,
    marginBottom: 7,
  },
  timeTextBlock: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 7,
  },
});
