import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
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
import axios from "axios";
import moment from "moment";
import ModalLoading from "../../components/ModalLoading";
import { getToken, setToken, removeToken } from "../../store/mock/token";
import { actions as ActionLogin } from "../../actions/action-actives/ActionLogin";
import { actions as ActionEditProfile } from "../../actions/action-actives/ActionEditProfile";
import { actions as ActionOrder } from "../../actions/action-order-status/ActionOrder";
import { Block } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import * as Facebook from "expo-facebook";
import * as ImagePicker from "expo-image-picker";
import WangdekInfo from "../../components/WangdekInfo";
import { API_URL } from "../../config/config.app";

const { width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const defalutLoginMasterHD = {
  EMAIL: "",
  PASSWORD: "",
  IMAGE: "",
  TOKEN: "",
  ID: 0,
  GUEST: 0,
  FIRST_NAME: "a",
  LAST_NAME: "a",
  EMAIL: "abcd@email.com",
  ACTIVE: 0,
  EMAIL_VERIFIED_AT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  CREATE_AT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  UPDATED_AT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  CREATE_BY: 0,
  UPDATED_BY: 0,
  DELETED_AT: null,

  TELEPHONE: "00",
  ADDRESS: "11/11",
  PROVINCE_ID: 1,
  PROVINCE_NAME: "",
  DISTRICT_ID: 1,
  DISTRICT_NAME: "",
  SUB_DISTRICT_ID: 1,
  SUB_DISTRICT_NAME: "",
  ZIP_CODE: "10000",
  ADDRESS_FULL_NAME: "aa",

  //Push List EditProfile
  profile_id: 5,
  sex: 1,
  birthday: moment(new Date()).format("YYYY-MM-DD"),
  telephone: "1",
  address: "a",
  province_id: 1,
  district_id: 1,
  sub_district_id: 1,
  postcode: "1",
  receive_info: 0,

  address_deliveries_id: 5,
  address_deliveries: "a",
  province_id_deliveries: 1,
  district_id_deliveries: 1,
  sub_district_id_deliveries: 1,
  postcode_deliveries: "1",
  telephone_deliveries: "1",
};

function SignIn(props) {
  // IsLogIn Complete View
  const [isLoggedin, setLoggedinStatus] = useState(token._W ? true : false);

  const [objLoginMasterHD, setObjLoginMasterHD] = useState(
    defalutLoginMasterHD
  );
  const [stateObj, setStateObj] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setRequiredEmail(false);
    setRequiredPass(false);
    setLoading(false);
    if (token._W) {
      onLoadGetUserInfo();
    }
  }, []);

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

  //loading & Required
  const [loading, setLoading] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const [imagePicker, setImagePicker] = useState(null);
  const [loadImageUser, setLoadImageUser] = useState(null);
  async function onLoadGetUserInfo() {
    let newLogin = Object.assign({}, objLoginMasterHD);
    await axios
      .get(API_URL.USER_INFO_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
        },
      })
      .then(async (response) => {
        newLogin.FIRST_NAME = response.data.data.first_name;
        newLogin.LAST_NAME = response.data.data.last_name;
        newLogin.TELEPHONE = response.data.data.profile.telephone;
        newLogin.EMAIL = response.data.data.email;
        newLogin.ADDRESS = response.data.data.profile.address;
        newLogin.PROVINCE_ID = response.data.data.profile.province_id;
        newLogin.DISTRICT_ID = response.data.data.profile.district_id;
        newLogin.SUB_DISTRICT_ID = response.data.data.profile.sub_district_id;
        newLogin.IMAGE = await response.data.data.image;
        newLogin.ORDER_COMPLETED = response.data.data.order_completed;
        newLogin.ORDER_CANCELLED = response.data.data.order_cancelled;
        setLoadImageUser(newLogin.IMAGE);

        //#region get EditProfile
        newLogin.profile_id = response.data.data.profile.id;
        newLogin.sex = response.data.data.profile.sex;
        newLogin.birthday = response.data.data.profile.birthday;
        newLogin.telephone = response.data.data.profile.telephone;
        newLogin.address = response.data.data.profile.address;
        newLogin.province_id = response.data.data.profile.province_id;
        newLogin.district_id = response.data.data.profile.district_id;
        newLogin.sub_district_id = response.data.data.profile.sub_district_id;
        newLogin.postcode = response.data.data.profile.postcode;
        newLogin.receive_info = response.data.data.profile.receive_info;

        newLogin.address_deliveries_id =
          response.data.data.address_deliveries[0].id;
        newLogin.address_deliveries =
          response.data.data.address_deliveries[0].address;
        newLogin.province_id_deliveries =
          response.data.data.address_deliveries[0].province_id;
        newLogin.district_id_deliveries =
          response.data.data.address_deliveries[0].district_id;
        newLogin.sub_district_id_deliveries =
          response.data.data.address_deliveries[0].sub_district_id;
        newLogin.postcode_deliveries =
          response.data.data.address_deliveries[0].postcode;
        newLogin.telephone_deliveries =
          response.data.data.address_deliveries[0].telephone;
        //#endregion

        //getAddress User & Delivery
        await axios
          .get(API_URL.DISTRICT_API, {
            params: {
              province_id: newLogin.PROVINCE_ID,
            },
          })
          .then(async (response) => {
            let newlstDistrict = response.data.data.find(
              (item) => item.id == parseInt(newLogin.DISTRICT_ID)
            );
            newLogin.DISTRICT_NAME = newlstDistrict.name_th;

            await axios
              .get(API_URL.SUB_DISTRICT_API, {
                params: {
                  district_id: newLogin.DISTRICT_ID,
                },
              })
              .then(async (response) => {
                let newlstSubDistrict = response.data.data.find(
                  (item) => item.id == parseInt(newLogin.SUB_DISTRICT_ID)
                );
                newLogin.SUB_DISTRICT_NAME = newlstSubDistrict.name_th;
                newLogin.ZIP_CODE = newlstSubDistrict.zip_code;

                await axios.get(API_URL.PROVINCE_API).then(function (response) {
                  let newlstProvince = response.data.data.find(
                    (item) => item.id == parseInt(newLogin.PROVINCE_ID)
                  );
                  newLogin.PROVINCE_NAME = newlstProvince.name_th;
                  newLogin.ADDRESS_FULL_NAME =
                    newLogin.ADDRESS +
                    " " +
                    newLogin.DISTRICT_NAME +
                    " " +
                    newLogin.SUB_DISTRICT_NAME +
                    " " +
                    newLogin.PROVINCE_NAME +
                    " " +
                    newLogin.ZIP_CODE;

                  //Delivery Address
                  //District
                  axios
                    .get(API_URL.DISTRICT_API, {
                      params: {
                        province_id: newLogin.province_id_deliveries,
                      },
                    })
                    .then(function (response) {
                      let newlstDistrict = response.data.data.find(
                        (item) =>
                          item.id == parseInt(newLogin.district_id_deliveries)
                      );
                      newLogin.DISTRICT_NAME_ORDER = newlstDistrict.name_th;

                      //Sub-District
                      axios
                        .get(API_URL.SUB_DISTRICT_API, {
                          params: {
                            district_id: newLogin.district_id_deliveries,
                          },
                        })
                        .then(function (response) {
                          let newlstSubDistrict = response.data.data.find(
                            (item) =>
                              item.id ==
                              parseInt(newLogin.sub_district_id_deliveries)
                          );
                          newLogin.SUB_DISTRICT_NAME_ORDER =
                            newlstSubDistrict.name_th;
                          newLogin.ZIP_CODE_ORDER = newlstSubDistrict.zip_code;

                          //province
                          axios
                            .get(API_URL.PROVINCE_API)
                            .then(function (response) {
                              let newlstProvince = response.data.data.find(
                                (item) =>
                                  item.id ==
                                  parseInt(newLogin.province_id_deliveries)
                              );
                              newLogin.PROVINCE_NAME_ORDER =
                                newlstProvince.name_th;

                              setObjLoginMasterHD(newLogin);
                              setLoggedinStatus(true);
                            });
                        });
                    });
                });
              });
          });
        setLoggedinStatus(true);
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      });
    setLoading(false);
    setLoggedinStatus(true);
  }
  // Image Picker Profile
  const pickImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    setImagePicker(result.uri);
    setLoadImageUser(null);

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    formData.append("avatar", { uri: localUri, name: filename, type });

    await fetch(API_URL.IMAGE_PROFILE_UPLOAD_API, {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + (await token),
      },
    })
      .then((response) => {
        ToastAndroid.show("Upload success!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log("upload error", error);
        ToastAndroid.show("Upload failed!", ToastAndroid.SHORT);
      });
  };
  // Login
  const LoginAccount = () => {
    removeToken();
    setLoading(true);
    let newLogin = Object.assign({}, objLoginMasterHD);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (stateObj.email !== "" && stateObj.email !== "undefined") {
      setRequiredEmail(false);
      if (stateObj.password !== "" && stateObj.password !== "undefined") {
        setRequiredPass(false);
        if (reg.test(stateObj.email) === true) {
          setRequiredEmail(false);
          setLoading(true);
          axios({
            method: "POST",
            url: API_URL.LOGIN_API,
            params: {
              email: stateObj.email,
              password: stateObj.password,
            },
          })
            .then(async (response) => {
              newLogin.EMAIL = response.data.data.user[0].email;
              newLogin.PASSWORD = stateObj.password;
              newLogin.ID = response.data.data.user[0].id;
              newLogin.FIRST_NAME = response.data.data.user[0].first_name;
              newLogin.LAST_NAME = response.data.data.user[0].last_name;
              newLogin.IMAGE = response.data.data.user[0].image;
              newLogin.ORDER_COMPLETED = response.data.data.order_completed;
              newLogin.ORDER_CANCELLED = response.data.data.order_cancelled;

              setLoadImageUser(newLogin.IMAGE);

              let tokenGenerate = await response.data.data.token;
              newLogin.TOKEN = await response.data.data.token;
              await setToken(tokenGenerate);

              //get UserInfo
              await axios
                .get(API_URL.USER_INFO_API, {
                  headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + (await tokenGenerate),
                  },
                })
                .then(async (response) => {
                  newLogin.FIRST_NAME = response.data.data.first_name;
                  newLogin.LAST_NAME = response.data.data.last_name;
                  newLogin.TELEPHONE = await response.data.data.profile
                    .telephone;
                  newLogin.EMAIL = response.data.data.email;
                  newLogin.ADDRESS = response.data.data.profile.address;
                  newLogin.PROVINCE_ID = response.data.data.profile.province_id;
                  newLogin.DISTRICT_ID = response.data.data.profile.district_id;
                  newLogin.SUB_DISTRICT_ID =
                    response.data.data.profile.sub_district_id;

                  //get EditProfile
                  newLogin.profile_id = response.data.data.profile.id;
                  newLogin.sex = response.data.data.profile.sex;
                  newLogin.birthday = response.data.data.profile.birthday;
                  newLogin.telephone = response.data.data.profile.telephone;
                  newLogin.address = response.data.data.profile.address;
                  newLogin.province_id = response.data.data.profile.province_id;
                  newLogin.district_id = response.data.data.profile.district_id;
                  newLogin.sub_district_id =
                    response.data.data.profile.sub_district_id;
                  newLogin.postcode = response.data.data.profile.postcode;
                  newLogin.receive_info =
                    response.data.data.profile.receive_info;

                  newLogin.address_deliveries_id =
                    response.data.data.address_deliveries[0].id;
                  newLogin.address_deliveries =
                    response.data.data.address_deliveries[0].address;
                  newLogin.province_id_deliveries =
                    response.data.data.address_deliveries[0].province_id;
                  newLogin.district_id_deliveries =
                    response.data.data.address_deliveries[0].district_id;
                  newLogin.sub_district_id_deliveries =
                    response.data.data.address_deliveries[0].sub_district_id;
                  newLogin.postcode_deliveries =
                    response.data.data.address_deliveries[0].postcode;
                  newLogin.telephone_deliveries =
                    response.data.data.address_deliveries[0].telephone;

                  //getAddress User & Delivery
                  axios
                    .get(API_URL.DISTRICT_API, {
                      params: {
                        province_id: newLogin.PROVINCE_ID,
                      },
                    })
                    .then(function (response) {
                      let newlstDistrict = response.data.data.find(
                        (item) => item.id == parseInt(newLogin.DISTRICT_ID)
                      );
                      newLogin.DISTRICT_NAME = newlstDistrict.name_th;

                      axios
                        .get(API_URL.SUB_DISTRICT_API, {
                          params: {
                            district_id: newLogin.DISTRICT_ID,
                          },
                        })
                        .then(function (response) {
                          let newlstSubDistrict = response.data.data.find(
                            (item) =>
                              item.id == parseInt(newLogin.SUB_DISTRICT_ID)
                          );
                          newLogin.SUB_DISTRICT_NAME =
                            newlstSubDistrict.name_th;
                          newLogin.ZIP_CODE = newlstSubDistrict.zip_code;

                          axios
                            .get(API_URL.PROVINCE_API)
                            .then(function (response) {
                              let newlstProvince = response.data.data.find(
                                (item) =>
                                  item.id == parseInt(newLogin.PROVINCE_ID)
                              );
                              newLogin.PROVINCE_NAME = newlstProvince.name_th;
                              newLogin.ADDRESS_FULL_NAME =
                                newLogin.ADDRESS +
                                " " +
                                newLogin.DISTRICT_NAME +
                                " " +
                                newLogin.SUB_DISTRICT_NAME +
                                " " +
                                newLogin.PROVINCE_NAME +
                                " " +
                                newLogin.ZIP_CODE;

                              //Delivery Address
                              //District
                              axios
                                .get(API_URL.DISTRICT_API, {
                                  params: {
                                    province_id:
                                      newLogin.province_id_deliveries,
                                  },
                                })
                                .then(function (response) {
                                  let newlstDistrict = response.data.data.find(
                                    (item) =>
                                      item.id ==
                                      parseInt(newLogin.district_id_deliveries)
                                  );
                                  newLogin.DISTRICT_NAME_ORDER =
                                    newlstDistrict.name_th;

                                  //Sub-District
                                  axios
                                    .get(API_URL.SUB_DISTRICT_API, {
                                      params: {
                                        district_id:
                                          newLogin.district_id_deliveries,
                                      },
                                    })
                                    .then(function (response) {
                                      let newlstSubDistrict = response.data.data.find(
                                        (item) =>
                                          item.id ==
                                          parseInt(
                                            newLogin.sub_district_id_deliveries
                                          )
                                      );
                                      newLogin.SUB_DISTRICT_NAME_ORDER =
                                        newlstSubDistrict.name_th;
                                      newLogin.ZIP_CODE_ORDER =
                                        newlstSubDistrict.zip_code;

                                      //province
                                      axios
                                        .get(API_URL.PROVINCE_API)
                                        .then(function (response) {
                                          let newlstProvince = response.data.data.find(
                                            (item) =>
                                              item.id ==
                                              parseInt(
                                                newLogin.province_id_deliveries
                                              )
                                          );
                                          newLogin.PROVINCE_NAME_ORDER =
                                            newlstProvince.name_th;

                                          setObjLoginMasterHD(newLogin);
                                          setLoggedinStatus(true);
                                          setLoading(false);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
              await setLoggedinStatus(true);
              setLoading(false);
              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            })
            .catch(function (error) {
              setLoggedinStatus(false);
              setRequiredPass(true);
              setRequiredEmail(true);
              setLoading(false);
              console.log("error:", error.message);
              ToastAndroid.show(
                "Email or Password was Wrong",
                ToastAndroid.SHORT
              );
            });
        } else {
          setLoading(false);
          setLoggedinStatus(false);
          setRequiredPass(false);
          setRequiredEmail(true);
          ToastAndroid.show("Email was Wrong", ToastAndroid.SHORT);
        }
      } else {
        setLoading(false);
        setLoggedinStatus(false);
        setRequiredPass(true);
      }
    } else {
      setRequiredEmail(true);
      setRequiredPass(true);
      setLoading(false);
      ToastAndroid.show(
        "Please enter your email & password",
        ToastAndroid.SHORT
      );
    }
    setLoading(false);
  };
  // Logout
  const LogoutAccount = async () => {
    setStateObj({
      email: "",
      password: "",
    });
    await removeToken();
    setLoggedinStatus(false);
    ToastAndroid.show("Logout successfully", ToastAndroid.SHORT);
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

  //Edit Profile
  const onChangePageEditProfile = () => {
    let newObjList = Object.assign({}, objLoginMasterHD);
    newObjList.FIRST_NAME = objLoginMasterHD.FIRST_NAME;
    newObjList.LAST_NAME = objLoginMasterHD.LAST_NAME;

    newObjList.profile_id = objLoginMasterHD.profile_id;
    newObjList.SEX = objLoginMasterHD.sex;
    newObjList.BIRTH_DATE = objLoginMasterHD.birthday;
    newObjList.PHONE_NUMBER = objLoginMasterHD.telephone;
    newObjList.address = objLoginMasterHD.address;
    newObjList.province_id = objLoginMasterHD.province_id;
    newObjList.district_id = objLoginMasterHD.district_id;
    newObjList.sub_district_id = objLoginMasterHD.sub_district_id;
    newObjList.postcode = objLoginMasterHD.postcode;
    newObjList.receive_info = objLoginMasterHD.receive_info;

    newObjList.address_deliveries_id = objLoginMasterHD.address_deliveries_id;
    newObjList.address = objLoginMasterHD.address_deliveries;
    newObjList.province_id = objLoginMasterHD.province_id_deliveries;
    newObjList.district_id = objLoginMasterHD.district_id_deliveries;
    newObjList.sub_district_id = objLoginMasterHD.sub_district_id_deliveries;
    newObjList.postcode = objLoginMasterHD.postcode_deliveries;
    newObjList.telephone = objLoginMasterHD.telephone_deliveries;

    newObjList.TOKEN = objLoginMasterHD.TOKEN;

    newObjList.ADDRESS_NAME = objLoginMasterHD.address;
    newObjList.PROVINCE_CODE = objLoginMasterHD.province_id;
    newObjList.DISTRICT_CODE = objLoginMasterHD.district_id;
    newObjList.SUB_DISTRICT_CODE = objLoginMasterHD.sub_district_id;
    newObjList.ZIP_CODE = objLoginMasterHD.postcode;

    newObjList.ADDRESS_NAME_ORDER = objLoginMasterHD.address_deliveries;
    newObjList.PROVINCE_CODE_ORDER = objLoginMasterHD.province_id_deliveries;
    newObjList.DISTRICT_CODE_ORDER = objLoginMasterHD.district_id_deliveries;
    newObjList.SUB_DISTRICT_CODE_ORDER =
      objLoginMasterHD.sub_district_id_deliveries;
    newObjList.ZIP_CODE_ORDER = objLoginMasterHD.postcode_deliveries;
    newObjList.PHONE_NUMBER_ORDER = newObjList.telephone;

    props.setObjEditProfile(newObjList);
    props.navigation.navigate("Edit Profile");
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isLoggedin ? (
          <>
            {!isLoggedin || !token._W ? ( //Not Login
              <>
                {/* Title */}
                <Block
                  flex
                  style={{
                    padding: 30,
                    backgroundColor: "white",
                    width: width,
                  }}
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
                {/* Email */}
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
                    onPress={() => props.navigation.navigate("Forgot Password")}
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
              //Login Complete
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
                        loadImageUser !== null
                          ? { uri: rootImage + loadImageUser }
                          : imagePicker !== null
                          ? { uri: imagePicker }
                          : require("../../assets/iconSignIn/profilepic.png")
                      }
                      style={{
                        width: 100,
                        height: 100,
                        shadowColor: "black",
                        borderWidth: 0.8,
                        borderRadius: 50,
                        borderColor: "#e0e0e0",
                      }}
                      imageStyle={{ borderRadius: 50 }}
                    >
                      <TouchableOpacity
                        style={{ paddingLeft: "5%" }}
                        onPress={pickImageUpload}
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
                  <Block style={{ paddingLeft: "10%", width: "90%" }}>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "kanitRegular",
                        fontSize: 18,
                        textAlign: "left",
                      }}
                    >
                      {objLoginMasterHD.FIRST_NAME +
                        " " +
                        objLoginMasterHD.LAST_NAME}
                    </Text>
                    <Text
                      style={{
                        color: "#4f4f4f",
                        fontFamily: "kanitLight",
                        fontSize: 14,
                        textAlign: "left",
                      }}
                    >
                      Address : {objLoginMasterHD.ADDRESS_FULL_NAME}
                    </Text>
                    <Text
                      style={{
                        color: "#4f4f4f",
                        fontFamily: "kanitLight",
                        fontSize: 14,
                        textAlign: "left",
                      }}
                    >
                      Phone : {objLoginMasterHD.TELEPHONE}
                    </Text>
                    <Text
                      style={{
                        color: "#4f4f4f",
                        fontFamily: "kanitLight",
                        fontSize: 14,
                        textAlign: "left",
                      }}
                    >
                      Email : {objLoginMasterHD.EMAIL}
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
                      {objLoginMasterHD.ORDER_COMPLETED}
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
                      ยกเลิกคำสั่งซื้อ
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
                      {objLoginMasterHD.ORDER_CANCELLED}
                    </Text>
                  </Block>
                </Block>
                {/* Menu List */}
                <Block style={styles.menuListMain}>
                  {/* Block Menu1 */}
                  <Block row>
                    <TouchableOpacity
                      style={{ paddingLeft: "5%" }}
                      onPress={onChangePageEditProfile}
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
                      onPress={() => props.navigation.navigate("History View")}
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
          </>
        ) : (
          //Login Complete
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
                    loadImageUser !== null
                      ? { uri: rootImage + loadImageUser }
                      : imagePicker !== null
                      ? { uri: imagePicker }
                      : require("../../assets/iconSignIn/profilepic.png")
                  }
                  style={{
                    width: 100,
                    height: 100,
                    shadowColor: "black",
                    borderWidth: 0.8,
                    borderRadius: 50,
                    borderColor: "#e0e0e0",
                  }}
                  imageStyle={{ borderRadius: 50 }}
                >
                  <TouchableOpacity
                    style={{ paddingLeft: "5%" }}
                    onPress={pickImageUpload}
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
              <Block style={{ paddingLeft: "10%", width: "90%" }}>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "kanitRegular",
                    fontSize: 18,
                    textAlign: "left",
                  }}
                >
                  {objLoginMasterHD.FIRST_NAME +
                    " " +
                    objLoginMasterHD.LAST_NAME}
                </Text>
                <Text
                  style={{
                    color: "#4f4f4f",
                    fontFamily: "kanitLight",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  Address : {objLoginMasterHD.ADDRESS_FULL_NAME}
                </Text>
                <Text
                  style={{
                    color: "#4f4f4f",
                    fontFamily: "kanitLight",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  Phone : {objLoginMasterHD.TELEPHONE}
                </Text>
                <Text
                  style={{
                    color: "#4f4f4f",
                    fontFamily: "kanitLight",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  Email : {objLoginMasterHD.EMAIL}
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
                  {objLoginMasterHD.ORDER_COMPLETED}
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
                  ยกเลิกคำสั่งซื้อ
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
                  {objLoginMasterHD.ORDER_CANCELLED}
                </Text>
              </Block>
            </Block>
            {/* Menu List */}
            <Block style={styles.menuListMain}>
              {/* Block Menu1 */}
              <Block row>
                <TouchableOpacity
                  style={{ paddingLeft: "5%" }}
                  onPress={onChangePageEditProfile}
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
                  onPress={() => props.navigation.navigate("History View")}
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
        <WangdekInfo />
      </ScrollView>
      <ModalLoading loading={loading} />
    </>
  );
}

const mapActions = {
  setObjLogin: ActionLogin.setObjLogin,
  pushListTrLoginHD: ActionLogin.pushListTrLoginHD,
  setListTrLoginHD: ActionLogin.setListTrLoginHD,
  clearObjLogin: ActionLogin.clearObjLogin,

  setObjEditProfile: ActionEditProfile.setObjEditProfile,
  pushListTrEditProfileHD: ActionEditProfile.pushListTrEditProfileHD,
  setListTrEditProfileHD: ActionEditProfile.setListTrEditProfileHD,
  clearObjEditProfile: ActionEditProfile.clearObjEditProfile,

  setobjOrderScreen: ActionOrder.setobjOrderScreen,
  setObjUseAddressDelivery: ActionOrder.setObjUseAddressDelivery,
};

export default connect(null, mapActions)(SignIn);

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
