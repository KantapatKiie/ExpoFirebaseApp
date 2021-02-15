import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Dimensions,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment/locale/th";
import "moment/locale/en-au";
import * as ActionOrder from "../../actions/action-order-status/ActionOrder";
import { Block, Text } from "galio-framework";
import WangdekInfo from "../../components/WangdekInfo";
import { Button } from "react-native-elements";
import ModalLoading from "../../components/ModalLoading";
import { API_URL } from "../../config/config.app";
import commaNumber from "comma-number";
import { getToken } from "../../store/mock/token";
import { RadioButton } from "react-native-paper";

const { width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";
let TotalAmounts = 0;

const cartListProductDetail = [
  {
    id: 13,
    product_id: 4,
    product_name_th: "เสื้อผ้า 002",
    product_name_en: "Clothing 002",
    image: "/storage/4/images.jfif",
    quantity: 1,
    amount_full: "0.00",
    amount: "1.00",
  },
];

function OrderStatus(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const [loading, setLoading] = useState(null);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const onRefreshPageNow = React.useCallback(() => {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    setRefreshingPage(true);
    wait(1000).then(() => {
      ToastAndroid.show("Refresh Page", ToastAndroid.SHORT);
      setRefreshingPage(false);
    });
  }, []);

  const {
    listTrOrder,
    objOrderStatusPriceScreen,
    objUseCoupon,
    objUseDelivery,
    objUseAddressDelivery,
  } = useSelector((state) => ({
    listTrOrder: state.actionOrder.listTrOrder,
    objOrderStatusPriceScreen: state.actionOrder.objOrderStatusPriceScreen,
    objUseCoupon: state.actionOrder.objUseCoupon,
    objUseDelivery: state.actionOrder.objUseDelivery,
    objUseAddressDelivery: state.actionOrder.objUseAddressDelivery,
  }));

  useEffect(() => {
    setCheckPayType(1);
    setCartList(listTrOrder);
    loadDataDeliveryList(objUseDelivery.id);
    summaryPriceListTrOrder(listTrOrder);
  }, []);

  const [newDelivery, setNewDelivery] = useState({
    id: 0,
    base_price: "50.00",
    image: "/storage/5/download.png",
    name_en: "Kerry",
    name_th: "เคอร์รี่",
    period: "3-5",
  });
  const loadDataDeliveryList = async (id) => {
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
          (item) => item.id == id
        );
        setNewDelivery(newDelivery[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const summaryPriceListTrOrder = (list) => {
    let Amounts = 0;
    let Discounts = 0;
    let newSummaryPrice = Object.assign({}, objOrderStatusPriceScreen);
    for (let i = 0; i < list.length; i++) {
      Amounts += list[i].product_price * list[i].quantity;
    }
    newSummaryPrice.total_amount = Amounts;
    newSummaryPrice.discount = Discounts;
    newSummaryPrice.vat = ( ((parseFloat(Amounts) + parseFloat(newDelivery.base_price)) - parseFloat(Discounts)) * 0.07);
    
    TotalAmounts = parseFloat(Amounts) + parseFloat(newDelivery.base_price) + parseFloat(newSummaryPrice.vat);

    props.setobjOrderStatusPriceScreenins(newSummaryPrice);
  };

  const [checkPayType, setCheckPayType] = useState(1);
  const [cartList, setCartList] = useState(cartListProductDetail);
  const renderDetailStatus = ({ item }) => {
    return (
      <Block style={{ height: 140, margin: 15 }} key={item.id}>
        <Block row>
          <Image
            source={{ uri: rootImage + item.product_image }}
            style={{ width: 100, height: 100 }}
          />
          <Block style={{ marginLeft: 15 }}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              {locale == "th" ? item.product_name_th : item.product_name_en}
            </Text>
            <Block row style={{ marginTop: "24%" }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                }}
              >
                จำนวน
              </Text>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                  marginLeft: "40%",
                }}
              >
                {item.quantity}
              </Text>
            </Block>
          </Block>
        </Block>
        <Block row style={{ margin: 15 }}>
          <Block style={{ width: "60%" }}>
            <Text
              style={{
                fontFamily: "kanitRegular",
                fontSize: 20,
                color: "#8f8f8f",
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
              }}
            >
              {"฿ " +
                commaNumber(parseFloat(item.product_full_price).toFixed(2))}
            </Text>
          </Block>
          <Block style={{ width: "40%" }}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 22,
              }}
            >
              {"฿ " + commaNumber(parseFloat(item.product_price).toFixed(2))}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  };

  const onSelectToPaymentPage = () => {
    // await axios({
    //   method: "POST",
    //   url: API_URL.CREATE_ORDER_HD_API,
    //   headers: {
    //     Accept: "*/*",
    //     Authorization: "Bearer " + (await token),
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     coupons_id: objUseCoupon.id,
    //     logistics_id: objUseDelivery.id,
    //     delivery_address: {
    //       fullname: objUseAddressDelivery.FIRST_NAME + " " + objUseAddressDelivery.LAST_NAME,
    //       telephone: objUseAddressDelivery.PHONE_NUMBER_ORDER,
    //       address: objUseAddressDelivery.ADDRESS_NAME_ORDER,
    //       sub_district_id: objUseAddressDelivery.SUB_DISTRICT_CODE_ORDER,
    //       district_id: objUseAddressDelivery.DISTRICT_CODE_ORDER,
    //       province_id: objUseAddressDelivery.PROVINCE_CODE_ORDER,
    //       postcode: objUseAddressDelivery.ZIP_CODE_ORDER,
    //     },
    //     payment_type: "0",
    //     total_amount: "12000",
    //     delivery_charge: "50",
    //     discount: "50",
    //     promotion_discount: "7.89",
    //     vat: "65.80",
    //   },
    // })
    //   .then(function (response) {
    //     ToastAndroid.show(response.data, ToastAndroid.SHORT);
    //         props.navigation.navigate("Payment");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    props.navigation.navigate("Payment");
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={ORDER_STATUS_PRICE_LIST}
          refreshControl={
            <RefreshControl
              refreshing={refreshingPage}
              onRefresh={onRefreshPageNow}
            />
          }
          renderSectionHeader={() => (
            <>
              {/* Title */}
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Order Screen")}
              >
                <Block
                  row
                  style={{
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingBottom: 20,
                    backgroundColor: "white",
                  }}
                >
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

              {/* Order List */}
              <FlatList
                data={listTrOrder}
                style={styles.containers}
                renderItem={renderDetailStatus}
                keyExtractor={(item) => item.cart_id.toString()}
              />

              {/* EMS */}
              <Block
                style={{
                  backgroundColor: "white",
                  width: width,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e0e0e0",
                }}
              >
                <Block style={{ margin: 25 }}>
                  <Block>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitBold",
                        fontSize: 20,
                      }}
                    >
                      ช่องทางการจัดส่ง
                    </Text>
                    <Image
                      source={{ uri: rootImage + newDelivery.image }}
                      style={{ width: 170, height: 50, margin: 10 }}
                    />
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                      }}
                    >
                      {newDelivery.name_en + " - " + newDelivery.name_th}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                      }}
                    >
                      ระยะเวลาในการส่ง : {newDelivery.period} {" วัน"}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                      }}
                    >
                      อัตราค่าบริการ :{" "}
                      {commaNumber(
                        parseFloat(newDelivery.base_price).toFixed(2)
                      )}{" "}
                      บาท
                    </Text>
                  </Block>
                </Block>
              </Block>

              {/* Address Delivery */}
              <Block
                style={{
                  backgroundColor: "white",
                  width: width,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e0e0e0",
                }}
              >
                <Block style={{ margin: 25 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitBold",
                      fontSize: 20,
                      marginTop: 15,
                    }}
                  >
                    ที่อยู่ในการจัดส่ง
                  </Text>
                  <Block row style={{ marginTop: 10 }}>
                    <Block>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        ชื่อ :
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        เบอร์โทร :
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        ที่อยู่ :
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        เขต/อำเภอ :
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        แขวง/ตำบล :
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        จังหวัด :
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        รหัสไปรษณีย์ :
                      </Text>
                    </Block>
                    <Block style={{ marginLeft: 25 }}>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {objUseAddressDelivery.FIRST_NAME}{" "}
                        {objUseAddressDelivery.LAST_NAME}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {objUseAddressDelivery.PHONE_NUMBER_ORDER}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {objUseAddressDelivery.ADDRESS_NAME_ORDER}
                      </Text>

                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {objUseAddressDelivery.DISTRICT_NAME_ORDER}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {objUseAddressDelivery.SUB_DISTRICT_NAME_ORDER}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {objUseAddressDelivery.PROVINCE_NAME_ORDER}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {objUseAddressDelivery.ZIP_CODE_ORDER}
                      </Text>
                    </Block>
                  </Block>
                </Block>
              </Block>

              {/* All Price */}
              <Block
                style={{
                  backgroundColor: "white",
                  width: width,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e0e0e0",
                }}
              >
                <Block style={{ margin: 25 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 18,
                      textAlign: "right",
                    }}
                  >
                    ยอดรวมค่าสินค้า : ฿{" "}
                    {commaNumber(parseFloat(objOrderStatusPriceScreen.total_amount).toFixed(2))}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 18,
                      textAlign: "right",
                      marginTop: 12,
                    }}
                  >
                    ค่าจัดส่ง : ฿{" "}
                    {commaNumber(parseFloat(newDelivery.base_price).toFixed(2))}
                  </Text>
                  <Text
                    style={{
                      color: "red",
                      fontFamily: "kanitRegular",
                      fontSize: 18,
                      textAlign: "right",
                      marginTop: 12,
                    }}
                  >
                    ส่วนลด : ฿ -
                    {commaNumber(
                      parseFloat(objOrderStatusPriceScreen.discount).toFixed(2)
                    )}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 18,
                      textAlign: "right",
                      marginTop: 12,
                    }}
                  >
                    ภาษี 7% : ฿{" "}
                    {commaNumber(
                      parseFloat(objOrderStatusPriceScreen.vat).toFixed(2)
                    )}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 23,
                      textAlign: "right",
                      marginTop: 12,
                    }}
                  >
                    ยอดรวมทั้งสิ้น : ฿{" "}
                    {commaNumber(parseFloat(TotalAmounts).toFixed(2))}
                  </Text>
                </Block>
              </Block>

              {/* Payment Type */}
              <Block
                style={{
                  backgroundColor: "white",
                  width: width,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e0e0e0",
                }}
              >
                <Block style={{ margin: 25 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitBold",
                      fontSize: 20,
                    }}
                  >
                    เลือกช่องทางการชำระเงิน
                  </Text>

                  <Block style={{ marginTop: 15 }}>
                    <Block style={styles.blockPaymentType}>
                      <Block row style={{ margin: 15 }}>
                        <RadioButton
                          value={1}
                          style={{ margintop: 25 }}
                          status={checkPayType === 1 ? "checked" : "unchecked"}
                          onPress={() => setCheckPayType(1)}
                        />
                        <Text
                          style={{
                            fontFamily: "kanitRegular",
                            fontSize: 17,
                            color: "black",
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                        >
                          โอนเข้าบัญชีธนาคาร
                        </Text>
                      </Block>
                    </Block>
                    <Block style={styles.blockPaymentTypes}>
                      <Block row style={{ margin: 15 }}>
                        <RadioButton
                          value={2}
                          status={checkPayType === 2 ? "checked" : "unchecked"}
                          onPress={() => setCheckPayType(2)}
                        />
                        <Text
                          style={{
                            fontFamily: "kanitRegular",
                            fontSize: 17,
                            color: "black",
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                        >
                          ชำระผ่านบัตรเครดิต/เดบิต
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>

              {/* Button */}
              <Block
                row
                style={{
                  paddingTop: 40,
                  paddingBottom: 40,
                  alignSelf: "center",
                  backgroundColor: "white",
                  width: width,
                }}
              >
                <Button
                  titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                  title={"ย้อนกลับ"}
                  type="solid"
                  containerStyle={styles.blockButton1}
                  buttonStyle={styles.buttonStyle1}
                  onPress={() => props.navigation.navigate("Order Screen")}
                />
                <Button
                  titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                  title={"ยืนยันการชำระเงิน"}
                  type="solid"
                  containerStyle={styles.blockButton2}
                  buttonStyle={styles.buttonStyle2}
                  onPress={onSelectToPaymentPage}
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

export default connect(null, ActionOrder.actions)(OrderStatus);

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    marginVertical: 20,
  },
  blockButton1: {
    flexDirection: "row",
    paddingLeft: 15,
  },
  blockButton2: {
    paddingLeft: 15,
  },
  buttonStyle1: {
    backgroundColor: "#0c66ed",
    borderRadius: 20,
    width: 170,
    alignSelf: "flex-end",
  },
  buttonStyle2: {
    backgroundColor: "#0ac980",
    borderRadius: 20,
    width: 170,
    alignSelf: "center",
  },
  iconStatus: {
    width: 20,
    height: 20,
    marginTop: 15,
  },
  containersFL: {
    flex: 1,
    marginVertical: 20,
  },
  textStatusPayment: {
    color: "#00c278",
    fontFamily: "kanitRegular",
    fontSize: 18,
    marginTop: 12,
  },
  textStatusWaitPayment: {
    color: "#8a8a8a",
    fontFamily: "kanitRegular",
    fontSize: 18,
    marginTop: 12,
  },
  textStatusWaitCheck: {
    color: "#f5d225",
    fontFamily: "kanitRegular",
    fontSize: 18,
    marginTop: 12,
  },
  blockPaymentType: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
    height: 70,
    backgroundColor: "#fafafa",
  },
  blockPaymentTypes: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
    height: 70,
    backgroundColor: "#fafafa",
    marginTop: 10,
  },
});

