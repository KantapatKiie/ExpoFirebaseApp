import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  FlatList,
  Image,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { actions as ActionProduct } from "../../actions/action-product/ActionProduct";
import { actions as ActionPromotions } from "../../actions/action-promotions/ActionPromotions";
import { Block, Text, theme } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import products from "../../constants/products";
import products2 from "../../constants/products2";
import commaNumber from "comma-number";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";
import ModalLoading from "../../components/ModalLoading";

const { height, width } = Dimensions.get("screen");
let token = getToken();
//const rootImage = "http://10.0.1.37:8080";
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

function Promotions(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  var LOAD_MORE = formatTr("LOAD_MORE").toString();
  const [loading, setLoading] = useState(null);
  const { objPromotions, listTrPromotions } = useSelector((state) => ({
    objPromotions: state.actionPromotions.objPromotions,
    listTrPromotions: state.actionPromotions.listTrPromotions,
  }));
  const { objProductActivity } = useSelector((state) => ({
    objProductActivity: state.actionProduct.objProductActivity,
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

  const [numColumns] = useState(2);
  const renderProduct = ({ item }) => {
    const selectProductPromotions = async (item) => {
      setLoading(true);
      await axios
        .get(API_URL.PROMOTIONS_SEARCH_HD_API + item.id, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          let newObj = Object.assign({}, objProductActivity);
          newObj.FLASHSALE = false;
          newObj.product_id = response.data.data.id;

          newObj.TITLE =
            locale == "th"
              ? response.data.data.name_th
              : response.data.data.name_en;
          if (locale == "th") {
            newObj.DETAIL = response.data.data.description_th;
          } else {
            newObj.DETAIL = response.data.data.description_en;
          }
          newObj.IMAGE = response.data.data.image;
          newObj.PRICE = response.data.data.price;
          newObj.product_full_price = response.data.data.full_price;
          newObj.stock = response.data.data.stock;
          newObj.quantity = 1;
          newObj.discount = 0;
          if (locale == "th") {
            newObj.product_info_th = response.data.data.info_th;
          } else {
            newObj.product_info_th = response.data.data.info_en;
          }
          newObj.product_favorite = response.data.data.favorite;

          setLoading(false);
          props.setObjProductActivity(newObj);
          props.navigation.navigate("Products");
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    };
    return (
      <Block flex style={styles.textContainerBlock1}>
        <TouchableOpacity onPress={selectProductPromotions}>
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
          <Block style={styles.productText}>
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
                ราคา : ฿{commaNumber(parseFloat(item.price).toFixed(2))}
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  const loadMoreProducts = () => {
    const newConcatState = stateObj.concat(products2);
    setStateObj(newConcatState);
  };

  return (
    <>
      <Block flex center style={{ width: width }}>
        <View style={{ backgroundColor: "white" }}>
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              stickySectionHeadersEnabled={false}
              sections={PROMOTION_LIST}
              renderSectionHeader={() => (
                <>
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
                    onPress={loadMoreProducts}
                    style={{ marginBottom: 30 }}
                  >
                    <Text
                      style={styles.loadMoreText}
                      size={14}
                      color={theme.COLORS.PRIMARY}
                    >
                      {LOAD_MORE + " >"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              renderSectionFooter={() => <>{<WangdekInfo />}</>}
              renderItem={() => {
                return null;
              }}
            />
          </SafeAreaView>
        </View>
      </Block>
      <ModalLoading loading={loading} />
    </>
  );
}

const mapActions = {
  //Product Detail
  setObjProductActivity: ActionProduct.setObjProductActivity,
  clearObjProductActivity: ActionProduct.clearObjProductActivity,
  setListTrProductActivity: ActionProduct.setListTrProductActivity,

  //Promotions Detail
  setObjPromotions: ActionPromotions.setObjPromotions,
  clearObjPromotions: ActionPromotions.clearObjPromotions,
  setListTrPromotions: ActionPromotions.setListTrPromotions,
};

export default connect(null, mapActions)(Promotions);

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

const PROMOTION_LIST = [
  {
    title: "Mock",
    horizontal: false,
    data: [
      {
        key: "1",
        uri: "",
      },
    ],
  },
];
