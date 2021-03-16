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
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment/locale/th";
import "moment/locale/en-au";
import * as ActionOrder from "../../actions/action-order-status/ActionOrder";
import { Block, Text } from "galio-framework";
import WangdekInfo from "../../components/WangdekInfo";
import ModalLoading from "../../components/ModalLoading";
import { API_URL } from "../../config/config.app";
import commaNumber from "comma-number";
import { getToken } from "../../store/mock/token";
import { RadioButton } from "react-native-paper";
import { Button } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import Omise from "omise-react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import CountryList from "../../i18n/Country.json"
import Toast from 'react-native-tiny-toast'

const { width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";
Omise.config("pkey_test_5mvrvso2arsfg21lm3v", "2019-05-29");

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
      setCheckPayType(1);
      loadDataDeliveryList(objUseDelivery.id);
      summaryPriceListTrOrder(listTrOrder);
      Toast.show("Refresh Page", {
        containerStyle:{ backgroundColor:"#f0f0f0", borderRadius:25},
        position: Toast.position.center,
        animation: true,
        textStyle: { fontSize:14,fontFamily: "kanitRegular", color:"#3b3838" },
      });
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
    loadDataDeliveryList(objUseDelivery.id);
    getCountry();
    checkPurchaseOrderList();
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

  const [checkPayType, setCheckPayType] = useState(1);
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
              }}
            >
              {"฿ " +
                commaNumber(parseFloat(item.product_full_price).toFixed(2))}
            </Text>
            <Block style={styles.boxPriceSale} />
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

  //#region Payment Credit/Debit
  const [objOmiseTransfer, setObjOmiseTransfer] = useState({
    card_number: "",
    card_name: "",
    expire_date: "",
    secure_code: "",
    country_code: 0,
    country_name: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [purchaseList, checkPurchaseList] = useState(0);
  const [orderNumber, setOrderNumber] = useState("");
  async function checkPurchaseOrderList() {
    await axios({
      method: "GET",
      url: API_URL.COUNT_CART_ORDER_LISTVIEW_API,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await token),
      },
    })
      .then(async (response) => {
        checkPurchaseList(response.data.data.result);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }
  const checkedOmiseTransfer = async () => {
    const tokenOmise = await Omise.createToken({
      card: {
        name: objOmiseTransfer.card_name,
        number: objOmiseTransfer.card_number,
        city: objOmiseTransfer.country_name,
        expiration_month: parseInt(
          objOmiseTransfer.expire_date.substring(0, 2)
        ),
        expiration_year: parseInt(
          moment(new Date()).format("YYYY").substr(0, 2) +
            objOmiseTransfer.expire_date.substring(3, 5)
        ),
        security_code: parseInt(objOmiseTransfer.secure_code),
      },
    });
    return tokenOmise;

    // const tokenOmise = await Omise.createToken({
    //   card: {
    //     name: "KANTAPAT",
    //     city: "Bangkok",
    //     postal_code: 10210,
    //     number: "4242424242424242",
    //     expiration_month: 10,
    //     expiration_year: 2022,
    //     security_code: 111,
    //   },
    // });
    // return tokenOmise;
  };
  const handleConfirmPaymentOmise = async () => {
    if (
      objOmiseTransfer.card_number !== "" &&
      objOmiseTransfer.card_name !== "" &&
      objOmiseTransfer.expire_date !== "" &&
      objOmiseTransfer.secure_code !== "" &&
      objOmiseTransfer.country_code !== ""
    ) {
      setLoading(true);
      const tokenOmise = await checkedOmiseTransfer();
      await axios({
        method: "POST",
        url: API_URL.CREATE_ORDER_HD_API,
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
        data: {
          coupons_id: objUseCoupon.id,
          logistics_id: objUseDelivery.id,
          delivery_address: {
            fullname:
              objUseAddressDelivery.FIRST_NAME +
              " " +
              objUseAddressDelivery.LAST_NAME,
            telephone: objUseAddressDelivery.PHONE_NUMBER_ORDER,
            address: objUseAddressDelivery.ADDRESS_NAME_ORDER,
            sub_district_id: objUseAddressDelivery.SUB_DISTRICT_CODE_ORDER,
            district_id: objUseAddressDelivery.DISTRICT_CODE_ORDER,
            province_id: objUseAddressDelivery.PROVINCE_CODE_ORDER,
            postcode: objUseAddressDelivery.ZIP_CODE_ORDER,
          },
          payment_type: checkPayType == 1 ? 0 : 1,
          payment_token: tokenOmise.id,
          total_amount: objOrderStatusPriceScreen.total_amount,
          delivery_charge: newDelivery.base_price,
          discount: objOrderStatusPriceScreen.discount,
          coupon_discount: objUseCoupon.coupon_discount,
          promotion_discount: objOrderStatusPriceScreen.promotion_discount,
          vat: objOrderStatusPriceScreen.vat,
        },
      })
        .then(async (response) => {
          setOrderNumber(response.data.data.code);
          checkPurchaseOrderList();
          setLoading(false);
        })
        .catch(function (error) {
          // console.log(error.response.data);
          setLoading(false);
        });
      setModalVisible(false);
      setLoading(false);
    }
    setLoading(false)
  };
  const onChangeCardNumber = (e) => {
    let newObj = Object.assign({}, objOmiseTransfer);
    newObj.card_number = e;
    setObjOmiseTransfer(newObj);
  };
  const onChangeCardName = (e) => {
    let newObj = Object.assign({}, objOmiseTransfer);
    newObj.card_name = e;
    setObjOmiseTransfer(newObj);
  };
  const onChangeExpriceDate = (e) => {
    let newObj = Object.assign({}, objOmiseTransfer);
    if (e.length >= 2) {
      newObj.expire_date = e.substr(0, 2) + "/" + (e.substr(3) || "");
    } else {
      newObj.expire_date = e;
    }
    setObjOmiseTransfer(newObj);
  };
  const onChangeSecureCode = (e) => {
    let newObj = Object.assign({}, objOmiseTransfer);
    newObj.secure_code = e;
    setObjOmiseTransfer(newObj);
  };
  const [country, setCountry] = useState([
    {
      label: objOmiseTransfer.country_name,
      value: objOmiseTransfer.country_code,
    },
  ]);
  const getCountry = async () => {
    let newlstBin = CountryList.map(function (item) {
      item.label = item.country;
      item.value = item.tld;
      return item;
    });
    setCountry(newlstBin);
  };
  const onChangeCountry = (item) => {
    let newObj = Object.assign({}, objOmiseTransfer);
    newObj.country_code = item.value;
    newObj.country_name = item.label;
    setObjOmiseTransfer(newObj);
  };
  const modalPayment = (
    <Modal transparent={true} visible={modalVisible} animationType="none">
      <Block style={stylesModal.modal}>
        <Block style={stylesModal.modalContainer}>
          {/* Header */}
          <Block row style={{ margin: 25 }}>
            <Image
              source={require("../../assets/images/omise/omise-main.png")}
              style={{ width: 65, height: 65 }}
            />
            <Block>
              <Text style={stylesModal.titleMain}>OMISE </Text>
              <Text style={stylesModal.titleFooter}>Secured by Omise </Text>
            </Block>
            <TouchableOpacity
              style={stylesModal.closeModal}
              onPress={() => setModalVisible(false)}
            >
              <Icons name="close" size={20} color="black" />
            </TouchableOpacity>
          </Block>
          {/* Detail */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={stylesModal.modalBody}>
              <Block style={{ marginLeft: 12, matginTop: 5 }}>
                <Text style={stylesModal.bodyText}>Credit / Debit</Text>
              </Block>
              <Block style={{ marginTop: 20, marginleft: 20 }}>
                <Block style={{ marginLeft: 10 }}>
                  <Block style={stylesModal.inputView}>
                    <TextInput
                      style={stylesModal.inputKey}
                      placeholder={"Card Number"}
                      placeholderTextColor={
                        objOmiseTransfer.card_number !== "" ? "#808080" : "red"
                      }
                      value={objOmiseTransfer.card_number}
                      onChangeText={onChangeCardNumber}
                      keyboardType={"ascii-capable"}
                      maxLength={16}
                    />
                  </Block>
                  <Block style={stylesModal.inputView}>
                    <TextInput
                      style={stylesModal.inputKey}
                      placeholder={"Name on card"}
                      placeholderTextColor={
                        objOmiseTransfer.card_name !== "" ? "#808080" : "red"
                      }
                      value={objOmiseTransfer.card_name}
                      onChangeText={onChangeCardName}
                    />
                  </Block>
                </Block>
                <Block row style={{ marginLeft: 10 }}>
                  <Block style={stylesModal.inputViews}>
                    <TextInput
                      style={stylesModal.inputKey}
                      placeholder={"Expire date"}
                      placeholderTextColor={
                        objOmiseTransfer.expire_date !== "" ? "#808080" : "red"
                      }
                      value={objOmiseTransfer.expire_date}
                      onChangeText={onChangeExpriceDate}
                      keyboardType={"phone-pad"}
                      maxLength={5}
                    />
                  </Block>
                  <Block style={stylesModal.inputViewsRow}>
                    <TextInput
                      style={stylesModal.inputKey}
                      placeholder={"Security code"}
                      placeholderTextColor={
                        objOmiseTransfer.secure_code !== "" ? "#808080" : "red"
                      }
                      value={objOmiseTransfer.secure_code}
                      onChangeText={onChangeSecureCode}
                      keyboardType={"numeric"}
                      maxLength={3}
                    />
                  </Block>
                </Block>

                <DropDownPicker
                  items={country}
                  containerStyle={{ height: 38, width: 290, margin: 10 }}
                  style={{ backgroundColor: "#fafafa" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                  placeholderStyle={{
                    textAlign: "left",
                    color:
                      objOmiseTransfer.country_name !== "" ? "#808080" : "red",
                  }}
                  placeholder={"- Country -"}
                  labelStyle={{
                    textAlign: "left",
                    color: "#000",
                  }}
                  arrowColor={"white"}
                  arrowSize={15}
                  arrowStyle={{
                    backgroundColor: "#02d483",
                    borderRadius: 20,
                    color: "white",
                  }}
                  searchable={true}
                  searchablePlaceholder={"Search Country.."}
                  defaultValue={
                    objOmiseTransfer.country_name == ""
                      ? null
                      : objOmiseTransfer.country_code
                  }
                  onChangeItem={(item) => onChangeCountry(item)}
                />
              </Block>
            </Block>
            {/* modalFooter */}
            <Block style={stylesModal.modalFooter}>
              <Block style={{ margin: 10, marginTop: 15 }}>
                <Button
                  titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                  title={
                    "Checkout " +
                    commaNumber(
                      parseFloat(
                        objOrderStatusPriceScreen.total_full_amounts
                      ).toFixed(2)
                    ) +
                    " THB"
                  }
                  type="solid"
                  containerStyle={{ margin: 15 }}
                  buttonStyle={{ backgroundColor: "#0c5aeb" }}
                  onPress={handleConfirmPaymentOmise}
                />
                <Block row style={{ alignSelf: "center", marginTop: 25 }}>
                  <Text style={stylesModal.titleFooter2}>
                    Secured by Omise{" "}
                  </Text>
                  <Image
                    source={require("../../assets/images/omise/omise-img.png")}
                    style={{ width: 85, height: 24 }}
                  />
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    </Modal>
  );
  //#endregion

  const onConfirmToPaymentPage = async () => {
    if (checkPayType === 1) {
      await axios({
        method: "POST",
        url: API_URL.CREATE_ORDER_HD_API,
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
        data: {
          coupons_id: objUseCoupon.id,
          logistics_id: objUseDelivery.id,
          delivery_address: {
            fullname:
              objUseAddressDelivery.FIRST_NAME +
              " " +
              objUseAddressDelivery.LAST_NAME,
            telephone: objUseAddressDelivery.PHONE_NUMBER_ORDER,
            address: objUseAddressDelivery.ADDRESS_NAME_ORDER,
            sub_district_id: objUseAddressDelivery.SUB_DISTRICT_CODE_ORDER,
            district_id: objUseAddressDelivery.DISTRICT_CODE_ORDER,
            province_id: objUseAddressDelivery.PROVINCE_CODE_ORDER,
            postcode: objUseAddressDelivery.ZIP_CODE_ORDER,
          },
          payment_type: checkPayType == 1 ? 0 : 1,
          payment_token: "",
          total_amount: objOrderStatusPriceScreen.total_amount,
          delivery_charge: newDelivery.base_price,
          discount: objOrderStatusPriceScreen.discount,
          coupon_discount: objUseCoupon.coupon_discount,
          promotion_discount: objOrderStatusPriceScreen.promotion_discount,
          vat: objOrderStatusPriceScreen.vat,
        },
      })
        .then(function (response) {
          Toast.show("เลขที่สั่งซื้อ " + response.data.data.code, {
            containerStyle:{ backgroundColor:"#f0f0f0", borderRadius:25},
            position: Toast.position.center,
            animation: true,
            textStyle: { fontSize:14,fontFamily: "kanitRegular", color:"#3b3838" },
          });
          props.navigation.navigate("Payment");
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    } else {
      setModalVisible(true);
    }
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
                    {commaNumber(
                      parseFloat(
                        objOrderStatusPriceScreen.total_amount
                      ).toFixed(2)
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
                      parseFloat(objUseCoupon.coupon_discount).toFixed(2)
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
                    {commaNumber(
                      parseFloat(
                        objOrderStatusPriceScreen.total_full_amounts
                      ).toFixed(2)
                    )}
                  </Text>
                </Block>
              </Block>

              {/* Payment Type */}
              {purchaseList > 0 ? (
                <>
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
                        <TouchableOpacity
                          style={styles.blockPaymentType}
                          onPress={() => setCheckPayType(1)}
                        >
                          <Block row style={{ margin: 15 }}>
                            <RadioButton
                              value={1}
                              style={{ margintop: 25 }}
                              status={
                                checkPayType === 1 ? "checked" : "unchecked"
                              }
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
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.blockPaymentTypes}
                          onPress={() => setCheckPayType(2)}
                        >
                          <Block row style={{ margin: 15 }}>
                            <RadioButton
                              value={2}
                              status={
                                checkPayType === 2 ? "checked" : "unchecked"
                              }
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
                        </TouchableOpacity>
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
                      titleStyle={{
                        color: "white",
                        fontFamily: "kanitRegular",
                      }}
                      title={"ย้อนกลับ"}
                      type="solid"
                      containerStyle={styles.blockButton1}
                      buttonStyle={styles.buttonStyle1}
                      onPress={() => props.navigation.navigate("Order Screen")}
                    />
                    <Button
                      titleStyle={{
                        color: "white",
                        fontFamily: "kanitRegular",
                      }}
                      title={"ยืนยันการชำระเงิน"}
                      type="solid"
                      containerStyle={styles.blockButton2}
                      buttonStyle={styles.buttonStyle2}
                      onPress={onConfirmToPaymentPage}
                    />
                  </Block>
                </>
              ) : (
                <Block
                  style={{
                    backgroundColor: "white",
                    alignSelf: "center",
                    width: width,
                    height: 50,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "kanitRegular",
                      fontSize: 18,
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    รายการสั่งซื้อเลขที่ : {orderNumber.toString()}
                  </Text>
                </Block>
              )}
            </>
          )}
          renderSectionFooter={() => <>{<WangdekInfo />}</>}
          renderItem={() => {
            return null;
          }}
        />
      </SafeAreaView>
      <ModalLoading loading={loading} />
      {modalPayment}
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
  boxPriceSale: {
    borderTopWidth: 1,
    borderTopColor: "red",
    position: "relative",
    width: 70,
    transform: [{ rotate: "8deg" }],
    marginTop: -15,
  },
});

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#00000099",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalContainer: {
    backgroundColor: "#f9fafb",
    width: width - 50,
    height: "85%",
    borderRadius: 12,
  },
  titleMain: {
    fontSize: 24,
    color: "black",
    fontFamily: "kanitBold",
    marginTop: 5,
    marginLeft: 18,
  },
  titleFooter: {
    fontSize: 15,
    color: "#a8a8a8",
    fontFamily: "kanitRegular",
    marginLeft: 18,
  },
  titleFooter2: {
    fontSize: 15,
    color: "#a8a8a8",
    fontFamily: "kanitRegular",
  },
  closeModal: {
    marginBottom: 50,
    marginLeft: 60,
  },
  bodyText: {
    fontSize: 18,
    color: "black",
    fontFamily: "kanitRegular",
  },
  inputKey: {
    height: 50,
    color: "black",
    fontSize: 13,
  },
  inputView: {
    width: "90%",
    backgroundColor: "#ffffff",
    height: 35,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 0.7,
    borderColor: "#e0e0e0",
    borderRadius: 4,
  },
  inputViews: {
    width: "42%",
    backgroundColor: "#ffffff",
    height: 35,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 0.7,
    borderColor: "#e0e0e0",
    borderRadius: 4,
  },
  inputViewsRow: {
    width: "42%",
    backgroundColor: "#ffffff",
    height: 35,
    marginBottom: 20,
    marginLeft: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 0.7,
    borderColor: "#e0e0e0",
    borderRadius: 4,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
  modalBody: {
    marginLeft: 15,
  },
  modalFooter: {},
  actions: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#2e50ff",
    width: 300,
    height: 45,
    alignSelf: "center",
  },
  actionText: {
    color: "#fff",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  bloxStyle: {
    marginTop: 10,
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
