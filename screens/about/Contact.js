import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ToastAndroid,
  TextInput,
} from "react-native";
import { connect, useSelector } from "react-redux";
import * as ActionContact from "../../actions/action-contact/ActionContact";
import { Button } from "react-native-elements";
import { Icon } from "../../components";
import { formatTr } from "../../i18n/I18nProvider";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Block, Input } from "galio-framework";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import WangdekInfo from "../../components/WangdekInfo";

const { height, width } = Dimensions.get("screen");

function Contact(props) {
  const { objContactHD } = useSelector((state) => ({
    objContactHD: state.actionContact.objContactHD,
  }));

  useEffect(() => {
    setObjSearch({
      FULL_NAME: "",
      EMAIL: "",
      PHONE: "",
      COMMENT: "",
    });
  }, []);

  const [objSearch, setObjSearch] = useState({
    FULL_NAME: "",
    EMAIL: "",
    PHONE: "",
    COMMENT: "",
  });

  const showToastConfirm = () => {
    ToastAndroid.show("ส่งแบบฟอริ์มเรียบร้อย", ToastAndroid.SHORT);
  };
  const showToastCancel = () => {
    setObjSearch("");
    ToastAndroid.show("ยกเลิกการส่งแบบฟอริ์ม", ToastAndroid.SHORT);
  };

  const [objTopic, setObjTopic] = useState();
  const itemTopic = [
    {
      label: "USA",
      value: "usa",
      //   icon: () => <Icons name="home" size={18} color="black" />,
      hidden: true,
    },
    {
      label: "UK",
      value: "uk",
      //   icon: () => <Icons name="home" size={18} color="black" />,
    },
  ];
  const onChangeTopic = (item) => {
    setObjTopic(item);
  };

  const onChangeName = (e) => {
    let newObj = Object.assign({}, objSearch);
    newObj.FULL_NAME = e.nativeEvent.text;
    setObjSearch(newObj);
  };
  const onChangeEmail = (e) => {
    let newObj = Object.assign({}, objSearch);
    newObj.EMAIL = e.nativeEvent.text;
    setObjSearch(newObj);
  };
  const onChangePhone = (e) => {
    let newObj = Object.assign({}, objSearch);
    newObj.PHONE = e.nativeEvent.text;
    setObjSearch(newObj);
  };
  const onChangeComment = (e) => {
    let newObj = Object.assign({}, objSearch);
    newObj.COMMENT = e.nativeEvent.text;
    setObjSearch(newObj);
  };
  const handleClearObj = () => {
    setObjSearch("");
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
              // title="this is a marker"
              // description="this is a marker example"
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
        {/* Insert data */}
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
            //   defaultValue={this.state.country}
            onChangeItem={onChangeTopic}
          />
        </Block>
        {/* Data */}
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
              value={objSearch.FULL_NAME}
              iconContent={
                <TouchableOpacity onPress={handleClearObj}>
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
              value={objSearch.EMAIL}
              iconContent={
                <TouchableOpacity onPress={handleClearObj}>
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
              value={objSearch.PHONE}
              iconContent={
                <TouchableOpacity onPress={handleClearObj}>
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
              value={objSearch.COMMENT}
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
            onPress={() => showToastCancel()}
          />
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={formatTr("CONFIRM").toString()}
            type="solid"
            containerStyle={styles.blockButton2}
            buttonStyle={styles.buttonStyle2}
            onPress={() => showToastConfirm()}
            //   onPress={() => props.navigation.navigate("Flash Sale")}
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
    width: width - 25,
    alignSelf: "center",
    borderRadius: 5,
  },
  searchMutiLine: {
    height: 40,
    width: width - 25,
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
