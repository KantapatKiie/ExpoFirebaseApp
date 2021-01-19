import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { connect, useSelector } from "react-redux";
import * as ActionOrder from "../../actions/action-order-status/ActionOrder";
import products from "../../constants/products";
import WangdekInfo from "../../components/WangdekInfo";
import { Icon } from "../../components/";
import { Button } from "react-native-elements";
import commaNumber from "comma-number";

const { height, width } = Dimensions.get("screen");

function OrderScreen(props) {
  const { objOrderScreen } = useSelector((state) => ({
    objOrderScreen: state.actionOrder.objOrderScreen,
  }));

  useEffect(() => {
    // props.clearObjOrderScreen();
  }, []);

  const onChangeValue = (value) => {
    let newObj = Object.assign({}, objOrderScreen);
    newObj.COUNT = value;
    props.setObjOrderScreen(newObj);
  };

  //#region modalConfirm
  const [modalVisible, setModalVisible] = useState(false);
  const handleConfirm = (e) => {
    setModalVisible(false);
  };
  const modalHeader = (
    <View style={styles2.modalHeader}>
      <Text style={styles2.title}>Notifications 📢</Text>
      <View style={styles2.divider}></View>
    </View>
  );
  const modalBody = (
    <View style={styles2.modalBody}>
      <Text style={styles2.bodyText}>
        Are you sure you want to product confirm ?
      </Text>
    </View>
  );
  const modalFooter = (
    <View style={styles2.modalFooter}>
      <View style={styles2.divider}></View>
      <View style={{ flexDirection: "row-reverse", margin: 10 }}>
        <TouchableOpacity
          style={{ ...styles2.actions, backgroundColor: "#ed6868" }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles2.actionText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles2.actions, backgroundColor: "#54bf6d" }}
          onPress={(e) => handleConfirm(e)}
        >
          <Text style={styles2.actionText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const modalContainer = (
    <View style={styles2.modalContainer}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </View>
  );
  const modal = (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles2.modal}>
        <View>{modalContainer}</View>
      </View>
    </Modal>
  );
  //#endregion

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <TouchableOpacity onPress={() => props.navigation.navigate("Cart")}>
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
                <Block style={{ height: "60%", width: "80%" }}>
                  <Text style={styles.fontTitleProduct}>{item.title}</Text>
                </Block>

                <Block row>
                  <Text style={styles.detailText}>จำนวน : </Text>
                  <Text style={styles.detailText}>1</Text>
                </Block>
              </Block>
            </Block>

            <Block row style={{ width: "90%", alignSelf: "center" }}>
              <Block style={{ width: "75%", alignSelf: "center" }}>
                <Text style={styles.fontPriceProduct}>฿{commaNumber(item.price)}</Text>
              </Block>
              <Block style={{ width: "25%", alignSelf: "center" }}>
                <Text style={styles.fontPriceProduct}>฿{commaNumber(item.price)}</Text>
              </Block>
            </Block>
          </Block>
        ))}

        {infoItem.map((item) => (
          <Block style={styles.blockHeaderInfo} key={item.key}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(item.page)}
            >
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text
                  style={{
                    textAlign: "left",
                    color: "black",
                    fontSize: 17,
                    fontFamily: "kanitRegular",
                  }}
                >
                  {item.text}
                </Text>
                <Icon
                  name="angle-right"
                  family="font-awesome"
                  style={{ paddingRight: 5 }}
                />
              </Block>
            </TouchableOpacity>
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
            onPress={() => props.navigation.navigate("Product Order")}
          />
        </Block>

        <WangdekInfo />
      </ScrollView>
      {modal}
    </>
  );
}

export default connect(null, ActionOrder.actions)(OrderScreen);

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
  blockHeaderInfo: {
    paddingLeft: 25,
    paddingTop:8,
    backgroundColor: "#f7f7f7",
    height:55,
    borderBottomWidth:1,
    borderBottomColor:"#e0e0e0"
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

const infoItem = [
  {
    key: "1",
    text: "ใช้ส่วนลด",
    page: "Use Coupon",
  },
  {
    key: "2",
    text: "ช่องทางการจัดส่ง",
    page: "Use Delivery",
  },
  {
    key: "3",
    text: "ที่อยู่ในการจัดส่ง",
    page: "Use Address Delivery",
  },
];

