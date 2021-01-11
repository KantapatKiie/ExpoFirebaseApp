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
  Image,
  Dimensions,
  ToastAndroid
} from "react-native";
import * as ActionChangepassword from "../../actions/action-change-password/ActionChangepassword";
import { Block } from "galio-framework";
import { Icon } from "../../components";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import { Button } from "react-native-elements";

const { height, width } = Dimensions.get("screen");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ChangePassword(props) {
  const { objChangePassword } = useSelector((state) => ({
    objChangePassword: state.actionChangepassword.objChangePassword,
  }));

  useEffect(() => {
    setStateObj("");
  }, []);

  const [stateObj, setStateObj] = useState({
    password1: "",
    password2: "",
  });

  const [ requiredPassword , setRequiredPassword] = useState(false);
  const onChangePassword1 = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.password1 = e;
    setStateObj(newObj);
  };
  const onChangePassword2 = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.password2 = e;
    setStateObj(newObj);
  };

  const showToast = () => {
    ToastAndroid.show("Test ToastAndriod React Native !", ToastAndroid.SHORT);
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
              {"<  "}เปลี่ยนรหัสผ่าน
            </Text>
          </Block>
          {/* Input */}
          <Block style={styles.container2}>
              <Block row style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "kanitRegular",
                    fontSize: 18,
                    color: "black",
                  }}
                >
                  รหัสผ่านใหม่
                </Text>
              </Block>
              <View
                style={
                  requiredPassword !== true
                    ? styles.inputView
                    : styles.inputViewRequired
                }
              >
                <TextInput
                  style={styles.inputText}
                  placeholder={"กรอกรหัสผ่านใหม่"}
                  placeholderTextColor="#808080"
                  value={stateObj.password1}
                  onChangeText={onChangePassword1}
                />
              </View>
              <Block row style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "kanitRegular",
                    fontSize: 18,
                  }}
                >
                  ยืนยันรหัสผ่าน
                </Text>
              </Block>
              <View
                style={
                  requiredPassword !== true
                    ? styles.inputView
                    : styles.inputViewRequired
                }
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="ยืนยันรหัสผ่าน"
                  placeholderTextColor="#808080"
                  value={stateObj.password2}
                  onChangeText={onChangePassword2}
                  secureTextEntry={true}
                />
              </View>
            </Block>
          {/* Botton */}
          <Block
            style={{
              width: "90%",
              alignSelf: "center",
              paddingBottom: 25,
            }}
          >
             <Block row style={{ paddingTop: 30, paddingBottom: 30 }}>
            <Button
              titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
              title={"ย้อนกลับ"}
              type="solid"
              onPress={() => props.navigation.navigate("Sign In")}
              containerStyle={styles.blockButton1}
              buttonStyle={styles.buttonStyle1}
            />
            <Button
              titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
              title={"ยืนยัน"}
              type="solid"
              containerStyle={styles.blockButton2}
              buttonStyle={styles.buttonStyle2}
              onPress={() => showToast()}
            />
          </Block>
          </Block>
          {/* Info */}
          <WangdekInfo />
        </ScrollView>
      </View>
    </>
  );
}

export default connect(null, ActionChangepassword.actions)(ChangePassword);

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
  blockButton1: {
    flexDirection: "row",
    paddingLeft: 15,
  },
  blockButton2: {
    paddingLeft: 25,
  },
  buttonStyle1: {
    backgroundColor: "#535454",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  buttonStyle2: {
    backgroundColor: "#00c278",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
});
