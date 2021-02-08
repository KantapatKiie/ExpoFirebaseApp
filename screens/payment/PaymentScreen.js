import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import { Block } from "galio-framework";
import { connect, useSelector } from "react-redux";
import * as ActionPayment from "../../actions/action-payment/ActionPayment";
import { Button } from "react-native-elements";
import { Icon } from "../../components";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";

const { height, width } = Dimensions.get("screen");

function PaymentScreen(props) {
  const { objPaymentHD } = useSelector((state) => ({
    objPaymentHD: state.actionPayment.objPaymentHD,
  }));

  useEffect(() => {
    setObjSearch({
      PLACE_NO: "",
    });
  }, []);

  const [objSearch, setObjSearch] = useState({
    PLACE_NO: "",
  });

  const showToast = () => {
    ToastAndroid.show("Test ToastAndriod React Native !", ToastAndroid.SHORT);
  };

  return (
    <>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
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
          {/* <Icons name="reply" color={"black"} size={15} style={{paddingTop:5}}/> */}
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 18,
            }}
          >
            {"<  "}ชำระเงิน
          </Text>
        </Block>
        </TouchableOpacity>
        <Block style={styles.blockStyle}>
          <Text
            style={{
              color: "#0300b3",
              fontFamily: "kanitRegular",
              fontSize: 23,
              textAlign: "center",
            }}
          >
            รายละเอียดบัญชีธนาคาร
          </Text>
        </Block>
        {/* Text Header */}
        <Block style={styles.blockStyle}>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            ระบบได้บันทึกใบสั่งซื้อสินค้าของท่านแล้ว
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            กรุณาชำระเงิน ภายใน 24 ชั่วโมง
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            มายังบัญชีธนาคารของทางเว็บไซต์ ดังนี้
          </Text>
        </Block>
        {/* Bank */}
        <Block row style={{ padding: 10, backgroundColor: "white" }}>
          <Image
            source={require("../../assets/images/BkkBank.jpg")}
            style={{ height: 80, width: 80, margin: 10 }}
          />
        </Block>
        <Block style={styles.blockStyle}>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            หรือ
          </Text>
        </Block>
        <Block
          row
          style={{
            padding: 10,
            backgroundColor: "#1916a1",
            width: 125,
            height: 140,
            alignSelf: "center",
          }}
        >
          <Image
            //source={require("../../assets/images/BkkBank.jpg")}
            style={{ height: 80, width: 80, margin: 10 }}
          />
        </Block>
        {/* Text Footer */}
        <Block style={{ paddingTop: 40 }}>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            หากท่านทำการชำระเงินเรียบร้อยแล้ว
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            กรุณาแจ้งชำระเงินที่หน้าเว็บไซต์ เพื่อให้
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            เจ้าหน้าที่ทำการตรวจสอบความถูกต้องก่อน
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            ทำการจัดส่งสินค้า
          </Text>
        </Block>
        {/* Button */}
        <Block row style={{ paddingTop: 20, paddingBottom: 40 }}>
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={formatTr("HOME_BACK").toString()}
            type="solid"
            onPress={() => props.navigation.navigate("Flash Sale")}
            containerStyle={styles.blockButton1}
            buttonStyle={styles.buttonStyle1}
          />
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={formatTr("PAYMENT_NOTIFICATION").toString()}
            type="solid"
            containerStyle={styles.blockButton2}
            buttonStyle={styles.buttonStyle2}
            onPress={() => showToast()}
          />
        </Block>
        {/* Info */}
        <WangdekInfo/>
      </ScrollView>
    </>
  );
}

export default connect(null, ActionPayment.actions)(PaymentScreen);

const styles = StyleSheet.create({
  buttonStyle1: {
    backgroundColor: "#356df0",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  buttonStyle2: {
    backgroundColor: "#11d1a5",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  blockStyle: {
    padding: 10,
  },
  blockButton1: {
    flexDirection: "row",
    paddingLeft: 25,
  },
  blockButton2: {
    paddingLeft: 40,
  },
  search: {
    height: 40,
    width: width - 48,
    alignSelf: "center",
    borderWidth: 1.5,
    borderRadius: 5,
  },
});