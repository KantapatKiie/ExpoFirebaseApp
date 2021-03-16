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
import * as ActionOrderStatus from "../../actions/action-order-status/ActionOrderStatus.js";
import { Block, Text } from "galio-framework";
import WangdekInfo from "../../components/WangdekInfo";
import { formatTr } from "../../i18n/I18nProvider";
import { Button } from "react-native-elements";
import StepIndicator from "react-native-step-indicator";
import ModalLoading from "../../components/ModalLoading";
import { API_URL } from "../../config/config.app";
import commaNumber from "comma-number";
import { getToken } from "../../store/mock/token";
import Toast from 'react-native-tiny-toast'

const { width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

const firstIndicatorStyles = {
  stepIndicatorSize: 50,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: "#d9d9d9",
  stepStrokeFinishedColor: "#d9d9d9",
  stepStrokeUnFinishedColor: "#d9d9d9",
  separatorFinishedColor: "#00d17a", //Line Current
  separatorUnFinishedColor: "#cfcfcf", //Line After
  stepIndicatorFinishedColor: "#00d17a", //Point Before
  stepIndicatorUnFinishedColor: "#cfcfcf", //Point After
  stepIndicatorCurrentColor: "#ff8400", //Current point
};

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
  const { objOrderStatus, statusOrder, logistics_list } = useSelector(
    (state) => ({
      objOrderStatus: state.actionOrderStatus.objOrderStatus,
      statusOrder: state.actionOrderStatus.statusOrder,
      logistics_list: state.actionOrderStatus.logistics_list,
    })
  );

  const [loading, setLoading] = useState(null);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const onRefreshPageNow = React.useCallback(() => {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    setRefreshingPage(true);
    wait(1000).then(() => {
      loadingCartDetails();
      Toast.show("Refresh Page", {
        containerStyle:{ backgroundColor:"#f0f0f0", borderRadius:25},
        position: Toast.position.center,
        animation: true,
        textStyle: { fontSize:14,fontFamily: "kanitRegular", color:"#3b3838" },
      });
      setRefreshingPage(false);
    });
  }, []);

  let status = statusOrder.status_th;
  let TotalAmounts =
    parseFloat(objOrderStatus.total_amount) +
    parseFloat(objOrderStatus.delivery_charge) -
    parseFloat(objOrderStatus.discount) +
    parseFloat(objOrderStatus.vat);

  useEffect(() => {
    loadingCartDetails();
  }, []);

  // Step Indicators
  // const [currentPosition, setCurrentPosition] = useState(objOrderStatus.status);
  const [currentPosition, setCurrentPosition] = useState(status == "รอการชำระเงิน" ? 1 :status == "กำลังจัดเตรียมสินค้า" ? 3 :status == "ชำระเงินแล้ว" ? 2 : 4);
  const getStepIndicatorIconConfig = ({ position }) => {
    const iconConfig = {
      name: "feed",
      color: "#ffffff",
      width: 20,
      height: 20,
    };
    switch (position) {
      case 0: {
        iconConfig.source = require("../../assets/images/order-filter/icon1.png");
        break;
      }
      case 1: {
        iconConfig.source =
          currentPosition === 2 || currentPosition === 3
            ? require("../../assets/images/order-filter/icon1.png")
            : require("../../assets/images/order-filter/icon2.png");
        break;
      }
      case 2: {
        iconConfig.source =
          currentPosition === 3
            ? require("../../assets/images/order-filter/icon1.png")
            : require("../../assets/images/order-filter/icon3.png");
        break;
      }
      case 3: {
        iconConfig.source =
          currentPosition === 3
            ? require("../../assets/images/order-filter/icon1.png")
            : require("../../assets/images/order-filter/icon4.png");
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };
  const renderStepIndicators = (params) => (
    <Image
      {...getStepIndicatorIconConfig(params)}
      style={{ width: 20, height: 20 }}
    />
  );

  const renderStatus = () => {
    if (status == "ชำระเงินแล้ว") {
      return (
        <Image
          source={require("../../assets/images/order-filter/status1-icon.png")}
          style={styles.iconStatus}
        />
      );
    } else if (status == "รอการชำระเงิน") {
      return (
        <Image
          source={require("../../assets/images/order-filter/status2-icon.png")}
          style={styles.iconStatus}
        />
      );
    } else if (status == "รอการตรวจสอบ") {
      return (
        <Image
          source={require("../../assets/images/order-filter/status3-icon.png")}
          style={styles.iconStatus}
        />
      );
    }
    return null;
  };

  const [cartList, setCartList] = useState(cartListProductDetail);
  const loadingCartDetails = async () => {
    setLoading(false);
    setCartList("");
    await axios
      .get(API_URL.HISTORY_ORDER_DETAIL_LIST_API + objOrderStatus.code, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        setLoading(true);
        setCartList(response.data.data.orders.carts_list);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(true);
      });
    setLoading(true);
  };
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
              {item.product_name_th}
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
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 24,
            }}
          >
            {"฿ " + commaNumber(item.amount_full)}
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 24,
              marginLeft: "45%",
            }}
          >
            {"฿ " + commaNumber(item.amount)}
          </Text>
        </Block>
      </Block>
    );
  };

  const handleCancelOrder = async () => {
    await axios
      .put(API_URL.CANCEL_ORDER_HD_API + item.code, {
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        Toast.show(item.code + " is cancel", {
          containerStyle:{ backgroundColor:"#f0f0f0", borderRadius:25},
          position: Toast.position.center,
          animation: true,
          textStyle: { fontSize:14,fontFamily: "kanitRegular", color:"#3b3838" },
        });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const downloadSlipPayment = async () =>{
    setLoading(false);
    await axios
      .get(API_URL.SEND_FILE_SLIPPAYMENTS_API + objOrderStatus.code, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        setLoading(true);
      })
      .catch(function (error) {
        console.log(false);
        setLoading(true);
      });
    setLoading(true);
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={ORDER_STATUS_LIST}
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
                onPress={() => props.navigation.navigate("History Order")}
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
                    {"<  "}สถานะการสั่งสินค้า
                  </Text>
                </Block>
              </TouchableOpacity>

              {/* Step Indicator */}
              <Block style={{ margin: 20 }}>
                <Block row>
                  <Image
                    style={{ width: 40, height: 40, marginLeft: 27 }}
                    source={require("../../assets/images/order-filter/status4-icon.png")}
                  />
                  <Image
                    style={
                      currentPosition === 0
                        ? styles2.textImage2_op
                        : styles2.textImage2
                    }
                    source={require("../../assets/images/order-filter/status5-icon.png")}
                  />
                  <Image
                    style={
                      currentPosition === 0 || currentPosition === 1
                        ? styles2.textImage3_op
                        : styles2.textImage3
                    }
                    source={require("../../assets/images/order-filter/status6-icon.png")}
                  />
                  <Image
                    style={
                      currentPosition === 0 ||
                      currentPosition === 1 ||
                      currentPosition === 2
                        ? styles2.textImage4_op
                        : styles2.textImage4
                    }
                    source={require("../../assets/images/order-filter/status7-icon.png")}
                  />
                </Block>
                <Block row>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 13,
                      marginLeft: 18,
                    }}
                  >
                    สั่งซื้อสินค้า
                  </Text>
                  <Text
                    style={
                      currentPosition === 0
                        ? styles2.textBottom2_op
                        : styles2.textBottom2
                    }
                  >
                    ชำระเงิน
                  </Text>
                  <Block style={{ alignSelf: "center" }}>
                    <Text
                      style={
                        currentPosition === 0 || currentPosition === 1
                          ? styles2.textBottom3_op
                          : styles2.textBottom3
                      }
                    >
                      กำลังจัด
                    </Text>
                    <Text
                      style={
                        currentPosition === 0 || currentPosition === 1
                          ? styles2.textBottom3_op
                          : styles2.textBottom3
                      }
                    >
                      เตรียมสินค้า
                    </Text>
                  </Block>
                  <Text
                    style={
                      currentPosition === 0 ||
                      currentPosition === 1 ||
                      currentPosition === 2
                        ? styles2.textBottom4_op
                        : styles2.textBottom4
                    }
                  >
                    จัดส่งสินค้า
                  </Text>
                </Block>
                {/* Indicator */}
                <Block style={{ marginTop: 20 }}>
                  <StepIndicator
                    customStyles={firstIndicatorStyles}
                    renderStepIndicator={renderStepIndicators}
                    currentPosition={currentPosition}
                    stepCount={4}
                  />
                </Block>
              </Block>

              {/* Data */}
              <Block
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  backgroundColor: "white",
                  width: width,
                  height: 225,
                }}
              >
                <Block style={{ margin: 15 }}>
                  <Text
                    style={{
                      color: "#13d688",
                      fontFamily: "kanitRegular",
                      fontSize: 25,
                    }}
                  >
                    ข้อมูลการสั่งซื้อ
                  </Text>
                </Block>
                <Block row style={{ width: width }}>
                  <Block style={{ marginLeft: 15 }}>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                      }}
                    >
                      หมายเลขการสั่งซื้อ :
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                        marginTop: 12,
                      }}
                    >
                      วันที่สั่งสินค้า :
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                        marginTop: 12,
                      }}
                    >
                      สภานะ :
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                        marginTop: 12,
                      }}
                    >
                      การชำระเงิน :
                    </Text>
                  </Block>
                  <Block flex style={{ marginRight: 10 }}>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                        textAlign: "right",
                      }}
                    >
                      {objOrderStatus.code}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                        marginTop: 12,
                        textAlign: "right",
                      }}
                    >
                      {moment(objOrderStatus.created_at).format("DD MMM YYYY")}
                    </Text>
                    <Block row style={{ alignSelf: "flex-end" }}>
                      <Block style={{ marginLeft: 17 }}>{renderStatus()}</Block>
                      <Block style={{ marginLeft: 5 }}>
                        <Text
                          style={
                            statusOrder.status_th == "ชำระเงินแล้ว"
                              ? styles.textStatusPayment
                              : statusOrder.status_th == "รอการชำระเงิน"
                              ? styles.textStatusWaitPayment
                              : styles.textStatusWaitCheck
                          }
                        >
                          {locale == "th"
                            ? statusOrder.status_th
                            : statusOrder.status_en}
                        </Text>
                      </Block>
                    </Block>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                        marginTop: 15,
                        textAlign: "right",
                      }}
                    >
                      {objOrderStatus.payment_type}
                    </Text>
                  </Block>
                </Block>
              </Block>

              {/* Order List */}
              <FlatList
                data={cartList}
                style={styles.containers}
                renderItem={renderDetailStatus}
                keyExtractor={(item) => item.id.toString()}
              />

              {/* EMS */}
              {logistics_list.map((item) => (
                <Block
                  key={item.id}
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
                        source={{ uri: rootImage + item.image }}
                        style={{ width: 170, height: 50, margin: 10 }}
                      />
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 18,
                        }}
                      >
                        {item.name_en + " - " + item.name_th}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 18,
                        }}
                      >
                        ระยะเวลาในการส่ง : {item.period}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 18,
                        }}
                      >
                        อัตราค่าบริการ :{" "}
                        {commaNumber(objOrderStatus.delivery_charge)} บาท
                      </Text>
                    </Block>
                  </Block>
                </Block>
              ))}

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
                        แขวง/ตำบล :
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
                        {objOrderStatus.fullname}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {objOrderStatus.telephone}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {objOrderStatus.address}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {locale == "th"
                          ? objOrderStatus.sub_district_name_th
                          : objOrderStatus.sub_district_name_en}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {locale == "th"
                          ? objOrderStatus.district_name_th
                          : objOrderStatus.district_name_en}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {locale == "th"
                          ? objOrderStatus.province_name_th
                          : objOrderStatus.province_name_en}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontFamily: "kanitRegular",
                          fontSize: 16,
                        }}
                      >
                        {objOrderStatus.postcode}
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
                    {commaNumber(objOrderStatus.total_amount)}
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
                    {commaNumber(
                      parseFloat(objOrderStatus.delivery_charge).toFixed(2)
                    )}
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
                    ส่วนลด : ฿ -{commaNumber(objOrderStatus.discount)}
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
                    ส่วนลดโปรโมชั่น : ฿ -
                    {commaNumber(objOrderStatus.discount_promotion)}
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
                    ภาษี : ฿ {commaNumber(objOrderStatus.vat)}
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
                    ยอดรวมทั้งสิ้น : ฿ {commaNumber(TotalAmounts)}
                  </Text>
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
                  title={"ดาวน์โหลดใบเสร็จ"}
                  type="solid"
                  containerStyle={styles.blockButton1}
                  buttonStyle={styles.buttonStyle1}
                  onPress={downloadSlipPayment()}
                />
                <Button
                  titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                  title={"ยกเลิกคำสั่งซื้อ"}
                  type="solid"
                  containerStyle={styles.blockButton2}
                  buttonStyle={styles.buttonStyle2}
                  onPress={() => handleCancelOrder(item)}
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

      <ModalLoading loading={!loading} />
    </>
  );
}

export default connect(null, ActionOrderStatus.actions)(OrderStatus);

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
    backgroundColor: "#ff4545",
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

const ORDER_STATUS_LIST = [
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
