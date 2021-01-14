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
import * as ActionFavoriteView from "../actions/action-favorite-view/ActionFavoriteView";
import { Block, Text, theme } from "galio-framework";
import { formatTr } from "../i18n/I18nProvider";
import WangdekInfo from "../components/WangdekInfo";
import { Product } from "../components/";
import products from "../constants/products";

import products2 from "../constants/products2";

const { height, width } = Dimensions.get("screen");

function FavoriteView(props) {
  const { objFavoriteView } = useSelector((state) => ({
    objFavoriteView: state.actionFavoriteView.objFavoriteView,
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

  const [favorite, setFavorite] = useState(false);
  const onFavoriteProduct = () => {
    if (favorite === false) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
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
          <TouchableOpacity onPress={onFavoriteProduct}>
            <Image
              source={item.favorite ? require("../assets/iconSignIn/like-icon2.png") : require("../assets/iconSignIn/like-icon1.png")}
              style={{ width: 40, height: 40, alignSelf:"flex-end", marginRight:5,marginTop:"58%"}}
            />
            </TouchableOpacity>
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
        {/* Title */}
        <TouchableOpacity onPress={() => props.navigation.navigate("Sign In")}>
          <Block
            row
            style={{
              paddingTop: 20,
              paddingLeft: 20,
              paddingBottom: 20,
              backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              {"<  "}รายการโปรด
            </Text>
          </Block>
        </TouchableOpacity>
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

export default connect(null, ActionFavoriteView.actions)(FavoriteView);

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
