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
import moment from "moment";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalLoading from "../../components/ModalLoading";
import * as auth from "../../store/ducks/auth.duck";
import { createAccount } from "../../store/mock/mock";
import { signup } from "../../store/crud/auth.crud";
import { Block, Input } from "galio-framework";
import WangdekInfo from "../../components/WangdekInfo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "react-native-elements";
import { CheckBox } from "react-native-elements";

const { height, width } = Dimensions.get("screen");

function SignUp(props) {
  useEffect(() => {}, []);

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [stateObj, setStateObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
    phone: "",
    birth_date: moment(new Date()).format("DD/MM/YYYY"),
    postCode: "",
    postCodeOrder: "",
    phoneOrder: "",
  });

  // #1
  const [visiblePass1, setVisiblePass1] = useState(true);
  const [visiblePass2, setVisiblePass2] = useState(true);
  const onChangePassword1 = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.password = e;
    setStateObj(newObj);
  };
  const changeVisiblePassword1 = () => {
    if (visiblePass1 === false) {
      setVisiblePass1(true);
    } else {
      setVisiblePass1(false);
    }
  };
  const onChangePassword2 = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.password2 = e;
    setStateObj(newObj);
  };
  const changeVisiblePassword2 = () => {
    if (visiblePass2 === false) {
      setVisiblePass2(true);
    } else {
      setVisiblePass2(false);
    }
  };

  // #2
  const onChangeFirstName = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.firstName = e;
    setStateObj(newObj);
  };
  const onChangeLastName = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.lastName = e;
    setStateObj(newObj);
  };
  const onChangePhone = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.phone = e;
    setStateObj(newObj);
  };
  const onChangeEmail = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.email = e;
    setStateObj(newObj);
  };

  //Gender
  const [checked, setChecked] = useState("male");
  //MailBox
  const [checkedMail, setCheckedMail] = useState("yesMail");
  //DatePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    let newObj = Object.assign({}, stateObj);
    if (date === null) {
      newObj.birth_date = moment(new Date()).format();
    } else {
      newObj.birth_date = moment(date).format("DD/MM/YYYY");
    }
    setStateObj(newObj);
    hideDatePicker();
  };

  // #3
  const onChangeAdress = () => {};
  const [tumbol, setTumbol] = useState();
  const [aumper, setAumper] = useState();
  const [province, setProvince] = useState();
  const itemTumbol = [
    {
      label: "USA",
      value: "usa",
      hidden: true,
    },
    {
      label: "UK",
      value: "uk",
    },
  ];
  const onChangeTumbol = (item) => {
    setTumbol(item);
  };
  const onChangeAumper = (item) => {
    setAumper(item);
  };
  const onChangeProvince = (item) => {
    setProvince(item);
  };
  const onChangePostCode = () => {
    let newObj = Object.assign({}, stateObj);
    newObj.postCode = e;
    setStateObj(newObj);
  };

  // #4
  const onChangeAdressOrder = () => {};
  const [tumbolOrder, setTumbolOrder] = useState();
  const [aumperOrder, setAumperOrder] = useState();
  const [provinceOrder, setProvinceOrder] = useState();

  const onChangeTumbolOrder = (item) => {
    setTumbolOrder(item);
  };
  const onChangeAumperOrder = (item) => {
    setAumperOrder(item);
  };
  const onChangeProvinceOrder = (item) => {
    setProvinceOrder(item);
  };
  const onChangePostCodeOrder = () => {
    let newObj = Object.assign({}, stateObj);
    newObj.postCodeOrder = e;
    setStateObj(newObj);
  };
  const onChangePhoneOrder = () => {
    let newObj = Object.assign({}, stateObj);
    newObj.phoneOrder = e;
    setStateObj(newObj);
  };

  // Signup
  const onClickSignUp = () => {
    setLoading(true);
    if (
      stateObj.firstName !== "" &&
      stateObj.lastName !== "" &&
      stateObj.password !== "" &&
      stateObj.password2 !== "" &&
      stateObj.email !== ""
    ) {
      createAccount("firstName", "lastName", "test@test.ca", "12345")
        .then((val) => {
          console.log(val);
          setLoading(false);
          props.navigation.navigate("Sign In");
        })
        .catch((err) => console.log("error:", err.message));
    } else {
      setLoading(false);
    }
  };

  const showToast = () => {
    ToastAndroid.show("Test ToastAndriod React Native !", ToastAndroid.SHORT);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Block
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
              textAlign: "center",
            }}
          >
            สมัครสมาชิก
          </Text>
        </Block>

        {/* Block 1 */}
        <Block style={styles.containerBlock1}>
          <Block row style={{ marginBottom: 5, marginTop: 20 }}>
            <Image
              source={require("../../assets/iconRegister/icon1.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
              }}
            />
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
              placeholder={"กรอกชื่อบัญชี"}
              placeholderTextColor="#808080"
              value={stateObj.email}
              onChangeText={onChangeEmail}
            />
          </Block>
          {/* Password1 */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              รหัสผ่าน
            </Text>
          </Block>
          <Block
            row
            style={{
              borderWidth: 1.5,
              borderColor: "#e0e0e0",
              backgroundColor: "white",
              width: width - 45,
              height: 47,
            }}
          >
            <TextInput
              style={styles.inputTextPassword}
              placeholder="กรอกรหัสผ่าน"
              placeholderTextColor="#808080"
              value={stateObj.password}
              onChangeText={onChangePassword1}
              secureTextEntry={visiblePass1}
            />
            <TouchableOpacity
              style={{ marginTop: 10, marginLeft: 100 }}
              onPress={changeVisiblePassword1}
            >
              <Image
                source={
                  visiblePass1
                    ? require("../../assets/iconRegister/viewpass1.png")
                    : require("../../assets/iconRegister/viewpass2.png")
                }
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </Block>
          <Block>
            <Text
              style={{
                fontFamily: "kanitRegular",
                color: "#009ac9",
                fontSize: 15,
              }}
            >
              กรุณาใส่ 6 ตัวอักษรขึ้นไป
            </Text>
          </Block>
          {/* Password2 */}
          <Block style={{ marginBottom: 5, marginTop: 20 }}>
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
          <Block
            row
            style={{
              borderWidth: 1.5,
              borderColor: "#e0e0e0",
              backgroundColor: "white",
              width: width - 45,
              height: 47,
            }}
          >
            <TextInput
              style={styles.inputTextPassword}
              placeholder="กรอกรหัสผ่าน"
              placeholderTextColor="#808080"
              value={stateObj.password2}
              onChangeText={onChangePassword2}
              secureTextEntry={visiblePass2}
            />
            <TouchableOpacity
              style={{ marginTop: 10, marginLeft: 100 }}
              onPress={changeVisiblePassword2}
            >
              <Image
                source={
                  visiblePass2
                    ? require("../../assets/iconRegister/viewpass1.png")
                    : require("../../assets/iconRegister/viewpass2.png")
                }
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </Block>
          <Block>
            <Text
              style={{
                fontFamily: "kanitRegular",
                color: "#009ac9",
                fontSize: 15,
              }}
            >
              กรุณากรอกรหัสผ่านให้ตรงกัน
            </Text>
          </Block>
        </Block>

        {/* Block 2 */}
        <Block style={styles.containerBlock2}>
          <Block row style={{ marginBottom: 5, marginTop: 20 }}>
            <Image
              source={require("../../assets/iconRegister/icon2.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
              }}
            />
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
              value={stateObj.firstName}
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
              value={stateObj.lastName}
              onChangeText={onChangeLastName}
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
              เพศ
            </Text>
          </Block>
          <Block row>
            <Block row>
              <RadioButton
                value="male"
                status={checked === "male" ? "checked" : "unchecked"}
                onPress={() => setChecked("male")}
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
                value="female"
                status={checked === "female" ? "checked" : "unchecked"}
                onPress={() => setChecked("female")}
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
              value={stateObj.birth_date}
              iconContent={
                <TouchableOpacity onPress={showDatePicker}>
                  <Icons name="calendar-range" size={20} color="black" />
                </TouchableOpacity>
              }
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
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
              เบอร์โทร
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder=""
              placeholderTextColor="#808080"
              value={stateObj.phone}
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
              placeholder="example@gmail.com"
              placeholderTextColor="#808080"
              value={stateObj.email}
              onChangeText={onChangeEmail}
            />
          </Block>
        </Block>

        {/* Block 3 */}
        <Block style={styles.containerBlock3}>
          <Block row style={{ marginBottom: 5, marginTop: 20 }}>
            <Image
              source={require("../../assets/iconRegister/icon3.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
              }}
            />
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
              value={stateObj.firstName}
              onChangeText={onChangeAdress}
            />
          </Block>

          {/* Tumbol */}
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
              items={itemTumbol}
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
                fontFamily:"kanitRegular"
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              onChangeItem={onChangeTumbol}
            />
          </Block>
          {/* Aumper */}
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
              items={itemTumbol}
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
                fontFamily:"kanitRegular"
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              onChangeItem={onChangeAumper}
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
              items={itemTumbol}
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
                fontFamily:"kanitRegular"
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              onChangeItem={onChangeProvince}
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
              รหัสไปรษณียื
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder={""}
              placeholderTextColor="#808080"
              value={stateObj.postCode}
              onChangeText={onChangePostCode}
              keyboardType="number-pad"
            />
          </Block>
        </Block>

        {/* Block 4 */}
        <Block style={styles.containerBlock4}>
          <Block row style={{ marginBottom: 5, marginTop: 20 }}>
            <Image
              source={require("../../assets/iconRegister/icon4.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
              }}
            />
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
              value={stateObj.firstName}
              onChangeText={onChangeAdressOrder}
            />
          </Block>

          {/* Tumbol */}
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
              items={itemTumbol}
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
                fontFamily:"kanitRegular"
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              onChangeItem={onChangeTumbolOrder}
            />
          </Block>
          {/* Aumper */}
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
              items={itemTumbol}
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
                fontFamily:"kanitRegular"
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              onChangeItem={onChangeAumperOrder}
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
              items={itemTumbol}
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
                fontFamily:"kanitRegular"
              }}
              arrowColor={"white"}
              arrowSize={18}
              arrowStyle={{
                backgroundColor: "#02d483",
                borderRadius: 20,
                color: "white",
              }}
              onChangeItem={onChangeProvinceOrder}
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
              รหัสไปรษณียื
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder={""}
              placeholderTextColor="#808080"
              value={stateObj.postCode}
              onChangeText={onChangePostCodeOrder}
              keyboardType="number-pad"
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
              เบอร์โทร
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText2}
              placeholder={""}
              placeholderTextColor="#808080"
              value={stateObj.phoneOrder}
              onChangeText={onChangePhoneOrder}
              keyboardType="number-pad"
            />
          </Block>
          <Block>
            <Text
              style={{
                fontFamily: "kanitRegular",
                color: "#009ac9",
                fontSize: 15,
              }}
            >
              กรุณากรอกเบอร์มือถือของท่าน เพื่อคววามสะดวกในการจัดส่งสินค้า
            </Text>
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
                  value="yesMail"
                  status={checkedMail === "yesMail" ? "checked" : "unchecked"}
                  onPress={() => setCheckedMail("yesMail")}
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
              <Block row style={{ marginLeft: 50 }}>
                <RadioButton
                  value="notMail"
                  status={checkedMail === "notMail" ? "checked" : "unchecked"}
                  onPress={() => setCheckedMail("notMail")}
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
          {/* Block Blue */}
          <Block
            style={{
              width: width - 15,
              height: 115,
              alignSelf: "center",
              backgroundColor: "#475ed1",
            }}
          >
            <Block row style={{height:55}}>
              <CheckBox
                containerStyle={{ marginTop: 20 }}
                checked={isChecked}
                onPress={() => setIsChecked(!isChecked)}
                checkedColor="#71D58E"
              />
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitRegular",
                  fontSize: 20,
                  marginTop: 27,
                  marginLeft:5
                }}
              >
                ฉันได้อ่านและยอมรับเงื่อนไข
              </Text>
            </Block>
            <Block row style={{ marginLeft: 70, marginBottom: 10 }}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitRegular",
                  fontSize: 20,
                }}
              >
                ข้อตกลง
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitBold",
                  fontSize: 19,
                  marginLeft:  10,
                  color:"#00c6ed",
                  borderBottomColor:"#00c6ed",
                  borderBottomWidth:1
                }}
              >
                Privacy Policy
              </Text>
            </Block>
          </Block>
          {/* Button */}
          <Block row style={{ paddingTop: 49, paddingBottom: 40 }}>
            <Button
              titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
              title={"รีเซ็ทข้อมูล"}
              type="solid"
              onPress={() => props.navigation.navigate("Flash Sale")}
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
        
        <WangdekInfo />
      </ScrollView>
      <ModalLoading loading={loading} />
    </>
  );
}

export default connect(null, auth.actions)(SignUp);

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
    marginBottom: 25,
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
    paddingLeft: 25,
  },
  blockButton2: {
    paddingLeft: 40,
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
