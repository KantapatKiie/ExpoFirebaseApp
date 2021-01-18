import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import * as ActionOrderStatus from "../../actions/action-order-status/ActionOrderStatus.js";
import { Block, Text, theme, Input } from "galio-framework";
import WangdekInfo from "../../components/WangdekInfo";
import { formatTr } from "../../i18n/I18nProvider";
import { Button } from "react-native-elements";
import StepIndicator from "react-native-step-indicator";
import product from "../../constants/products"

const { height, width } = Dimensions.get("screen");

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

function OrderStatus(props) {
  const { objOrderStatus } = useSelector((state) => ({
    objOrderStatus: state.actionOrderStatus.objOrderStatus,
  }));

  useEffect(() => {
    // setStateObj(products);
  }, []);

  //   Step Indicators
  const [currentPosition, setCurrentPosition] = useState(0);
  const onStepPress = (position) => {
    setCurrentPosition(position);
  };
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

  let status = "payment";
  const renderStatus = () => {
    if (status == "payment") {
      return (
        <Image
          source={require("../../assets/images/order-filter/status1-icon.png")}
          style={styles.iconStatus}
        />
      );
    } else if (status == "waitpay") {
      return (
        <Image
          source={require("../../assets/images/order-filter/status2-icon.png")}
          style={styles.iconStatus}
        />
      );
    } else if (status == "waitcheck") {
      return (
        <Image
          source={require("../../assets/images/order-filter/status3-icon.png")}
          style={styles.iconStatus}
        />
      );
    }
    return null;
  };

  const renderProdctOrderList = () => {
    return (
      <Block
        style={{
          marginTop: 15,
          width: width,
          height: "12%",
        }}
      >
        <Block row style={{ margin: 15 }}>
          <Image
            source={require("../../assets/images/bg-p.jpg")}
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
              My Mini Mixxie!'s Beach
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
                1
              </Text>
            </Block>
          </Block>
        </Block>
        <Block row style={{ margin: 15 }}>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 25,
            }}
          >
            ฿2,500
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 25,
              marginLeft: "50%"
            }}
          >
            ฿2,500
          </Text>
        </Block>
      </Block>
    );
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              onPress={onStepPress}
            />
          </Block>
        </Block>

        {/* Data */}
        <Block
          style={{
            marginTop: 15,
            backgroundColor: "white",
            width: width,
            height: "14%",
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
          <Block row>
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
            <Block style={{ marginLeft: "24%" }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                  textAlign: "right",
                }}
              >
                UCM789456123
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
                8 ก.พ. 2564
              </Text>
              <Block row>
                {renderStatus()}
                <Text
                  style={{
                    color: "#00c278",
                    fontFamily: "kanitRegular",
                    fontSize: 18,
                    marginTop: 12,
                  }}
                >
                  {"  "}ชำระเงินแล้ว
                </Text>
              </Block>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                  marginTop: 14,
                  textAlign: "right",
                }}
              >
                เครดิตการ์ด
              </Text>
            </Block>
          </Block>
        </Block>

        {/* Order Product */}
        {renderProdctOrderList()}

        {/* EMS */}
        <Block
          style={{
            backgroundColor: "white",
            width: width,
            height: "25%",
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
                source={require("../../assets/images/bank_ems/ep-EMS.jpg")}
                style={{ width: 170, height: 50, margin: 10 }}
              />
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                }}
              >
                EMS - ไปรษณีย์ด่วนพิเศษ
              </Text>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                }}
              >
                ระยะเวลาในการส่ง : 3 - 5 วัน
              </Text>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                }}
              >
                อัตราค่าบริการ : 50 บาท
              </Text>
            </Block>
            <Block>
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
                    ชื่อ
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 16,
                    }}
                  >
                    เบอร์โทร
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 16,
                    }}
                  >
                    ที่อยู่
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 16,
                    }}
                  >
                    แขวง/ตำบล
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 16,
                    }}
                  >
                    เขต/อำเภอ
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 16,
                    }}
                  >
                    จังหวัด
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 16,
                    }}
                  >
                    รหัสไปรษณีย์
                  </Text>
                </Block>
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
          <Block style={{margin:25}}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
                textAlign: "right",
              }}
            >
              ยอดรวมค่าสินค้า : ฿6,700.00
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
                textAlign: "right",
                marginTop: 12
              }}
            >
              ค่าจัดส่ง : ฿50.00
            </Text>
            <Text
              style={{
                color: "red",
                fontFamily: "kanitRegular",
                fontSize: 18,
                textAlign: "right",
                marginTop: 12
              }}
            >
              ส่วนลด : -฿50.00
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
                textAlign: "right",
                marginTop: 12
              }}
            >
              ภาษี 7% : ฿65.80
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 23,
                textAlign: "right",
                marginTop: 12
              }}
            >
              ยอดรวมทั้งสิ้น : ฿13,990.00
            </Text>
          </Block>
        </Block>

        {/* Button */}
        <Block
          row
          style={{ paddingTop: 40, paddingBottom: 40, alignSelf: "center", backgroundColor:"white" , width:width}}
        >
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={"ดาวน์โหลดใบเสร็จ"}
            type="solid"
            onPress={() => props.navigation.navigate("Flash Sale")}
            containerStyle={styles.blockButton1}
            buttonStyle={styles.buttonStyle1}
          />
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={"ยกเลิกคำสั่งซื้อ"}
            type="solid"
            containerStyle={styles.blockButton2}
            buttonStyle={styles.buttonStyle2}
            onPress={() => showToast()}
          />
        </Block>
        
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionOrderStatus.actions)(OrderStatus);

const styles = StyleSheet.create({
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
    alignSelf: "center",
  },
  buttonStyle2: {
    backgroundColor: "#ff4545",
    borderRadius: 20,
    width: 170,
    alignSelf: "center",
  },
  iconStatus:{
    width: 20, height: 20,marginTop:15
  }
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
