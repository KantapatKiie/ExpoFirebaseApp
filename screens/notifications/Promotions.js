import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import * as ActionPromotions from "../../actions/action-promotions/ActionPromotions";
import { Block, Text, theme } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import products from "../../constants/products";

import products2 from "../../constants/products2";

const { height, width } = Dimensions.get("screen");

function Promotions(props) {
  const { objPromotions } = useSelector((state) => ({
    objPromotions: state.actionPromotions.objPromotions,
  }));

  useEffect(() => {
    setStateObj(products);
    console.log(stateObj);
  }, []);

  const [stateObj, setStateObj] = useState([
    {
      key: "1",
      title: "",
      detail: "",
      image: "1",
      price: "0",
      horizontal: true,
    },
  ]);

  const onClickProducts = () => {
    const newConcatState = stateObj.concat(products2);
    setStateObj(newConcatState);
  };

  const [numColumns] = useState(2);
  const renderProduct = ({ item }) => {
    return (
      <Block flex style={styles.textContainerBlock1}>
        <ImageBackground
          source={{
            uri: item.image,
          }}
          style={styles.imageProduct}
        >
          <Block
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#ff002f",
              alignSelf: "flex-end",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                marginTop: 8,
                color: "white",
                fontFamily: "kanitRegular",
                fontSize: 14,
              }}
            >
              -50%
            </Text>
          </Block>
        </ImageBackground>
        <TouchableOpacity onPress={onClickProducts} style={styles.productText}>
          <Block flex space="between" style={styles.productDescription}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 13,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 14,
              }}
            >
              ราคา : ฿{item.price}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        {/* Image Promotion */}
        <Image
          source={require("../../assets/images/HowTo/banner-1.jpg")}
          style={{ width: width, height: 350 }}
        />

        {/* ListItem */}
        <FlatList
          data={stateObj}
          style={styles.containers}
          renderItem={renderProduct}
          numColumns={numColumns}
        />
        <TouchableOpacity
          onPress={onClickProducts}
          style={{ marginBottom: 15 }}
        >
          <Text
            style={styles.loadMoreText}
            size={14}
            color={theme.COLORS.PRIMARY}
          >
            {formatTr("LOAD_MORE") + " >"}
          </Text>
        </TouchableOpacity>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionPromotions.actions)(Promotions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  containers: {
    flex: 1,
    marginVertical: 20,
  },
  textContainerBlock1: {
    padding: 10,
    flexWrap: "wrap",
    marginRight: 10,
  },
  imageProduct: {
    resizeMode: "cover",
    width: 180,
    height: 150,
  },
  productText: {
    width: 180,
    height: 100,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 1.5,
    backgroundColor: "white",
    borderBottomEndRadius: 2,
    borderBottomLeftRadius: 2,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    height: width / 3, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
  },
  loadMoreText: {
    alignSelf: "center",
    color: "black",
    fontFamily: "kanitRegular",
    borderBottomWidth: 5,
    borderBottomColor: "#ff002f",
    borderRadius: 2,
  },
});
