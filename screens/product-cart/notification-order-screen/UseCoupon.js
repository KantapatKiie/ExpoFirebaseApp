import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { connect, useSelector } from "react-redux";
import * as ActionOrder from "../../../actions/action-order-status/ActionOrder";
import WangdekInfo from "../../../components/WangdekInfo";
import { Icon } from "../../../components/";
import { Button } from "react-native-elements";

const { height, width } = Dimensions.get("screen");

function UseCoupon(props) {
  const { objOrderScreen } = useSelector((state) => ({
    objOrderScreen: state.actionOrder.objOrderScreen,
  }));

  useEffect(() => {
    // props.clearObjUseCoupon();
  }, []);

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
  const onChangeCodeCoupon = () => {
    let newObj = Object.assign({}, objUseCoupon);
    newObj.CODE_COUPON = value;
    props.setObjUseCoupon(newObj);
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <TouchableOpacity onPress={() => props.navigation.navigate("Order Screen")}>
          <Block row style={styles.container}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              {"<  "}ใช้ส่วนลด
            </Text>
          </Block>
        </TouchableOpacity>

        {/* Head */}
        <Block style={{ backgroundColor: "white" }}>
          <Block style={{ margin: 15 }}>
            <Text style={styles.fontTitleProduct}>กรอกโค้ดเพื่อรับส่วนลด</Text>
            <Block style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder={"กรุณากรอกรหัสส่วนลด"}
                placeholderTextColor="#808080"
                value={objOrderScreen.CODE_COUPON}
                onChangeText={onChangeCodeCoupon}
              />
            </Block>
          </Block>
          <Block
            style={{ paddingTop: 10, paddingBottom: 30, alignSelf: "center" }}
          >
            <Button
              titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
              title={"ใช้โค้ด"}
              type="solid"
              buttonStyle={styles.buttonStyle1}
              onPress={() => props.navigation.navigate("")}
            />
          </Block>

          {/* My coupon */}
          <Block style={{backgroundColor:"white"}}>
            <Text style={styles.fontTitleProduct}>คูปองของฉัน</Text>
            <Block
              row
              style={{ backgroundColor: "#ededed", width: width, height: 120 , marginBottom:5}}
            >
              <Image
                source={require("../../../assets/images/coupon/coupon-1.png")}
                style={{ width: 160, height: 80, margin: 20 }}
              />
              <Button
                titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                title={"ใช้คูปอง"}
                type="solid"
                buttonStyle={styles.buttonCoupon}
                onPress={() => props.navigation.navigate("")}
              />
            </Block>
          </Block>
        </Block>

        {/* Button */}
        <Block
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
            title={"ตกลง"}
            type="solid"
            buttonStyle={styles.buttonStyle1}
            onPress={() => props.navigation.navigate("Order Screen")}
          />
        </Block>
       
        <WangdekInfo />
      </ScrollView>
      {modal}
    </>
  );
}

export default connect(null, ActionOrder.actions)(UseCoupon);

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
  inputView: {
    width: "95%",
    backgroundColor: "#fafafa",
    height: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1.4,
    borderColor: "#e0e0e0",
    borderRadius: 2,
    alignSelf: "center",
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 15,
    fontFamily: "kanitRegular",
  },
  fontTitleProduct: {
    paddingLeft: 12,
    paddingBottom: 10,
    fontFamily: "kanitRegular",
    fontSize: 17,
    color: "black",
  },
  buttonStyle1: {
    backgroundColor: "#02d483",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  buttonCoupon: {
    backgroundColor: "#02d483",
    borderRadius: 15,
    width: 120,
    height: 30,
    alignSelf: "center",
    marginTop: 42,
    marginLeft: 20,
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
