import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import { Block, Text, theme } from "galio-framework";
import { connect, useSelector } from "react-redux";
import * as ActionOrder from "../../../actions/action-order-status/ActionOrder";
import WangdekInfo from "../../../components/WangdekInfo";
import { Button } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

const { height, width } = Dimensions.get("screen");

function UseAddressDelivery(props) {
  const { objOrderScreen } = useSelector((state) => ({
    objOrderScreen: state.actionOrder.objOrderScreen,
  }));

  useEffect(() => {
    getProvinces();
  }, []);

  const [province, setProvince] = useState([
    {
      label: objOrderScreen.PROVINCE_NAME,
      value: objOrderScreen.PROVINCE_CODE,
    },
  ]);
  const [district, setDistrict] = useState([
    {
      label: objOrderScreen.DISTRICT_NAME,
      value: objOrderScreen.DISTRICT_CODE,
    },
  ]);
  const [subDistrict, setSubDistrict] = useState([
    {
      label: objOrderScreen.SUB_DISTRICT_NAME,
      value: objOrderScreen.SUB_DISTRICT_CODE,
    },
  ]);
  const getProvinces = async () => {
    await axios
      .get("http://wangdek.am2bmarketing.co.th/api/v1/provinces")
      .then(function (response) {
        let newlstBin = response.data.data.map(function (item) {
          item.label = item.name_th;
          item.value = item.id;
          return item;
        });
        if (newlstBin !== null || newlstBin !== "") {
          setProvince(newlstBin);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onChangeAdress = (value) => {
    let newObj = Object.assign({}, objOrderScreen);
    newObj.ADDRESS_NAME = value;
    props.setobjOrderScreen(newObj);
  };
  const onChangeProvince = (item) => {
    let newObj = Object.assign({}, objOrderScreen);
    newObj.PROVINCE_CODE = item.value;
    newObj.PROVINCE_NAME = item.label;
    props.setobjOrderScreen(newObj);
    if (item.value !== null) {
      axios
        .get("http://wangdek.am2bmarketing.co.th/api/v1/districts", {
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
    let newObj = Object.assign({}, objOrderScreen);
    newObj.DISTRICT_CODE = item.value;
    newObj.DISTRICT_NAME = item.label;
    props.setobjOrderScreen(newObj);
    if (item !== null) {
      axios
        .get("http://wangdek.am2bmarketing.co.th/api/v1/sub_districts", {
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
    let newObj = Object.assign({}, objOrderScreen);
    newObj.SUB_DISTRICT_CODE = item.value;
    newObj.SUB_DISTRICT_NAME = item.label;
    newObj.ZIP_CODE = item.zip_code.toString();
    props.setobjOrderScreen(newObj);
  };
  const onChangeFirstName = (value) => {
    let newObj = Object.assign({}, objOrderScreen);
    newObj.FIRST_NAME = value;
    props.setobjOrderScreen(newObj);
  };
  const onChangeLastName = (value) => {
    let newObj = Object.assign({}, objOrderScreen);
    newObj.LAST_NAME = value;
    props.setobjOrderScreen(newObj);
  };
  const [checkedDelivery, setCheckedDelivery] = useState("address");
  const renderDeliveryList = () => {
    return (
      <>
        <RadioButton.Group
          onValueChange={(value) => setCheckedDelivery(value)}
          value={checkedDelivery}
        >
          {/* Address Original */}
          <Block style={checkedDelivery ===  "address" ?styles.blockRadioAddress: styles.blockRadioAddressWhite}>
            <Block row style={{ marginLeft: 10, marginTop: 5 }}>
              <RadioButton color="red" value={"address"} />
              <Text style={styles.fontTitleProducts}>ที่อยู่โปรไฟล์</Text>
            </Block>
            <Block style={{ marginTop: 15 }}>
              <Text style={styles.textDescAddress}>ชื่อ :</Text>
              <Text style={styles.textDescAddress}>เบอร์โทร :</Text>
              <Text style={styles.textDescAddress}>ที่อยู่ :</Text>
            </Block>
          </Block>
          {/* Address Fix */}
          <Block style={checkedDelivery ===  "fix_address" ? styles.blockRadioAddressFix : styles.blockRadioAddressFixWhite}>
            <Block row style={{ marginLeft: 10, marginTop: 5 }}>
              <RadioButton color="red" value={"fix_address"} />
              <Text style={styles.fontTitleProducts}>
                แก้ไขที่อยู่ที่ต้องการจัดส่ง
              </Text>
            </Block>
            <Block style={{ marginTop: 15 }}>
              <Block style={{ marginBottom: 5 }}>
                <Text style={styles.textDescAddress}>ชื่อ :</Text>
                <Block style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder={""}
                    placeholderTextColor="#808080"
                    value={objOrderScreen.FIRST_NAME}
                    onChangeText={onChangeFirstName}
                  />
                </Block>
              </Block>
              <Block style={{ marginBottom: 5 }}>
                <Text style={styles.textDescAddress}>เบอร์โทร :</Text>
                <Block style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder={""}
                    placeholderTextColor="#808080"
                    value={objOrderScreen.LAST_NAME}
                    onChangeText={onChangeLastName}
                    keyboardType="phone-pad"
                  />
                </Block>
              </Block>
              <Block style={{ marginBottom: 5 }}>
                <Text style={styles.textDescAddress}>ที่อยู่ :</Text>
                <Block style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder={""}
                    placeholderTextColor="#808080"
                    value={objOrderScreen.ADDRESS_NAME}
                    onChangeText={onChangeAdress}
                  />
                </Block>
              </Block>
              {/* Select Region */}
              <Block style={{ marginBottom: 5 }}>
                <Text style={styles.textDescAddress}>จังหวัด :</Text>
                <DropDownPicker
                  items={province}
                  containerStyle={{
                    height: 35,
                    width: width - 58,
                    alignSelf: "center",
                  }}
                  style={{ backgroundColor: "#f0f0f0" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#f0f0f0" }}
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
                  onChangeItem={onChangeProvince}
                />
              </Block>
              <Block style={{ marginBottom: 5 }}>
                <Text style={styles.textDescAddress}>เขต/อำเภอ :</Text>
                <DropDownPicker
                  items={district}
                  containerStyle={{
                    height: 35,
                    width: width - 58,
                    alignSelf: "center",
                  }}
                  style={{ backgroundColor: "#f0f0f0" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#f0f0f0" }}
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
                  onChangeItem={onChangeDistrict}
                />
              </Block>
              <Block style={{ marginBottom: 5 }}>
                <Text style={styles.textDescAddress}>แขวง/ตำบล :</Text>
                <DropDownPicker
                  items={subDistrict}
                  containerStyle={{
                    height: 35,
                    width: width - 58,
                    alignSelf: "center",
                  }}
                  style={{ backgroundColor: "#f0f0f0" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#f0f0f0" }}
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
                  onChangeItem={onChangeSubDistrict}
                />
              </Block>
              <Block style={{ marginBottom: 5 }}>
                <Text style={styles.textDescAddress}>รหัสไปรษณีย์ :</Text>
                <Block style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    value={objOrderScreen.ZIP_CODE}
                    editable={false}
                  />
                </Block>
              </Block>
            </Block>
          </Block>
        </RadioButton.Group>
      </>
    );
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Order Screen")}
        >
          <Block row style={styles.container}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 18,
              }}
            >
              {"<  "}ที่อยู่ในการจัดส่ง
            </Text>
          </Block>
        </TouchableOpacity>

        {/* Head */}
        <Block style={{ backgroundColor: "white" }}>
          <Text style={styles.fontTitleProduct}>เลือกที่อยู่ในการจัดส่ง</Text>
          {renderDeliveryList()}
        </Block>

        {/* Button */}
        <Block
          style={{
            paddingTop: 25,
            paddingBottom: 40,
            alignSelf: "center",
            backgroundColor: "white",
            width: width,
          }}
        >
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={"ตกลง"}
            type="solid"
            buttonStyle={styles.buttonStyle1}
            onPress={() => props.navigation.navigate("Order Screen")}
          />
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionOrder.actions)(UseAddressDelivery);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BUTTON_COLOR,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  fontTitleProduct: {
    paddingLeft: 12,
    paddingBottom: 10,
    fontFamily: "kanitRegular",
    fontSize: 17,
    color: "black",
    marginLeft: 10,
    marginTop: 10,
  },
  fontTitleProducts: {
    paddingLeft: 12,
    paddingBottom: 10,
    fontFamily: "kanitRegular",
    fontSize: 18,
    color: "black",
    marginLeft: 10,
    marginTop: 5,
  },
  textDescAddress: {
    fontFamily: "kanitRegular",
    fontSize: 14,
    color: "#6e6d6d",
    paddingLeft: 20,
    paddingBottom: 5,
  },
  buttonStyle1: {
    backgroundColor: "#02d483",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  blockRadioAddress: {
    width: "95%",
    backgroundColor: "#f7f7f7",
    height: 180,
    alignSelf: "center",
    borderWidth: 0.2,
    borderColor: "gray",
    marginBottom: 10,
  },
  blockRadioAddressWhite:{
    width: "95%",
    backgroundColor: "white",
    height: 180,
    alignSelf: "center",
    borderWidth: 0.2,
    borderColor: "gray",
    marginBottom: 10,
  },
  blockRadioAddressFix: {
    width: "95%",
    backgroundColor: "#f7f7f7",
    height: height / 1.5,
    alignSelf: "center",
    borderWidth: 0.2,
    borderColor: "gray",
    marginBottom: 10,
  },
  blockRadioAddressFixWhite: {
    width: "95%",
    backgroundColor: "white",
    height: height / 1.5,
    alignSelf: "center",
    borderWidth: 0.2,
    borderColor: "gray",
    marginBottom: 10,
  },
  textTitleDelivery: {
    color: "black",
    fontFamily: "kanitBold",
    fontSize: 18,
  },
  textDescDelivery: {
    color: "black",
    fontFamily: "kanitRegular",
    fontSize: 15,
  },
  inputView: {
    width: "90%",
    backgroundColor: "#f0f0f0",
    height: 20,
    justifyContent: "center",
    alignSelf: "center",
    padding: 15,
    borderWidth: 1.2,
    borderColor: "#e0e0e0",
  },
  inputText: {
    height: 30,
    color: "black",
    fontSize: 14,
    fontFamily: "kanitRegular",
  },
});

//Style Modal
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#00000099",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalContainer: {
    backgroundColor: "#f9fafb",
    width: "80%",
    borderRadius: 13,
  },
  modalHeader: {},
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 15,
    color: "#000",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
  modalBody: {
    backgroundColor: "#fff",
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  modalFooter: {},
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    color: "#fff",
  },
  bloxStyle: {
    marginTop: 10,
  },
});
