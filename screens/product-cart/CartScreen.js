import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ToastAndroid,
  RefreshControl,
  Alert,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { formatTr } from "../../i18n/I18nProvider";
import { Block, Text, theme } from "galio-framework";
import { connect, useSelector } from "react-redux";
import { actions as ActionCart } from "../../actions/action-cart/ActionCart";
import WangdekInfo from "../../components/WangdekInfo";
import NumericInput from "rn-numeric-input";
import { Button } from "react-native-elements";
import commaNumber from "comma-number";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";
import ModalLoading from "../../components/ModalLoading";

const { height, width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

function CartScreen(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const [loading, setLoading] = useState(null);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const onRefreshPageNow = React.useCallback(() => {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    setRefreshingPage(true);
    wait(1000).then(() => {
      loadCartLists();
      ToastAndroid.show("Refresh Page", ToastAndroid.SHORT);
      setRefreshingPage(false);
    });
  }, []);

  useEffect(() => {
    loadCartLists();
  }, []);

  const [listCarts, setListCarts] = useState(null);
  async function loadCartLists() {
    setLoading(true);
    await axios({
      method: "GET",
      url: API_URL.ADD_CART_ORDER_LISTVIEW_API,
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + (await token),
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        let newlst = await response.data.data;
        setListCarts(newlst);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(true);
        console.log(error.response.data);
      });
    setLoading(false);
  }
  const renderCartLists = ({ item }) => {
    const onChangeNumericInputValue = (value) => {
      let oldlst = listCarts.filter((key) => key.product_id != item.product_id);
      let newlst = listCarts.filter((key) => key.product_id == item.product_id);
      newlst[0].quantity = value;

      let newStateObj = newlst.concat(oldlst).sort(function (a, b) {
        return a.cart_id - b.cart_id;
      });

      setListCarts(newStateObj);
    };
    const onDeleteProduct = async (value) => {
      let oldlst = listCarts.filter((item) => item.cart_id !== value);
      setListCarts(oldlst);
      await axios({
        method: "DELETE",
        url: API_URL.ADD_CART_ORDER_LISTVIEW_API + "/" + value,
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
          "X-localization": locale,
        },
      })
        .then(async (response) => {
          ToastAndroid.show(response.data.data, ToastAndroid.SHORT);

          // await axios({
          //   method: "GET",
          //   url: API_URL.COUNT_CART_ORDER_LISTVIEW_API,
          //   headers: {
          //     Accept: "application/json",
          //     "Content-Type": "application/json",
          //     Authorization: "Bearer " + (await token),
          //   },
          // }).then(async (response) => {
          //   let newListCount = await response.data.data.result;
          //   props.navigation.navigate("Cart");
          // });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    return (
      <Block style={styles.blockProduct} key={item.cart_id}>
        <Block row>
          <Block style={styles.blockSemiImage}>
            <Image
              source={{ uri: rootImage + item.product_image }}
              style={styles.imageProduct}
            />
          </Block>
          <Block style={styles.blockSemiImage2}>
            <Block style={{ height: "55%", width: "78%" }}>
              <Text style={styles.fontTitleProduct}>
                {locale == "th" ? item.product_name_th : item.product_name_en}
              </Text>
            </Block>
            {/* quantity */}
            <Block row>
              <Text style={styles.detailText}>จำนวน : </Text>

              <NumericInput
                initValue={item.quantity}
                // value={numericInputValue}
                onChange={onChangeNumericInputValue}
                totalWidth={110}
                totalHeight={35}
                iconSize={18}
                step={1}
                minValue={0}
                maxValue={item.stock}
                valueType="integer"
                type="plus-minus"
                rounded={false}
                textColor="black"
                iconStyle={{ color: "white" }}
                inputStyle={{ fontFamily: "kanitRegular" }}
                leftButtonBackgroundColor="#adadad"
                rightButtonBackgroundColor="#09db99"
                containerStyle={{
                  marginLeft: 20,
                  fontFamily: "kanitRegular",
                }}
              />
            </Block>
          </Block>
        </Block>
        <Block row style={{ width: "90%", alignSelf: "center" }}>
          <Block style={{ width: "40%", alignSelf: "flex-start" }}>
            <Text style={styles.fontPriceProductFullPrice}>
              ฿{commaNumber(parseFloat(item.product_full_price).toFixed(2))}
            </Text>
            <Block style={styles.boxPriceSale}/>
          </Block>
          <Block style={{ width: "40%", alignSelf: "center" }}>
            <Text style={styles.fontPriceProduct}>
              ฿{commaNumber(parseFloat(item.product_price).toFixed(2))}
            </Text>
          </Block>
          <Block style={{ marginLeft: 25 }}>
            <TouchableOpacity onPress={() => onDeleteProduct(item.cart_id)}>
              <Image
                source={require("../../assets/images/order-filter/delete-icon.png")}
                style={{ height: 35, width: 35, borderRadius: 25 }}
              />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  };
  const addCartListProducts = async () => {
    setLoading(true);
    await axios({
      method: "POST",
      url: API_URL.SAVE_CART_ORDER_LISTVIEW_API,
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + (await token),
        "Content-Type": "application/json",
        "X-localization": locale,
      },
      data: listCarts,
    })
      .then(function (response) {
        setLoading(false);
        props.setListTrCartScreen(listCarts);
        props.navigation.navigate("Order Screen");
      })
      .catch(function (error) {
        console.log(error.response.data.data);
      });
    setLoading(false);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={CART_SCREEN_LIST}
          refreshControl={
            <RefreshControl
              refreshing={refreshingPage}
              onRefresh={onRefreshPageNow}
            />
          }
          renderSectionHeader={() => (
            <>
              {/* Title */}
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Flash Sale")}
              >
                <Block row style={styles.container}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 18,
                    }}
                  >
                    {"<  "}ตะกร้าสินค้า
                  </Text>
                </Block>
              </TouchableOpacity>

              {/* Product List */}
              <FlatList
                data={listCarts}
                style={styles.containers}
                renderItem={renderCartLists}
                numColumns={1}
                keyExtractor={(item) => item.cart_id.toString()}
                listKey={(item) => item.cart_id}
              />

              {/* Button */}
              {listCarts ? (
                <Block
                  row
                  style={{
                    paddingTop: 40,
                    paddingBottom: 40,
                    alignSelf: "center",
                  }}
                >
                  <Button
                    titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                    title={"ซื้อสินค้าเพิ่มเติม"}
                    type="solid"
                    containerStyle={styles.blockButton1}
                    buttonStyle={styles.buttonStyle1}
                    onPress={() => props.navigation.navigate("Flash Sale")}
                  />
                  <Button
                    titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                    title={"ดำเนินการต่อ"}
                    type="solid"
                    containerStyle={styles.blockButton2}
                    buttonStyle={styles.buttonStyle2}
                    onPress={addCartListProducts}
                  />
                </Block>
              ) : (
                <Block
                  style={{
                    paddingBottom: 40,
                    alignSelf: "center",
                  }}
                >
                  <Button
                    titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                    title={"เลือกซื้อสินค้าเพิ่มเติม"}
                    type="solid"
                    containerStyle={styles.blockButton1}
                    buttonStyle={styles.buttonStyle1ss}
                    onPress={() => props.navigation.navigate("Flash Sale")}
                  />
                </Block>
              )}
            </>
          )}
          renderSectionFooter={() => <>{<WangdekInfo />}</>}
          renderItem={() => {
            return null;
          }}
        />
      </SafeAreaView>
      <ModalLoading loading={loading} />
    </>
  );
}

