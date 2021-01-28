import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Block } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import * as ActionMyCoupon from "../../actions/action-my-coupon/ActionMyCoupon";
import WangdekInfo from "../../components/WangdekInfo";

const { height, width } = Dimensions.get("screen");

function MyCoupon(props) {
  const { objMyCoupon } = useSelector((state) => ({
    objMyCoupon: state.actionMyCoupon.objMyCoupon,
  }));
  useEffect(() => {
    setMenu1(true);
    setMenu2(false);
  }, []);
  // Set MenuTAB
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);

  const onSelectedMenu1 = () => {
    setMenu1(true);
    setMenu2(false);
  };
  const onSelectedMenu2 = () => {
    setMenu1(false);
    setMenu2(true);
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        {/* Title */}
        <TouchableOpacity onPress={() => props.navigation.navigate("Sign In")}>
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
              {"<  "}คูปองของฉัน
            </Text>
          </Block>
        </TouchableOpacity>
        {/* Menu List */}
        <Block style={{ height: 50, backgroundColor: "#ededed" }}>
          <Block row style={{ marginLeft: 50 }}>
            <TouchableOpacity onPress={onSelectedMenu1}>
              <Text style={menu1 ? styles.textMenuSelect : styles.textMenu}>
                คูปองที่ใช้ได้
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSelectedMenu2}>
              <Text style={menu2 ? styles.textMenuSelect : styles.textMenu}>
                คูปองที่ใช้ไปแล้ว
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
        {/* Coupon */}
        {menu1 ? (
          <Block style={{ backgroundColor: "white" }}>
            <Text
              style={{
                fontFamily: "kanitRegular",
                fontSize: 15,
                color: "red",
                textAlign: "center",
              }}
            >
              กรุณาเลือกสินค้าในตะกร้าก่อนเลือกคูปองส่วนลด
            </Text>
            <Block style={{ marginTop: 15, alignSelf: "center" }}>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/images/coupon/coupon-1.png")}
                  style={{ height: 120, width: width - 160, marginTop: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/images/coupon/coupon-1.png")}
                  style={{ height: 120, width: width - 160, marginTop: 15 }}
                />
              </TouchableOpacity>
            </Block>
          </Block>
        ) : (
          <Block style={{ backgroundColor: "white" }}>
            <Text
              style={{
                fontFamily: "kanitRegular",
                fontSize: 15,
                color: "red",
                textAlign: "center",
              }}
            >
              กรุณาเลือกสินค้าในตะกร้าก่อนเลือกคูปองส่วนลด
            </Text>
            <Block style={{ marginTop: 15, alignSelf: "center" }}>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/images/coupon/coupon-1-use.png")}
                  style={{ height: 120, width: width - 160, marginTop: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/images/coupon/coupon-2-use.png")}
                  style={{ height: 120, width: width - 160, marginTop: 15 }}
                />
              </TouchableOpacity>
            </Block>
          </Block>
        )}
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionMyCoupon.actions)(MyCoupon);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  textMenu: {
    textAlign: "center",
    fontFamily: "kanitRegular",
    fontSize: 18,
    marginTop: 12,
    marginLeft: 38,
  },
  textMenuSelect: {
    textAlign: "center",
    fontFamily: "kanitRegular",
    fontSize: 18,
    marginTop: 12,
    marginLeft: 38,
    borderBottomColor: "#47a3f5",
    borderBottomWidth: 5,
    borderRadius: 2,
  },
});
