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
  Modal,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { StatusBar } from "expo-status-bar";
import { withNavigation } from "@react-navigation/compat";
import { connect, useSelector } from "react-redux";
import { Block, Text, theme } from "galio-framework";
import { formatTr } from "../i18n/I18nProvider";
import { actions as ActionHome } from "../actions/action-home/ActionHome";
import { actions as ActionProduct } from "../actions/action-product/ActionProduct";
import { actions as ActionProductType } from "../actions/action-product-type/ActionProductType";
import WangdekInfo from "../components/WangdekInfo";
import Icons from "react-native-vector-icons/MaterialIcons";
import { API_URL } from "../config/config.app";
import { getToken } from "../store/mock/token";
import CountDownEvent from "../components/CountDownEvent";
import commaNumber from "comma-number";
import ModalLoading from "../components/ModalLoading";
import { useScrollToTop } from "@react-navigation/native";

const { width } = Dimensions.get("screen");
let token = getToken();
const rootImage = "http://10.0.1.37:8080";

const defalutCouponList = [
  {
    id: "1",
    code: "A001",
    image: "/storage/8/coupon-1.png",
    title1_th: "title1_th",
    title1_en: "title1_en",
    title2_th: "title2_th",
    title2_en: "title2_en",
    valid_from: "2021-02-03 15:15:00",
    valid_until: "2021-02-03 15:15:00",
  },
];
const defalutBestsaleProduct = [
  {
    id: 2,
    name_th: "กระเป๋า เอ",
    name_en: "Bag A",
    image: "/storage/2/download-%281%29.jfif",
    price: "1000.00",
    total_quantity: "4",
  },
];
const defalutPopularProduct = [
  {
    id: 2,
    name_th: "กระเป๋า เอ",
    name_en: "Bag A",
    image: "/storage/2/download-%281%29.jfif",
    price: "1000.00",
    total_quantity: "4",
  },
];
const defalutInformationList = [
  {
    id: 1,
    code: "A001",
    image: "/storage/8/coupon-1.png",
    title1_th: "title1_th",
    title1_en: "title1_en",
    title2_th: "title2_th",
    title2_en: "title2_en",
    valid_from: "2021-02-03 15:15:00",
    valid_until: "2021-02-03 15:15:00",
  },
];

