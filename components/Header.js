import React, { useState, useEffect } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
  View,
  SafeAreaView,
  SectionList,
  Image,
  FlatList,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { StatusBar } from "expo-status-bar";
import { Block, NavBar, Text, theme } from "galio-framework";
import materialTheme from "../constants/Theme";
import Icons from "react-native-vector-icons/MaterialIcons";
import { API_URL } from "../config/config.app";
import { getToken } from "../store/mock/token";
import { connect, useSelector } from "react-redux";
import { actions as ActionProductType } from "../actions/action-product-type/ActionProductType";
import ModalLoading from "../components/ModalLoading";
// import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
let token = getToken();
//const rootImage = "http://10.0.1.37:8080";
const rootImage = "http://newpclinic.com/wd";

const defaultListProductType = [
  {
    id: 1,
    name_th: "เครื่องประดับ",
    name_en: "Accessories",
    image: "/storage/16/icon-01.png",
  },
];
const defaultListProductBrands = [
  {
    id: 1,
    name_th: "Barbie",
    name_en: "Barbie",
    image: "/storage/29/brand-01.png",
  },
];

function Header(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const [loading, setLoading] = useState(null);
  const { objProductType } = useSelector((state) => ({
    objProductType: state.actionProductType.objProductType,
  }));

  useEffect(() => {
    loadDataProductType();
    loadDataProductBrands();
    loadDataCountCarts();
  }, [null]);

  const ModalNotification = ({ style, navigation }) => {
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
          onPress={() => navigation.navigate("Notifications")}
          // onPress={() => { setModalVisible(true);}}
        >
          <Icons name="notifications" color={"#383838"} size={20} />
          <Block middle style={styles.notify} />
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
          {/* <Feather name="search" size={20} /> */}

          {/* <Block middle style={styles.notify} /> */}
        </TouchableOpacity>
      </>
    );
  };
  const ModalFavorite = ({ style, navigation }) => {
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
          onPress={() => navigation.navigate("Favorite View")}
          // onPress={() => { setModalVisible(true);}}
        >
          <Icons name="favorite" color={"#383838"} size={20} />
          {/* <Block middle style={styles.notify} /> */}
        </TouchableOpacity>
      </>
    );
  };
  //Basket Button & Count Cart
  const [countCarts, setCountCarts] = useState(0);
  const loadDataCountCarts = async () => {
    await axios
      .get(API_URL.COUNT_CART_ORDER_LISTVIEW_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
          "X-localization": locale,
        },
      })
      .then((response) => {
        if (response.data.data.result !== "undefined") {
          setCountCarts(response.data.data.result);
        } else {
          setCountCarts(null);
        }
      })
      .catch(function (error) {
        setCountCarts(null);
        console.log(error);
      });
  };
  const BasketButton = ({ style, navigation }) => {
    return (
      <>
        <TouchableOpacity
          style={[styles.button, style]}
          onPress={() => navigation.navigate("Cart")}
        >
          {/* <Icons name="shopping_cart" color={"black"} size={20} /> */}
          <Image
            source={require("../assets/icons/cart.png")}
            style={{ width: 20, height: 20 }}
          />
          {countCarts > 0 ? <Block middle style={styles.notify} /> : null}
        </TouchableOpacity>
      </>
    );
  };

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

      default:
        break;
    }
  };

  //renderFucntion Tabs
  //Type Bar
  const [listProductType, setListProductType] = useState(
    defaultListProductType
  );
  //////Bug ไม่ต้องใช้ token//////
  const loadDataProductType = async () => {
    await axios
      .get(API_URL.CATEGORY_PRODUCT_LISTVIEW_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
         setListProductType(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const ListTypeProduct = ({ item }) => {
    const categoryProductType = async (item) => {
      setLoading(true);
      await axios
        .get(API_URL.CATEGORY_PRODUCT_SEARCH_API + item.id, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
          },
        })
        .then((response) => {
          let newObj = Object.assign({}, objProductType);
          newObj.TABS_TYPE = true;
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
      <Block style={styles2.itemType}>
        <TouchableOpacity onPress={() => categoryProductType(item)}>
          <Image
            source={{ uri: rootImage + item.image }}
            style={{ width: 79, height: 68 }}
          />
        </TouchableOpacity>
      </Block>
    );
  };
  const renderTabType = () => {
    return (
      <Block style={styles2.container1}>
        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
            stickySectionHeadersEnabled={false}
            sections={sectionProductType}
            scrollEnabled={false}
            renderSectionHeader={() => (
              <FlatList
                horizontal
                data={listProductType}
                renderItem={({ item }) => <ListTypeProduct item={item} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                listKey={(item) => item.id.toString()}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
            renderItem={() => {
              return null;
            }}
          />
        </SafeAreaView>
      </Block>
    );
  };
  //Brands Bar
  const [listProductBrands, setListProductBrands] = useState(
    defaultListProductBrands
  );
  //////Bug ไม่ต้องใช้ token//////
  const loadDataProductBrands = async () => {
    await axios
      .get(API_URL.BRANDS_PRODUCT_LISTVIEW_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        setListProductBrands(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const ListProductBrands = ({ item }) => {
    const categoryProductBrands = async (item) => {
      console.log(item.id)
      setLoading(true);
      await axios
        .get(API_URL.BRANDS_PRODUCT_LISTVIEW_API + item.id + "/products", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
          },
        })
        .then(function (response) {
          console.log(response.data.data)
          let newObj = Object.assign({}, objProductType);
          newObj.TABS_TYPE = true;
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
            style={{ width: 75, height: 35 }}
          />
        </TouchableOpacity>
      </Block>
    );
  };
  const renderTabBrands = () => {
    return (
      <Block style={styles2.container2}>
        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 0 }}
            stickySectionHeadersEnabled={false}
            sections={sectionProductBrand}
            scrollEnabled={false}
            renderSectionHeader={() => (
              <FlatList
                horizontal
                data={listProductBrands}
                renderItem={({ item }) => <ListProductBrands item={item} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                listKey={(item) => item.id.toString()}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
            renderItem={() => {
              return null;
            }}
          />
        </SafeAreaView>
      </Block>
    );
  };
  // const { search, tabs } = props;
  const renderHeader = () => {
    return (
      <Block center>
        {renderTabType()}
        {renderTabBrands()}
      </Block>
    );
  };

  const { back, title, transparent } = props;
  const noShadow = ["Search", "Categories", "Profile"].includes(title);
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
  ];

  return (
    <>
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={renderLogo()}
          style={styles.navbar}
          transparent={transparent}
          rightStyle={{ alignItems: "center" }}
          leftStyle={{ alignItems: "center", flexDirection: "row" }}
          titleStyle={[styles.title]}
          left={renderLeft()}
          right={renderRight()}
        />
        {renderHeader()}
      </Block>
      <ModalLoading loading={loading} />
    </>
  );
}

const mapActions = {
  //Product Type
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
  title: {
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
    color: "black",
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
  container1: {
    backgroundColor: "#f5f5f5",
    height: 82,
    padding: 0,
  },
  container2: {
    backgroundColor: "white",
    height: 45,
    padding: 0,
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
    height: 65,
  },
  itemBrand: {
    margin: 4,
    height: 72,
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

const sectionProductType = [
  {
    horizontal: true,
    data: [
      {
        key: "1",
        icon: require("../assets/iconMain/icon-01.png"),
      },
      {
        key: "2",
        icon: require("../assets/iconMain/icon-02.png"),
      },
      {
        key: "3",
        icon: require("../assets/iconMain/icon-03.png"),
      },
      {
        key: "4",
        icon: require("../assets/iconMain/icon-04.png"),
      },
      {
        key: "5",
        icon: require("../assets/iconMain/icon-05.png"),
      },
      {
        key: "6",
        icon: require("../assets/iconMain/icon-06.png"),
      },
      {
        key: "7",
        icon: require("../assets/iconMain/icon-07.png"),
      },
      {
        key: "8",
        icon: require("../assets/iconMain/icon-08.png"),
      },
    ],
  },
];
const sectionProductBrand = [
  {
    horizontal: true,
    data: [
      {
        key: "1",
        icon: require("../assets/iconBrand/brand-01.png"),
      },
      {
        key: "2",
        icon: require("../assets/iconBrand/brand-02.png"),
      },
      {
        key: "3",
        icon: require("../assets/iconBrand/brand-03.png"),
      },
      {
        key: "4",
        icon: require("../assets/iconBrand/brand-04.png"),
      },
      {
        key: "5",
        icon: require("../assets/iconBrand/brand-05.png"),
      },
      {
        key: "6",
        icon: require("../assets/iconBrand/brand-06.png"),
      },
      {
        key: "7",
        icon: require("../assets/iconBrand/brand-07.png"),
      },
      {
        key: "8",
        icon: require("../assets/iconBrand/brand-08.png"),
      },
      {
        key: "9",
        icon: require("../assets/iconBrand/brand-09.png"),
      },
      {
        key: "10",
        icon: require("../assets/iconBrand/brand-10.png"),
      },
    ],
  },
];
