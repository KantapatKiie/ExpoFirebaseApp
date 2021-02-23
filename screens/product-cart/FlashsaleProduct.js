import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { actions as ActionProduct } from "../../actions/action-product/ActionProduct";
import { actions as ActionHome } from "../../actions/action-home/ActionHome";
import { formatTr } from "../../i18n/I18nProvider";
import { Block, Text } from "galio-framework";
import WangdekInfo from "../../components/WangdekInfo";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar, Colors } from "react-native-paper";
import CountDown from "react-native-countdown-component";
import { API_URL } from "../../config/config.app";
import commaNumber from "comma-number";
import { getToken } from "../../store/mock/token";
import ModalLoading from "../../components/ModalLoading";

const { width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

const defaultListFalsesaleProduct = [
  {
    id: 1,
    product_id: 3,
    product_name_th: "เสื้อผ้า 001",
    product_name_en: "Clothing 001",
    product_image: "/storage/3/images-%281%29.jfif",
    product_price: "500.00",
    product_discount: "50.00",
    product_sold: 1,
    product_stock: 10,
  },
];

function FlashsaleProduct(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const { objHomeHD, listTrSearchHD, listCouponHD } = useSelector((state) => ({
    objHomeHD: state.actionHomeHD.objHomeHD,
    listTrSearchHD: state.actionHomeHD.listTrSearchHD,
    listCouponHD: state.actionHomeHD.listCouponHD,
  }));
  const { objProductActivity } = useSelector((state) => ({
    objProductActivity: state.actionProduct.objProductActivity,
  }));
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setStateObj(listTrSearchHD);
    loadFalshsaleRetry();
  }, []);

  async function loadFalshsaleRetry() {
    await axios
      .get(API_URL.FALSH_SALE_VIEW_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
        params: {
          page: 1,
        },
      })
      .then(async (response) => {
        props.setListTrSearchHD(response.data.data.lists);
        // axios
        // .get(API_URL.COUPON_LIST_TR_API, {
        //   headers: {
        //     Accept: "application/json",
        //     Authorization: "Bearer " + (await token),
        //     "Content-Type": "application/json",
        //   },
        // })
        // .then(async (response) => {
        //   console.log(response.data.data)
        //   // props.setListCouponHD(response.data.data);
        // })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //FlatList Coupon
  const ListItemCoupon = ({ item }) => {
    const onCollectCoupon = async (item) => {
      await axios({
        method: "POST",
        url: API_URL.COLLECT_COUPON_ADD_HD_API + item.id,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          ToastAndroid.show(response.data.data, ToastAndroid.SHORT);
        })
        .catch(function (error) {
          console.log(error);
          ToastAndroid.show(error.response.data, ToastAndroid.SHORT);
        });
    };
    return (
      <Block style={styles.itemCouponList}>
        <Image
          source={{
            uri:
              locale == "th"
                ? rootImage + item.image_th
                : rootImage + item.image_en,
          }}
          style={styles.imageListCouponView}
        />
        <TouchableOpacity
          onPress={() => onCollectCoupon(item)}
          style={styles.listCouponView}
        >
          <Text style={styles.textListCouponView}>COLLECT</Text>
        </TouchableOpacity>
      </Block>
    );
  };

  const onSelectProduct = async (item) => {
    let progressPercentage =
      item.product_stock == 0
        ? 1
        : (item.product_sold - item.product_stock + item.product_stock) /
          item.product_stock;
    setLoading(true);
    await axios
      .get(API_URL.FALSH_SALE_VIEW_API + "/" + item.id, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
          // "X-localization" : locale
        },
      })
      .then(function (response) {
        let newObj = Object.assign({}, objProductActivity);
        newObj.FLASHSALE = true;
        newObj.product_id = response.data.data.lists.product_id;
        newObj.flash_sale_events_id =
          response.data.data.lists.flash_sale_events_id;
        newObj.flash_sales_id = response.data.data.lists.flash_sales_id;
        newObj.TITLE =
          locale == "th"
            ? response.data.data.lists.product_name_th
            : response.data.data.lists.product_name_en;
        newObj.DETAIL =
          locale == "th"
            ? response.data.data.lists.product_description_th
            : response.data.data.lists.product_description_en;
        newObj.IMAGE = rootImage + response.data.data.lists.product_image;
        newObj.PRICE = response.data.data.lists.product_price;
        newObj.quantity = response.data.data.quantity;
        newObj.discount = response.data.data.discount;

        newObj.product_info_th =
          locale == "th"
            ? response.data.data.lists.product_info_th
            : response.data.data.lists.product_info_en;
        newObj.product_full_price = response.data.data.lists.product_full_price;
        newObj.product_favorite = response.data.data.lists.product_favorite;

        newObj.product_sold = item.product_sold;
        newObj.timeEnds = objHomeHD.timeEnds;
        newObj.progressPercent = progressPercentage;

        setLoading(false);
        props.setObjProductActivity(newObj);
        props.navigation.navigate("Products");
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  //Load More
  const [numList, setNumList] = useState(2);
  const [stateObj, setStateObj] = useState(defaultListFalsesaleProduct);
  const onLoadMoreProduct = async () => {
    setLoading(true);
    setNumList(numList + 1);
    await axios
      .get(API_URL.FALSH_SALE_VIEW_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
        params: {
          page: numList,
        },
      })
      .then(function (response) {
        const newConcatState = listTrSearchHD.concat(
          response.data.data.product_lists
        );
        setStateObj(newConcatState);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            stickySectionHeadersEnabled={false}
            sections={COUPON_LIST}
            renderSectionHeader={() => (
              <>
                {/* Coupon */}
                <Block style={styles.containerHeader}>
                  <Image
                    source={require("../../assets/images/coupon/couponhead.png")}
                    style={{
                      width: width - 200,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  />
                  <FlatList
                    horizontal={true}
                    data={listCouponHD}
                    renderItem={({ item }) =>
                      item.code !== "" ? <ListItemCoupon item={item} /> : null
                    }
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </Block>

                {/* Flash Sale Count Down */}
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
                        until={parseInt(objHomeHD.timeEnds)}
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
                      />
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
              </>
            )}
            renderSectionFooter={() => (
              <>
                {/* Product List */}
                <Block flex style={{ backgroundColor: "white", margin: 0 }}>
                  {stateObj.map((item) => (
                    <TouchableOpacity
                      onPress={() => onSelectProduct(item)}
                      key={item.id}
                    >
                      <Block row style={{ margin: 10 }}>
                        <ImageBackground
                          source={{ uri: rootImage + item.product_image }}
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
                              {parseInt(item.product_discount).toFixed(0)}%
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
                            {locale == "th"
                              ? item.product_name_th
                              : item.product_name_en}
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
                            ราคา : ฿{" "}
                            {parseInt(commaNumber(item.product_price)).toFixed(
                              2
                            )}
                          </Text>
                          <ProgressBar
                            progress={
                              item.product_stock == 0
                                ? 1
                                : (item.product_sold -
                                    item.product_stock +
                                    item.product_stock) /
                                  item.product_stock
                            }
                            color={
                              item.product_stock == 0
                                ? Colors.red800
                                : (item.product_sold -
                                    item.product_stock +
                                    item.product_stock) /
                                    item.product_stock ===
                                  1
                                ? Colors.red800
                                : "#00b1ba"
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
                            ขายแล้ว {item.product_sold} ชิ้น
                          </Text>
                        </Block>
                      </Block>
                    </TouchableOpacity>
                  ))}
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
      <ModalLoading loading={loading} />
    </>
  );
}

const mapActions = {
  setObjProductActivity: ActionProduct.setObjProductActivity,
  clearObjProductActivity: ActionProduct.clearObjProductActivity,

  setObjHomeHD: ActionHome.setObjHomeHD,
  clearObjHomeHD: ActionHome.clearObjHomeHD,
  setListTrSearchHD: ActionHome.setListTrSearchHD,
  pushListTrSearchHD: ActionHome.pushListTrSearchHD,
};

export default connect(null, mapActions)(FlashsaleProduct);

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
    height: 170,
  },
  itemCouponList: {
    margin: 5,
  },
  listCouponView: {
    backgroundColor: "#17e391",
    width: 100,
    height: 25,
    borderRadius: 25,
    alignSelf: "center",
    position: "relative",
    marginTop: -27,
  },
  textListCouponView: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    fontFamily: "kanitRegular",
    marginTop: 2,
  },
  imageListCouponView: {
    width: 170,
    height: 82,
    margin: 10,
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
    width: width / 1.6,
  },
});

const timeStyle = StyleSheet.create({
  timeText: {
    fontWeight: "800",
    fontSize: 22,
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
    paddingRight: 1.5,
    marginTop: 2.5,
    fontFamily: "kanitRegular",
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
