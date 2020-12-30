import React, { useState } from "react";
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
} from "react-native";
import moment from "moment";
import { withNavigation } from "@react-navigation/compat";
import { StatusBar } from "expo-status-bar";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { Icon, Product } from "../components/";
import products from "../constants/products";
import CountDown from "react-native-countdown-component";
import { LinearGradient } from "expo-linear-gradient";
// import { t } from "../i18n/I18nProvider";

const { width } = Dimensions.get("screen");
function Home(props) {
  const renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="zoom-in"
        family="material"
      />
    );

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        //onFocus={() => props.navigation.navigate("Pro")}
      />
    );
  };

  const ListItem = ({ item }) => {
    return (
      <View style={styles2.item}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles2.itemPhoto}
          resizeMode="cover"
        />
        {/* <Text style={styles2.itemText}>{item.text}</Text> */}
      </View>
    );
  };

  const ListItemPublic = ({ item }) => {
    return (
      <View style={styles2.items}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles2.itemPhotos}
          resizeMode="cover"
        />
        <Text style={styles2.itemText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <>
      <Block flex center style={styles.home}>
        <View style={styles2.container}>
          <StatusBar style="auto" />
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              // contentContainerStyle={{ paddingHorizontal: 10 }}
              stickySectionHeadersEnabled={false}
              sections={DISCOUNTLIST}
              renderSectionHeader={({ section }) => (
                <>
                  <Block style={styles2.blockHeader}>
                    <Text style={{ textAlign: "center", color: "white" }}>
                      WANGDEKFEST ลดล้างสต็อกครึ่งปี : เริ่ม{" "}
                      {/* {t("hello2")} {moment(new Date()).format("hh:mm")} น. */}
                    </Text>
                  </Block>
                  {/* Logo */}
                  <TouchableHighlight
                    onPress={() => props.navigation.navigate("Basket")}
                  >
                    <LinearGradient
                      colors={["#00cef2", "#00c4b7", "#00d184"]}
                      style={linerStyle.linearGradient}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Flash Sale
                      </Text>
                      <Block style={linerStyle.BlockTime}>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 17,
                            fontWeight: "bold",
                            paddingTop: 8,
                          }}
                        >
                          Ends in
                        </Text>
                        <Text style={{ textAlign: "center", width: 150 }}>
                          {" "}
                        </Text>
                        <CountDown
                          size={25}
                          until={1000}
                          // onFinish={() => alert("Finished")}
                          digitStyle={{
                            backgroundColor: "#ffb700",
                            height: 35,
                            width: 50,
                          }}
                          digitTxtStyle={{ color: "#ffffff" }}
                          timeToShow={["H", "M", "S"]}
                          timeLabelStyle={{
                            color: "black",
                            fontWeight: "bold",
                          }}
                          timeLabels={{ d: null, h: null, m: null, s: null }}
                          separatorStyle={{ color: "white" }}
                          showSeparator
                        />
                      </Block>
                    </LinearGradient>
                  </TouchableHighlight>
                  {/* Discount */}
                  <Block style={styles2.containerHeader}>
                    {section.horizontal ? (
                      <FlatList
                        horizontal
                        data={section.data}
                        renderItem={({ item }) => <ListItem item={item} />}
                        showsHorizontalScrollIndicator={false}
                      />
                    ) : null}
                  </Block>
                </>
              )}
              renderSectionFooter={() => (
                <>
                  {/* Product */}
                  <Block flex style={styles.textContainerBlock1}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "black",
                        paddingTop: 10,
                      }}
                    >
                      สินค้าขายดี
                    </Text>
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
                  <Block flex style={styles.textContainerBlock2}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      สินค้ายอดนิยม
                    </Text>
                    <Block flex style={styles.containerBlock}>
                      <Block flex row>
                        <Product
                          product={products[1]}
                          style={{ marginRight: theme.SIZES.BASE }}
                        />
                        <Product product={products[2]} />
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
                    <Text
                      size={14}
                      color={theme.COLORS.PRIMARY}
                      onPress={() => props.navigation.navigate("Home")}
                    >
                      View All
                    </Text>
                  </Block>
                  {/* Public Relations */}
                  <Block flex>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "black",
                        paddingTop: 25,
                        alignSelf: "center",
                      }}
                    >
                      ข่าวประชาสัมพันธ์
                    </Text>
                    <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
                      <SectionList
                        stickySectionHeadersEnabled={false}
                        sections={DISCOUNTLIST}
                        renderSectionHeader={({ section }) => (
                          <>
                            <Block style={styles2.containerHeader2}>
                              {section.horizontal ? (
                                <FlatList
                                  horizontal
                                  data={section.data}
                                  renderItem={({ item }) => (
                                    <ListItemPublic item={item} />
                                  )}
                                  showsHorizontalScrollIndicator={false}
                                />
                              ) : null}
                            </Block>
                          </>
                        )}
                        renderSectionFooter={() => <></>}
                        renderItem={({ item, section }) => {
                          if (section.horizontal) {
                            return null;
                          }
                          return <ListItemPublic item={item} />;
                        }}
                      />
                    </SafeAreaView>
                    <Text
                      style={{ alignSelf: "center", paddingBottom: 25 }}
                      size={14}
                      color={theme.COLORS.PRIMARY}
                      onPress={() => props.navigation.navigate("Home")}
                    >
                      View All
                    </Text>
                  </Block>
                  {/* Info */}
                  <Block style={styles2.blockHeader}>
                    <Text
                      style={{
                        textAlign: "left",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Wangdek Info
                    </Text>
                  </Block>
                  {INFOLIST.map((item) => (
                    <Block style={styles2.blockHeaderInfo} key={item.key}>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate("Basket")}
                      >
                        <Block
                          row
                          middle
                          space="between"
                          style={{ paddingTop: 7 }}
                        >
                          <Text
                            style={{
                              textAlign: "left",
                              color: "black",
                              fontWeight: "bold",
                              fontSize: 14,
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
export default withNavigation(Home);

const DISCOUNTLIST = [
  {
    title: "Discount",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/10/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1002/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1006/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1008/200",
      },
    ],
  },
];

const INFOLIST = [
  {
    key: "1",
    text: "เกี่ยวกับเรา",
  },
  {
    key: "2",
    text: "วิธีการสั่งซื้อสินค้า",
  },
  {
    key: "3",
    text: "วิธีการชำระเงิน",
  },
  {
    key: "4",
    text: "ติดต่อเรา",
  },
  {
    key: "5",
    text: "Term & Conditions",
  },
  {
    key: "6",
    text: "Privacy Policy",
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
    backgroundColor: "#ffffff",
    padding: 5,
    // marginTop: 10,
  },
  textContainerBlock2: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    paddingTop: 10,
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
    backgroundColor: "#2b4c99",
    flexDirection: "column",
  },
  blockHeaderInfo: {
    padding: 8,
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
    width: 170,
    height: 250,
  },
  itemText: {
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
  },
});

const linerStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 100,
  },
  BlockTime: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
});
