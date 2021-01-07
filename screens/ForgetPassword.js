import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import * as auth from "../store/ducks/auth.duck";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  UIManager,
  Image,
  Dimensions,
} from "react-native";
import ModalLoading from "../components/ModalLoading";
import { logins } from "../store/mock/mock"; //mock api
import { setToken } from "../store/mock/token";
import { login } from "../store/crud/auth.crud"; //real api
import * as ActionForgetPassword from "../actions/action-forget-password/ActionForgetPassword";
import { Block } from "galio-framework";
import { Icon } from "../components/";
import { formatTr } from "../i18n/I18nProvider";

const { height, width } = Dimensions.get("screen");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ForgetPassword(props) {
  const { objForgetPassword } = useSelector((state) => ({
    objForgetPassword: state.actionForgetPassword.objForgetPassword,
  }));

  useEffect(() => {
    setRequiredEmail(false);
    setRequiredPass(false);
    setLoading(false);
  }, []);

  const [expanded, setExpanded] = useState(false);
  const [stateObj, setStateObj] = useState({
    email: "",
    password: "",
  });

  const onChangeEmail = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.email = e;
    setStateObj(newObj);
  };

  //loading
  const [loading, setLoading] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const onClickSignIn = async (email) => {
    let newLogin = Object.assign({}, objForgetPassword);
    if (stateObj.email !== "" && stateObj.email !== "undefined") {
      setRequiredEmail(true);
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        newLogin.EMAIL = "";
      } else {
        setRequiredEmail(false);
        setRequiredPass(false);
        setTimeout(() => {
          setLoading(true);
          logins(email, password)
            .then(async (res) => {
              newLogin.EMAIL = email;
              newLogin.PASSWORD = password;
              props.setObjLogin(newLogin);

              await setToken(res.auth_token);
              props.navigation.navigate("Home");
            })
            .catch((err) => console.log("error:", err.message));
        }, 120);
      }
    } else {
      setRequiredPass(true);
      setRequiredEmail(true);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Title */}
          <Block
            row
            style={{
              paddingTop: 20,
              paddingLeft: 20,
              paddingBottom: 20,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              {"<  "}ลืมรหัสผ่าน
            </Text>
          </Block>
          <Block style={{ width: width, paddingTop: 20 }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "center",
              }}
            >
              ระบบจะทำการส่ง รหัสผ่านใหม่ให้ท่าน
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "center",
              }}
            >
              ทางอีเมล กรุณากรอกอีเมล ที่ท่านได้ทำการลงทะเบียนไว้
            </Text>
          </Block>
          {/* Input */}
          <Block style={styles.container2}>
            <View
              style={
                requiredEmail !== true || stateObj.email !== ""
                  ? styles.inputView
                  : styles.inputViewRequired
              }
            >
              <TextInput
                style={styles.inputText}
                placeholder={"กรอกอีเมล"}
                placeholderTextColor="#808080"
                value={stateObj.email}
                onChangeText={onChangeEmail}
              />
            </View>
          </Block>
          <Block style={{ width: width, paddingTop: 20 }}>
            <Block row style={{ alignSelf: "center" }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "kanitRegular",
                  color: "black",
                  textAlign: "center",
                }}
              >
                หากท่านยังไม่ได้รับรหัส กรุณากด
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "kanitRegular",
                  color: "black",
                  textAlign: "center",
                  textAlignVertical:"top",
                  paddingLeft: 8,
                  borderBottomWidth:1
                }}
              >
                ขอรับรหัส
              </Text>
            </Block>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "kanitRegular",
                color: "black",
                textAlign: "center",
              }}
            >
              ระบบจะทำการส่งรหัสให้ท่านใหม่
            </Text>
          </Block>

          {/* Botton */}
          <Block
            style={{
              width: "90%",
              alignSelf: "center",
              paddingBottom:25
            }}
          >
            <Block style={styles.forgetButton}>
              <TouchableOpacity onPress={() => onClickSignIn(stateObj.email)}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontFamily: "kanitRegular",
                  }}
                >
                  ขอรับรหัส
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
          {/* Info */}
          <Block row style={stylesFooter.blockHeader}>
            <Text
              style={{
                textAlign: "left",
                color: "white",
                fontSize: 20,
                fontFamily: "kanitBold",
              }}
            >
              {formatTr("WANGDEK_INFO").toString()}
            </Text>
          </Block>
          {INFOLIST.map((item) => (
            <Block style={stylesFooter.blockHeaderInfo} key={item.key}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Basket")}
              >
                <Block row middle space="between" style={{ paddingTop: 7 }}>
                  <Text
                    style={{
                      textAlign: "left",
                      color: "black",
                      fontSize: 14,
                      fontFamily: "kanitRegular",
                    }}
                  >
                    {item.text}
                  </Text>
                  <Icon
                    name="angle-right"
                    family="font-awesome"
                    style={{ paddingRight: 5 }}
                  />
                </Block>
              </TouchableOpacity>
            </Block>
          ))}
        </ScrollView>
      </View>
      <ModalLoading loading={loading} />
    </>
  );
}

export default connect(null, ActionForgetPassword.actions)(ForgetPassword);

const INFOLIST = [
  {
    key: "1",
    text: "เกี่ยวกับเรา",
  },
  {
    key: "2",
    text: "วิธีการสั่งซื้อสินค้า",
  },
  {
    key: "3",
    text: "วิธีการชำระเงิน",
  },
  {
    key: "4",
    text: "ติดต่อเรา",
  },
  {
    key: "5",
    text: "Term & Conditions",
  },
  {
    key: "6",
    text: "Privacy Policy",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  container2: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 25,
    paddingLeft: 25,
  },
  inputView: {
    width: "95%",
    backgroundColor: "#ffffff",
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1.4,
    borderColor: "#e0e0e0",
  },
  inputViewRequired: {
    width: "95%",
    backgroundColor: "#ffffff",
    borderColor: "red",
    borderWidth: 1.4,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 15,
    fontFamily: "kanitRegular",
  },
  rowTouch: {
    flexDirection: "column",
  },
  forgot: {
    color: "black",
    fontSize: 14,
    alignItems: "flex-end",
    fontFamily: "kanitRegular",
    borderBottomWidth: 1,
  },
  forgetButton: {
    width: "60%",
    backgroundColor: "#0ec99a",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 25,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

const stylesFooter = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  blockHeader: {
    padding: 8,
    paddingLeft: 15,
    backgroundColor: "#486ec7",
    flexDirection: "column",
  },
  blockHeaderInfo: {
    padding: 8,
    paddingLeft: 15,
    backgroundColor: "#f7f7f7",
    flexDirection: "column",
  },
});
