import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import moment from "moment";
import "moment-duration-format";
import { Block, Text } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";

const { height, width } = Dimensions.get("screen");

function NewsRelationDetail(props) {
  useEffect(() => {
    // setItem(false);
  }, []);
  let TimeActDay = moment(new Date()).format("DD");
  let TimeActMonth = moment(new Date()).format("MMM");
  let TimeActivity = moment(new Date()).format("DD MMM YYYY   |   HH:mm ");

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        {/* Header */}
        <Block
          row
          style={{
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          <Block
            style={{
              backgroundColor: "orange",
              width: 50,
              height: 65,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "kanitRegular",
                fontSize: 26,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {TimeActDay}
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: "kanitRegular",
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {TimeActMonth}
            </Text>
          </Block>
          <Block>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
                textAlign: "left",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              ลุยออนไลน์ให้หนัก! 3 ยักษ์ใหญ่ค้าปลีกไอทีอย่าง "คอปเปอร์ไวร์ด"
            </Text>
          </Block>
        </Block>
        <Block row style={{ marginTop: 15 }}>
          <Text
            style={{
              color: "#8a8a8a",
              fontFamily: "kanitRegular",
              fontSize: 17,
              textAlign: "left",
              marginLeft: 15,
            }}
          >
            วันที่ {TimeActivity} น.
          </Text>
          <Image
            source={require("../../assets/iconRegister/viewpass2.png")}
            style={{
              width: 25,
              height: 25,
              marginLeft: 50,
            }}
          />
          <Text
            style={{
              color: "#8a8a8a",
              fontFamily: "kanitRegular",
              fontSize: 17,
              textAlign: "center",
              marginLeft: 5,
              marginRight: 15,
            }}
          >
            เข้าชม 1,234
          </Text>
        </Block>
        <Block
          style={{
            borderRadius: 20,
            backgroundColor: "#e0e0e0",
            width: 150,
            margin: 15,
          }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            ข่าวประชาสัมพันธ์
          </Text>
        </Block>
        {/* Body  */}
        <Image
          source={require("../../assets/images/HowTo/banner-1.jpg")}
          style={{
            width: width,
            height: 350,
          }}
        />
        <Block
          style={{
            marginTop: 15,
            width: "95%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 15,
              textAlign: "left",
            }}
          >
            {formatTr("NOTIFICATION_TEXT1")}
          </Text>
        </Block>
        <Block
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            marginTop: 20,
            width: "95%",
            alignSelf: "center",
          }}
        />
        <Block
          row
          style={{
            marginTop: 15,
            width: "95%",
            alignSelf: "center",
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "kanitRegular",
              fontSize: 15,
              textAlign: "left",
            }}
          >
            แชร์ :
          </Text>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/fb-share.png")}
              style={{
                width: 30,
                height: 30,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/line-share.png")}
              style={{
                width: 30,
                height: 30,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default NewsRelationDetail;

const styles = StyleSheet.create({
  home: {
    width: width,
    height: height,
  },
});
