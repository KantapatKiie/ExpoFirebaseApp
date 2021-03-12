import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import * as auth from "../../store/ducks/auth.duck";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  UIManager,
  Dimensions,
  ToastAndroid
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";
import * as ActionForgotPassword from "../../actions/action-forgot-password/ActionForgotPassword";
import { Block } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import ModalLoading from "../../components/ModalLoading";

const { width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ForgotPassword(props) {
  const { objForgotPassword } = useSelector((state) => ({
    objForgotPassword: state.actionForgotPassword.objForgotPassword,
  }));

  useEffect(() => {
    setRequiredEmail(false);
    setRequiredPass(false);
    setLoading(false);
  }, []);

  const [expanded, setExpanded] = useState(false);
  const [stateObj, setStateObj] = useState({
    email: "",
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
    let newLogin = Object.assign({}, objForgotPassword);
    if (stateObj.email !== "" && stateObj.email !== "undefined") {
      setRequiredEmail(true);
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        newLogin.EMAIL = "";
      } else {
        setRequiredEmail(false);
        setRequiredPass(false);
        await axios({
          method: "POST",
          url: API_URL.FORGOT_PASSWORD_RESET_API,
          headers: {
            Accept: "*/*",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
          data: {
            email: stateObj.email,
          },
        })
          .then(function (response) {
            ToastAndroid.show(response.data.data, ToastAndroid.SHORT);
          })
          .catch(function (error) {
            console.log(error);
            ToastAndroid.show(error.response.data, ToastAndroid.SHORT);
          });
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
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Sign In")}
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
          </TouchableOpacity>
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
              <Block style={{ paddingLeft: 2, borderBottomWidth: 1}}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "kanitBold",
                    color: "black",

                  }}
                >
                  ขอรับรหัส
                </Text>
              </Block>
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
              paddingBottom: 25,
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
          <WangdekInfo />
        </ScrollView>
      </View>
      <ModalLoading loading={loading} />
    </>
  );
}

export default connect(null, ActionForgotPassword.actions)(ForgotPassword);

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
