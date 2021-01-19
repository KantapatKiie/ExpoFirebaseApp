import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { connect, useSelector } from "react-redux";
import * as ActionOrder from "../../../actions/action-order-status/ActionOrder";
import WangdekInfo from "../../../components/WangdekInfo";
import { Button } from "react-native-elements";
import { RadioButton } from "react-native-paper";

const { height, width } = Dimensions.get("screen");

function UseDelivery(props) {
  const { objOrderScreen } = useSelector((state) => ({
    objOrderScreen: state.actionOrder.objOrderScreen,
  }));

  useEffect(() => {
    // props.clearObjUseCoupon();
  }, []);

  const [checkedDelivery, setCheckedDelivery] = useState("kerry");
  const renderDeliveryList = () => {
    return (
      <>
        {DeliveryList.map((item) => (
          <Block row style={item.type === checkedDelivery ? styles.blockRadio : styles.blockRadioWhite} key={item.key}>
            <Block style={{ marginLeft: 10, marginTop: 5 }}>
              <RadioButton.Group
                onValueChange={(value) => setCheckedDelivery(value)}
                value={checkedDelivery}
              >
                <RadioButton color="#02d483" value={item.type} />
              </RadioButton.Group>
            </Block>
            <Block style={{ marginLeft: 30, marginTop: 10 }}>
              <Image source={item.image} style={{ width: 180, height: 50 }} />
              <Block style={{ marginTop: 10 }}>
                <Text style={styles.textTitleDelivery}>{item.title}</Text>
                <Text style={styles.textDescDelivery}>{item.description1}</Text>
                <Text style={styles.textDescDelivery}>{item.description2}</Text>
              </Block>
            </Block>
          </Block>
        ))}
      </>
    );
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Order Screen")}
        >
          <Block row style={styles.container}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              {"<  "}ช่องทางการจัดส่ง
            </Text>
          </Block>
        </TouchableOpacity>

        {/* Head */}
        <Block style={{ backgroundColor: "white" }}>
          <Text style={styles.fontTitleProduct}>เลือกช่องทางการจัดส่ง</Text>
          {renderDeliveryList()}
        </Block>

        {/* Button */}
        <Block
          style={{
            paddingTop: 25,
            paddingBottom: 40,
            alignSelf: "center",
            backgroundColor: "white",
            width: width,
          }}
        >
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={"ตกลง"}
            type="solid"
            buttonStyle={styles.buttonStyle1}
            onPress={() => props.navigation.navigate("Order Screen")}
          />
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionOrder.actions)(UseDelivery);

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
  fontTitleProduct: {
    paddingLeft: 12,
    paddingBottom: 10,
    fontFamily: "kanitRegular",
    fontSize: 17,
    color: "black",
    marginLeft: 10,
    marginTop: 10,
  },
  buttonStyle1: {
    backgroundColor: "#02d483",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  blockRadio: {
    width: "95%",
    backgroundColor: "#f7f7f7",
    height: 150,
    alignSelf: "center",
    borderWidth: 0.2,
    borderColor: "gray",
    marginBottom: 10,
  },
  blockRadioWhite: {
    width: "95%",
    backgroundColor: "white",
    height: 150,
    alignSelf: "center",
    borderWidth: 0.2,
    borderColor: "gray",
    marginBottom: 10,
  },
  textTitleDelivery: {
    color: "black",
    fontFamily: "kanitBold",
    fontSize: 18,
  },
  textDescDelivery: {
    color: "black",
    fontFamily: "kanitRegular",
    fontSize: 15,
  },
});

const DeliveryList = [
  {
    key: "1",
    title: "EMS - ไปรษณีย์ด่วนพิเศษ",
    description1: " ระยะเวลาการส่ง : 3 - 5 วัน",
    description2: "อัตราค่าบริการ : 50 บาท",
    image: require("../../../assets/images/bank_ems/ep-EMS.jpg"),
    checked: true,
    type: "ems",
  },
  {
    key: "2",
    title: "เกี่ยวกับเรา",
    description1: " ระยะเวลาการส่ง : 1 - 2 วัน",
    description2: "อัตราค่าบริการ : 60 บาท",
    image: require("../../../assets/images/bank_ems/ep-Kerry.jpg"),
    checked: false,
    type: "kerry",
  },
  {
    key: "3",
    title: "เกี่ยวกับเรา",
    description1: " ระยะเวลาการส่ง : 1 - 2 วัน",
    description2: "อัตราค่าบริการ : 70 บาท",
    image: require("../../../assets/images/bank_ems/ep-Flash.jpg"),
    checked: false,
    type: "flash",
  },
];
