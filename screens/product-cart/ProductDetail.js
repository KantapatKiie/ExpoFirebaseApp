import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Share,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { formatTr } from "../../i18n/I18nProvider";
import { Block, Button, Text, theme } from "galio-framework";
import { connect, useSelector } from "react-redux";
import { actions as ActionProduct } from "../../actions/action-product/ActionProduct";
import { actions as ActionCart } from "../../actions/action-cart/ActionCart";
import WangdekInfo from "../../components/WangdekInfo";
import ReadMore from "react-native-read-more-text";
import NumericInput from "react-native-numeric-input";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar, Colors } from "react-native-paper";
import CountDown from "react-native-countdown-component";
import commaNumber from "comma-number";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";

const { width } = Dimensions.get("screen");
const token = getToken();
//const rootImage = "http://10.0.1.37:8080";
const rootImage = "http://newpclinic.com/wd";

const defaultSocialsMedia = [
  {
    id: 1,
    name: "facebook",
    url: "https://www.facebook.com/xxx",
    image: "/storage/24/fb-share.png",
  },
  {
    id: 2,
    name: "line",
    url: "#",
    image: "/storage/25/line-share.png"
  }
];

function ProductDetail(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const { objProductActivity } = useSelector((state) => ({
    objProductActivity: state.actionProduct.objProductActivity,
  }));
  const { objCartBasket } = useSelector((state) => ({
    objCartBasket: state.actionCart.objCartBasket,
  }));

  useEffect(() => {
    loadDataSocialsMedia();
  }, []);

  // ReadMore
  const renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={{
          color: "black",
          marginTop: 5,
          fontFamily: "kanitBold",
          fontSize: 15,
        }}
        onPress={handlePress}
      >
        Read more...
      </Text>
    );
  };
  const renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={{
          color: "black",
          marginTop: 5,
          fontFamily: "kanitBold",
          fontSize: 15,
        }}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };

  const onClickFavorite = () => {
    let newFavorite = Object.assign({}, objProductActivity);
    if (objProductActivity.product_favorite == 0) {
      newFavorite.product_favorite = 1;
    } else {
      newFavorite.product_favorite = 0;
    }
    props.setObjProductActivity(newFavorite);
  };
  const onChangeValue = (value) => {
    let newObj = Object.assign({}, objProductActivity);
    newObj.quantity = value;
    props.setObjProductActivity(newObj);
  };

  const addProductToCarts = async () => {
    await axios({
      method: "POST",
      url: API_URL.ADD_CART_ORDER_LISTVIEW_API,
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + (await token),
        "Content-Type": "application/json",
        "X-localization": locale,
      },
      data: {
        flash_sale_events_id: objProductActivity.flash_sale_events_id,
        flash_sales_id: objProductActivity.flash_sales_id,
        product_id: objProductActivity.product_id,
        product_quantity: objProductActivity.quantity,
      },
    })
      .then(function (response) {
        ToastAndroid.show(response.data.data, ToastAndroid.SHORT);
        // props.navigation.navigate("Cart");
        // AsyncStorage["sessionCartBefore"] = newObjCart;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const buyProductToCart = async () => {
    await axios({
      method: "POST",
      url: API_URL.ADD_CART_ORDER_LISTVIEW_API,
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + (await token),
        "Content-Type": "application/json",
        "X-localization": locale,
      },
      data: {
        flash_sale_events_id: objProductActivity.flash_sale_events_id,
        flash_sales_id: objProductActivity.flash_sales_id,
        product_id: objProductActivity.product_id,
        product_quantity: objProductActivity.quantity,
      },
    })
      .then(function (response) {
        ToastAndroid.show(response.data.data, ToastAndroid.SHORT);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [dataSocials, setDataSocials] = useState(defaultSocialsMedia);
  const loadDataSocialsMedia = async () => {
    await axios
      .get(API_URL.SOCIALS_LIST_HD_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        setDataSocials(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const shareLinkSocials = (item) => {
    Share.share(
      {
        title: "Share message website",
        message: "Message",
        url: item.url,
      },
      {
        dialogTitle: "Share website",
        tintColor: "black",
      }
    )
      .then(function (response) {
        ToastAndroid.show(response.data, ToastAndroid.SHORT);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.container}>
          <StatusBar barStyle="default" />
          {/* Image */}
          <Block
            row
            style={{
              marginBottom: 8,
            }}
          >
            <Image
              source={{
                uri: objProductActivity.IMAGE,
              }}
              style={{
                height: 320,
                width: width,
              }}
            />
          </Block>

          {/* Flashsale Type */}
          {objProductActivity.FLASHSALE ? (
            <LinearGradient
              colors={["#02a1eb", "#00c4b7", "#00d184"]}
              style={linerStyle.linearGradient}
            >
              <Block row>
                <Image
                  source={require("../../assets/images/flashsale_head.png")}
                  style={{
                    width: width - 190,
                    height: 27,
                    alignSelf: "flex-start",
                    marginTop: 35,
                    marginLeft: 10,
                  }}
                />
                {/* CountDownTime */}
                <Block>
                  <Text
                    style={{
                      fontFamily: "kanitRegular",
                      color: "white",
                      fontSize: 15,
                      marginLeft: 25,
                      marginTop: 17,
                    }}
                  >
                    Ends in
                  </Text>
                  <Block row>
                    <Block style={linerStyle.BlockTime}>
                      <CountDown
                        size={22}
                        until={objProductActivity.timeEnds}
                        digitStyle={{
                          backgroundColor: "#ff4545",
                          height: 30,
                          width: 38,
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
                  </Block>
                </Block>
              </Block>
              <Block
                style={{
                  backgroundColor: "#ebebeb",
                  borderRadius: 25,
                  height: 40,
                  width: "95%",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "kanitBold",
                    marginLeft: 18,
                  }}
                >
                  ขายแล้ว {objProductActivity.product_sold} ชิ้น
                </Text>
                <ProgressBar
                  progress={objProductActivity.progressPercent}
                  color={
                    objProductActivity.progressPercent === 1
                      ? Colors.red800
                      : "#00b1ba"
                  }
                  style={{
                    borderRadius: 20,
                    height: 10,
                    marginRight: 20,
                    width: "90%",
                    alignSelf: "flex-end",
                  }}
                />
              </Block>
            </LinearGradient>
          ) : null}

          {/* Title */}
          <Block row style={styles.blockTitle}>
            <Text style={styles.titleProduct}>{objProductActivity.TITLE}</Text>
            {/* Favorite */}
            <Block style={styles.blockFavorite}>
              <TouchableOpacity onPress={onClickFavorite}>
                <Image
                  source={
                    objProductActivity.product_favorite
                      ? require("../../assets/icons/I-heart.png")
                      : require("../../assets/icons/I-heart-o.png")
                  }
                  style={{
                    marginTop: 5,
                    alignSelf: "center",
                    width: 29,
                    height: 24,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "kanitRegular",
                    textAlign: "center",
                    fontSize: 9,
                    marginTop: 4,
                  }}
                >
                  รายการโปรด
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>

          {/* Detail */}
          <Block style={{ margin: 10 }}>
            <Text style={styles.detailText}>
              รหัสสินค้า : {objProductActivity.product_id}
            </Text>
            <Text style={styles.detailText}>
              ยี่ห้อ : {objProductActivity.product_brand}
            </Text>
            <Text style={styles.detailText}>
              มีสินค้าทั้งหมด : {objProductActivity.product_stock}
            </Text>
          </Block>
          <Block row style={{ margin: 15, alignSelf: "flex-start" }}>
            <Block
              style={{ alignSelf: "flex-start", width: "45%", marginLeft: 5 }}
            >
              <Text style={styles.detailFullprice}>
                ฿
                {commaNumber(
                  parseFloat(objProductActivity.product_full_price).toFixed(2)
                )}
              </Text>
            </Block>
            <Block row style={{ alignSelf: "flex-start", width: "50%" }}>
              <Text style={styles.detailPrice1}>ราคา : </Text>
              <Text style={styles.detailPrice2}>
                ฿{commaNumber(parseFloat(objProductActivity.PRICE).toFixed(2))}
              </Text>
            </Block>
          </Block>

          {/* Count */}
          <Block row style={{ margin: 10 }}>
            <Text style={styles.detailText}>จำนวน : </Text>
            <NumericInput
              initValue={parseInt(objProductActivity.quantity)}
              value={parseInt(objProductActivity.quantity)}
              onChange={(value) => onChangeValue(value)}
              totalWidth={125}
              totalHeight={32}
              iconSize={18}
              step={1}
              valueType="real"
              type="plus-minus"
              rounded={false}
              textColor="black"
              iconStyle={{ color: "black" }}
              inputStyle={{ fontFamily: "kanitRegular" }}
              leftButtonBackgroundColor="#adadad"
              rightButtonBackgroundColor="#09db99"
              containerStyle={{ marginLeft: 20, fontFamily: "kanitRegular" }}
            />
          </Block>

          {/* Share Socials */}
          <Block
            row
            style={{
              marginTop: 25,
              width: "95%",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 15,
                textAlign: "left",
                marginTop: 3,
              }}
            >
              แชร์ :
            </Text>

            {dataSocials !== null
              ? dataSocials.map((item) => (
                  <TouchableOpacity
                    onPress={() => shareLinkSocials(item)}
                    key={item.id}
                  >
                    <Image
                      source={{ uri: rootImage + item.image }}
                      style={{
                        width: 32,
                        height: 32,
                        marginLeft: 12,
                      }}
                    />
                  </TouchableOpacity>
                ))
              : null}
          </Block>

          {/* Button */}
          <Block style={styles.padded}>
            <Button
              shadowless
              style={styles.button1}
              color={"black"}
              onPress={addProductToCarts}
            >
              <Text
                style={{
                  fontFamily: "kanitRegular",
                  color: "white",
                  fontSize: 15,
                }}
              >
                เพิ่มลงรถเข็น
              </Text>
            </Button>
            <Button
              shadowless
              style={styles.button2}
              color={"black"}
              onPress={buyProductToCart}
            >
              <Text
                style={{
                  fontFamily: "kanitRegular",
                  color: "white",
                  fontSize: 15,
                }}
              >
                ซื้อเลย
              </Text>
            </Button>
          </Block>
          <Block style={{ margin: 10 }}>
            <Text style={styles.detailText}>ข้อมูลสินค้า</Text>
            <ReadMore
              numberOfLines={2}
              renderTruncatedFooter={renderTruncatedFooter}
              renderRevealedFooter={renderRevealedFooter}
            >
              <Text style={styles.detailTextDesc}>
                {objProductActivity.DETAIL}
              </Text>
            </ReadMore>
          </Block>
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

const mapActions = {
  setObjProductActivity: ActionProduct.setObjProductActivity,
  clearObjProductActivity: ActionProduct.clearObjProductActivity,
  setListTrProductActivity: ActionProduct.setListTrProductActivity,
  pushListTrProductActivity: ActionProduct.pushListTrProductActivity,

  setObjCartBasket: ActionCart.setObjCartBasket,
  clearObjCartBasket: ActionCart.clearObjCartBasket,
  setListTrCartBasket: ActionCart.setListTrCartBasket,
  pushListTrCartBasket: ActionCart.pushListTrCartBasket,
};

export default connect(null, mapActions)(ProductDetail);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BUTTON_COLOR,
  },
  padded: {
    height: 140,
    position: "relative",
    alignSelf: "center",
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  button1: {
    width: width - theme.SIZES.BASE * 5,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    borderRadius: 40,
    backgroundColor: "#008ce3",
  },
  button2: {
    width: width - theme.SIZES.BASE * 5,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    borderRadius: 40,
    backgroundColor: "#00dea6",
  },
  titleProduct: {
    color: "black",
    fontSize: 17,
    fontFamily: "kanitRegular",
    width: "80%",
  },
  detailText: {
    color: "black",
    fontSize: 16,
    fontFamily: "kanitRegular",
    marginTop: 4,
  },
  detailTextDesc: {
    color: "#858585",
    fontSize: 15,
    fontFamily: "kanitRegular",
  },
  detailPrice1: {
    color: "black",
    fontSize: 24,
    fontFamily: "kanitRegular",
    marginTop: 2,
  },
  detailPrice2: {
    color: "red",
    fontSize: 27,
    fontFamily: "kanitRegular",
  },
  detailFullprice: {
    color: "#8f8f8f",
    fontSize: 18,
    fontFamily: "kanitRegular",
    marginTop: 8,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "red",
  },
  blockFavorite: {
    backgroundColor: "#d1d1d1",
    width: 55,
    height: 50,
    marginLeft: "2.5%",
    marginTop: 5,
  },
  blockTitle: {
    marginLeft: 10,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    height: 70,
  },
  //Input Count
  detailTextCount: {
    color: "white",
    fontSize: 18,
    fontFamily: "kanitRegular",
    textAlign: "center",
  },
  buttonIncrease: {
    width: 30,
    height: 30,
    backgroundColor: "#09db99",
    borderWidth: 0.2,
  },
  buttonDecrease: {
    width: 30,
    height: 30,
    backgroundColor: "#adadad",
    marginLeft: 15,
    borderWidth: 0.2,
  },
  inputCountPD: {
    width: 70,
    height: 30,
    backgroundColor: "white",
    borderWidth: 0.5,
    color: "black",
    fontSize: 18,
    fontFamily: "kanitRegular",
    textAlign: "center",
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
    width: "97%",
    alignSelf: "center",
  },
  BlockTime: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    width: width / 1.6,
  },
});
