import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { connect, useSelector } from "react-redux";
import * as ActionProductActivity from "../actions/action-product/ActionProduct";

const { width } = Dimensions.get("screen");

function Product(props) {
  const {
    navigation,
    product,
    horizontal,
    full,
    style,
    priceColor,
    imageStyle,
  } = props;
  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];
  const { objProductActivity } = useSelector((state) => ({
    objProductActivity: state.actionProduct.objProductActivity,
  }));
  const onClickProducts = () => {
    navigation.navigate("Products", { params: product });
    let newObj = Object.assign({}, objProductActivity);
    newObj.TITLE = product.title;
    newObj.IMAGE = product.image;
    newObj.PRICE = product.price;
    newObj.DETAIL = product.detail;
    newObj.TOTAL_PRICE = product.price;
    newObj.COUNT = 1;
    props.setObjProductActivity(newObj);
  };

  return (
    <>
      <Block
        row={horizontal}
        card
        flex
        style={[styles.product, styles.shadow, style]}
      >
        {/* Source Image */}
        <TouchableWithoutFeedback>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: product.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        {/* Click */}
        <TouchableOpacity onPress={onClickProducts}>
          <Block flex space="between" style={styles.productDescription}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text
              style={styles.productPrice}
              muted={!priceColor}
              color={priceColor}
            >
              {product.price}฿
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    </>
  );
}

// export default withNavigation(Product);
export default withNavigation(
  connect(null, ActionProductActivity.actions)(Product)
);

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
    fontSize: 11.5,
  },
  productPrice: {
    flexWrap: "wrap",
    fontSize: 13,
    fontWeight: "700",
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 2,
    marginHorizontal: theme.SIZES.BASE / 1.5,
    marginTop: -20,
  },
  horizontalImage: {
    height: 150,
    width: "auto",
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
