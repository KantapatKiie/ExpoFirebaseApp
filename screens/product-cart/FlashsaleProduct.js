import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import * as auth from "../../store/ducks/auth.duck";
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
import * as ActionProduct from "../../actions/action-product/ActionProduct";
import { formatTr } from "../../i18n/I18nProvider";
import { Block, Text } from "galio-framework";
import WangdekInfo from "../../components/WangdekInfo";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar, Colors } from 'react-native-paper';
import CountDown from "react-native-countdown-component";

const { height, width } = Dimensions.get("screen");

function FlashsaleProduct(props) {
  const { objProductActivity } = useSelector((state) => ({
    objProductActivity: state.actionProduct.objProductActivity,
  }));

  useEffect(() => {
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
  const [progressValue ,setProgressValue] = useState(0.65);
  const onSelectProduct = () => {
    let newObj = Object.assign({}, objProductActivity);
    newObj.FLASHSALE = true;
    props.setObjProductActivity(newObj);
    props.navigation.navigate("Products");
    // navigation.navigate("Products", { params: product });
  };
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
                    source={require("../../assets/images/coupon/couponhead.png")}
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
                      source={require("../../assets/images/flashsale_head.png")}
                      style={{
                        width: width - 180,
                        height: 28,
                        alignSelf: "center",
                        marginTop: 20,
                        marginLeft: 20,
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

                      <Block
                        style={{
                          borderLeftWidth: 1,
                          borderLeftColor: "#e0e0e0",
                          marginTop: 10,
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
                            alignItems: "flex-start",
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
                  <TouchableOpacity  onPress={() => onSelectProduct()}>
                    <Block row style={{ margin: 10 }}>
                      <ImageBackground
                        source={require("../../assets/images/bg-p.jpg")}
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
                          color={
                            progressValue === 1 ? Colors.red800 : "#00b1ba"
                          }
                          style={{
                            borderRadius: 20,
                            height: 10,
                            marginTop: 15,
                          }}
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
                  </TouchableOpacity>
                  {/* Load More */}
                  <TouchableOpacity onPress={onLoadMoreProduct}>
                    <Block style={{ alignSelf: "center" }}>
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

export default connect(null, ActionProduct.actions)(FlashsaleProduct);

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
    height: 165,
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
  timeText: {
    fontWeight: "800",
    fontSize: 22,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
    fontFamily:"kanitRegular"
  },
  timeTextArrow: {
    fontWeight: "500",
    fontSize: 22,
    color: "white",
    paddingLeft: 10,
    paddingRight: 1.5,
    marginTop: 2.5,
    fontFamily:"kanitRegular"
  },
});

const COUPON_LIST = [
  {
    title: "Discount",
    horizontal: true,
    data: [
      {
        key: "1",
        uri: require("../../assets/images/coupon/coupon-1.png"),
      },
      {
        key: "2",
        uri: require("../../assets/images/coupon/coupon-2-md.png"),
      },
    ],
  },
];