const mapActions = {
  setObjCartScreen: ActionCart.setObjCartScreen,
  clearObjCartScreen: ActionCart.clearObjCartScreen,
  setListTrCartScreen: ActionCart.setListTrCartScreen,
};

export default connect(null, mapActions)(CartScreen);

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
  containers: {
    flex: 1,
    marginVertical: 20,
  },
  blockProduct: {
    backgroundColor: "#ededed",
    width: width,
    height: height / 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  blockSemiImage: {
    margin: 15,
  },
  blockSemiImage2: {
    margin: 10,
  },
  imageProduct: {
    width: 120,
    height: 100,
  },
  fontTitleProduct: {
    fontFamily: "kanitRegular",
    fontSize: 17,
    color: "black",
  },
  fontPriceProduct: {
    fontFamily: "kanitRegular",
    fontSize: 22,
    color: "black",
  },
  fontPriceProductFullPrice: {
    fontFamily: "kanitRegular",
    fontSize: 18,
    color: "#8f8f8f",
    marginTop:5
  },
  blockButton1: {
    flexDirection: "row",
  },
  blockButton2: {
    paddingLeft: 25,
  },
  buttonStyle1: {
    backgroundColor: "#0a86c4",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  buttonStyle1ss: {
    backgroundColor: "red",
    borderRadius: 20,
    width: 180,
    alignSelf: "center",
  },
  buttonStyle2: {
    backgroundColor: "#0ac980",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  boxPriceSale: {
    borderTopWidth: 1,
    borderTopColor: "red",
    position: "relative",
    width: 70,
    transform: [{ rotate: '8deg'}],
    marginTop: -15,
  },
});

const CART_SCREEN_LIST = [
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
