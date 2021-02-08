import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Block } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import Slideshow from "react-native-image-slider-show";

const { height, width } = Dimensions.get("screen");

function HowTo(props) {
  const [stateObj, setStateObj] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ backgroundColor: "white" }}>
          {/* Title */}
          <TouchableOpacity onPress={() => props.navigation.navigate("Flash Sale")}>
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
                {"<  "}วิธีการสั่งซื้อสินค้า
              </Text>
            </Block>
          </TouchableOpacity>
          <Block
            style={{
              width: width,
              height: 45,
              paddingTop: 5,
              backgroundColor: "white",
              marginBottom: 50,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              ขั้นตอนการทำรายการสั่งซื้อ
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              ติดต่อสอบถามเพิ่มเติม กรุณาติดต่อ Customer
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              Service Center โทร 02-272-1490 หรือ
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              info@wangdekshopping.com
            </Text>
          </Block>
          {/* Slideshow */}
          <Block style={{ marginBottom: 20 }}>
            <Slideshow
              dataSource={[
                { url: require("../../assets/images/HowTo/step1.jpg") },
                { url: require("../../assets/images/HowTo/step2.jpg") },
                { url: require("../../assets/images/HowTo/step3.jpg") },
                { url: require("../../assets/images/HowTo/step4.jpg") },
                { url: require("../../assets/images/HowTo/step5.jpg") },
              ]}
              height={445}
              arrowSize={10}
              indicatorColor={"#757474"}
              indicatorSelectedColor={"orange"}
              arrowColor={"black"}
            />
          </Block>
          {/* Guide 1 */}
          <Block style={{ marginTop: 25 }}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: "kanitRegular",
                color: "#0772f5",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              1. เลือกสินค้าที่คุณต้องการสั่งซื้อ
            </Text>
            <Block>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                  color: "black",
                  textAlign: "left",
                  marginLeft: 20,
                }}
              >
                {formatTr("GUIDE_TEXT1").toString()}
              </Text>
            </Block>
          </Block>
          {/* Guide 2 */}
          <Block style={{ marginTop: 25 }}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: "kanitRegular",
                color: "#ffc400",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              2. ตรวจสอบรายการสินค้า
            </Text>
            <Block>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                  color: "black",
                  textAlign: "left",
                  marginLeft: 20,
                }}
              >
                {formatTr("GUIDE_TEXT2").toString()}
              </Text>
            </Block>
          </Block>
          {/* Guide 3 */}
          <Block style={{ marginTop: 25, marginBottom: 15 }}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: "kanitRegular",
                color: "#ff5100",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              3. ช่องทางการจัดส่งสิน้คา
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              {formatTr("GUIDE_TEXT3").toString()}
            </Text>
            <Block row style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                  color: "black",
                  textAlign: "left",
                  marginLeft: 20,
                }}
              >
                สามารถดู
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "kanitRegular",
                    color: "#00eb89",
                    textAlign: "left",
                    marginLeft: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#00eb89",
                  }}
                >
                  การจัดส่งสินค้า
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                  color: "black",
                  textAlign: "left",
                  marginLeft: 5,
                }}
              >
                ได้ที่นี่ {" <<"}
              </Text>
            </Block>
          </Block>
          {/* Image Show */}
          <Image
            source={require("../../assets/images/HowTo/00.jpg")}
            style={{
              width: width,
              height: 550,
            }}
          />
          {/* Guide 4 */}
          <Block style={{ marginTop: 25 }}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: "kanitRegular",
                color: "#ff0000",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              4. ช่องทางการชำระเงิน
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              {formatTr("GUIDE_TEXT4").toString()}
            </Text>
            <Block row style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                  color: "black",
                  textAlign: "left",
                  marginLeft: 20,
                }}
              >
                สามารถดู
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "kanitRegular",
                    color: "#00eb89",
                    textAlign: "left",
                    marginLeft: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#00eb89",
                  }}
                >
                  วิธีการชำระเงิน
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                  color: "black",
                  textAlign: "left",
                  marginLeft: 5,
                }}
              >
                ได้ที่นี่ {" <<"}
              </Text>
            </Block>
          </Block>
          {/* Guide 5 */}
          <Block style={{ marginTop: 25, marginBottom: 40 }}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: "kanitRegular",
                color: "#d121ab",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              5. แจ้งชำระเงิน
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "left",
                marginLeft: 20,
              }}
            >
              {formatTr("GUIDE_TEXT5").toString()}
            </Text>
            <Block row style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                  color: "black",
                  textAlign: "left",
                  marginLeft: 20,
                }}
              >
                สามารถดู
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "kanitRegular",
                    color: "#00eb89",
                    textAlign: "left",
                    marginLeft: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#00eb89",
                  }}
                >
                  วิธีการแจ้งชำระเงิน
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                  color: "black",
                  textAlign: "left",
                  marginLeft: 5,
                }}
              >
                ได้ที่นี่ {" <<"}
              </Text>
            </Block>
          </Block>
          <WangdekInfo />
        </Block>
      </ScrollView>
    </>
  );
}

export default HowTo;

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
});
