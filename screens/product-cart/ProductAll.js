import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  SectionList,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { actions as ActionProductAll } from "../../actions/action-product-all/ActionProductAll";
import { actions as ActionProduct } from "../../actions/action-product/ActionProduct";
import { actions as ActionPromotions } from "../../actions/action-promotions/ActionPromotions";
import { Block, Text, theme } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";
import commaNumber from "comma-number";
import ModalLoading from "../../components/ModalLoading";

const { width } = Dimensions.get("screen");
let token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

const defalutBestsaleProduct = [
  {
    id: 2,
    name_th: "กระเป๋า เอ",
    name_en: "Bag A",
    image: "/storage/2/download-%281%29.jfif",
    price: "1000.00",
    total_quantity: "4",
  },
];
const defalutPopularProduct = [
  {
    id: 2,
    name_th: "กระเป๋า เอ",
    name_en: "Bag A",
    image: "/storage/2/download-%281%29.jfif",
    price: "1000.00",
    total_quantity: "4",
  },
];
const defalutPromotionsProduct = [
  {
    id: 4,
    product_id: 4,
    product_name_th: "เสื้อผ้า 002",
    product_name_en: "Clothing 002",
    product_image: "/storage/4/images.jfif",
    product_price: 100,
    product_discount: "-50.00%",
    promotion_conditions_id: 3,
    promotions_id: 1,
  },
];

