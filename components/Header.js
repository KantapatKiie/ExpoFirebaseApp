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
import { StatusBar } from "expo-status-bar";
import { Block, NavBar, Input, Text, theme } from "galio-framework";
import Icon from "./Icon";
import materialTheme from "../constants/Theme";
import Icons from "react-native-vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
// import { API_URL } from "../config/config.app";

const { height, width } = Dimensions.get("window");

const ModalNotification = ({ style }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        animationType="fade"
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
        onPress={() => {
          setModalVisible(true);
        }}
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
        animationType="fade"
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

        <Block middle style={styles.notify} />
      </TouchableOpacity>
    </>
  );
};
const ModalMessage = ({ style }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        animationType="fade"
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
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icons name="favorite" color={"#383838"} size={20} />
        <Block middle style={styles.notify} />
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
        {/* <Icons name="shopping_cart" color={"black"} size={20} /> */}
        <Image
          source={require("../assets/icons/cart.png")}
          style={{ width: 20, height: 20 }}
        />
        <Block middle style={styles.notify} />
      </TouchableOpacity>
    </>
  );
};

function Header(props) {
  const [objSearch, setObjSearch] = useState({
    SEARCH_NO: "",
  });

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
  
      default:
        break;
    }
  };
  const renderRight = () => {
    const { white, title, navigation } = props;

    if (title === "Title") {
      return [
        <ModalMessage
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
          <ModalMessage
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
          <ModalMessage key="chat-categories" navigation={navigation} />,
          <BasketButton key="basket-categories" navigation={navigation} />,
        ];
      case "Cart":
        return [
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
          <ModalMessage
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
            <ModalMessage
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

  //Search
  const renderSearch = () => {
    const changeSearch = (e) => {
      let newObjSearch = Object.assign({}, objSearch);
      newObjSearch.SEARCH_NO = e.nativeEvent.text;
      setObjSearch(newObjSearch);
    };
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        onChange={changeSearch}
        iconContent={
          <Icon
            size={16}
            color={theme.COLORS.MUTED}
            name="magnifying-glass"
            family="entypo"
          />
        }
      />
    );
  };

  //renderFucntion Tabs
  const ListItemTypeProduct = ({ item }) => {
    return (
      <Block style={styles2.item}>
        <TouchableOpacity
          shadowless
          onPress={() => props.navigation.navigate(item.sectionPage)}
        >
          <Image source={item.icon} />
        </TouchableOpacity>
      </Block>
    );
  };
  const renderTabs = () => {
    return (
      <Block style={styles2.container1}>
        <StatusBar style="auto" />
        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
            stickySectionHeadersEnabled={false}
            sections={sectionProductType}
            scrollEnabled={false}
            renderSectionHeader={({ section }) => (
              <>
                {section.horizontal ? (
                  <>
                    <FlatList
                      horizontal
                      data={section.data}
                      renderItem={({ item }) => (
                        <ListItemTypeProduct item={item} />
                      )}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                    />
                  </>
                ) : null}
              </>
            )}
            renderItem={({ item, section }) => {
              if (section.horizontal) {
                return null;
              }
              return <ListItem item={item} />;
            }}
          />
        </SafeAreaView>
      </Block>
    );
  };
  const ListItemProduct = ({ item }) => {
    return (
      <Block style={styles2.item}>
        <TouchableOpacity
          shadowless
          onPress={() => props.navigation.navigate(item.sectionPage)}
        >
          <Image source={item.icon} style={styles2.itemPhoto} />
        </TouchableOpacity>
      </Block>
    );
  };
  const renderTabViews = () => {
    return (
      <Block style={styles2.container2}>
        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 0 }}
            stickySectionHeadersEnabled={false}
            sections={sectionBrand}
            scrollEnabled={false}
            renderSectionHeader={({ section }) => (
              <>
                {section.horizontal ? (
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({ item }) => <ListItemProduct item={item} />}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  />
                ) : null}
              </>
            )}
            renderItem={({ item, section }) => {
              if (section.horizontal) {
                return null;
              }
              return <ListItem item={item} />;
            }}
          />
        </SafeAreaView>
      </Block>
    );
  };
  const { search, tabs } = props;
  const renderHeader = () => {
    if (search || tabs) {
      return (
        <Block center>
          {/* {search ? renderSearch() : null} */}
          {tabs ? renderTabs() : null}
          {tabs ? renderTabViews() : null}
        </Block>
      );
    }
    return null;
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
    </>
  );
}

export default withNavigation(Header);

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
    height: 92,
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
  item: {
    margin: 5,
    height: 92,
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
    // title: "Title Text",
    horizontal: true,
    data: [
      {
        key: "1",
        icon: require("../assets/iconMain/icon-01.png"),
        sectionPage: "Product Toys",
      },
      {
        key: "2",
        icon: require("../assets/iconMain/icon-02.png"),
        sectionPage: "Basket",
      },
      {
        key: "3",
        icon: require("../assets/iconMain/icon-03.png"),
        sectionPage: "Basket",
      },
      {
        key: "4",
        icon: require("../assets/iconMain/icon-04.png"),
        sectionPage: "Basket",
      },
      {
        key: "5",
        icon: require("../assets/iconMain/icon-05.png"),
        sectionPage: "Basket",
      },
      {
        key: "6",
        icon: require("../assets/iconMain/icon-06.png"),
        sectionPage: "Basket",
      },
      {
        key: "7",
        icon: require("../assets/iconMain/icon-07.png"),
        sectionPage: "Basket",
      },
      {
        key: "8",
        icon: require("../assets/iconMain/icon-08.png"),
        sectionPage: "Basket",
      },
    ],
  },
];
const sectionBrand = [
  {
    // title: "Title Text",
    horizontal: true,
    data: [
      {
        key: "1",
        icon: require("../assets/iconBrand/brand-01.png"),
        sectionPage: "Basket",
      },
      {
        key: "2",
        icon: require("../assets/iconBrand/brand-02.png"),
        sectionPage: "Basket",
      },
      {
        key: "3",
        icon: require("../assets/iconBrand/brand-03.png"),
        sectionPage: "Basket",
      },
      {
        key: "4",
        icon: require("../assets/iconBrand/brand-04.png"),
        sectionPage: "Basket",
      },
      {
        key: "5",
        icon: require("../assets/iconBrand/brand-05.png"),
        sectionPage: "Basket",
      },
      {
        key: "6",
        icon: require("../assets/iconBrand/brand-06.png"),
        sectionPage: "Basket",
      },
      {
        key: "7",
        icon: require("../assets/iconBrand/brand-07.png"),
        sectionPage: "Basket",
      },
      {
        key: "8",
        icon: require("../assets/iconBrand/brand-08.png"),
        sectionPage: "Basket",
      },
      {
        key: "9",
        icon: require("../assets/iconBrand/brand-09.png"),
        sectionPage: "Basket",
      },
      {
        key: "10",
        icon: require("../assets/iconBrand/brand-10.png"),
        sectionPage: "Basket",
      },
    ],
  },
];
