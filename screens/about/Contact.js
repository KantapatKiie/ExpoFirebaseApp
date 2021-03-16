import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { connect, useSelector } from "react-redux";
import * as ActionContact from "../../actions/action-contact/ActionContact";
import { Button } from "react-native-elements";
import { formatTr } from "../../i18n/I18nProvider";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Block, Input } from "galio-framework";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import WangdekInfo from "../../components/WangdekInfo";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";
import Toast from 'react-native-tiny-toast'

const { width } = Dimensions.get("screen");
const token = getToken();

function Contact(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const { objContactHD } = useSelector((state) => ({
    objContactHD: state.actionContact.objContactHD,
  }));

  // useEffect(() => {
  //   // props.clearObjContactHD();
  // }, []);

  const itemTopic = [
    {
      label: "สินค้า",
      value: "1",
      hidden: true,
    },
    {
      label: "การชำระเงิน",
      value: "2",
    },
    {
      label: "อื่นๆ",
      value: "3",
    },
  ];
  const onChangeTopic = (item) => {
    let newObj = Object.assign({}, objContactHD);
    newObj.subject = item.value;
    props.setObjContactHD(newObj);
  };
  const onChangeName = (e) => {
    let newObj = Object.assign({}, objContactHD);
    newObj.full_name = e.nativeEvent.text;
    props.setObjContactHD(newObj);
  };
  const handleClearFullname = () => {
    let newObj = Object.assign({}, objContactHD);
    newObj.full_name = "";
    props.setObjContactHD(newObj);
  };
  const onChangeEmail = (e) => {
    let newObj = Object.assign({}, objContactHD);
    newObj.email = e.nativeEvent.text;
    props.setObjContactHD(newObj);
  };
  const handleClearEmail = () => {
    let newObj = Object.assign({}, objContactHD);
    newObj.email = "";
    props.setObjContactHD(newObj);
  };
  const onChangePhone = (e) => {
    let newObj = Object.assign({}, objContactHD);
    newObj.telephone = e.nativeEvent.text;
    props.setObjContactHD(newObj);
  };
  const handleClearPhone = () => {
    let newObj = Object.assign({}, objContactHD);
    newObj.telephone = "";
    console.log(newObj);
    props.setObjContactHD(newObj);
  };
  const onChangeComment = (e) => {
    let newObj = Object.assign({}, objContactHD);
    newObj.detail = e.nativeEvent.text;
    props.setObjContactHD(newObj);
  };

  //Send Topic
  const sendTopicContactUs = async () => {
    await axios({
      method: "POST",
      url: API_URL.CONTACT_US_HD_API,
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + (await token),
        "Content-Type": "application/json",
      },
      data: {
        subject: objContactHD.subject,
        full_name: objContactHD.full_name,
        email: objContactHD.email,
        telephone: objContactHD.telephone,
        detail: objContactHD.detail,
      },
    })
      .then(function (response) {
        Toast.show(response.data.data, {
          containerStyle:{ backgroundColor:"#f0f0f0", borderRadius:25},
          position: Toast.position.center,
          animation: true,
          textStyle: { fontSize:14,fontFamily: "kanitRegular", color:"#3b3838" },
        });
      })
      .catch(function (error) {
        console.log(error);
        Toast.show(error.response.data.data, {
          containerStyle:{ backgroundColor:"#f0f0f0", borderRadius:25},
          position: Toast.position.center,
          animation: true,
          textStyle: { fontSize:14,fontFamily: "kanitRegular", color:"#3b3838" },
        });
      });
  };
  const unsendTopicContactUs = () => {
    props.clearObjContactHD();
    Toast.show("ยกเลิกการส่งแบบฟอริ์ม", {
      containerStyle:{ backgroundColor:"#f0f0f0", borderRadius:25},
      position: Toast.position.center,
      animation: true,
      textStyle: { fontSize:14,fontFamily: "kanitRegular", color:"#3b3838" },
    });
  };

  return (
    <>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        {/* Map */}
        <Block flex>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 13.79910335904877,
              longitude: 100.56033331534356,
              latitudeDelta: 0.015,
              longitudeDelta: 0.012,
            }}
          >
            <Marker
              coordinate={{
                latitude: 13.79910335904877,
                longitude: 100.56033331534356,
              }}
            />
          </MapView>
        </Block>
        
        {/* Contact */}
        <Block felx>
          <ImageBackground
            source={require("../../assets/images/bg-p.jpg")}
            style={{
              width: width,
              height: 500,
            }}
          >
            <Block style={{ alignSelf: "center" }}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitRegular",
                  fontSize: 16,
                  textAlign: "left",
                  paddingTop: 25,
                }}
              >
                บริษัทวังเด็กทอยส์แลนด์ จำกัด
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitRegular",
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                (WANGDEK TOYSLAND Co,Ltd.)
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitLight",
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                63/4 ซ.ยาสูบ ถใวิภาวดีรังสิต แขวงจอมพล
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitLight",
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                เขตจตุจักร กรุงเทพฯ 10900
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "kanitLight",
                  fontSize: 16,
                  textAlign: "left",
                  paddingTop: 25,
                }}
              >
                เวลาทำการ : จันทร์-ศุกร์ 09.00-18.00
              </Text>
              <Block row>
                <Image
                  source={require("../../assets/iconContact/phone-icon.png")}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 25,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "kanitRegular",
                    fontSize: 16,
                    textAlign: "left",
                    paddingTop: 25,
                    paddingLeft: 10,
                  }}
                >
                  02-272-1490-92 ต่อ 108
                </Text>
              </Block>
              <Block row>
                <Image
                  source={require("../../assets/iconContact/fax-icon.png")}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 10,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "kanitRegular",
                    fontSize: 16,
                    textAlign: "left",
                    paddingLeft: 10,
                    marginTop: 10,
                  }}
                >
                  02-617-6013
                </Text>
              </Block>
              <Block row>
                <Image
                  source={require("../../assets/iconContact/mail-icon.png")}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 10,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "kanitRegular",
                    fontSize: 16,
                    textAlign: "left",
                    paddingLeft: 10,
                    marginTop: 10,
                  }}
                >
                  E-Mail : sale@wangdek.com
                </Text>
              </Block>
              <Block row>
                <Image
                  source={require("../../assets/iconContact/line-icon.png")}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 10,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "kanitRegular",
                    fontSize: 16,
                    textAlign: "left",
                    paddingLeft: 10,
                    marginTop: 10,
                  }}
                >
                  Line id : wangdekshop
                </Text>
              </Block>
              <Block>
                <Image
                  source={require("../../assets/iconContact/QR-mockup.jpg")}
                  style={{
                    width: 100,
                    height: 100,
                    marginTop: 50,
                  }}
                />
              </Block>
            </Block>
          </ImageBackground>
        </Block>
        {/* Topic */}
        <Block
          style={{
            padding: 15,
            paddingTop: 35,
            height: 180,
          }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 24,
            }}
          >
            กรุณากรอกแบบฟอร์ม
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 17,
              paddingTop: 10,
            }}
          >
            เลือกเรื่องที่ต้องการติดต่อ
          </Text>
          <DropDownPicker
            items={itemTopic}
            containerStyle={{ height: 40 }}
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
            placeholder={"- เลือกหัวข้อ -"}
            labelStyle={{
              textAlign: "left",
              color: "#000",
            }}
            onChangeItem={onChangeTopic}
          />
        </Block>
        {/* Key Data */}
        <Block style={{ backgroundColor: "white" }}>
          <Block flex style={{ paddingTop: 15 }}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
                paddingLeft: 15,
              }}
            >
              ชื่อ
            </Text>
            <Input
              right
              color="black"
              style={styles.search}
              placeholder="Text..."
              onChange={onChangeName}
              value={objContactHD.full_name}
              iconContent={
                <TouchableOpacity onPress={handleClearFullname}>
                  <Icons name="close" size={20} color="black" />
                </TouchableOpacity>
              }
            />
          </Block>
          <Block flex>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
                paddingLeft: 15,
              }}
            >
              อีเมล
            </Text>
            <Input
              right
              color="black"
              style={styles.search}
              placeholder="Text..."
              onChange={onChangeEmail}
              value={objContactHD.email}
              iconContent={
                <TouchableOpacity onPress={handleClearEmail}>
                  <Icons name="close" size={20} color="black" />
                </TouchableOpacity>
              }
            />
          </Block>
          <Block flex>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
                paddingLeft: 15,
              }}
            >
              เบอร์โทร
            </Text>
            <Input
              right
              color="black"
              style={styles.search}
              placeholder="Text..."
              onChange={onChangePhone}
              value={objContactHD.telephone}
              iconContent={
                <TouchableOpacity onPress={handleClearPhone}>
                  <Icons name="close" size={20} color="black" />
                </TouchableOpacity>
              }
            />
          </Block>
          <Block flex>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
                paddingLeft: 15,
              }}
            >
              แสดงความเห็น
            </Text>
            <TextInput
              style={styles.searchMutiLine}
              onChange={onChangeComment}
              value={objContactHD.detail}
              multiline={true}
            />
          </Block>
        </Block>
        {/* Button */}
        <Block
          row
          style={{
            paddingTop: 40,
            paddingBottom: 40,
            backgroundColor: "white",
          }}
        >
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={formatTr("CANCEL").toString()}
            type="solid"
            containerStyle={styles.blockButton1}
            buttonStyle={styles.buttonStyle1}
            onPress={unsendTopicContactUs}
          />
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={formatTr("CONFIRM").toString()}
            type="solid"
            containerStyle={styles.blockButton2}
            buttonStyle={styles.buttonStyle2}
            onPress={sendTopicContactUs}
          />
        </Block>
        {/* Info */}
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionContact.actions)(Contact);

const styles = StyleSheet.create({
  buttonStyle1: {
    backgroundColor: "#565566",
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
    padding: 10,
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
    width: width - 35,
    alignSelf: "center",
    borderRadius: 5,
  },
  searchMutiLine: {
    height: 40,
    width: width - 35,
    alignSelf: "center",
    backgroundColor: "white",
    height: 100,
    borderWidth: 0.2,
    borderRadius: 2,
    borderColor: "gray",
    textAlignVertical: "top",
  },
  map: {
    width: width,
    height: 250,
  },
});