const styles2 = StyleSheet.create({
  textImage2: {
    width: 40,
    height: 40,
    marginLeft: 45,
  },
  textImage2_op: {
    width: 40,
    height: 40,
    marginLeft: 45,
    opacity: 0.2,
  },
  textImage3: {
    width: 40,
    height: 40,
    marginLeft: 47,
  },
  textImage3_op: {
    width: 40,
    height: 40,
    marginLeft: 47,
    opacity: 0.2,
  },
  textImage4: {
    width: 40,
    height: 40,
    marginLeft: 49,
  },
  textImage4_op: {
    width: 40,
    height: 40,
    marginLeft: 49,
    opacity: 0.2,
  },

  //Text Bottom
  textBottom2: {
    color: "black",
    fontFamily: "kanitRegular",
    fontSize: 13,
    marginLeft: 34,
  },
  textBottom2_op: {
    color: "gray",
    fontFamily: "kanitRegular",
    fontSize: 13,
    marginLeft: 34,
  },
  textBottom3: {
    color: "black",
    fontFamily: "kanitRegular",
    fontSize: 13,
    marginLeft: 35,
    textAlign: "center",
  },
  textBottom3_op: {
    color: "gray",
    fontFamily: "kanitRegular",
    fontSize: 13,
    marginLeft: 35,
    textAlign: "center",
  },
  textBottom4: {
    color: "black",
    fontFamily: "kanitRegular",
    fontSize: 13,
    marginLeft: 25,
  },
  textBottom4_op: {
    color: "gray",
    fontFamily: "kanitRegular",
    fontSize: 13,
    marginLeft: 25,
  },
});

const ORDER_STATUS_PRICE_LIST = [
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
