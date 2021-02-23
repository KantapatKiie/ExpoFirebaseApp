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
  RefreshControl,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { withNavigation } from "@react-navigation/compat";
import { connect, useSelector } from "react-redux";
import { Block, Text, theme } from "galio-framework";
import { formatTr } from "../i18n/I18nProvider";
import { actions as ActionHome } from "../actions/action-home/ActionHome";
import { actions as ActionProduct } from "../actions/action-product/ActionProduct";
import { actions as ActionProductType } from "../actions/action-product-type/ActionProductType";
import { actions as ActionNewsRelations } from "../actions/action-news-relations/ActionNewsRelations";
import WangdekInfo from "../components/WangdekInfo";
import Icons from "react-native-vector-icons/MaterialIcons";
import { API_URL } from "../config/config.app";
import { getToken } from "../store/mock/token";
import CountDownEvent from "../components/CountDownEvent";
import commaNumber from "comma-number";
import ModalLoading from "../components/ModalLoading";
import { ToastAndroid } from "react-native";

const { width } = Dimensions.get("screen");
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";
let token = getToken();

function Home(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  //#region Time & Translate
  let LeftTime = moment(new Date()).format("HH:mm");

  var VIEW_ALL = formatTr("VIEW_ALL").toString(); //View all
  var GOOD_PRODUCT = formatTr("GOOD_PRODUCT").toString();
  var POPULAR_PRODUCT = formatTr("POPULAR_PRODUCT").toString();
  var NEWS_RELEASE = formatTr("NEWS_RELEASE").toString();
  var READ_MORE = formatTr("READ_MORE").toString();

  var SUNDAY = formatTr("SUNDAY").toString();
  var MONDAY = formatTr("MONDAY").toString();
  var TUESDAY = formatTr("TUESDAY").toString();
  var WEDNESDAY = formatTr("WEDNESDAY").toString();
  var THURSDAY = formatTr("THURSDAY").toString();
  var FRIDAY = formatTr("FRIDAY").toString();
  var SATURDAY = formatTr("SATURDAY").toString();
  //#endregion

  //Refresh Control
  const [loading, setLoading] = useState(null);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const onRefreshPageNow = React.useCallback(() => {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    setRefreshingPage(true);
    wait(1000).then(() => {
      setTimeout(async () => {
        await loadDataFlashsale();
      }, 200);
      setTimeout(async () => {
        await loadDataCoupon();
      }, 200);
      loadDataProductLists();
      loadDataNews();
      ToastAndroid.show("Refresh Page", ToastAndroid.SHORT);
      setRefreshingPage(false);
    });
  }, []);

  const { objHomeHD } = useSelector((state) => ({
    objHomeHD: state.actionHomeHD.objHomeHD,
  }));
  const { objProductActivity } = useSelector((state) => ({
    objProductActivity: state.actionProduct.objProductActivity,
  }));
  const { objProductType } = useSelector((state) => ({
    objProductType: state.actionProductType.objProductType,
  }));
  const { objNewsRelationsHD } = useSelector((state) => ({
    objNewsRelationsHD: state.actionNewsRelations.objNewsRelationsHD,
  }));

  useEffect(() => {
    // setModalVisible(false); // Popup Coupon
    loadDataFlashsale();
    loadDataCoupon();
    loadDataProductLists();
    loadDataNews();
  }, []);

  // Flashsale onLoad
  const [countDownTime, setCountDownTime] = useState(objHomeHD.timeEnds);
  async function loadDataFlashsale() {
    await axios
      .get(API_URL.FALSH_SALE_VIEW_API, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: {
          page: 1,
        },
      })
      .then(async (response) => {
        var date = moment().utcOffset("+07:00").format("YYYY-MM-DD hh:mm:ss");
        var expirydate = await response.data.data.end_at;
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        let objNew = Object.assign({}, objHomeHD);
        objNew.timeEnds = hours * 60 * 60 + minutes * 60 + seconds;
        let newlistFlashsale = await response.data.data.lists;

        setCountDownTime(objNew.timeEnds);
        props.setObjHomeHD(objNew);
        props.setListTrSearchHD(newlistFlashsale);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCountDownTime(objHomeHD.timeEnds);
  }
  // Flashsale Detail
  const onClickFalshsaleDetail = () => {
    props.setListCouponHD(couponList);
    props.navigation.navigate("Flashsale Product");
  };

  // Coupon
  const [couponList, setCouponList] = useState(null);
  const loadDataCoupon = async () => {
    if ((await token) !== null && (await token) !== undefined) {
      await axios
        .get(API_URL.COUPON_LIST_TR_API, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await token),
          },
        })
        .then((response) => {
          setCouponList(response.data.data);
          props.setListCouponHD(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
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
      <Block style={styles2.itemCouponList}>
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
  //Pop-up Coupon
  const [modalVisible, setModalVisible] = useState(false);
  const ModalPopupCoupon = () => {
    const renderModalCouponList = ({ item }) => {
      const onCollectCouponModal = async (item) => {
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
        <Block row style={{ marginBottom: 15 }}>
          <Image
            source={{
              uri:
                locale == "th"
                  ? rootImage + item.image_th
                  : rootImage + item.image_en,
            }}
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
            onPress={() => onCollectCouponModal(item)}
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
              <SafeAreaView style={{ flex: 1 }}>
                <SectionList
                  stickySectionHeadersEnabled={false}
                  sections={HOME_LIST}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshingPage}
                      onRefresh={onRefreshPageNow}
                    />
                  }
                  renderSectionHeader={() => (
                    <>
                      <FlatList
                        data={couponList}
                        style={styles.containers}
                        renderItem={renderModalCouponList}
                        numColumns={1}
                        keyExtractor={(item) => item.id.toString()}
                      />
                    </>
                  )}
                  renderItem={() => {
                    return null;
                  }}
                />
              </SafeAreaView>
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

  // Best selling
  const [listBestsale, setListBestsale] = useState(null);
  const [listPopularSale, setListPopularSale] = useState(null);
  async function loadDataProductLists() {
    await axios({
      method: "GET",
      url: API_URL.BEST_SELLING_PRODUCT_LISTVIEW_API,
      timeout: 2500,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        page: 1,
      },
    })
      .then(async (resBestsale) => {
        var lstBestSale = await resBestsale.data.data.product_lists;

        let newlstBestsale = [];
        for (let i = 0; i < 4; i++) {
          if (lstBestSale[i] !== undefined) newlstBestsale.push(lstBestSale[i]);
        }
        //Popularity List
        await axios({
          method: "GET",
          url: API_URL.POPULARITY_PRODUCT_LISTVIEW_API,
          timeout: 2500,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
          },
        }).then(async (resPopuplar) => {
          let lstPopular = await resPopuplar.data.data.product_lists;
          let newlstPopular = [];
          for (let i = 0; i < 4; i++) {
            if (lstPopular[i] !== undefined) newlstPopular.push(lstPopular[i]);
          }
          if (newlstBestsale || lstPopular) {
            setListBestsale(newlstBestsale);
            setListPopularSale(lstPopular);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const renderBestsaler = ({ item }) => {
    const selectProductBestsale = async (item) => {
      setLoading(true);
      await axios
        .get(API_URL.PRODUCT_SEARCH_HD_API + item.id, {
          headers: {
            Accept: "application/json",
            // Authorization: "Bearer " + (await token),
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
          newObj.IMAGE = response.data.data.image;
          newObj.PRICE = response.data.data.price;
          newObj.product_full_price = response.data.data.full_price;
          newObj.stock = response.data.data.stock;
          newObj.quantity = response.data.data.stock;
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
          <Block flex space="between" style={pdStyle.productDescription}>
            <Text style={styles.textProductBestsale}>
              {locale == "th" ? item.name_th : item.name_en}
            </Text>
            <Block
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
                margin: 2,
              }}
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
  const viewAllBestsaler = () => {
    let newObj = Object.assign({}, objProductType);
    newObj.API_TYPE = API_URL.BEST_SELLING_PRODUCT_LISTVIEW_API;
    newObj.HOME_TYPE = true;
    props.setObjProductType(newObj);
    props.navigation.navigate("Product Type");
  };
  const renderPopularsaler = ({ item }) => {
    const selectProductPopulatrity = async (item) => {
      setLoading(true);
      await axios
        .get(API_URL.PRODUCT_SEARCH_HD_API + item.id, {
          headers: {
            Accept: "application/json",
            // Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
            // "X-localization": locale,
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
          newObj.IMAGE = response.data.data.image;
          newObj.PRICE = response.data.data.price;
          newObj.product_full_price = response.data.data.full_price;
          newObj.stock = response.data.data.stock;
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
          <Block flex space="between" style={pdStyle.productDescription}>
            <Text style={styles.textProductBestsale}>
              {locale == "th" ? item.name_th : item.name_en}
            </Text>
            <Block
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
                margin: 2,
              }}
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
  const viewAllPopularity = () => {
    let newObj = Object.assign({}, objProductType);
    newObj.API_TYPE = API_URL.POPULARITY_PRODUCT_LISTVIEW_API;
    newObj.HOME_TYPE = true;
    props.setObjProductType(newObj);
    props.navigation.navigate("Product Type");
  };

  // Information List
  const [informationList, setInformationList] = useState(null);
  async function loadDataNews() {
    await axios
      .get(API_URL.NEWS_EVENTS_RELATIONS_HD, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        let newlst = await response.data.data.filter(
          (item) => item.type == "news"
        );
        setInformationList(newlst);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const renderInformation = ({ item }) => {
    var fullDate = item.operate_datetime;
    var colorItem = moment(item.operate_datetime).format("ddd", locale);
    var colorEtc = "";

    switch (colorItem) {
      case locale != "th" ? SUNDAY.substring(0, 3) : SUNDAY:
        colorItem = "#fc4353";
        colorEtc = "#ba303c";
        break;

      case locale != "th" ? MONDAY.substring(0, 3) : MONDAY:
        colorItem = "#fdb837";
        colorEtc = "#cc952f";
        break;
      case locale != "th" ? TUESDAY.substring(0, 3) : TUESDAY:
        colorItem = "#ec429a";
        colorEtc = "#c93a84";
        break;

      case locale != "th" ? WEDNESDAY.substring(0, 3) : WEDNESDAY:
        colorItem = "#10c990";
        colorEtc = "#0c9c6f";
        break;

      case locale != "th" ? THURSDAY.substring(0, 3) : THURSDAY:
        colorItem = "#fd761a";
        colorEtc = "#c75e16";
        break;

      case locale != "th" ? FRIDAY.substring(0, 3) : FRIDAY:
        colorItem = "#119bf6";
        colorEtc = "#1080c9";
        break;

      case locale != "th" ? SATURDAY.substring(0, 3) : SATURDAY:
        colorItem = "#c924a7";
        colorEtc = "#961b7d";
        break;

      default:
        break;
    }

    const onSelectNewsEvents = (item) => {
      let objNews = Object.assign({}, objNewsRelationsHD);
      props.navigation.navigate("News Relation Detail");
    };
    return (
      <View style={styles2.items}>
        <Block flex>
          {/* Image */}
          <ImageBackground
            source={{
              uri: rootImage + item.image,
            }}
            style={styles2.itemPhotos}
          >
            <Block
              style={{
                backgroundColor: colorItem,
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
                {moment(fullDate).format("DD")}
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
                {moment(fullDate).format("MMM")}
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
              {locale == "th" ? item.title_th : item.title_en}
            </Text>
            <Text style={styles2.TextActivity}>
              {moment(fullDate).format("LLLL")}{" "}
            </Text>
            <Text style={styles2.TextActivity}>&nbsp;</Text>
            {/* Detail Information */}
            <Text style={styles2.TextActivity}>
              {locale == "th"
                ? item.short_description_th
                : item.short_description_en}
            </Text>
            <Text style={styles2.TextActivity}>&nbsp;</Text>
            <TouchableOpacity
              onPress={() => onSelectNewsEvents(item)}
              style={{
                backgroundColor: colorEtc,
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

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={HOME_LIST}
          refreshControl={
            <RefreshControl
              refreshing={refreshingPage}
              onRefresh={onRefreshPageNow}
            />
          }
          renderSectionHeader={() => (
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
                  renderItem={({ item }) =>
                    item.code !== "" ? <ListItemCoupon item={item} /> : null
                  }
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
                <Block style={{ alignSelf: "center", marginTop: 20 }}>
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
                </Block>
                <FlatList
                  data={listBestsale}
                  style={styles.containers}
                  renderItem={renderBestsaler}
                  numColumns={2}
                  keyExtractor={(item) => item.id.toString()}
                  listKey={(item) => item.id.toString()}
                />
                <TouchableOpacity
                  onPress={viewAllBestsaler}
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
                <Block style={{ alignSelf: "center", marginTop: 20 }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontFamily: "kanitRegular",
                      textAlign: "center",
                    }}
                  >
                    {POPULAR_PRODUCT}
                  </Text>
                </Block>
                <FlatList
                  data={listPopularSale}
                  style={styles.containers}
                  renderItem={renderPopularsaler}
                  numColumns={2}
                  keyExtractor={(item) => item.id.toString()}
                  listKey={(item) => item.id.toString()}
                />
                <TouchableOpacity
                  onPress={viewAllPopularity}
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
                <Block style={{ alignSelf: "center", margin: 20 }}>
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
                </Block>
                <FlatList
                  horizontal={true}
                  data={informationList}
                  renderItem={renderInformation}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  listKey={(item) => item.id.toString()}
                />

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
              </Block>

              <WangdekInfo />
            </>
          )}
          renderItem={() => {
            return null;
          }}
        />
      </SafeAreaView>
      <ModalPopupCoupon />
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

  //Product Type
  setObjProductType: ActionProductType.setObjProductType,
  clearObjProductType: ActionProductType.clearObjProductType,
  setListTrProductType: ActionProductType.setListTrProductType,
  pushListTrProductType: ActionProductType.pushListTrProductType,

  // News Relations
  setObjNewsRelationsHD: ActionNewsRelations.setObjNewsRelationsHD,
  setListTrNewsRelationsHD: ActionNewsRelations.setListTrNewsRelationsHD,
};

export default withNavigation(connect(null, mapActions)(Home));

const HOME_LIST = [
  {
    title: "Mock",
    horizontal: true,
    data: [
      {
        key: "1",
        uri: "../assets/images/coupon/coupon-1.png",
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
    borderTopWidth: 1,
    borderTopColor: "#9ee390",
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
  textProductBestsale: {
    color: "black",
    fontFamily: "kanitRegular",
    fontSize: 15,
    height: 25,
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

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  containerHeader: {
    backgroundColor: "#486ec7",
    height: 130,
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
  itemCouponList: {
    marginLeft: 5,
    marginTop: 10,
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
