import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  SectionList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { Block, Text, theme } from "galio-framework";
import { connect, useSelector } from "react-redux";
import { actions as ActionOrder } from "../../actions/action-order-status/ActionOrder";
import { actions as ActionCart } from "../../actions/action-cart/ActionCart";
import { actions as ActionOrderStatus } from "../../actions/action-order-status/ActionOrderStatus.js";
import ModalLoading from "../../components/ModalLoading";
import WangdekInfo from "../../components/WangdekInfo";
import { Icon } from "../../components/";
import { Button } from "react-native-elements";
import commaNumber from "comma-number";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";

const { height, width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

function OrderScreen(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const [loading, setLoading] = useState(null);
  const { objUseCoupon, objUseDelivery, objUseAddressDelivery,objOrderStatusPriceScreen } = useSelector(
    (state) => ({
      objUseCoupon: state.actionOrder.objUseCoupon,
      objUseDelivery: state.actionOrder.objUseDelivery,
      objUseAddressDelivery: state.actionOrder.objUseAddressDelivery,
      objOrderStatusPriceScreen: state.actionOrder.objOrderStatusPriceScreen,
    })
  );
  const [listTrOrder, setListTrOrder] = useState();

  useEffect(() => {
    loadCartLists();
  }, []);
  async function loadCartLists() {
    await axios({
      method: "GET",
      url: API_URL.ADD_CART_ORDER_LISTVIEW_API,
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + (await token),
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        let newlst = await response.data.data;
        setListTrOrder(newlst);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Order_List
  const renderOrderLists = ({ item }) => {
    return (
      <Block style={styles.blockProduct} key={item.cart_id}>
        <Block row>
          <Block style={styles.blockSemiImage}>
            <Image
              source={{ uri: rootImage + item.product_image }}
              style={styles.imageProduct}
            />
          </Block>
          {/* Detail */}
          <Block style={styles.blockSemiImage2}>
            <Block style={{ width: 220 }}>
              <Text style={styles.fontTitleProduct}>
                {locale == "th" ? item.product_name_th : item.product_name_en}
              </Text>
            </Block>

            <Block row style={{ marginTop: 60 }}>
              <Text style={styles.detailText}>จำนวน : </Text>
              <Text style={styles.detailText}>{item.quantity}</Text>
            </Block>
          </Block>
        </Block>
        {/* Price */}
        <Block row style={{ margin: 15, alignSelf: "center" }}>
          <Block style={{ width: "55%", alignItems: "flex-start" }}>
            <Text style={styles.fontPriceProductFullPrice}>
              ฿{commaNumber(parseFloat(item.product_full_price).toFixed(2))}
            </Text>
            <Block style={styles.boxPriceSale} />
          </Block>
          <Block style={{ width: "45%" }}>
            <Text style={styles.fontPriceProduct}>
              ฿{commaNumber(parseFloat(item.product_price).toFixed(2))}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  };
  const onThisConfirmOrders = async () => {
    if (listTrOrder.length > 0) {
      if (objUseDelivery.id !== 0) {
        if (objUseAddressDelivery.FIRST_NAME !== "") {
          //Get Promotions Agains
          setLoading(true);
          await axios({
            method: "POST",
            url: API_URL.SAVE_CART_ORDER_LISTVIEW_API,
            headers: {
              Accept: "*/*",
              Authorization: "Bearer " + (await token),
              "Content-Type": "application/json",
              "X-localization": locale,
            },
            data: listTrOrder,
          }).then(async (response) => {
            let newListFix = await listTrOrder.map((val) => {
              val.promotion_discount =
                response.data.data.discount_from_promotion.total;
              val.vat = response.data.data.vat;
              return val;
            });
            props.setListTrOrder(newListFix);
            props.setObjUseCoupon(objUseCoupon);
            props.setObjUseDelivery(objUseDelivery);
            props.setObjUseAddressDelivery(objUseAddressDelivery);

            //Calculate Order Price
            var Amounts = 0;
            var Discounts = 0; //ส่วนลด
            var Vats = listTrOrder[0].vat; //ภาษีทั้งหมด
            var TotalAmounts = 0; //ราคารวมทั้งหมด บวกภาษีแล้ว
            var CouponDiscounts = objUseCoupon.coupon_discount; //ส่วนลดจากคูปอง
            var PromotionsDiscount = listTrOrder[0].promotion_discount; //ส่วนลดจากโปรโมชั่น
            var newSummaryPrice = Object.assign({}, objOrderStatusPriceScreen);
            for (var i = 0; i < listTrOrder.length; i++) {
              Amounts += (await listTrOrder[i].product_price) * listTrOrder[i].quantity;
            }
            newSummaryPrice.total_amount = Amounts;
            newSummaryPrice.discount = Discounts;
            newSummaryPrice.coupon_discount = CouponDiscounts;
            newSummaryPrice.promotion_discount = PromotionsDiscount;
            newSummaryPrice.vat = Vats;

            await axios
              .get(API_URL.LOGISTICS_LIST_HD_API, {
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer " + (await token),
                  "Content-Type": "application/json",
                  "X-localization": locale,
                },
              })
              .then(async (response) => {
                let newDelivery = await response.data.data.filter(
                  (item) => item.id == objUseDelivery.id
                );

                TotalAmounts = await (parseFloat(Amounts) +
                  parseFloat(newDelivery[0].base_price) -
                  parseFloat(Discounts) -
                  parseFloat(CouponDiscounts) -
                  parseFloat(PromotionsDiscount) +
                  parseFloat(Vats));
                newSummaryPrice.total_full_amounts = TotalAmounts;

                props.setobjOrderStatusPriceScreenins(newSummaryPrice);
                props.navigation.navigate("Order Status Price Screen");
                setLoading(false);
              });
          }).catch((error) => {
            console.log(error,"error")
            setLoading(false);
          });
        } else {
          ToastAndroid.show("กรุณาเลือกที่อยู่ในการจัดส่ง", ToastAndroid.SHORT);
          setLoading(false);
        }
      } else {
        setLoading(false);
        ToastAndroid.show("กรุณาเลือกช่องทางการจัดส่ง", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("ไม่มีสินค้าในตะกร้า", ToastAndroid.SHORT);
      alert("ไม่มีสินค้าในตะกร้า");
    }
    setLoading(false);
  };
  const renderOtherList = ({ item }) => {
    const onOtherChangepage = (item) => {
      props.navigation.navigate(item.page);
    };
    return (
      <Block style={styles.blockHeaderInfo} key={item.id}>
        <TouchableOpacity onPress={() => onOtherChangepage(item)}>
          <Block row middle space="between" style={{ paddingTop: 7 }}>
            <Text style={styles.textOtherlist}>{item.text}</Text>
            <Icon
              name="angle-right"
              family="font-awesome"
              style={{ paddingRight: 15 }}
            />
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={CART_ORDERS_LIST}
          renderSectionHeader={() => (
            <>
              {/* Title */}
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Cart")}
              >
                <Block row style={styles.container}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 18,
                    }}
                  >
                    {"<  "}คำสั่งซื้อ
                  </Text>
                </Block>
              </TouchableOpacity>

              {/* Product List */}
              <FlatList
                data={listTrOrder}
                style={styles.containers}
                renderItem={renderOrderLists}
                numColumns={1}
                keyExtractor={(item) => item.cart_id.toString()}
              />

              {/* List Other */}
              <FlatList
                data={otherListItem}
                style={styles.containers}
                renderItem={renderOtherList}
                numColumns={1}
                keyExtractor={(item) => item.id.toString()}
                listKey={(item) => item.id}
              />

              {/* Button */}
              <Block
                row
                style={{
                  paddingTop: 40,
                  paddingBottom: 40,
                  alignSelf: "center",
                }}
              >
                <Button
                  titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                  title={"ซื้อสินค้าเพิ่มเติม"}
                  type="solid"
                  containerStyle={styles.blockButton1}
                  buttonStyle={styles.buttonStyle1}
                  onPress={() => props.navigation.navigate("Flash Sale")}
                />
                <Button
                  titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                  title={"ดำเนินการต่อ"}
                  type="solid"
                  containerStyle={styles.blockButton2}
                  buttonStyle={styles.buttonStyle2}
                  onPress={onThisConfirmOrders}
                />
              </Block>
            </>
          )}
          renderSectionFooter={() => <>{<WangdekInfo />}</>}
          renderItem={() => {
            return null;
          }}
        />
      </SafeAreaView>
      <ModalLoading loading={loading} />
    </>
  );
}

const mapActions = {
  setobjOrderScreen: ActionOrder.setobjOrderScreen,
  clearobjOrderScreen: ActionOrder.clearobjOrderScreen,
  setListTrOrder: ActionOrder.setListTrOrder,
  //option ActionOrder
  setObjUseCoupon: ActionOrder.setObjUseCoupon,
  setObjUseDelivery: ActionOrder.setObjUseDelivery,
  setObjUseAddressDelivery: ActionOrder.setObjUseAddressDelivery,
  setobjOrderStatusPriceScreenins: ActionOrder.setobjOrderStatusPriceScreenins,

  setObjCartScreen: ActionCart.setObjCartScreen,
  clearObjCartScreen: ActionCart.clearObjCartScreen,
  setListTrCartScreen: ActionCart.setListTrCartScreen,

  setObjOrderStatus: ActionOrderStatus.setObjOrderStatus,
};

export default connect(null, mapActions)(OrderScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BUTTON_COLOR,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  containers: {
    flex: 1,
    marginVertical: 20,
  },
  blockProduct: {
    backgroundColor: "#ededed",
    width: width,
    height: height / 4.2,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  blockSemiImage: {
    margin: 15,
  },
  blockSemiImage2: {
    margin: 10,
  },
  imageProduct: {
    width: 120,
    height: 100,
  },
  fontTitleProduct: {
    fontFamily: "kanitRegular",
    fontSize: 17,
    color: "black",
  },
  fontPriceProduct: {
    fontFamily: "kanitRegular",
    fontSize: 20,
    color: "black",
  },
  fontPriceProductFullPrice: {
    fontFamily: "kanitRegular",
    fontSize: 18,
    color: "#8f8f8f",
  },
  blockButton1: {
    flexDirection: "row",
  },
  blockButton2: {
    paddingLeft: 25,
  },
  buttonStyle1: {
    backgroundColor: "#0a86c4",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  buttonStyle2: {
    backgroundColor: "#0ac980",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  blockHeaderInfo: {
    paddingLeft: 25,
    paddingTop: 8,
    backgroundColor: "#f7f7f7",
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  textOtherlist: {
    textAlign: "left",
    color: "black",
    fontSize: 17,
    fontFamily: "kanitRegular",
  },
  boxPriceSale: {
    borderTopWidth: 1,
    borderTopColor: "red",
    position: "relative",
    width: 70,
    transform: [{ rotate: "8deg" }],
    marginTop: -15,
  },
});

const otherListItem = [
  {
    id: "1",
    text: "ใช้ส่วนลด",
    page: "Use Coupon",
  },
  {
    id: "2",
    text: "ช่องทางการจัดส่ง",
    page: "Use Delivery",
  },
  {
    id: "3",
    text: "ที่อยู่ในการจัดส่ง",
    page: "Use Address Delivery",
  },
];

const CART_ORDERS_LIST = [
  {
    title: "Mock",
    horizontal: false,
    data: [
      {
        key: "1",
        uri: "",
      },
    ],
  },
];