function Home(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const { objHomeHD } = useSelector((state) => ({
    objHomeHD: state.actionHomeHD.objHomeHD,
  }));
  const { objProductActivity } = useSelector((state) => ({
    objProductActivity: state.actionProduct.objProductActivity,
  }));
  const { objProductType } = useSelector((state) => ({
    objProductType: state.actionProductType.objProductType,
  }));

  useEffect(() => {
    setModalVisible(false); // Popup Coupon
    loadDataFlashsale();
    loadDataCoupon();
    loadDataBestsaler();
    loadDataPopularsaler();
  }, [countDownTime, couponList, listBestsale, listPopularSale]);

  // Time Everthing
  let LeftTime = moment(new Date()).format("HH:mm");
  let TimeActDay = moment(new Date()).format("DD");
  let TimeActMonth = moment(new Date()).format("MMM");
  let TimeActivity = moment(new Date()).format("DD MMM YYYY   |   HH:mm ");

  const [loading, setLoading] = useState(null);
  // Flashsale onLoad
  const [countDownTime, setCountDownTime] = useState(
    parseInt(objHomeHD.timeEnds)
  );
  const loadDataFlashsale = async () => {
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
        let objNew = Object.assign({}, objHomeHD);
        let dateEnds = moment(response.data.data.end_at, "YYYY-MM-DD");
        let dateTimeNow = moment(new Date(), "YYYY-MM-DD");
        objNew.timeEnds = await dateEnds.diff(dateTimeNow, "times");

        setCountDownTime(objNew.timeEnds);
        props.setObjHomeHD(objNew);
        props.setListTrSearchHD(response.data.data.lists);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCountDownTime(objHomeHD.timeEnds);
  };

  // Coupon
  const [couponList, setCouponList] = useState(defalutCouponList);
  const loadDataCoupon = async () => {
    await axios
      .get(API_URL.COUPON_LIST_TR_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        setCouponList(response.data.data);
        props.setListCouponHD(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const ListItemCoupon = ({ item }) => {
    return (
      <View style={styles2.item}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("My Coupon")}
        >
          <Image
            source={{ uri: rootImage + item.image }}
            style={{ width: 170, height: 80, margin: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // Flashsale Detail
  const onClickFalshsaleDetail = () => {
    props.setListCouponHD(couponList);
    props.navigation.navigate("Flashsale Product");
  };

  // Best Selling
  const [listBestsale, setListBestsale] = useState(defalutBestsaleProduct);
  const loadDataBestsaler = async () => {
    await axios
      .get(API_URL.BEST_SELLING_PRODUCT_LISTVIEW_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
          "X-localization": locale,
        },
        params: {
          page: 1,
        },
      })
      .then(async (response) => {
        setListBestsale(response.data.data.product_lists);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const renderBestsaler = ({ item }) => {
    const selectProductBestsale = async (item) => {
      setLoading(true);
      await axios
        .get(API_URL.PRODUCT_SEARCH_HD_API + item.id, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          let newObj = Object.assign({}, objProductActivity);
          newObj.FLASHSALE = false;
          newObj.product_id = response.data.data.id;

          newObj.TITLE =
            locale == "th"
              ? response.data.data.name_th
              : response.data.data.name_en;
          if (locale == "th") {
            newObj.DETAIL = response.data.data.description_th;
          } else {
            newObj.DETAIL = response.data.data.description_en;
          }
          newObj.IMAGE = rootImage + response.data.data.image;
          newObj.PRICE = response.data.data.price;
          newObj.product_full_price = response.data.data.full_price;
          newObj.quantity = 1;
          newObj.discount = 0;
          if (locale == "th") {
            newObj.product_info_th = response.data.data.info_th;
          } else {
            newObj.product_info_th = response.data.data.info_en;
          }
          newObj.product_favorite = response.data.data.favorite;

          props.setObjProductActivity(newObj);
          setLoading(false);

          props.navigation.navigate("Products");
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    };
    return (
      <Block flex style={{ marginTop: 10, marginLeft: 7 }} key={item.id}>
        <TouchableOpacity onPress={() => selectProductBestsale(item)}>
          <Image
            source={{ uri: rootImage + item.image }}
            style={pdStyle.imageProduct}
          />
          <Block flex space="between" flex style={pdStyle.productDescription}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 15,
              }}
            >
              {locale == "th" ? item.name_th : item.name_en}
            </Text>
            <Block
              style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}
            ></Block>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
              }}
            >
              ราคา : {"฿"}
              {commaNumber(parseFloat(item.price).toFixed(2))}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };
  const loadMoreBestsaler = () => {
    let newObj = Object.assign({}, objProductType);
    newObj.API_TYPE = API_URL.BEST_SELLING_PRODUCT_LISTVIEW_API;
    props.setObjProductType(newObj);
    props.navigation.navigate("Product Type");
  };

  // Popular selling
  const [listPopularSale, setListPopularSale] = useState(defalutPopularProduct);
  const loadDataPopularsaler = async () => {
    await axios
      .get(API_URL.POPULARITY_PRODUCT_LISTVIEW_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
          "X-localization": locale,
        },
        params: {
          page: 1,
        },
      })
      .then(async (response) => {
        setListPopularSale(response.data.data.product_lists);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const renderPopularsaler = ({ item }) => {
    const selectProductPopulatrity = async (item) => {
      setLoading(true);
      await axios
        .get(API_URL.PRODUCT_SEARCH_HD_API + item.id, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          let newObj = Object.assign({}, objProductActivity);
          newObj.FLASHSALE = false;
          newObj.product_id = response.data.data.id;

          newObj.TITLE =
            locale == "th"
              ? response.data.data.name_th
              : response.data.data.name_en;
          if (locale == "th") {
            newObj.DETAIL = response.data.data.description_th;
          } else {
            newObj.DETAIL = response.data.data.description_en;
          }
          newObj.IMAGE = rootImage + response.data.data.image;
          newObj.PRICE = response.data.data.price;
          newObj.product_full_price = response.data.data.full_price;
          newObj.quantity = 1;
          newObj.discount = 0;
          if (locale == "th") {
            newObj.product_info_th = response.data.data.info_th;
          } else {
            newObj.product_info_th = response.data.data.info_en;
          }
          newObj.product_favorite = response.data.data.favorite;

          setLoading(false);
          props.setObjProductActivity(newObj);
          props.navigation.navigate("Products");
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    };
    return (
      <Block flex style={{ marginTop: 10, marginLeft: 7 }} key={item.id}>
        <TouchableOpacity onPress={() => selectProductPopulatrity(item)}>
          <Image
            source={{ uri: rootImage + item.image }}
            style={pdStyle.imageProduct}
          />
          <Block flex style={pdStyle.productDescription}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 15,
              }}
            >
              {locale == "th" ? item.name_th : item.name_en}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: "#e0e0e0",
              }}
            >
              ราคา : {"฿"}
              {commaNumber(parseFloat(item.price).toFixed(2))}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };
  const loadMorePopularity = () => {
    let newObj = Object.assign({}, objProductType);
    newObj.API_TYPE = API_URL.POPULARITY_PRODUCT_LISTVIEW_API;
    props.setObjProductType(newObj);
    props.navigation.navigate("Product Type");
  };

  // FlatList Information
  const [informationList, setInformationList] = useState(defalutCouponList);
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
                  fontSize: 26,
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
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {TimeActMonth}
              </Text>
            </Block>
          </ImageBackground>
          {/* Detail */}
          <Block style={{ backgroundColor: "white", padding: 15, width: 300 }}>
            <Text
              style={{
                color: "black",
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
              onPress={() => props.navigation.navigate("News Relation Detail")}
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

  //#region PopupCoupon
  const [modalVisible, setModalVisible] = useState(false);
  const ModalNotification = () => {
    const renderModalCouponList = ({ item }) => {
      return (
        <Block row style={{ marginBottom: 15 }}>
          <Image
            source={{ uri: rootImage + item.image }}
            style={{ width: 130, height: 55 }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#00e099",
              width: 80,
              height: 24,
              borderRadius: 20,
              alignSelf: "center",
              marginLeft: 15,
            }}
          >
            <Text style={styles.fontCoupon}>COLLECT</Text>
          </TouchableOpacity>
        </Block>
      );
    };
    return (
      <>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <Block style={styles.centeredView}>
            <Block style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{ alignSelf: "flex-end" }}
              >
                <Icons name="clear" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalText}>You have received coupons</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{ flex: 1 }}>
                  <FlatList
                    data={couponList}
                    style={styles.containers}
                    renderItem={renderModalCouponList}
                    numColumns={1}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </SafeAreaView>
              </ScrollView>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#4a5aed" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Modal>
      </>
    );
  };
  //#endregion

  //#region Translate
  var VIEW_ALL = formatTr("VIEW_ALL").toString(); //View all
  var GOOD_PRODUCT = formatTr("GOOD_PRODUCT").toString();
  var POPULAR_PRODUCT = formatTr("POPULAR_PRODUCT").toString();
  var NEWS_RELEASE = formatTr("NEWS_RELEASE").toString();
  var READ_MORE = formatTr("READ_MORE").toString();
  //#endregion

  return (
    <>
      <Block flex center style={styles.home}>
        <View style={styles2.container}>
          <StatusBar style="auto" />
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
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
                  {/* Count Down */}
                  <TouchableHighlight
                    style={{ width: width }}
                    onPress={onClickFalshsaleDetail}
                  >
                    <CountDownEvent times={countDownTime} />
                  </TouchableHighlight>
                  {/* Coupon */}
                  <Block style={styles2.containerHeader}>
                    <FlatList
                      horizontal
                      data={couponList}
                      renderItem={({ item }) => <ListItemCoupon item={item} />}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </Block>
                </>
              )}
              renderSectionFooter={() => (
                <>
                  {/* Best seller product */}
                  <Block flex style={styles.textContainerBlock1}>
                    <Text
                      style={{
                        fontSize: 27,
                        color: "white",
                        marginTop: 20,
                        fontFamily: "kanitRegular",
                        textAlign: "center",
                      }}
                    >
                      {GOOD_PRODUCT}
                    </Text>
                    <FlatList
                      data={listBestsale}
                      style={styles.containers}
                      renderItem={renderBestsaler}
                      numColumns={2}
                      keyExtractor={(item) => item.id.toString()}
                      listKey={(item) => item.id.toString()}
                    />
                    <TouchableOpacity
                      onPress={loadMoreBestsaler}
                      style={{ marginBottom: 40, marginTop: 15 }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          marginTop: 10,
                          color: "white",
                          fontFamily: "kanitRegular",
                          borderBottomWidth: 5,
                          borderBottomColor: "white",
                          borderRadius: 2,
                        }}
                      >
                        {VIEW_ALL + " >"}
                      </Text>
                    </TouchableOpacity>
                  </Block>

                  {/* Popular product */}
                  <Block flex style={styles.textContainerBlock2}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontFamily: "kanitRegular",
                        textAlign: "center",
                      }}
                    >
                      {POPULAR_PRODUCT}
                    </Text>
                    <FlatList
                      data={listPopularSale}
                      style={styles.containers}
                      renderItem={renderPopularsaler}
                      numColumns={2}
                      keyExtractor={(item) => item.id.toString()}
                      listKey={(item) => item.id.toString()}
                    />
                    <TouchableOpacity
                      onPress={loadMorePopularity}
                      style={{ marginBottom: 25, marginTop: 15 }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          marginTop: 10,
                          color: "black",
                          fontFamily: "kanitRegular",
                          borderBottomWidth: 5,
                          borderBottomColor: "#0fa8db",
                          borderRadius: 2,
                        }}
                      >
                        {VIEW_ALL + " >"}
                      </Text>
                    </TouchableOpacity>
                  </Block>

                  {/* Public relations */}
                  <Block
                    flex
                    style={{ backgroundColor: "#f7f7f7", marginBottom: 25 }}
                  >
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
                  </Block>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("News Relation")}
                    style={{ marginBottom: 30, marginTop: 15 }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color: "black",
                        fontFamily: "kanitRegular",
                        borderBottomWidth: 5,
                        borderBottomColor: "#00bcd1",
                        borderRadius: 2,
                      }}
                      size={14}
                      color={theme.COLORS.PRIMARY}
                    >
                      {VIEW_ALL + " >"}
                    </Text>
                  </TouchableOpacity>

                  <WangdekInfo />
                </>
              )}
              renderItem={({ item, section }) => {
                if (section !== null) {
                  return null;
                }
                return <ListItem item={item} />;
              }}
            />
          </SafeAreaView>
        </View>
      </Block>
      <ModalNotification />
      <ModalLoading loading={loading} />
    </>
  );
}

