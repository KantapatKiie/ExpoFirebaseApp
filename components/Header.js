import React, { useState, useEffect } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Modal,
  TouchableHighlight,
  View,
} from "react-native";
import { Block, NavBar, Input, Text, theme } from "galio-framework";
import Icon from "./Icon";
import materialTheme from "../constants/Theme";
import { API_URL } from "../config/config.app";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const { height, width } = Dimensions.get("window");

const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const ModalMessage = ({ isWhite, style }) => {
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
        <Icon
          family="GalioExtra"
          size={16}
          name="chat-33"
          color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
        />
        <Block middle style={styles.notify} />
      </TouchableOpacity>
    </>
  );
};
const BasketButton = ({ isWhite, style, navigation }) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => navigation.navigate("Basket")}
      >
        <Icon
          family="GalioExtra"
          size={16}
          name="basket-simple"
          color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
        />
        <Block middle style={styles.notify} />
      </TouchableOpacity>
    </>
  );
};

function Header(props) {
  const { onSelect, onClose, show } = props;
  const [objSearch, setObjSearch] = useState({
    SEARCH_NO: "",
  });

  const handleLeftPress = () => {
    const { back, navigation } = props;
    return back ? navigation.goBack() : navigation.openDrawer();
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
      case "Categories":
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
      case "Category":
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
      case "TestPage":
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

  //Input Search
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
  //Button Search
  const renderTabs = () => {
    const { tabTitleLeft, tabTitleRight } = props;

    return (
      <Block row style={styles.tabs}>
        <TouchableOpacity
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => props.navigation.navigate("Categories")}
        >
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>
              {tabTitleLeft || "Categories"}
            </Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => props.navigation.navigate("Pro")}
        >
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>
              {tabTitleLeft || "Products"}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };
  //Header component
  const renderHeader = () => {
    const { search, tabs } = props;
    if (search || tabs) {
      return (
        <Block center>
          {/* {search ? renderSearch() : null} */}
          {tabs ? renderTabs() : null}
        </Block>
      );
    }
    return null;
  };

  const { back, title, white, transparent } = props;
  const noShadow = ["Search", "Categories", "Deals", "Pro", "Profile"].includes(
    title
  );
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
  ];

  return (
    <Block style={headerStyles}>
      <NavBar
        back={back}
        title={title}
        style={styles.navbar}
        transparent={transparent}
        rightStyle={{ alignItems: "center" }}
        leftStyle={{ flex: 0.3, paddingTop: 2 }}
        leftIconName={back ? "chevron-left" : "navicon"}
        leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
        titleStyle={[
          styles.title,
          { color: theme.COLORS[white ? "WHITE" : "ICON"] },
        ]}
        right={renderRight()}
        onLeftPress={handleLeftPress}
      />
      {renderHeader()}
    </Block>
  );
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  
  button: {
    padding: 12,
    position: "relative",
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 3.5 : theme.SIZES.BASE,
    zIndex: 5,
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
    borderRightWidth: 0.3,
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
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
    fontSize: 12
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
