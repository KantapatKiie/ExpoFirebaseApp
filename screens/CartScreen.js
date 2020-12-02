import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { HeaderHeight } from "../constants/utils";
import { connect, useSelector } from "react-redux";
import * as ActionCart from "../actions/action-cart/ActionCart";
import products from "../constants/products";

function CartScreen(props) {
  const { objCartBasket } = useSelector((state) => ({
    objCartBasket: state.actionCart.objCartBasket,
  }));

  useEffect(() => {
    // props.clearObjCartBasket();
  }, []);

  //#region renderProduct
  let totalPrice = 0;  //Cal TotalPrice
  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i].price;
  }
  const renderImage = (
    <>
      {products.map((item) => (
        <Block style={styles.containerImage} key={item.title}>
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              height: 100,
              width: 100,
            }}
          />
          <Block style={styles.containerDetail}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.titleText}>&nbsp;</Text>
            <Text style={styles.titleText}>&nbsp;</Text>
            <Block row>
              <Text style={styles.titleText}>Price:</Text>
              <Text style={styles.titleText}>{item.price}฿</Text>
            </Block>
          </Block>
        </Block>
      ))}
    </>
  );
  //#endregion

  //#region modalConfirm
  const [modalVisible, setModalVisible] = useState(false);
  const handleConfirm = (e) => {
    console.log("Yes Yes Yes Yes Yes");
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
      <Block flex style={styles.container}>
        <StatusBar barStyle="default" />
        {/* View */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block space="between" style={styles.paddedTop}>
            {renderImage}
          </Block>
        </ScrollView>
      </Block>
      <Block row style={{backgroundColor:"white"}}>
        <Text style={styles.totalPrice}>Total Price</Text>
        <Text style={styles.totalPrices}>{totalPrice}฿</Text>
      </Block>
      <Block space="between" style={styles.paddeds}>
        <Button
          shadowless
          style={styles.button}
          color={"black"}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          Confirm
        </Button>
        <Button
          shadowless
          style={styles.button}
          color={"black"}
          onPress={() => props.navigation.navigate("Home")}
        >
          Back
        </Button>
      </Block>
      {modal}
    </>
  );
}

export default connect(null, ActionCart.actions)(CartScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BUTTON_COLOR,
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    padding: 2,
    backgroundColor: "white",
  },
  containerConfirm: {
    backgroundColor: theme.COLORS.BUTTON_COLOR,
    backgroundColor: "white",
  },
  containerImage: {
    backgroundColor: "#242538",
    flexDirection: "row",
    overflow: "scroll",
    marginTop: theme.SIZES.BASE - 20,
    marginBottom: theme.SIZES.BASE - 5,
    borderRadius: 8,
  },
  containerDetail: {
    flexDirection: "column",
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE,
    position: "absolute",
    bottom:
      Platform.OS === "android" ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 2,
  },
  paddeds: {
    paddingHorizontal: theme.SIZES.BASE,
    flexDirection: "row",
    backgroundColor: "white"
  },
  button: {
    borderRadius: 12,
  },
  paddedTop: {
    paddingTop: 100,
    padding: 7,
    position: "relative",
  },
  IconBack: {
    color: "black",
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
    textAlign: "left",
    color: "white",
    flex: 1,
  },
  totalPrice:{
    fontSize: 17,
    fontWeight: "bold",
    padding: 10
  },
  totalPrices:{
    fontSize: 17,
    fontWeight: "bold",
    flex: 5,
    textAlign: "right",
    padding: 10
  }
});

//Style Modal Confirm
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
