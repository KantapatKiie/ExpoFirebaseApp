import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
} from "react-native";
import moment from "moment";
import { Block, Input } from "galio-framework";
import { connect, useSelector } from "react-redux";
import * as ActionPaymentNotifications from "../../actions/action-payment/ActionPaymentNotifications";
import { Button } from "react-native-elements";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";

const { height, width } = Dimensions.get("screen");

function PaymentNotifications(props) {
  const { objPaymentNotificationHD } = useSelector((state) => ({
    objPaymentNotificationHD:
      state.actionPaymentNotifications.objPaymentNotificationHD,
  }));

  useEffect(() => {
    setObjSearch({
      money: 0,
      transfer_date: moment(new Date()).format("DD/MM/YYYY"),
      transfer_time: moment(new Date()).format("HH : mm"),
    });
  }, []);

  const [objSearch, setObjSearch] = useState({
    money: 0,
    transfer_date: moment(new Date()).format("DD/MM/YYYY"),
    transfer_time: moment(new Date()).format("HH : mm"),
  });

  //DatePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirmDate = (date) => {
    let newObj = Object.assign({}, objSearch);
    if (date === null) {
      newObj.transfer_date = moment(new Date()).format();
    } else {
      newObj.transfer_date = moment(date).format("DD/MM/YYYY");
    }
    setObjSearch(newObj);
    hideDatePicker();
  };
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirmTime = (date) => {
    let newObj = Object.assign({}, objSearch);
    if (date === null) {
      newObj.transfer_time = moment(new Date()).format();
    } else {
      newObj.transfer_time = moment(date).format("DD/MM/YYYY");
    }
    setObjSearch(newObj);
    hideDatePicker();
  };

  // Transfer Money
  const [bank, setBank] = useState();
  const itenBank = [
    {
      label: "ธนาคารไทยพาณิชย์ - SCB",
      value: "scb",
      hidden: true,
    },
    {
      label: "ธนาคารกรุงเทพ - BKK",
      value: "bkk",
    },
  ];
  const onChangeBank = (item) => {
    setBank(item);
  };
  const onChangeTransferMoney = (e) => {
    let newObj = Object.assign({}, objSearch);
    newObj.money = e;
    setObjSearch(newObj);
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
    console.log(result.uri);
    if (!result.cancelled) {
      setImagePicker(result.uri);
    } else {
      ToastAndroid.show("Not Seleted Images", ToastAndroid.SHORT);
    }
  };

  const showToast = () => {
    ToastAndroid.show("Test ToastAndriod React Native !", ToastAndroid.SHORT);
  };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Block 1 */}
        <Block style={styles.blockStyle}>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 23,
              textAlign: "center",
            }}
          >
            {formatTr("PAYMENT_NOTIFICATION").toString()}
          </Text>
        </Block>
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
              หมายเลขสั่งซื้อ :
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              //   placeholder={"กรอกรหัสผ่านใหม่"}
              placeholderTextColor="#808080"
              value={objSearch.PLACE_NO}
              //   onChangeText={onChangePassword1}
            />
          </Block>
        </Block>
        {/* Block 2 */}
        <Block style={styles.blockStyle}>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 23,
              textAlign: "center",
            }}
          >
            ข้อมูลผู้ชำระ
          </Text>
        </Block>
        <Block style={styles.container2}>
          <Block style={{ marginBottom: 5 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              ชื่อ-นามสกุล :
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              //   placeholder={"กรอกรหัสผ่านใหม่"}
              placeholderTextColor="#808080"
              value={objSearch.PLACE_NO}
              //   onChangeText={onChangePassword1}
            />
          </Block>
          <Block style={{ marginBottom: 5 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              เบอร์ติดต่อ :
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              //   placeholder={"กรอกรหัสผ่านใหม่"}
              placeholderTextColor="#808080"
              value={objSearch.PLACE_NO}
              //   onChangeText={onChangePassword1}
            />
          </Block>
          <Block style={{ marginBottom: 5 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              อีเมล :
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              //   placeholder={"กรอกรหัสผ่านใหม่"}
              placeholderTextColor="#808080"
              value={objSearch.PLACE_NO}
              //   onChangeText={onChangePassword1}
            />
          </Block>
        </Block>
        {/* Block 3 */}
        <Block style={styles.blockStyle}>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 23,
              textAlign: "center",
            }}
          >
            โอนเข้าบัญชี
          </Text>
          <DropDownPicker
            items={itenBank}
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
            onChangeItem={onChangeBank}
          />
        </Block>
        <Block style={styles.container2}>
          <Block row>
            <Block flex>
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                  color: "black",
                  marginBottom: 5,
                }}
              >
                วันที่ :
              </Text>
              <Input
                right
                color="black"
                style={styles.search}
                value={objSearch.transfer_date}
                iconContent={
                  <TouchableOpacity onPress={showDatePicker}>
                    <Icons name="calendar-range" size={20} color="black" />
                  </TouchableOpacity>
                }
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
              />
            </Block>
            <Block flex>
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "kanitRegular",
                  fontSize: 18,
                  color: "black",
                  marginBottom: 5,
                }}
              >
                เวลา :
              </Text>
              <Input
                right
                color="black"
                style={styles.search}
                value={objSearch.transfer_time}
                iconContent={
                  <TouchableOpacity onPress={showTimePicker}>
                    <Icons name="clock" size={20} color="black" />
                  </TouchableOpacity>
                }
              />
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
              />
            </Block>
          </Block>

          <Block row style={{ marginBottom: 5 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontFamily: "kanitRegular",
                fontSize: 18,
                color: "black",
              }}
            >
              จำนวนเงินที่โอน :
            </Text>
          </Block>
          <Block style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder={"กรุณาใส่จำนวนเงินที่ทำการโอน"}
              placeholderTextColor="#808080"
              keyboardType="number-pad"
              value={objSearch.PLACE_NO}
              onChangeText={onChangeTransferMoney}
            />
          </Block>
        </Block>
        {/* Block Upload  */}
        <TouchableOpacity style={{ paddingLeft: "5%" }} onPress={pickImage}>
          <Block style={{ alignSelf: "center" }}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
                textAlign: "center",
              }}
            >
              หลักฐานการโอนเงิน :
            </Text>
            <Block
              style={{
                backgroundColor: "#00c2f7",
                borderRadius: 50,
                height: 45,
                width: 220,
                marginTop: 15,
              }}
            >
              <Block
                row
                style={{
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "kanitRegular",
                    fontSize: 20,
                    marginTop: 10,
                    textAlign: "center",
                  }}
                >
                  อัพโหลดสลิป
                </Text>
                <Icons
                  name="upload"
                  size={20}
                  color="white"
                  style={{
                    marginTop: 14,
                    marginLeft: 15,
                  }}
                />
              </Block>
            </Block>
          </Block>
        </TouchableOpacity>
        <Block
          style={{
            height: 40,
            width: "95%",
            alignSelf: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
          }}
        ></Block>
        {/* Button */}
        <Block row style={{ paddingTop: 40, paddingBottom: 40 }}>
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={formatTr("CANCEL").toString()}
            type="solid"
            onPress={() => props.navigation.navigate("Flash Sale")}
            containerStyle={styles.blockButton1}
            buttonStyle={styles.buttonStyle1}
          />
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={formatTr("PAYMENT_NOTIFICATION").toString()}
            type="solid"
            containerStyle={styles.blockButton2}
            buttonStyle={styles.buttonStyle2}
            onPress={() => showToast()}
          />
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(
  null,
  ActionPaymentNotifications.actions
)(PaymentNotifications);

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 25,
    paddingLeft: 25,
  },
  buttonStyle1: {
    backgroundColor: "#595959",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  buttonStyle2: {
    backgroundColor: "#11d1a5",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  blockStyle: {
    paddingTop: 20,
    paddingLeft: 25,
    alignSelf: "flex-start",
  },
  blockButton1: {
    flexDirection: "row",
    paddingLeft: 25,
  },
  blockButton2: {
    paddingLeft: 40,
  },
  search: {
    height: 40,
    width: width - 48,
    alignSelf: "center",
    borderWidth: 1.5,
    borderRadius: 5,
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 15,
    fontFamily: "kanitRegular",
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
  inputViewDateTime: {
    width: "90%",
    backgroundColor: "#ffffff",
    height: 40,
    justifyContent: "center",
    marginTop: 7.5,
    borderWidth: 1.4,
    borderColor: "#e0e0e0",
  },
  search: {
    height: 40,
    width: "90%",
    justifyContent: "center",
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderRadius: 1,
  },
});
