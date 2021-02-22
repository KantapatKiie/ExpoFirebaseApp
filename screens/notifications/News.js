import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { connect, useSelector } from "react-redux";
import { Block } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import { actions as ActionHome } from "../../actions/action-home/ActionHome";
import { actions as ActionProduct } from "../../actions/action-product/ActionProduct";
import CountDownEvent from "../../components/CountDownEvent";
import WangdekInfo from "../../components/WangdekInfo";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";

const { width } = Dimensions.get("screen");
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";
let token = getToken();

function News(props) {
  const { objHomeHD } = useSelector((state) => ({
    objHomeHD: state.actionHomeHD.objHomeHD,
  }));
  useEffect(() => {
    loadDataFlashsale();
    loadDataCoupon();
  }, []);

  const [countDownTime, setCountDownTime] = useState(objHomeHD.timeEnds);
  const [couponList, setCouponList] = useState(null);
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
  const loadDataCoupon = async () => {
    if ((await token) !== null && (await token) !== undefined) {
      await axios
        .get(API_URL.COUPON_LIST_TR_API, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("adasdsadasdsad")
          setCouponList(response.data.data);
          props.setListCouponHD(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const onClickFalshsaleDetail = () => {
    if(countDownTime > 5){
      props.setListCouponHD(couponList);
      props.navigation.navigate("Flashsale Product");
    }
    else{
      ToastAndroid.show("⏰ Flashsale Time Out ⏰", ToastAndroid.SHORT)
    }
  };
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
            style={{ width: width }}
            onPress={onClickFalshsaleDetail}
          >
            <CountDownEvent times={countDownTime} />
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
};

export default connect(null, mapActions)(News);

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
