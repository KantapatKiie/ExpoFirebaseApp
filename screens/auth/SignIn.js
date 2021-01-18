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
  ToastAndroid,
  ImageBackground,
} from "react-native";
import ModalLoading from "../../components/ModalLoading";
import { logins } from "../../store/mock/mock"; //mock api
import { setToken } from "../../store/mock/token";
import { login } from "../../store/crud/auth.crud"; //real api
import * as ActionLogin from "../../actions/action-actives/ActionLogin";
import { Block } from "galio-framework";
import { Icon } from "../../components/";
import { formatTr } from "../../i18n/I18nProvider";
import * as Facebook from "expo-facebook";
import * as ImagePicker from "expo-image-picker";
import WangdekInfo from "../../components/WangdekInfo";

const { height, width } = Dimensions.get("screen");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function SignIn(props) {
  // IsLogIn Complete
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const { objLoginHD } = useSelector((state) => ({
    objLoginHD: state.login.objLoginHD,
  }));

  useEffect(() => {
    setRequiredEmail(false);
    setRequiredPass(false);
    setLoading(false);
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const [stateObj, setStateObj] = useState({
    email: "",
    password: "",
  });

  const onChangeEmail = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.email = e;
    setStateObj(newObj);
  };
  const onChangePassword = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.password = e;
    setStateObj(newObj);
  };

  //loading
  const [loading, setLoading] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const onClickSignIn = async (email, password) => {
    let newLogin = Object.assign({}, objLoginHD);
    if (stateObj.email !== "" && stateObj.email !== "undefined") {
      setRequiredEmail(true);
      if (stateObj.password !== "" && stateObj.password !== "undefined") {
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
        setRequiredEmail(false);
        setLoading(false);
      }
    } else {
      setRequiredPass(true);
      setRequiredEmail(true);
      setLoading(false);
    }
    setLoading(false);
  };

  // Login
  const LoginAccount = () => {
    setLoggedinStatus(true);
    ToastAndroid.show("Logout Account", ToastAndroid.SHORT);
  };
  // Logout
  const LogoutAccount = () => {
    setLoggedinStatus(false);
    setUserData("");
    ToastAndroid.show("Logout Account", ToastAndroid.SHORT);
  };
  // Facbook login
  const [userData, setUserData] = useState(null);
  const facebookLogIn = async () => {
    var appId = "1299252020625056";
    var appName = "Wangdek App";
    try {
      await Facebook.initializeAsync({ appId, appName });
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            setLoggedinStatus(true);
            setUserData(data);
            ToastAndroid.show(
              "Logged in complete Hi " + data.name + "!",
              ToastAndroid.SHORT
            );
          })
          .catch((e) => console.log(e));
      } else {
        ToastAndroid.show("Login failed", ToastAndroid.SHORT);
      }
    } catch ({ message }) {
      ToastAndroid.show("Error", ToastAndroid.SHORT);
    }
  };

  // Image Picker Profile
  const [imagePicker, setImagePicker] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    if (!result.cancelled) {
      setImagePicker(result.uri);
    } else {
      ToastAndroid.show("Not Seleted Images", ToastAndroid.SHORT);
    }
  };

  const checkFunction = () => {
    ToastAndroid.show("Check Function!", ToastAndroid.SHORT);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isLoggedin ? (
          <>
            {/* Title */}
            <Block
              flex
              style={{ padding: 30, backgroundColor: "white", width: width }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "kanitRegular",
                  textAlign: "center",
                }}
              >
                เข้าสู่ระบบ
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
                  ชื่อบัญชี
                </Text>
                <Image
                  source={require("../../assets/iconSignIn/user-icon.png")}
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 10,
                  }}
                />
              </Block>
              <View
                style={
                  requiredEmail !== true
                    ? styles.inputView
                    : styles.inputViewRequired
                }
              >
                <TextInput
                  style={styles.inputText}
                  placeholder={"กรอกชื่อบัญชี"}
                  placeholderTextColor="#808080"
                  value={stateObj.email}
                  onChangeText={onChangeEmail}
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
                  รหัสผ่าน
                </Text>
                <Image
                  source={require("../../assets/iconSignIn/pass-icon.png")}
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 10,
                  }}
                />
              </Block>
              <View
                style={
                  requiredPass !== true
                    ? styles.inputView
                    : styles.inputViewRequired
                }
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="กรอกรหัสผ่าน"
                  placeholderTextColor="#808080"
                  value={stateObj.password}
                  onChangeText={onChangePassword}
                  secureTextEntry={true}
                />
              </View>
            </Block>
            {/* Forget Password */}
            <Block
              style={{
                width: "95%",
                borderBottomWidth: 1,
                borderColor: "#e0e0e0",
                height: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                }}
                onPress={() => props.navigation.navigate("Notifications")}
              >
                <Text style={styles.forgot}>ลืมรหัสผ่าน ?</Text>
              </TouchableOpacity>
            </Block>
            {/* Login */}
            <Block
              style={{
                // borderBottomWidth: 1,
                // borderBottomColor: "#e0e0e0",
                width: "90%",
                alignSelf: "center",
              }}
            >
              <Block style={styles.loginBtn}>
                <TouchableOpacity onPress={LoginAccount}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 17,
                      fontFamily: "kanitRegular",
                    }}
                  >
                    เข้าสู่ระบบ
                  </Text>
                </TouchableOpacity>
              </Block>
              <Block
                style={{
                  borderRadius: 20,
                  backgroundColor: "#e0e0e0",
                  width: "15%",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "kanitRegular",
                    fontSize: 12,
                    color: "#706f6f",
                    textAlignVertical: "center",
                  }}
                >
                  หรือ
                </Text>
              </Block>
            </Block>
            {/* Facebook */}
            <Block row style={styles.loginBtnFacebook}>
              <Image
                source={require("../../assets/iconSignIn/fb-icon.png")}
                style={{
                  width: 10,
                  height: 20,
                  marginRight: 20,
                }}
              />
              <TouchableOpacity onPress={facebookLogIn}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontFamily: "kanitRegular",
                  }}
                >
                  เข้าสู่ระบบด้วย Facebook
                </Text>
              </TouchableOpacity>
            </Block>
            {/* Register */}
            <Block
              style={{
                width: width,
                backgroundColor: "#06d198",
                paddingTop: 60,
                paddingBottom: 5,
              }}
            >
              <Image
                source={require("../../assets/iconSignIn/regis-icon.png")}
                style={{
                  width: 90,
                  height: 90,
                  alignSelf: "center",
                }}
              />
            </Block>
            <Block
              style={{
                width: width,
                backgroundColor: "#06d198",
                paddingTop: 30,
                paddingBottom: 40,
                borderBottomColor: "#e0e0e0",
                borderBottomWidth: 0.5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontFamily: "kanitRegular",
                  textAlign: "center",
                }}
              >
                หากท่านยังไม่ได้เป็นสมาชิก
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontFamily: "kanitRegular",
                  textAlign: "center",
                }}
              >
                กรุณาสมัครสมาชิก ก่อนทำการซื้อสินค้า
              </Text>
            </Block>
            <Block
              style={{
                width: width,
                backgroundColor: "#06d198",
                paddingTop: 15,
              }}
            >
              <TouchableOpacity
                style={styles.loginBtnRegister}
                onPress={() => props.navigation.navigate("Sign Up")}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontFamily: "kanitRegular",
                  }}
                >
                  สมัครสมาชิก
                </Text>
              </TouchableOpacity>
            </Block>
          </>
        ) : (
          <>
            {/* Profile */}
            <Block
              row
              style={{
                width: "90%",
                padding: 20,
                borderBottomWidth: 1,
                borderColor: "#e0e0e0",
                alignSelf: "center",
              }}
            >
              <Block>
                <ImageBackground
                  source={
                    imagePicker !== null
                      ? { uri: imagePicker }
                      : require("../../assets/iconSignIn/profilepic.png")
                  }
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  imageStyle={{ borderRadius: 50 }}
                >
                  <TouchableOpacity
                    style={{ paddingLeft: "5%" }}
                    onPress={pickImage}
                  >
                    <Image
                      source={require("../../assets/iconSignIn/upload-pic.png")}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                        alignSelf: "flex-end",
                        marginTop: 70,
                      }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </Block>
              <Block style={{ paddingLeft: "10%" }}>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "kanitRegular",
                    fontSize: 18,
                    textAlign: "left",
                  }}
                >
                  Wangdek Commerce
                </Text>
                <Text
                  style={{
                    color: "#4f4f4f",
                    fontFamily: "kanitLight",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  Address :
                </Text>
                <Text
                  style={{
                    color: "#4f4f4f",
                    fontFamily: "kanitLight",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  Phone :
                </Text>
                <Text
                  style={{
                    color: "#4f4f4f",
                    fontFamily: "kanitLight",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  Emial :
                </Text>
              </Block>
            </Block>
            {/* Point Order */}
            <Block
              row
              style={{
                paddingBottom: 5,
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
                width: "90%",
                alignSelf: "center",
              }}
            >
              <Block style={styles.orderHeader}>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "kanitRegular",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  คำสั่งซื้อสำเร็จ
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "kanitRegular",
                    fontSize: 20,
                    textAlign: "center",
                    color: "#0646c7",
                  }}
                >
                  5
                </Text>
              </Block>
              <Block style={styles.orderHeader}>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "kanitRegular",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  คำสั่งซื้อสำเร็จ
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "kanitRegular",
                    fontSize: 20,
                    textAlign: "center",
                    color: "#6e6e6e",
                  }}
                >
                  0
                </Text>
              </Block>
            </Block>
            {/* Menu List */}
            <Block style={styles.menuListMain}>
              {/* Block Menu1 */}
              <Block row>
                <TouchableOpacity
                  style={{ paddingLeft: "5%" }}
                  onPress={() => props.navigation.navigate("Edit Profile")}
                >
                  <Image
                    source={require("../../assets/iconSignIn/edit-icon.png")}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                    }}
                  />
                  <Text style={styles.fontMenuMainList}>แก้ไขข้อมูล</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingLeft: "15%" }}
                  onPress={() => props.navigation.navigate("My Coupon")}
                >
                  <Image
                    source={require("../../assets/iconSignIn/coupon-icon.png")}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                    }}
                  />
                  <Text style={styles.fontMenuMainList}>คูปองของฉัน</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingLeft: "15%" }}
                  onPress={() => props.navigation.navigate("Favorite View")}
                >
                  <Image
                    source={require("../../assets/iconSignIn/favorite-icon.png")}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                    }}
                  />
                  <Text style={styles.fontMenuMainList}>รายการโปรด</Text>
                </TouchableOpacity>
              </Block>
              {/* Block Menu2 */}
              <Block row style={{ paddingTop: 25 }}>
                <TouchableOpacity
                  style={{ paddingLeft: "5%" }}
                  onPress={() => props.navigation.navigate("History Order")}
                >
                  <Image
                    source={require("../../assets/iconSignIn/history1-icon.png")}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                    }}
                  />
                  <Text style={styles.fontMenuMainList}>ประวัติการ</Text>
                  <Text
                    style={{
                      fontFamily: "kanitRegular",
                      fontSize: 13,
                      color: "#4f4f4f",
                      textAlign: "center",
                    }}
                  >
                    สั่งซื้อสินค้า
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingLeft: "15%" }}
                  onPress={() => props.navigation.navigate("History Order")}
                >
                  <Image
                    source={require("../../assets/iconSignIn/history2-icon.png")}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                    }}
                  />
                  <Text style={styles.fontMenuMainList}>ประวัติการ</Text>
                  <Text
                    style={{
                      fontFamily: "kanitRegular",
                      fontSize: 13,
                      color: "#4f4f4f",
                      textAlign: "center",
                    }}
                  >
                    เข้าชม
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingLeft: "15%" }}
                  onPress={() => props.navigation.navigate("Setting")}
                >
                  <Image
                    source={require("../../assets/iconSignIn/languag-icon.png")}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                    }}
                  />
                  <Text style={styles.fontMenuMainList}>เปลี่ยนภาษา</Text>
                </TouchableOpacity>
              </Block>
            </Block>
            {/* Logout */}
            <Block row style={styles.logoutButton}>
              <TouchableOpacity onPress={LogoutAccount}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontFamily: "kanitRegular",
                  }}
                >
                  ออกจากระบบ
                </Text>
              </TouchableOpacity>
            </Block>
          </>
        )}
        {/* Info */}
        <WangdekInfo/>
      </ScrollView>
      <ModalLoading loading={loading} />
    </>
  );
}

export default connect(null, ActionLogin.actions)(SignIn);

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
  loginBtn: {
    width: "70%",
    backgroundColor: "#0ec99a",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 25,
  },
  loginBtnFacebook: {
    width: "80%",
    backgroundColor: "#2a4abf",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 50,
  },
  loginBtnRegister: {
    width: "60%",
    backgroundColor: "#666666",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 40,
  },
  logoutButton: {
    width: "45%",
    backgroundColor: "#ff0040",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  SignupText: {
    color: "white",
    fontSize: 11,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    paddingTop: 5,
    fontFamily: "kanitRegular",
  },
  logoContainer: {
    elevation: 1,
    paddingBottom: 80,
    marginTop: 10,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  showLogo: {
    alignItems: "center",
  },
  IconBack: {
    color: "white",
    marginTop: 25,
    marginLeft: 15,
  },
  orderHeader: {
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: "15%",
  },
  menuListMain: {
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    width: "90%",
    alignSelf: "center",
  },
  fontMenuMainList: {
    fontFamily: "kanitRegular",
    fontSize: 13,
    color: "#4f4f4f",
    textAlign: "center",
    marginTop: 10,
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
