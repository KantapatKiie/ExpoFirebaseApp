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
import * as ActionCart from "../../actions/action-cart/ActionCart";
import products from "../../constants/products";
import WangdekInfo from "../../components/WangdekInfo";
import NumericInput from "react-native-numeric-input";
import { Button } from "react-native-elements";
import commaNumber from "comma-number";

const { height, width } = Dimensions.get("screen");

function CartScreen(props) {
  const { objCartScreen } = useSelector((state) => ({
    objCartScreen: state.actionCart.objCartScreen,
  }));

  useEffect(() => {
    // props.clearObjCartScreen();
  }, []);

  const onChangeValue = (value) => {
    let newObj = Object.assign({}, objCartScreen);
    newObj.COUNT = value;
    props.setObjCartScreen(newObj);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <TouchableOpacity
        // onPress={() => props.navigation.navigate("Home")}
        >
          <Block row style={styles.container}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              {"<  "}ตะกร้าสินค้า
            </Text>
          </Block>
        </TouchableOpacity>

        {products.map((item) => (
          <Block style={styles.blockProduct} key={item.key}>
            <Block row>
              <Block style={styles.blockSemiImage}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.imageProduct}
                />
              </Block>
              <Block style={styles.blockSemiImage2}>
                <Block style={{ height: "55%", width: "78%" }}>
                  <Text style={styles.fontTitleProduct}>{item.title}</Text>
                </Block>
                <Block row>
                  <Text style={styles.detailText}>จำนวน : </Text>
                  <NumericInput
                    value={parseInt(objCartScreen.COUNT)}
                    onChange={(value) => onChangeValue(value)}
                    totalWidth={110}
                    totalHeight={35}
                    iconSize={18}
                    step={1}
                    valueType="real"
                    type="plus-minus"
                    rounded={false}
                    textColor="black"
                    iconStyle={{ color: "white" }}
                    inputStyle={{ fontFamily: "kanitRegular" }}
                    leftButtonBackgroundColor="#adadad"
                    rightButtonBackgroundColor="#09db99"
                    containerStyle={{
                      marginLeft: 20,
                      fontFamily: "kanitRegular",
                    }}
                  />
                </Block>
              </Block>
            </Block>
            <Block row style={{ width: "90%", alignSelf: "center" }}>
              <Block style={{ width: "40%", alignSelf: "center" }}>
                <Text style={styles.fontPriceProduct}>฿{commaNumber(item.price)}</Text>
              </Block>
              <Block style={{ width: "40%", alignSelf: "center" }}>
                <Text style={styles.fontPriceProduct}>฿{commaNumber(item.price)}</Text>
              </Block>
              <Block style={{ marginLeft: 25 }}>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/images/order-filter/delete-icon.png")}
                    style={{ height: 35, width: 35, borderRadius: 25 }}
                  />
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
        ))}
        
        {/* Button */}
        <Block
          row
          style={{ paddingTop: 40, paddingBottom: 40, alignSelf: "center" }}
        >
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={"ซื้อสินค้าเพิ่เติม"}
            type="solid"
            containerStyle={styles.blockButton1}
            buttonStyle={styles.buttonStyle1}
            onPress={() => props.navigation.navigate("Home")}
          />
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={"ดำเนินการต่อ"}
            type="solid"
            containerStyle={styles.blockButton2}
            buttonStyle={styles.buttonStyle2}
            onPress={() => props.navigation.navigate("Order Screen")}
          />
        </Block>

        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionCart.actions)(CartScreen);

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
  blockProduct: {
    backgroundColor: "#ededed",
    width: width,
    height: height / 4,
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
});

//Style Modal
const styles2 = StyleSheet.create({
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
    width: "80%",
    borderRadius: 13,
  },
  modalHeader: {},
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 15,
    color: "#000",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
  modalBody: {
    backgroundColor: "#fff",
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  modalFooter: {},
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    color: "#fff",
  },
  bloxStyle: {
    marginTop: 10,
  },
});
