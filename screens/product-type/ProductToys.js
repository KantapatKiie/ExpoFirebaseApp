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
import * as ActionProductToys from "../../actions/action-product-toys/ActionProductToys";
import { Block, Text, theme, Input } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import products from "../../constants/products";
import products2 from "../../constants/products2";

const { height, width } = Dimensions.get("screen");

function ProductToys(props) {
  const { objProductToys } = useSelector((state) => ({
    objProductToys: state.actionProductToys.objProductToys,
  }));

  useEffect(() => {
    setStateObj(products);
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
  const [objFilter, setObjFilter] = useState({
    filter_product: "",
  });

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
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 25,
              }}
            >
              ของใช้และของเล่นเด็ก
            </Text>
          </Block>
        </TouchableOpacity>
        <Block row style={{ marginLeft: 10 }}>
          <Image
            style={{ width: 35, height: 35, marginTop: 8 }}
            source={require("../../assets/iconSignIn/filter-1.png")}
          />
          <Block row style={styles.search}>
            <Text
              style={{
                color: "#7d7d7d",
                fontFamily: "kanitRegular",
                fontSize: 15,
                marginTop: 5,
                marginLeft: 10,
              }}
            >
              {"ตัวกรอง"}
            </Text>
            <TouchableOpacity style={{
                  marginLeft: "67%",
                }}>
              <Image
                style={{
                  width: 34,
                  height: 34,
                }}
                source={require("../../assets/iconSignIn/filter-2.png")}
              />
            </TouchableOpacity>
          </Block>
        </Block>
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

export default connect(null, ActionProductToys.actions)(ProductToys);

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
  search: {
    height: 35,
    width: width - 70,
    alignSelf: "flex-end",
    borderWidth: 1.5,
    borderRadius: 1,
    backgroundColor:"#f0f0f0",
    borderColor:"#f0f0f0",
    marginLeft:10
  },
});
