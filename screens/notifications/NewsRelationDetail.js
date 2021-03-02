import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Share,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { connect, useSelector } from "react-redux";
import * as ActionNewsRelations from "../../actions/action-news-relations/ActionNewsRelations";
import { API_URL } from "../../config/config.app";
import { Block, Text } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";

const { height, width } = Dimensions.get("screen");
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

const defaultSocialsMedia = [
  {
    id: 1,
    name: "facebook",
    url: "https://www.facebook.com/xxx",
    image: "/storage/24/fb-share.png",
  },
  {
    id: 2,
    name: "line",
    url: "#",
    image: "/storage/25/line-share.png",
  },
];

function NewsRelationDetail(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  //#region Translate
  var SUNDAY = formatTr("SUNDAY").toString();
  var MONDAY = formatTr("MONDAY").toString();
  var TUESDAY = formatTr("TUESDAY").toString();
  var WEDNESDAY = formatTr("WEDNESDAY").toString();
  var THURSDAY = formatTr("THURSDAY").toString();
  var FRIDAY = formatTr("FRIDAY").toString();
  var SATURDAY = formatTr("SATURDAY").toString();
  //#endregion
  const { objNewsRelationsHD } = useSelector((state) => ({
    objNewsRelationsHD: state.actionNewsRelations.objNewsRelationsHD,
  }));

  useEffect(() => {
    loadDataSocialsMedia();
    loadDescription();
  }, []);

  const [descriptionPage, setDescriptionPage] = useState({
    description_th: "...",
    description_en: "......",
  });
  const loadDescription = async () => {
    await axios
      .get(API_URL.NEWS_EVENTS_RELATIONS_HD + objNewsRelationsHD.id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        let newlst = await response.data.data;
        setDescriptionPage(newlst);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [dataSocials, setDataSocials] = useState(defaultSocialsMedia);
  const loadDataSocialsMedia = async () => {
    await axios
      .get(API_URL.SOCIALS_LIST_HD_API, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        setDataSocials(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const shareLinkSocials = (item) => {
    if (Platform.OS === "android") {
      Share.share({
        title: "Share message website",
        message: "Message",
        url: item.url,
        tintColor: "black",
        subject: "Share message website",
        dialogTitle: "Share website",
      })
        .then(function (response) {
          ToastAndroid.show(response.data, ToastAndroid.SHORT);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Share.share({
        title: "Share message website",
        message: "Message",
        url: item.url,
        subject: "Share message website",
        dialogTitle: "Share website",
        tintColor: "black",
      })
        .then(function (response) {
          ToastAndroid.show(response.data, ToastAndroid.SHORT);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
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
          {objNewsRelationsHD.operate_datetime !== "0000-00-00 00:00:00" &&
          objNewsRelationsHD.operate_datetime !== null ? (
            <Block
              style={{
                backgroundColor: objNewsRelationsHD.colorTitle,
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
                {moment(objNewsRelationsHD.operate_datetime).format("DD")}
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
                {moment(objNewsRelationsHD.operate_datetime).format("MMM")}
              </Text>
            </Block>
          ) : null}
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
              {locale == "th"
                ? objNewsRelationsHD.title_th
                : objNewsRelationsHD.title_en}
            </Text>
          </Block>
        </Block>
        {objNewsRelationsHD.operate_datetime !== "0000-00-00 00:00:00" &&
        objNewsRelationsHD.operate_datetime !== null ? (
          <Block style={{ marginTop: 15 }}>
            <Text
              style={{
                color: "#8a8a8a",
                fontFamily: "kanitRegular",
                fontSize: 17,
                textAlign: "left",
                marginLeft: 15,
              }}
            >
              วันที่{" "}
              {moment(objNewsRelationsHD.operate_datetime).format("LLLL")} น.
            </Text>
          </Block>
        ) : null}
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
            {objNewsRelationsHD.type == "news"
              ? "ข่าวประชาสัมพันธ์"
              : "กิจกรรม"}
          </Text>
        </Block>
        {/* Body  */}
        <Image
          source={{ uri: rootImage + objNewsRelationsHD.image }}
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
            {locale == "th"
              ? descriptionPage.description_th
              : descriptionPage.description_en}
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
              marginTop: 5,
            }}
          >
            {formatTr("SHARE_TEXT")}
          </Text>
          {dataSocials !== null
            ? dataSocials.map((item) => (
                <TouchableOpacity
                  onPress={() => shareLinkSocials(item)}
                  key={item.id}
                >
                  <Image
                    source={{ uri: rootImage + item.image }}
                    style={{
                      width: 32,
                      height: 32,
                      marginLeft: 12,
                    }}
                  />
                </TouchableOpacity>
              ))
            : null}
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionNewsRelations.actions)(NewsRelationDetail);

const styles = StyleSheet.create({
  home: {
    width: width,
    height: height,
  },
});
