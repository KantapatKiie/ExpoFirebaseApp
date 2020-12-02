import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { HeaderHeight } from "../constants/utils";
import { connect, useSelector } from "react-redux";
import { actions as ActionProduct } from "../actions/action-product/ActionProduct";
import { actions as ActionCart } from "../actions/action-cart/ActionCart";

const { height, width } = Dimensions.get("screen");

function ProductScreen(props) {
  const { objProductActivity } = useSelector((state) => ({
    objProductActivity: state.actionProduct.objProductActivity,
  }));
  const { objCartBasket } = useSelector((state) => ({
    objCartBasket: state.actionCart.objCartBasket,
  }));

  useEffect(() => {
    // props.clearObjProductActivity();
  }, []);

  //onChangeCount
  const onChangeProductInsert = () => {
    let newObj = Object.assign({}, objProductActivity);
    newObj.COUNT = objProductActivity.COUNT + 1;
    newObj.TOTAL_PRICE = objProductActivity.PRICE * newObj.COUNT;
    props.setObjProductActivity(newObj);
  };
  const onChangeProductDelete = () => {
    let newObj = Object.assign({}, objProductActivity);
    if (objProductActivity.COUNT <= 0) {
      return 0;
    } else {
      newObj.COUNT = objProductActivity.COUNT - 1;
      newObj.TOTAL_PRICE = objProductActivity.PRICE * newObj.COUNT;
    }
    props.setObjProductActivity(newObj);
  };
  const onclickAddProduct = () => {
    let newObjCart = Object.assign({}, objCartBasket);
    newObjCart.CART_ID = "CRTID001";
    newObjCart.TITLE = objProductActivity.TITLE;
    newObjCart.DETAIL = objProductActivity.DETAIL;
    newObjCart.IMAGE = objProductActivity.IMAGE;
    newObjCart.PRICE = objProductActivity.PRICE;
    newObjCart.COUNT = objProductActivity.COUNT;
    newObjCart.TOTAL_PRICE = objProductActivity.TOTAL_PRICE;

    props.setObjCartBasket(newObjCart);
    AsyncStorage["sessionCartBefore"] = newObjCart;
    props.navigation.navigate("Cart");
  };

  return (
    <>
      <Block flex style={styles.container}>
        <StatusBar barStyle="default" />
        {/* View */}
        <Block space="between" style={styles.paddedTop}>
          <Block row>
            <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
              <Icons
                name="arrow-left"
                size={20}
                color="black"
                style={styles.IconBack}
              />
            </TouchableOpacity>
          </Block>
          {/* Title */}
          <Block>
            <Text style={styles.titleText}>{objProductActivity.TITLE}</Text>
          </Block>
          {/* Image */}
          <Block
            row
            style={{
              marginTop: theme.SIZES.BASE * 1.5,
              marginBottom: theme.SIZES.BASE * 1.5,
            }}
          >
            <Image
              source={{
                uri: objProductActivity.IMAGE,
              }}
              style={{
                height: 200,
                width: 360,
              }}
            />
          </Block>
        </Block>
        {/* Detail */}
        <Block>
          <Text style={styles.descTitle}>Description : </Text>
          <Text style={styles.descTitles}>{objProductActivity.DETAIL}</Text>
        </Block>
        {/* Price */}
        <Block row>
          <Text style={styles.priceTitle}>Price</Text>
          <Text style={styles.priceTitles}>{objProductActivity.PRICE}฿</Text>
        </Block>
        <Block row>
          <Text style={styles.priceTitle}>Total Price</Text>
          <Text style={styles.priceTitles}>
            {objProductActivity.TOTAL_PRICE}฿
          </Text>
        </Block>
        {/* Button */}
        <Block space="between" style={styles.padded}>
          <Block row style={styles.blockbutton}>
            <Button
              shadowless
              style={styles.buttonAdd}
              color={"black"}
              onPress={onChangeProductInsert}
            >
              +
            </Button>
            <Text style={styles.countCart}>
              &nbsp;&nbsp;{objProductActivity.COUNT}&nbsp;&nbsp;
              {/* &nbsp;&nbsp;{count}&nbsp;&nbsp; */}
            </Text>
            <Button
              shadowless
              style={styles.buttonAdd}
              color={"black"}
              onPress={onChangeProductDelete}
            >
              -
            </Button>
          </Block>
          <Block flex>
            <Button
              shadowless
              style={styles.button}
              color={"black"}
              onPress={onclickAddProduct}
            >
              ADD TO CART
            </Button>
          </Block>
        </Block>
      </Block>
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
      />
    </>
  );
}

// export default ProductScreen;
// export default connect(null, ActionProduct.actions)(ProductScreen);
const mapActions = {
  setObjProductActivity: ActionProduct.setObjProductActivity,
  clearObjProductActivity: ActionProduct.clearObjProductActivity,
  setListTrProductActivity: ActionProduct.setListTrProductActivity,
  pushListTrProductActivity: ActionProduct.pushListTrProductActivity,

  setObjCartBasket: ActionCart.setObjCartBasket,
  clearObjCartBasket: ActionCart.clearObjCartBasket,
  setListTrCartBasket: ActionCart.setListTrCartBasket,
  pushListTrCartBasket: ActionCart.pushListTrCartBasket,
};
export default connect(null, mapActions)(ProductScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BUTTON_COLOR,
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: "absolute",
    bottom:
      Platform.OS === "android" ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  paddedTop: {
    alignSelf: "center",
    paddingTop: 100,
    zIndex: 3,
    position: "relative",
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  buttonAdd: {
    width: 35,
    height: theme.SIZES.BASE * 2,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  blockbutton: {
    alignSelf: "center",
  },
  IconBack: {
    color: "black",
  },
  countCart: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  gradient: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    paddingTop: 10,
    alignSelf: "center",
  },
  descTitle: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "left",
    paddingLeft: 15,
  },
  descTitles: {
    fontWeight: "200",
    fontSize: 14,
    textAlign: "justify",
    padding: 15,
  },
  priceTitle: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "right",
    padding: 15,
  },
  priceTitles: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "right",
    padding: 15,
    flex: 1,
  },
});