function ProductAll(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const [loading, setLoading] = useState(null);
  const { objProductActivity } = useSelector((state) => ({
    objProductActivity: state.actionProduct.objProductActivity,
  }));

  useEffect(() => {
    loadProductListAllType();
  }, []);

  // Best selling
  const [listBestsale, setListBestsale] = useState(defalutBestsaleProduct);
  const [listPopularSale, setListPopularSale] = useState(defalutPopularProduct);
  const [listPromotions, setListPromotions] = useState(
    defalutPromotionsProduct
  );
  async function loadProductListAllType() {
    await axios
      .get(API_URL.BEST_SELLING_PRODUCT_LISTVIEW_API, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: {
          page: 1,
        },
      })
      .then(async (response) => {
        var lstBestSale = await response.data.data.product_lists;
        let newlstBestsale = [];
        for (let i = 0; i < 4; i++) {
          if (lstBestSale[i] !== undefined)
            await newlstBestsale.push(lstBestSale[i]);
        }
        setListBestsale(newlstBestsale);

        //Popularity List
        await axios
          .get(API_URL.POPULARITY_PRODUCT_LISTVIEW_API, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            params: {
              page: 1,
            },
          })
          .then(async (response) => {
            let lstPopular = await response.data.data.product_lists;
            let newlstPopular = [];
            for (let i = 0; i < 4; i++) {
              if (lstPopular[i] !== undefined)
                await newlstPopular.push(lstPopular[i]);
            }
            setListPopularSale(lstPopular);

            //Promotion List
            await axios
              .get(API_URL.PROMOTIONS_LISTVIEW_HD_API, {
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer " + (await token),
                  "Content-Type": "application/json",
                  "X-localization": locale,
                },
                params: {
                  page: 1,
                },
              })
              .then(async (response) => {
                let lstPromotions = await response.data.data
                  .promotions_detail_lists;
                let newlstPromotions = [];
                for (let i = 0; i < 4; i++) {
                  if ((await lstPromotions[i]) !== undefined)
                    await newlstPromotions.push(lstPromotions[i]);
                }
                await setListPromotions(newlstPromotions);
              });
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const renderBestsaler = ({ item }) => {
    const selectProductBestsale = async (item) => {
      setLoading(true);
      await axios
        .get(API_URL.PRODUCT_SEARCH_HD_API + item.id, {
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
          newObj.IMAGE = rootImage + response.data.data.image;
          newObj.PRICE = response.data.data.price;
          newObj.product_full_price = response.data.data.full_price;
          newObj.quantity = 1;
          newObj.discount = 0;
          if (locale == "th") {
            newObj.product_info_th = response.data.data.info_th;
          } else {
            newObj.product_info_th = response.data.data.info_en;
          }
          newObj.product_favorite = response.data.data.favorite;

          props.setObjProductActivity(newObj);
          setLoading(false);

          props.navigation.navigate("Products");
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    };
    return (
      <Block row style={{ marginTop: 10, marginLeft: 11 }} key={item.id}>
        <TouchableOpacity onPress={() => selectProductBestsale(item)}>
          <Image
            source={{ uri: rootImage + item.image }}
            style={pdStyle.imageProduct}
          />
          <Block flex space="between" flex style={pdStyle.productDescription}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 15,
              }}
            >
              {locale == "th" ? item.name_th : item.name_en}
            </Text>
            <Block
              style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}
            ></Block>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
              }}
            >
              ราคา : {"฿"}
              {commaNumber(parseFloat(item.price).toFixed(2))}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };
  const renderPopularsaler = ({ item }) => {
    const selectProductPopulatrity = async (item) => {
      setLoading(true);
      await axios
        .get(API_URL.PRODUCT_SEARCH_HD_API + item.id, {
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
          newObj.IMAGE = rootImage + response.data.data.image;
          newObj.PRICE = response.data.data.price;
          newObj.product_full_price = response.data.data.full_price;
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
      <Block row style={{ marginTop: 10, marginLeft: 8 }} key={item.id}>
        <TouchableOpacity onPress={() => selectProductPopulatrity(item)}>
          <Image
            source={{ uri: rootImage + item.image }}
            style={pdStyle.imageProduct}
          />
          <Block flex style={pdStyle.productDescription}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 15,
              }}
            >
              {locale == "th" ? item.name_th : item.name_en}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: "#e0e0e0",
              }}
            >
              ราคา : {"฿"}
              {commaNumber(parseFloat(item.price).toFixed(2))}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };
  const renderPromotions = ({ item }) => {
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
          newObj.IMAGE = rootImage + response.data.data.image;
          newObj.PRICE = response.data.data.price;
          newObj.product_full_price = response.data.data.full_price;
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
      <Block row style={{ marginTop: 10, marginLeft: 7 }} key={item.id}>
        <TouchableOpacity onPress={() => selectProductPromotions(item)}>
          <Image
            source={{ uri: rootImage + item.product_image }}
            style={pdStyle.imageProduct}
          />
          <Block flex style={pdStyle.productDescription}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 15,
              }}
            >
              {locale == "th" ? item.product_name_th : item.product_name_en}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: "#e0e0e0",
              }}
            >
              ราคา : {"฿"}
              {commaNumber(parseFloat(item.product_price).toFixed(2))}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  //#region Translate
  var GOOD_PRODUCT = formatTr("GOOD_PRODUCT").toString();
  var POPULAR_PRODUCT = formatTr("POPULAR_PRODUCT").toString();
  var PROMOTION_PRODUCT = formatTr("PROMOTION_PRODUCT").toString();
  var VIEW_ALL = formatTr("VIEW_ALL").toString();
  //#endregion

  return (
    <>
      <Block flex center style={{ width: width }}>
        <View style={{ backgroundColor: "white" }}>
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              stickySectionHeadersEnabled={false}
              sections={PRODUCT_LIST}
              renderSectionHeader={() => (
                <>
                  {/* Image Promotion */}
                  <Image
                    source={require("../../assets/images/HowTo/banner-1.jpg")}
                    style={{ width: width, height: 320 }}
                  />

                  {/* Best seller product */}
                  <Block flex style={styles.textContainerBlocks1}>
                    <Block style={{ alignSelf: "center" }}>
                      <Text
                        style={{
                          fontSize: 27,
                          color: "white",
                          marginTop: 20,
                          fontFamily: "kanitRegular",
                          textAlign: "center",
                        }}
                      >
                        {GOOD_PRODUCT}
                      </Text>
                    </Block>
                    <FlatList
                      data={listBestsale}
                      style={styles.containers}
                      renderItem={renderBestsaler}
                      numColumns={2}
                      keyExtractor={(item) => item.id.toString()}
                      listKey={(item) => item.id.toString()}
                    />
                  </Block>

                  {/* Popular product */}
                  <Block flex style={styles.textContainerBlock2}>
                    <Block style={{ alignSelf: "center" }}>
                      <Text
                        style={{
                          fontSize: 25,
                          fontFamily: "kanitRegular",
                          textAlign: "center",
                        }}
                      >
                        {POPULAR_PRODUCT}
                      </Text>
                    </Block>
                    <FlatList
                      data={listPopularSale}
                      style={styles.containers}
                      renderItem={renderPopularsaler}
                      numColumns={2}
                      keyExtractor={(item) => item.id.toString()}
                      listKey={(item) => item.id.toString()}
                    />
                  </Block>

                  {/* Promotion product */}
                  <Block flex style={styles.textContainerBlock3}>
                    <Block style={{ alignSelf: "center" }}>
                      <Text
                        style={{
                          fontSize: 25,
                          fontFamily: "kanitRegular",
                          textAlign: "center",
                          marginTop: 20,
                        }}
                      >
                        {PROMOTION_PRODUCT}
                      </Text>
                    </Block>
                    <FlatList
                      data={listPromotions}
                      style={styles.containers}
                      renderItem={renderPromotions}
                      numColumns={2}
                      keyExtractor={(item) => item.id.toString()}
                      listKey={(item) => item.id.toString()}
                    />
                    <TouchableOpacity
                      style={{
                        marginBottom: 25,
                        marginTop: 10,
                        alignSelf: "center",
                      }}
                      onPress={() => props.navigation.navigate("Promotions")}
                    >
                      <Text
                        style={{
                          marginTop: 10,
                          color: "black",
                          fontFamily: "kanitRegular",
                          borderBottomWidth: 5,
                          borderBottomColor: "#ff002f",
                          borderRadius: 2,
                          textAlign: "center",
                        }}
                      >
                        {VIEW_ALL + " >"}
                      </Text>
                    </TouchableOpacity>
                  </Block>
                </>
              )}
              renderSectionFooter={() => <>{<WangdekInfo />}</>}
              renderItem={({ item, section }) => {
                if (section !== null) {
                  return null;
                }
                return <ListItem item={item} />;
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
  //Default Actions
  setObjProductAll: ActionProductAll.setObjProductAll,

  //Product Detail
  setObjProductActivity: ActionProduct.setObjProductActivity,
  clearObjProductActivity: ActionProduct.clearObjProductActivity,
  setListTrProductActivity: ActionProduct.setListTrProductActivity,

  //Promotions Detail
  setObjPromotions: ActionPromotions.setObjPromotions,
  clearObjPromotions: ActionPromotions.clearObjPromotions,
  setListTrPromotions: ActionPromotions.setListTrPromotions,
};

export default connect(null, mapActions)(ProductAll);

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
    alignItems: "flex-start",
    backgroundColor: "#00d184",
    marginTop: 0,
    width: width,
  },
  textContainerBlock2: {
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    marginTop: 25,
    padding: 5,
    marginBottom: 25,
    width: width,
  },
  textContainerBlock3: {
    alignItems: "flex-start",
    backgroundColor: "#f0f0f0",
    marginTop: 25,
    padding: 5,
    marginBottom: 25,
    width: width,
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

const pdStyle = StyleSheet.create({
  image: {
    borderRadius: 4,
    marginTop: -20,
  },
  textContainerBlock1: {
    padding: 5,
    flexWrap: "wrap",
  },
  imageProduct: {
    resizeMode: "cover",
    width: 180,
    height: 150,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  productText: {
    width: 180,
    height: 80,
  },
  productDescription: {
    width: 180,
    height: 80,
    padding: 10,
    backgroundColor: "white",
    borderBottomEndRadius: 3,
    borderBottomLeftRadius: 3,
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
});

const PRODUCT_LIST = [
  {
    title: "Discount",
    horizontal: false,
    data: [
      {
        key: "1",
        uri: "",
      },
    ],
  },
];
