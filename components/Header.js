import React, { useState, useEffect } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { Block, NavBar, Text, theme } from "galio-framework";
import materialTheme from "../constants/Theme";
import Icons from "react-native-vector-icons/MaterialIcons";
import { API_URL } from "../config/config.app";
import { getToken } from "../store/mock/token";
import { connect, useSelector } from "react-redux";
import { actions as ActionProductType } from "../actions/action-product-type/ActionProductType";
import ModalLoading from "../components/ModalLoading";
// import SvgUri from "expo-svg-uri";

const { width } = Dimensions.get("window");
let token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

function Header(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const [loading, setLoading] = useState(null);
  const { auth_token } = useSelector((state) => ({
    auth_token: state.auth.auth_token,
  }));
  const { objProductType } = useSelector((state) => ({
    objProductType: state.actionProductType.objProductType,
  }));

  useEffect(() => {
    loadDataBrandsTypes();
    loadCountCart();
  }, [countCart]);

  //Count _Cart_&_Notifications_
  const [countCart, setCountCart] = useState(0);
  const [countNews, setCountNews] = useState(0);
  async function loadCountCart() {
    if (token !== undefined || auth_token !== undefined) {
      await axios({
        method: "GET",
        url: API_URL.COUNT_CART_ORDER_LISTVIEW_API,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            ((await token) !== undefined ? await token : auth_token),
        },
      })
        .then(async (response) => {
          setCountCart(response.data.data.result);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  //Menu Bar
  const [listProductType, setListProductType] = useState(null);
  const [listProductBrands, setListProductBrands] = useState(null);
  async function loadDataBrandsTypes() {
    await axios({
      method: "GET",
      url: API_URL.CATEGORY_PRODUCT_LISTVIEW_API,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Connection: "keep-alive",
        "X-CSRF-TOKEN": "",
        "Accept-Encoding": "gzip, deflate",
      },
    })
      .then(async (resType) => {
        let newlstType = await resType.data.data;
        setListProductType(newlstType);

        await axios({
          method: "GET",
          url: API_URL.BRANDS_PRODUCT_LISTVIEW_API,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Connection: "keep-alive",
          },
        })
          .then(async (resBrands) => {
            let newlstBrands = await resBrands.data.data;
            setListProductBrands(newlstBrands);
          })
          .catch(function (error) {
            console.log(error.response);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const ListTypeProduct = ({ item }) => {
    const categoryProductType = async (item) => {
      setLoading(true);
      await axios
        .get(API_URL.CATEGORY_PRODUCT_SEARCH_API + item.id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
          },
        })
        .then((response) => {
          let newObj = Object.assign({}, objProductType);
          newObj.TABS_TYPE = true;
          newObj.PRODUCT_TYPE = "TYPES";
          newObj.ITEM_ID = item.id;
          newObj.ITEM_NAME = locale == "th" ? item.name_th : item.name_en;
          props.setObjProductType(newObj);
          props.setListTrProductType(response.data.data);
          setLoading(false);
          props.navigation.navigate("Product Type");
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
      setLoading(false);
    };
    var colorBG = "";
    switch (item.id) {
      case 1:
        colorBG = "#119bf7";
        break;
      case 2:
        colorBG = "#10c990";
        break;
      case 3:
        colorBG = "#9bc91f";
        break;
      case 4:
        colorBG = "#fca936";
        break;
      case 5:
        colorBG = "#fd7619";
        break;
      case 6:
        colorBG = "#fb4352";
        break;
      case 7:
        colorBG = "#c923a7";
        break;
      case 8:
        colorBG = "#6646cd";
        break;

      default:
        break;
    }
    return (
      <Block style={styles2.itemType}>
        <TouchableOpacity onPress={() => categoryProductType(item)}>
          <Block
            style={{
              width: 40,
              height: 40,
              alignSelf: "center",
              backgroundColor: colorBG,
              borderRadius: 50,
            }}
          >
            <ImageBackground
              source={{ uri: rootImage + item.image }}
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
                alignSelf: "center",
                marginTop: 7.5,
              }}
            />
          </Block>
          <Block style={{ marginTop: 5 }}>
            <Text
              style={{
                fontFamily: "kanitRegular",
                color: "black",
                fontSize: 9.4,
                textAlign: "center",
              }}
            >
              {locale == "th" ? item.name_th : item.name_en}
            </Text>
          </Block>
          {/* <SvgUri
            width={200}
            height={200}
            source={{ uri: rootImage + item.image }}
          /> */}
        </TouchableOpacity>
      </Block>
    );
  };
  const ListProductBrands = ({ item }) => {
    const categoryProductBrands = async (item) => {
      setLoading(true);
      await axios
        .get(API_URL.BRANDS_PRODUCT_LISTVIEW_API + item.id + "/products", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
          },
        })
        .then(function (response) {
          let newObj = Object.assign({}, objProductType);
          newObj.TABS_TYPE = true;
          newObj.PRODUCT_TYPE = "BRANDS";
          newObj.ITEM_ID = item.id;
          newObj.ITEM_NAME = locale == "th" ? item.name_th : item.name_en;
          props.setObjProductType(newObj);
          props.setListTrProductType(response.data.data);
          setLoading(false);
          props.navigation.navigate("Product Type");
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
      setLoading(false);
    };
    return (
      <Block style={styles2.itemBrand}>
        <TouchableOpacity
          shadowless
          onPress={() => categoryProductBrands(item)}
        >
          <Image
            source={{ uri: rootImage + item.image }}
            style={{ width: 60, height: 33, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </Block>
    );
  };

  const ModalNotification = ({ style, navigation }) => {
    return (
      <>
        <TouchableOpacity
          style={[styles.button, style]}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Icons name="notifications" color={"#383838"} size={20} />
          {countNews ? <Block middle style={styles.notify} /> : null}
        </TouchableOpacity>
      </>
    );
  };
  const ModalSearch = ({ style, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Coming soon!</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.button, style]}
          onPress={() => navigation.navigate("Filter Search")}
        >
          <Icons name="search" color={"#383838"} size={20} />
        </TouchableOpacity>
      </>
    );
  };
  const ModalFavorite = ({ style, navigation }) => {
    return (
      <>
        <TouchableOpacity
          style={[styles.button, style]}
          onPress={() => navigation.navigate("Favorite View")}
        >
          <Icons name="favorite" color={"#383838"} size={20} />
        </TouchableOpacity>
      </>
    );
  };
  const BasketButton = ({ style, navigation }) => {
    return (
      <>
        <TouchableOpacity
          style={[styles.button, style]}
          onPress={() => navigation.navigate("Cart")}
        >
          <Image
            source={require("../assets/icons/cart.png")}
            style={{ width: 20, height: 20 }}
          />
          {countCart > 0 ? (
            <Block middle style={styles.notifyCart}>
              <Text
                style={{
                  fontFamily: "kanitBold",
                  color: "white",
                  fontSize: 9.2,
                  textAlign: "center",
                }}
              >
                {countCart}
              </Text>
            </Block>
          ) : null}
        </TouchableOpacity>
      </>
    );
  };

  //render Navbar
  const renderLogo = () => {
    return (
      <Block flex center>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Flash Sale")}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{ height: 50, width: 100 }}
          />
        </TouchableOpacity>
      </Block>
    );
  };
  const renderLeft = () => {
    const { white, title, navigation } = props;

    if (title === "Title") {
      return [
        <ModalNotification
          key="chat-title"
          navigation={navigation}
          isWhite={white}
        />,
        <ModalSearch
          key="basket-title"
          navigation={navigation}
          isWhite={white}
        />,
      ];
    }

    switch (title) {
      case "Home":
        return [
          <ModalNotification
            key="chat-home"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-home"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Deals":
        return [
          <ModalNotification key="chat-categories" navigation={navigation} />,
          <ModalSearch key="basket-categories" navigation={navigation} />,
        ];
      case "Cart":
        return [
          <ModalNotification
            key="chat-categories"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-categories"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Products":
        return [
          <ModalNotification
            key="chat-deals"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-deals"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "My Coupon":
        return [
          <ModalNotification
            key="chat-deals"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-deals"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Profile":
        return [
          <ModalNotification
            key="chat-profile"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-deals"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Search":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Settings":
        return [];
      case "Basket":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Payment":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Sign In":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Filter Search":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "History View":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "History Order":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Order Screen":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Coupon":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Delivery":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Address Delivery":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Events":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Product All":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "News Relation":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Payment Notifications":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Account":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "About Us":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Contact":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Payment":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "HowTo":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Payment":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "News Relation Detail":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "History View":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "History Order":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Favorite View":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Ny Coupon":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Promotions":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Order Status":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Order Screen":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Coupon":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Filter Search":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Delivery":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Address Delivery":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Contact":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Notifications":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Product Type":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Flashsale Product":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Term Conditions":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Privacy Policy":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Order Status Price Screen":
        return [
          <ModalNotification
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <ModalSearch
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];

      default:
        break;
    }
  };
  const renderRight = () => {
    const { white, title, navigation } = props;

    if (title === "Title") {
      return [
        <ModalFavorite
          key="chat-title"
          navigation={navigation}
          isWhite={white}
        />,
        <BasketButton
          key="basket-title"
          navigation={navigation}
          isWhite={white}
        />,
      ];
    }

    switch (title) {
      case "Home":
        return [
          <ModalFavorite
            key="chat-home"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-home"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Deals":
        return [
          <ModalFavorite key="chat-categories" navigation={navigation} />,
          <BasketButton key="basket-categories" navigation={navigation} />,
        ];
      case "Cart":
        return [
          <ModalFavorite
            key="chat-categories"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-categories"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Products":
        return [
          <ModalFavorite
            key="chat-deals"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-deals"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Profile":
        return [
          <ModalFavorite
            key="chat-profile"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-deals"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Search":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Settings":
        return [];
      case "Payment":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Payment":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Sign In":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Filter Search":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "History View":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "History Order":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Order Screen":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Coupon":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Delivery":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Address Delivery":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Events":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Product All":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "News Relation":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Payment Notifications":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Account":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "About Us":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "HowTo":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Payment":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "News Relation Detail":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "History Order":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "History View":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Favorite View":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "My Coupon":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Promotions":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Order Status":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Order Screen":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Coupon":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Delivery":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Filter Search":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Use Address Delivery":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Contact":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Notifications":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Product Type":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Flashsale Product":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Term Conditions":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Privacy Policy":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Order Status Price Screen":
        return [
          <ModalFavorite
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];

      default:
        break;
    }
  };

  return (
    <>
      <SafeAreaView>
        <NavBar
          title={renderLogo()}
          style={styles.navbar}
          rightStyle={styles.navbarLeftRight}
          leftStyle={styles.navbarLeftRight}
          left={renderLeft()}
          right={renderRight()}
        />
        {/* List Bars */}
        <Block>
          <Block style={styles2.containerListType}>
            <FlatList
              horizontal={true}
              data={listProductType}
              renderItem={({ item }) => <ListTypeProduct item={item} />}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              listKey={(item) => item.id}
            />
          </Block>
          
          <Block style={styles2.containerListBrands}>
            <FlatList
              horizontal
              data={listProductBrands}
              renderItem={({ item }) => <ListProductBrands item={item} />}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              listKey={(item) => item.id}
            />
          </Block>
        </Block>
      </SafeAreaView>
      <ModalLoading loading={loading} />
    </>
  );
}

const mapActions = {
  setObjProductType: ActionProductType.setObjProductType,
  clearObjProductType: ActionProductType.clearObjProductType,
  setListTrProductType: ActionProductType.setListTrProductType,
  pushListTrProductType: ActionProductType.pushListTrProductType,
};

export default withNavigation(connect(null, mapActions)(Header));

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative",
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.4,
    paddingTop: theme.SIZES.BASE * 2.8,
    zIndex: 4,
    height: 95,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.NEW_LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 8,
    right: 8,
  },
  notifyCart: {
    backgroundColor: materialTheme.COLORS.NEW_LABEL,
    borderRadius: 10,
    height: 15,
    width: 15,
    position: "absolute",
    top: 5,
    right: 4,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 15,
    marginTop: 10,
    elevation: 5,
  },
  tabsBottom: {
    marginBottom: 15,
    marginTop: 10,
    elevation: 5,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.2,
    borderRadius: 0,
    borderWidth: 0,
    height: 5,
    elevation: 0,
    flexDirection: "row",
  },
  tabTitle: {
    lineHeight: 20,
    fontWeight: "400",
    fontSize: 13,
  },
  navbarLeftRight: {
    alignItems: "center",
    flexDirection: "row",
  },
  // Modal CSS
  centeredView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    padding: 40,
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "justify",
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
  },
});
const styles2 = StyleSheet.create({
  containerListType: {
    backgroundColor: "#f5f5f5",
    height: 90,
    padding: 0,
  },
  containerListBrands: {
    backgroundColor: "white",
    height: 45,
    padding: 0,
    shadowColor: "#e0e0e0",
    elevation: 1,
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#f4f4f4",
    marginTop: 20,
    marginBottom: 5,
  },
  itemType: {
    margin: 8,
    height: 60,
    width: 70,
  },
  itemBrand: {
    margin: 5,
    height: 74,
  },
  itemPhoto: {
    width: 90,
    height: 34,
    alignSelf: "center",
  },
  itemText: {
    color: "black",
    marginTop: 5,
  },
  itemiconType: {
    height: 50,
    width: 50,
  },
});
