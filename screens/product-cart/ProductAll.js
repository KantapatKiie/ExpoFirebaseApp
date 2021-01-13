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
import * as ActionProductAll from "../../actions/action-product-all/ActionProductAll";
import { Block, Text, theme } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import products from "../../constants/products";
import { Product } from "../../components/";

const { height, width } = Dimensions.get("screen");

function ProductAll(props) {
  const { objProductAll } = useSelector((state) => ({
    objProductAll: state.actionProductAll.objProductAll,
  }));

  useEffect(() => {}, []);

  const [stateObj, setStateObj] = useState([
    {
      title: "",
      detail: "",
    },
  ]);

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
        {/* Best seller product */}
        <Block flex style={styles.textContainerBlocks1}>
          <Text
            style={{
              fontSize: 25,
              color: "white",
              marginTop: 20,
              fontFamily: "kanitRegular",
            }}
          >
            {formatTr("GOOD_PRODUCT")}
          </Text>
          <Block flex style={{ marginTop: 25 }}>
            <Block flex style={styles.containerBlock}>
              <Block flex row>
                <Product
                  product={products[7]}
                  style={{ marginRight: theme.SIZES.BASE }}
                />
                <Product product={products[5]} />
              </Block>
            </Block>
            <Block flex style={styles.containerBlock}>
              <Block flex row>
                <Product
                  product={products[6]}
                  style={{ marginRight: theme.SIZES.BASE }}
                />
                <Product product={products[8]} />
              </Block>
            </Block>
          </Block>
        </Block>
        {/* Popular product */}
        <Block flex style={styles.textContainerBlock2}>
          <Text style={{ fontSize: 25, fontFamily: "kanitRegular" }}>
            {formatTr("POPULAR_PRODUCT")}
          </Text>
          <Block
            flex
            style={{
              marginTop: 25,
            }}
          >
            <Block flex style={styles.containerBlock}>
              <Block flex row>
                <Product
                  product={products[1]}
                  style={{ marginRight: theme.SIZES.BASE }}
                />
                <Product product={products[2]} />
              </Block>
            </Block>
          </Block>
          <Block flex style={styles.containerBlock}>
            <Block flex row>
              <Product
                product={products[3]}
                style={{ marginRight: theme.SIZES.BASE }}
              />
              <Product product={products[4]} />
            </Block>
          </Block>
        </Block>
        {/* Popular Promotion */}
        <Block flex style={styles.textContainerBlock2}>
          <Text style={{ fontSize: 25, fontFamily: "kanitRegular" }}>
            {formatTr("PROMOTION_PRODUCT")}
          </Text>
          <Block
            flex
            style={{
              marginTop: 25,
            }}
          >
            <Block flex style={styles.containerBlock}>
              <Block flex row>
                <Product
                  product={products[1]}
                  style={{ marginRight: theme.SIZES.BASE }}
                />
                <Product product={products[2]} />
              </Block>
            </Block>
          </Block>
          <Block flex style={styles.containerBlock}>
            <Block flex row>
              <Product
                product={products[3]}
                style={{ marginRight: theme.SIZES.BASE }}
              />
              <Product product={products[4]} />
            </Block>
          </Block>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Promotions")}
          >
            <Text
              style={{
                alignSelf: "center",
                marginTop: 10,
                color: "black",
                fontFamily: "kanitRegular",
                borderBottomWidth: 5,
                borderBottomColor: "#ff002f",
                borderRadius: 2,
              }}
            >
              {formatTr("VIEW_ALL") + " >"}
            </Text>
          </TouchableOpacity>
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionProductAll.actions)(ProductAll);

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
  containerBlock: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  textContainerBlock1: {
    padding: 10,
    flexWrap: "wrap",
    marginRight: 10,
  },
  textContainerBlocks1: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#00d184",
    padding: 5,
    // marginTop: 10,
  },
  textContainerBlock2: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    marginTop: 25,
    padding: 5,
    marginBottom: 25,
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