const mapActions = {
  setObjHomeHD: ActionHome.setObjHomeHD,
  clearObjHomeHD: ActionHome.clearObjHomeHD,
  setListTrSearchHD: ActionHome.setListTrSearchHD,
  setListCouponHD: ActionHome.setListCouponHD,
  pushListTrSearchHD: ActionHome.pushListTrSearchHD,

  //Product Detail
  setObjProductActivity: ActionProduct.setObjProductActivity,
  clearObjProductActivity: ActionProduct.clearObjProductActivity,
  setListTrProductActivity: ActionProduct.setListTrProductActivity,
  pushListTrProductActivity: ActionProduct.pushListTrProductActivity,

  //Product Type
  setObjProductType: ActionProductType.setObjProductType,
  clearObjProductType: ActionProductType.clearObjProductType,
  setListTrProductType: ActionProductType.setListTrProductType,
  pushListTrProductType: ActionProductType.pushListTrProductType,
};

export default withNavigation(connect(null, mapActions)(Home));

// export default withNavigation(connect(null, ActionHome.actions)(Home));

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
  containers: {
    flex: 1,
    marginVertical: 20,
  },
  containerBlock: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  textContainerBlock1: {
    backgroundColor: "#10c985",
    padding: 5,
    width: width,
    // marginTop: 10,
  },
  textContainerBlock2: {
    backgroundColor: "#ffffff",
    marginTop: 25,
    padding: 5,
    marginBottom: 25,
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
  // Modal CSS
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "75%",
    height: "50%",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "white",
  },
  openButton: {
    backgroundColor: "#F194FF",
    padding: 10,
    elevation: 2,
    borderRadius: 50,
    width: "100%",
    height: 38,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "kanitRegular",
  },
  modalText: {
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "kanitRegular",
  },
  fontCoupon: {
    fontFamily: "kanitRegular",
    color: "white",
    fontSize: 12,
    textAlign: "center",
    marginTop: 2.5,
    shadowColor: "black",
    shadowOffset: {
      width: 12,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  containerHeader: {
    backgroundColor: "#486ec7",
  },
  blockHeader: {
    padding: 8,
    paddingLeft: 15,
    backgroundColor: "#486ec7",
    flexDirection: "column",
    width: width,
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
    color: "black",
    fontFamily: "kanitRegular",
  },
});

const pdStyle = StyleSheet.create({
  image: {
    borderRadius: 4,
    marginTop: -20,
  },
  textContainerBlock1: {
    padding: 5,
    flexWrap: "wrap",
  },
  imageProduct: {
    resizeMode: "cover",
    width: 180,
    height: 150,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
  },
  productText: {
    width: 180,
    height: 80,
  },
  productDescription: {
    width: 180,
    height: 80,
    padding: 10,
    backgroundColor: "white",
    borderBottomEndRadius: 3,
    borderBottomLeftRadius: 3,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    height: width / 3, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
  },
});
