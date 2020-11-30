import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import { Icon, Drawer as DrawerCustomItem } from "../components/";
import { Images, materialTheme } from "../constants/";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ActionLogin from "../actions/action-actives/ActionLogin";
import { setToken } from "../store/mock/token";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...props
}) {
  const { objLoginHD } = useSelector((state) => ({
    objLoginHD: state.login.objLoginHD,
  }));
  const insets = useSafeArea();
  const screens = ["Home", "Profile", "Settings"];

  const onClickSignOut = async () => {
    let newLogout = Object.assign({}, objLoginHD);
    newLogout.EMAIL = "";
    newLogout.PASSWORD = "";
    props.setObjLogin(newLogout);
    await setToken("");
    navigation.navigate("Home");
  };

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
        <TouchableWithoutFeedback>
          <Block style={styles.profile}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <Text h5 color={"white"}>
              {profile.name}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        <Block row>
          {/* <Block middle style={styles.pro}>
            <Text size={16} color="white">
              {profile.plan}
            </Text>
          </Block> */}
          <Text size={16} muted style={styles.seller}>
            {profile.type}
          </Text>
          <Text size={16} color={materialTheme.COLORS.WARNING}>
            {profile.rating}{" "}
            <Icon name="shape-star" family="GalioExtra" size={14} />
          </Text>
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.88,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
      {/* SignIn & SignOut */}
      <Block flex={0.3} style={{ paddingLeft: 7, paddingRight: 14 }}>
        {profile.name !== "" &&
        profile.name !== null &&
        profile.name !== "Guest" &&
        profile.name !== "undefined" ? (
          <>
            <TouchableOpacity style={{ height: 180 }} onPress={onClickSignOut}>
              <Block
                flex
                row
                style={[
                  styles2.defaultStyle,
                  focused ? [styles2.activeStyle, styles2.shadow] : null,
                ]}
              >
                <Block middle flex={0.1} style={{ marginRight: 29 }}>
                  <Icons
                    size={16}
                    name="power"
                    family="ionicon"
                    color={focused ? "white" : materialTheme.COLORS.MUTED}
                  />
                </Block>
                <Block row center flex={0.9}>
                  <Text size={16} color={"black"}>
                    Sign Out
                  </Text>
                </Block>
              </Block>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <DrawerCustomItem
              title="Sign In"
              navigation={navigation}
              focused={state.index === 5 ? true : false}
            />
            <DrawerCustomItem
              title="Sign Up"
              navigation={navigation}
              focused={state.index === 6 ? true : false}
            />
          </>
        )}
      </Block>
    </Block>
  );
}

export default connect(null, ActionLogin.actions)(CustomDrawerContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: materialTheme.COLORS.NEW_ACTIVE,
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: "flex-end",
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  },
});

const styles2 = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.NEW_ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 2,
    height: 16,
    width: 36,
  },
});
