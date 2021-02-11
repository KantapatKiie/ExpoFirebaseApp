import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import moment from "moment";
import * as ActionEditProfile from "../../actions/action-actives/ActionEditProfile";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalLoading from "../../components/ModalLoading";
import { Block, Input } from "galio-framework";
import WangdekInfo from "../../components/WangdekInfo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "react-native-elements";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("screen");
const token = getToken();

function EditProfile(props) {
  // let controller;
  const { objEditProfileHD } = useSelector((state) => ({
    objEditProfileHD: state.actionEditProfile.objEditProfileHD,
  }));

  useEffect(() => {
    getProvinces();
  }, []);

  const [loading, setLoading] = useState(true);
  // #2
  const onChangeFirstName = (e) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.FIRST_NAME = e;
    props.setObjEditProfile(newObj);
  };
  const onChangeLastName = (e) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.LAST_NAME = e;
    props.setObjEditProfile(newObj);
  };
  const onChangePhone = (e) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.PHONE_NUMBER = e;
    props.setObjEditProfile(newObj);
  };
  const onChangeEmail = (e) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.EMAIL = e;
    props.setObjEditProfile(newObj);
  };

  //Gender
  const [checkedSex, setCheckedSex] = useState(0);
  //MailBox
  const [checkedMail, setCheckedMail] = useState(2);
  //DatePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    let newObj = Object.assign({}, objEditProfileHD);
    if (date === null) {
      newObj.BIRTH_DATE = moment(new Date()).format();
    } else {
      newObj.BIRTH_DATE = moment(date).format("YYYY-MM-DD");
    }
    props.setObjEditProfile(newObj);
    hideDatePicker();
  };

  // #3
  const [province, setProvince] = useState([
    {
      label: objEditProfileHD.PROVINCE_NAME,
      value: objEditProfileHD.PROVINCE_CODE,
    },
  ]);
  const [district, setDistrict] = useState([
    {
      label: objEditProfileHD.DISTRICT_NAME,
      value: objEditProfileHD.DISTRICT_CODE,
    },
  ]);
  const [subDistrict, setSubDistrict] = useState([
    {
      label: objEditProfileHD.SUB_DISTRICT_NAME,
      value: objEditProfileHD.SUB_DISTRICT_CODE,
    },
  ]);
  const getProvinces = async () => {
    await axios
      .get(API_URL.PROVINCE_API)
      .then(function (response) {
        let newlstBin = response.data.data.map(function (item) {
          item.label = item.name_th;
          item.value = item.id;
          return item;
        });

        if (newlstBin !== null || newlstBin !== "") {
          setProvince(newlstBin);
          setProvinceOrder(newlstBin);

          axios
            .get(API_URL.DISTRICT_API, {
              params: {
                province_id: objEditProfileHD.PROVINCE_CODE,
              },
            })
            .then(function (response) {
              let newlstBin = response.data.data.map(function (item) {
                item.label = item.name_th;
                item.value = item.id;
                return item;
              });
              setDistrict(newlstBin);

              //User Address loadEffect
              axios
                .get(API_URL.SUB_DISTRICT_API, {
                  params: {
                    district_id: objEditProfileHD.DISTRICT_CODE,
                  },
                })
                .then(function (response) {
                  let newlstBin = response.data.data.map(function (item) {
                    item.label = item.name_th;
                    item.value = item.id;
                    return item;
                  });
                  setSubDistrict(newlstBin);

                  //Delivery Address loadEffect
                  axios
                    .get(API_URL.DISTRICT_API, {
                      params: {
                        province_id: objEditProfileHD.PROVINCE_CODE_ORDER,
                      },
                    })
                    .then(function (response) {
                      let newlstBin = response.data.data.map(function (item) {
                        item.label = item.name_th;
                        item.value = item.id;
                        return item;
                      });
                      setDistrictOrder(newlstBin);

                      axios
                        .get(API_URL.SUB_DISTRICT_API, {
                          params: {
                            district_id: objEditProfileHD.DISTRICT_CODE_ORDER,
                          },
                        })
                        .then(function (response) {
                          let newlstBin = response.data.data.map(function (
                            item
                          ) {
                            item.label = item.name_th;
                            item.value = item.id;
                            return item;
                          });
                          setSubDistrictOrder(newlstBin);
                        });
                    });
                });
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onChangeAdress = (value) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.ADDRESS_NAME = value;
    props.setObjEditProfile(newObj);
  };
  const onChangeProvince = (item) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.PROVINCE_CODE = item.value;
    newObj.PROVINCE_NAME = item.label;
    props.setObjEditProfile(newObj);
    if (item.value !== null) {
      axios
        .get(API_URL.DISTRICT_API, {
          params: {
            province_id: item.id,
          },
        })
        .then(function (response) {
          let newlstBin = response.data.data.map(function (item) {
            item.label = item.name_th;
            item.value = item.id;
            return item;
          });
          setDistrict(newlstBin);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const onChangeDistrict = (item) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.DISTRICT_CODE = item.value;
    newObj.DISTRICT_NAME = item.label;
    props.setObjEditProfile(newObj);
    if (item !== null) {
      axios
        .get(API_URL.SUB_DISTRICT_API, {
          params: {
            district_id: item.id,
          },
        })
        .then(function (response) {
          let newlstBin = response.data.data.map(function (item) {
            item.label = item.name_th;
            item.value = item.id;
            return item;
          });
          setSubDistrict(newlstBin);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const onChangeSubDistrict = (item) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.SUB_DISTRICT_CODE = item.value;
    newObj.SUB_DISTRICT_NAME = item.label;
    newObj.ZIP_CODE = item.zip_code.toString();
    props.setObjEditProfile(newObj);
  };

  // #4
  const [provinceOrder, setProvinceOrder] = useState([
    {
      label: objEditProfileHD.PROVINCE_NAME_ORDER,
      value: objEditProfileHD.PROVINCE_CODE_ORDER,
    },
  ]);
  const [districtOrder, setDistrictOrder] = useState([
    {
      label: objEditProfileHD.DISTRICT_NAME_ORDER,
      value: objEditProfileHD.DISTRICT_CODE_ORDER,
    },
  ]);
  const [subDistrictOrder, setSubDistrictOrder] = useState([
    {
      label: objEditProfileHD.SUB_DISTRICT_NAME_ORDER,
      value: objEditProfileHD.SUB_DISTRICT_CODE_ORDER,
    },
  ]);
  const onChangeAdressOrder = (e) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.ADDRESS_NAME_ORDER = e;
    props.setObjEditProfile(newObj);
  };
  const onChangeProvinceOrder = (item) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.PROVINCE_CODE_ORDER = item.value;
    newObj.PROVINCE_NAME_ORDER = item.label;
    props.setObjEditProfile(newObj);
    if (item.value !== null) {
      axios
        .get(API_URL.DISTRICT_API, {
          params: {
            province_id: item.id,
          },
        })
        .then(function (response) {
          let newlstBin = response.data.data.map(function (item) {
            item.label = item.name_th;
            item.value = item.id;
            return item;
          });
          setDistrictOrder(newlstBin);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const onChangeDistrictOrder = (item) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.DISTRICT_CODE_ORDER = item.value;
    newObj.DISTRICT_NAME_ORDER = item.label;
    props.setObjEditProfile(newObj);
    if (item !== null) {
      axios
        .get(API_URL.SUB_DISTRICT_API, {
          params: {
            district_id: item.id,
          },
        })
        .then(function (response) {
          let newlstBin = response.data.data.map(function (item) {
            item.label = item.name_th;
            item.value = item.id;
            return item;
          });
          setSubDistrictOrder(newlstBin);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const onChangeSubDistrictOrder = (item) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.SUB_DISTRICT_CODE_ORDER = item.value;
    newObj.SUB_DISTRICT_NAME_ORDER = item.label;
    newObj.ZIP_CODE_ORDER = item.zip_code.toString();
    props.setObjEditProfile(newObj);
  };
  const onChangePhoneOrder = (e) => {
    let newObj = Object.assign({}, objEditProfileHD);
    newObj.PHONE_NUMBER_ORDER = e;
    props.setObjEditProfile(newObj);
  };
  // Edit Profile
  const confirmEditProfile = async () => {
    setLoading(false);
    axios.defaults.headers.common["Authorization"] = "Bearer " + (await token);
    axios
      .put(API_URL.EDIT_USER_PROFILE_API, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await token),
        },
        first_name: objEditProfileHD.FIRST_NAME,
        last_name: objEditProfileHD.LAST_NAME,
        profile: {
          profile_id: parseInt(objEditProfileHD.profile_id),
          sex: parseInt(objEditProfileHD.SEX), //objEditProfileHD.SEX,
          birthday: objEditProfileHD.BIRTH_DATE,
          telephone: objEditProfileHD.PHONE_NUMBER,
          address: objEditProfileHD.address,
          province_id: parseInt(objEditProfileHD.province_id),
          district_id: parseInt(objEditProfileHD.district_id),
          sub_district_id: parseInt(objEditProfileHD.sub_district_id),
          postcode: objEditProfileHD.postcode,
          receive_info: parseInt(objEditProfileHD.receive_info), //objEditProfileHD.SEX,
        },
        address_deliveries: [
          {
            address_deliveries_id: parseInt(
              objEditProfileHD.address_deliveries_id
            ),
            address: objEditProfileHD.address_deliveries,
            province_id: parseInt(objEditProfileHD.province_id_deliveries),
            district_id: parseInt(objEditProfileHD.district_id_deliveries),
            sub_district_id: parseInt(
              objEditProfileHD.sub_district_id_deliveries
            ),
            postcode: objEditProfileHD.postcode_deliveries,
            telephone: objEditProfileHD.telephone_deliveries,
          },
        ],
      })
      .then(function (response) {
        console.log(response.data);
        setLoading(true);
        ToastAndroid.show("User updated", ToastAndroid.SHORT);
      })
      .catch(function (error) {
        console.log("error:", error);
        setLoading(true);
      });
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <TouchableOpacity onPress={() => props.navigation.navigate("Sign In")}>
          <Block
            row
            style={{
              paddingTop: 20,
              paddingLeft: 20,
              paddingBottom: 20,
              backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              {"<  "}แก้ไขข้อมูล
            </Text>
          </Block>
        </TouchableOpacity>

        {/* Block 1 */}
        <Block style={styles.containerBlock1}>
          <Block style={{ marginBottom: 5 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 22,
                color: "black",
                marginLeft: 10,
                color: "#04d69e",
              }}
            >
              ข้อมูลบัญชี
            </Text>
          </Block>
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
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
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              value={objEditProfileHD.EMAIL}
              onChangeText={onChangeEmail}
              editable={false}
            />
          </Block>
          {/* Change Password */}
          <Block style={{ paddingTop: 20, alignSelf: "center" }}>
            <Button
              titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
              title={"เปลี่ยนรหัสผ่าน"}
              type="solid"
              containerStyle={styles.blockButton1}
              buttonStyle={styles.buttonStyle1}
              onPress={() => props.navigation.navigate("Change Password")}
            />
          </Block>
        </Block>

        {/* Block 2 */}
        <Block style={styles.containerBlock2}>
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 22,
                color: "black",
                marginLeft: 10,
                color: "#04d69e",
              }}
            >
              ข้อมูลส่วนบุคคล
            </Text>
          </Block>
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              ชื่อ
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder={""}
              placeholderTextColor="#808080"
              value={objEditProfileHD.FIRST_NAME}
              onChangeText={onChangeFirstName}
            />
          </Block>
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              นามสกุล
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder={""}
              placeholderTextColor="#808080"
              value={objEditProfileHD.LAST_NAME}
              onChangeText={onChangeLastName}
            />
          </Block>
          {/* Sex */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              เพศ
            </Text>
          </Block>
          <Block row>
            <Block row>
              <RadioButton
                value={1}
                status={
                  checkedSex === 2
                    ? "unchecked"
                    : objEditProfileHD.SEX === 1 || checkedSex === 1
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => setCheckedSex(1)}
              />
              <Text
                style={{
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                  color: "black",
                  marginTop: 2,
                }}
              >
                ชาย
              </Text>
            </Block>
            <Block row style={{ marginLeft: 50 }}>
              <RadioButton
                value={2}
                status={
                  checkedSex === 1
                    ? "unchecked"
                    : objEditProfileHD.SEX === 2 || checkedSex === 2
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => setCheckedSex(2)}
              />
              <Text
                style={{
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                  color: "black",
                  marginTop: 2,
                }}
              >
                หญิง
              </Text>
            </Block>
          </Block>
          {/* BirthDate */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              วันเกิด
            </Text>
          </Block>
          <Block>
            <Input
              right
              color="black"
              style={styles.search}
              value={
                objEditProfileHD.BIRTH_DATE == ""
                  ? new Date()
                  : objEditProfileHD.BIRTH_DATE
              }
              iconContent={
                <TouchableOpacity onPress={showDatePicker}>
                  <Icons name="calendar-range" size={20} color="black" />
                </TouchableOpacity>
              }
            />
          </Block>
          {/* Phone */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              เบอร์โทร
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder=""
              placeholderTextColor="#808080"
              value={objEditProfileHD.PHONE_NUMBER}
              onChangeText={onChangePhone}
              keyboardType={"number-pad"}
            />
          </Block>
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              อีเมล
            </Text>
          </Block>
          <Block style={styles.inputView2}>
            <TextInput
              style={styles.inputText}
              value={objEditProfileHD.EMAIL}
              onChangeText={onChangeEmail}
              keyboardType="email-address"
              editable={false}
            />
          </Block>
        </Block>

        {/* Block 3 */}
        <Block style={styles.containerBlock3}>
          <Block row style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 22,
                color: "black",
                marginLeft: 10,
                color: "#04d69e",
              }}
            >
              ข้อมูลที่อยู่
            </Text>
          </Block>
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              ที่อยู่
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder={""}
              placeholderTextColor="#808080"
              value={objEditProfileHD.ADDRESS_NAME}
              onChangeText={onChangeAdress}
            />
          </Block>

          {/* Province */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              จังหวัด
            </Text>
            <DropDownPicker
              containerStyle={{ height: 40, width: width - 45 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              placeholderStyle={{
                textAlign: "left",
                color: "gray",
                fontFamily: "kanitRegular",
              }}
              placeholder={"- โปรดเลือก -"}
              labelStyle={{
                textAlign: "left",
                color: "#000",
                fontFamily: "kanitRegular",
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              items={province}
              // // controller={(instance) => (controller = instance)}
              defaultValue={
                objEditProfileHD.PROVINCE_NAME == ""
                  ? null
                  : objEditProfileHD.PROVINCE_CODE
              }
              onChangeItem={(item) => onChangeProvince(item)}
            />
          </Block>
          {/* District */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              อำเภอ
            </Text>
            <DropDownPicker
              items={district}
              containerStyle={{ height: 40, width: width - 45 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              placeholderStyle={{
                textAlign: "left",
                color: "gray",
                fontFamily: "kanitRegular",
              }}
              placeholder={"- โปรดเลือก -"}
              labelStyle={{
                textAlign: "left",
                color: "#000",
                fontFamily: "kanitRegular",
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              // controller={(instance) => (controller = instance)}
              defaultValue={
                objEditProfileHD.DISTRICT_NAME == ""
                  ? null
                  : objEditProfileHD.DISTRICT_CODE
              }
              onChangeItem={(item) => onChangeDistrict(item)}
            />
          </Block>
          {/* Sub-District */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              แขวง/ตำบล
            </Text>
            <DropDownPicker
              items={subDistrict}
              containerStyle={{ height: 40, width: width - 45 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              placeholderStyle={{
                textAlign: "left",
                color: "gray",
                fontFamily: "kanitRegular",
              }}
              placeholder={"- โปรดเลือก -"}
              labelStyle={{
                textAlign: "left",
                color: "#000",
                fontFamily: "kanitRegular",
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              // controller={(instance) => (controller = instance)}
              defaultValue={
                objEditProfileHD.SUB_DISTRICT_NAME == ""
                  ? null
                  : objEditProfileHD.SUB_DISTRICT_CODE
              }
              onChangeItem={(item) => onChangeSubDistrict(item)}
            />
          </Block>

          {/* PostCode */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              รหัสไปรษณีย์
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              value={objEditProfileHD.ZIP_CODE}
              keyboardType="number-pad"
              editable={false}
            />
          </Block>
        </Block>

        {/* Block 4 */}
        <Block style={styles.containerBlock4}>
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 22,
                color: "black",
                marginLeft: 10,
                color: "#04d69e",
              }}
            >
              ข้อมูลที่อยู่ในการจัดส่ง
            </Text>
          </Block>
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              ที่อยู่
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder={""}
              placeholderTextColor="#808080"
              value={objEditProfileHD.ADDRESS_NAME_ORDER}
              onChangeText={onChangeAdressOrder}
            />
          </Block>

          {/* Province */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              จังหวัด
            </Text>
            <DropDownPicker
              items={provinceOrder}
              containerStyle={{ height: 40, width: width - 45 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              placeholderStyle={{
                textAlign: "left",
                color: "gray",
                fontFamily: "kanitRegular",
              }}
              placeholder={"- โปรดเลือก -"}
              labelStyle={{
                textAlign: "left",
                color: "#000",
                fontFamily: "kanitRegular",
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              // controller={(instance) => (controller = instance)}
              defaultValue={
                objEditProfileHD.PROVINCE_NAME_ORDER == ""
                  ? null
                  : objEditProfileHD.PROVINCE_CODE_ORDER
              }
              onChangeItem={(item) => onChangeProvinceOrder(item)}
            />
          </Block>
          {/* District */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              อำเภอ
            </Text>
            <DropDownPicker
              items={districtOrder}
              containerStyle={{ height: 40, width: width - 45 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              placeholderStyle={{
                textAlign: "left",
                color: "gray",
                fontFamily: "kanitRegular",
              }}
              placeholder={"- โปรดเลือก -"}
              labelStyle={{
                textAlign: "left",
                color: "#000",
                fontFamily: "kanitRegular",
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              // controller={(instance) => (controller = instance)}
              defaultValue={
                objEditProfileHD.DISTRICT_NAME_ORDER == ""
                  ? null
                  : objEditProfileHD.DISTRICT_CODE_ORDER
              }
              onChangeItem={(item) => onChangeDistrictOrder(item)}
            />
          </Block>
          {/* Sub-District */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              แขวง/ตำบล
            </Text>
            <DropDownPicker
              items={subDistrictOrder}
              containerStyle={{ height: 40, width: width - 45 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              placeholderStyle={{
                textAlign: "left",
                color: "gray",
                fontFamily: "kanitRegular",
              }}
              placeholder={"- โปรดเลือก -"}
              labelStyle={{
                textAlign: "left",
                color: "#000",
                fontFamily: "kanitRegular",
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              // controller={(instance) => (controller = instance)}
              defaultValue={
                objEditProfileHD.SUB_DISTRICT_NAME_ORDER == ""
                  ? null
                  : objEditProfileHD.SUB_DISTRICT_CODE_ORDER
              }
              onChangeItem={(item) => onChangeSubDistrictOrder(item)}
            />
          </Block>

          {/* PostCode */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              รหัสไปรษณีย์
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              value={objEditProfileHD.ZIP_CODE_ORDER}
              keyboardType="number-pad"
              editable={false}
            />
          </Block>
          {/* Phone */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              เบอร์โทร
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder={""}
              placeholderTextColor="#808080"
              value={objEditProfileHD.PHONE_NUMBER_ORDER}
              onChangeText={onChangePhoneOrder}
              keyboardType="phone-pad"
            />
          </Block>
        </Block>

        {/* Block 5 */}
        <Block>
          {/* Radio Check */}
          <Block style={{ width: 340, alignSelf: "center" }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
                textAlign: "left",
              }}
            >
              จดหมายข่าวต้องการรับข่าวสารจากทางร้าน :
            </Text>
            <Block row style={{ margin: 10 }}>
              <Block row>
                <RadioButton
                  value={0}
                  status={
                    checkedMail === 1
                      ? "unchecked"
                      : objEditProfileHD.receive_info === 0 || checkedMail === 0
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => setCheckedMail(0)}
                />
                <Text
                  style={{
                    fontFamily: "kanitRegular",
                    fontSize: 18,
                    color: "black",
                    marginTop: 2,
                  }}
                >
                  ต้องการ
                </Text>
              </Block>
              <Block row style={{ marginLeft: 70 }}>
                <RadioButton
                  value={1}
                  status={
                    checkedMail === 0
                      ? "unchecked"
                      : objEditProfileHD.receive_info === 1 || checkedMail === 1
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => setCheckedMail(1)}
                />
                <Text
                  style={{
                    fontFamily: "kanitRegular",
                    fontSize: 18,
                    color: "black",
                    marginTop: 2,
                  }}
                >
                  ไม่ต้องการ
                </Text>
              </Block>
            </Block>
          </Block>
          {/* Button */}
          <Block
            row
            style={{ paddingTop: 20, paddingBottom: 40, alignSelf: "center" }}
          >
            <Button
              titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
              title={"บันทึกข้อมูล"}
              type="solid"
              containerStyle={styles.blockButton1}
              buttonStyle={styles.buttonStyle1}
              onPress={confirmEditProfile}
            />
          </Block>
        </Block>

        <WangdekInfo />
      </ScrollView>
      <ModalLoading loading={!loading} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}

export default connect(null, ActionEditProfile.actions)(EditProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  containerBlock1: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 25,
    paddingLeft: 25,
    marginBottom: 5,
  },
  containerBlock2: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 25,
    paddingLeft: 25,
    marginBottom: 25,
    backgroundColor: "#ededed",
    borderBottomWidth: 0.2,
    borderBottomColor: "#787878",
  },
  containerBlock3: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 25,
    marginBottom: 25,
  },
  containerBlock4: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 25,
    paddingLeft: 25,
    marginBottom: 25,
    backgroundColor: "#ededed",
  },
  containerHeader: {
    paddingTop: 10,
    alignSelf: "center",
  },
  containerBack: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  inputView: {
    width: "95%",
    backgroundColor: "#ffffff",
    height: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1.4,
    borderColor: "#e0e0e0",
  },
  inputView2: {
    width: "95%",
    backgroundColor: "#ffffff",
    height: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1.4,
    borderColor: "#e0e0e0",
    marginBottom: 25,
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 15,
    fontFamily: "kanitRegular",
  },
  inputTextPassword: {
    height: 45,
    color: "black",
    fontSize: 15,
    fontFamily: "kanitRegular",
    width: width - 200,
    alignItems: "center",
    marginLeft: 15,
  },
  forgot: {
    color: "white",
    fontSize: 11,
    alignItems: "flex-end",
  },
  acceptBtn: {
    width: "40%",
    backgroundColor: "#71D58E",
    borderRadius: 15,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  SignupText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  imageContainer: {
    elevation: 1,
    paddingBottom: 50,
  },
  showLogo: {
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    color: "white",
    alignSelf: "center",
  },
  label: {
    color: "white",
    fontSize: 10,
    marginTop: 19,
    marginRight: 25,
    alignSelf: "flex-start",
  },
  labelHeader: {
    color: "white",
    fontSize: 21,
    marginTop: 20,
  },
  IconBack: {
    color: "white",
    marginTop: 25,
    marginLeft: 15,
  },
  textContainerEnd: {
    alignSelf: "center",
    paddingTop: 20,
  },
  label2: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
  search: {
    height: 45,
    width: width - 45,
    alignSelf: "center",
    borderWidth: 1.5,
    borderRadius: 1,
  },
  pickerItem: {
    height: 45,
    width: width - 44,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    borderRadius: 1,
  },
  placeholderPicker: {
    textAlign: "left",
    color: "gray",
    fontFamily: "kanitRegular",
  },
  blockButton1: {
    flexDirection: "row",
  },
  blockButton2: {
    paddingLeft: 40,
  },
  buttonStyle1: {
    backgroundColor: "#00e08e",
    borderRadius: 20,
    width: 170,
    alignSelf: "center",
  },
  buttonStyle2: {
    backgroundColor: "#00c278",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
});
