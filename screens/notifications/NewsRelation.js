import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  SectionList,
  FlatList,
  Dimensions,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { connect, useSelector } from "react-redux";
import { Block, Text } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import { API_URL } from "../../config/config.app";
import WangdekInfo from "../../components/WangdekInfo";
import ModalLoading from "../../components/ModalLoading";
import * as ActionNewsRelations from "../../actions/action-news-relations/ActionNewsRelations";

const { height, width } = Dimensions.get("screen");
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

function NewsRelation(props) {
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

  const [loading, setLoading] = useState(null);
  const { objNewsRelationsHD } = useSelector((state) => ({
    objNewsRelationsHD: state.actionNewsRelations.objNewsRelationsHD,
  }));
  useEffect(() => {
    setMenu1(true);
    setMenu2(false);
    setMenu3(false);
    loadDataNews("all");
  }, []);

  // Set MenuTAB
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);
  const [informationList, setInformationList] = useState(null);
  const onSelectedMenu1 = () => {
    setMenu1(true);
    setMenu2(false);
    setMenu3(false);
    loadDataNews("all");
  };
  const onSelectedMenu2 = () => {
    setMenu1(false);
    setMenu2(true);
    setMenu3(false);
    loadDataNews("news");
  };
  const onSelectedMenu3 = () => {
    setMenu1(false);
    setMenu2(false);
    setMenu3(true);
    loadDataNews("event");
  };
  async function loadDataNews(selected) {
    await axios
      .get(API_URL.NEWS_EVENTS_RELATIONS_HD, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        let newlst;
        if (selected == "news") {
          newlst = await response.data.data.filter(
            (item) => item.type == "news"
          );
        } else if (selected == "event") {
          newlst = await response.data.data.filter(
            (item) => item.type == "event"
          );
        } else {
          newlst = await response.data.data;
        }
        setInformationList(newlst);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const ListItemInformation = ({ item }) => {
    var fullDate = item.operate_datetime;
    var colorItem = moment(item.operate_datetime).format("ddd", locale);
    var colorEtc = "";

    switch (colorItem) {
      case locale != "th" ? SUNDAY.substring(0, 3) : SUNDAY:
        colorItem = "#fc4353";
        colorEtc = "#ba303c";
        break;

      case locale != "th" ? MONDAY.substring(0, 3) : MONDAY:
        colorItem = "#fdb837";
        colorEtc = "#cc952f";
        break;
      case locale != "th" ? TUESDAY.substring(0, 3) : TUESDAY:
        colorItem = "#ec429a";
        colorEtc = "#c93a84";
        break;

      case locale != "th" ? WEDNESDAY.substring(0, 3) : WEDNESDAY:
        colorItem = "#10c990";
        colorEtc = "#0c9c6f";
        break;

      case locale != "th" ? THURSDAY.substring(0, 3) : THURSDAY:
        colorItem = "#fd761a";
        colorEtc = "#c75e16";
        break;

      case locale != "th" ? FRIDAY.substring(0, 3) : FRIDAY:
        colorItem = "#119bf6";
        colorEtc = "#1080c9";
        break;

      case locale != "th" ? SATURDAY.substring(0, 3) : SATURDAY:
        colorItem = "#c924a7";
        colorEtc = "#961b7d";
        break;

      default:
        break;
    }
    const onSelectNewsEvents = (item , colorEtc) => {
      let objNews = Object.assign({}, objNewsRelationsHD);
      objNews.id= item.id;
      objNews.type= item.type;
      objNews.title_th= item.title_th;
      objNews.title_en= item.title_en;
      objNews.short_description_th= item.short_description_th;
      objNews.short_description_en= item.short_description_en;
      objNews.operate_datetime= item.operate_datetime;
      objNews.image= item.image;
      objNews.colorTitle = colorEtc;

      props.setObjNewsRelationsHD(objNews);
      props.navigation.navigate("News Relation Detail");
    };
    return (
      <View style={styles.items}>
        {/* Image */}
        <ImageBackground
          source={{
            uri: rootImage + item.image,
          }}
          style={styles.itemPhotos}
        >
          <Block
            style={{
              backgroundColor: colorItem,
              width: 45,
              height: 60,
              borderRadius: 10,
              marginTop: 110,
              marginLeft: 5,
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
              {moment(fullDate).format("DD")}
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: "kanitRegular",
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {moment(fullDate).format("MMM")}
            </Text>
          </Block>
        </ImageBackground>
        {/* Detail */}
        <Block
          style={{ backgroundColor: "white", padding: 15, width: width - 20 }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "kanitBold",
            }}
          >
            {locale == "th" ? item.title_th : item.title_en}
          </Text>
          <Text style={styles.TextActivity}>
            {moment(fullDate).format("LLLL")}
          </Text>
          <Text style={styles.TextActivity}>&nbsp;</Text>
          {/* Detail Information */}
          <Text style={styles.TextActivity}>
            {" "}
            {locale == "th"
              ? item.short_description_th
              : item.short_description_en}
          </Text>
          <Text style={styles.TextActivity}>&nbsp;</Text>
          <TouchableOpacity
            onPress={() => onSelectNewsEvents(item, colorEtc)}
            style={{
              backgroundColor: colorEtc,
              borderRadius: 10,
              width: 100,
              Opacity: 0.5,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "kanitBold",
                textAlign: "center",
                fontSize: 13,
              }}
            >
              {formatTr("READ_MORE").toString()}
            </Text>
          </TouchableOpacity>
        </Block>
      </View>
    );
  };

  return (
    <>
      {/* Menu List */}
      <Block row>
        <TouchableOpacity
          onPress={onSelectedMenu1}
          style={menu1 ? styles.menuTab : styles.menuTabNaN}
          delayPressIn={100}
        >
          <Text style={styles.textMenu}>ทั้งหมด</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelectedMenu2}
          style={menu2 ? styles.menuTab : styles.menuTabNaN}
          delayPressIn={100}
        >
          <Text style={styles.textMenu}>ข่าวประชาสัมพันธ์</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelectedMenu3}
          style={menu3 ? styles.menuTab : styles.menuTabNaN}
          delayPressIn={100}
        >
          <Text style={styles.textMenu}>กิจกรรม</Text>
        </TouchableOpacity>
      </Block>
      {/* Information List */}
      <SafeAreaView style={styles2.container}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={INFORMATION}
          renderSectionFooter={() => (
            <>
              <Block
                flex
                style={{ backgroundColor: "#f7f7f7", marginBottom: 25 }}
              >
                <FlatList
                  horizontal={false}
                  data={informationList}
                  renderItem={({ item }) => <ListItemInformation item={item} />}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  listKey={(item) => item.id.toString()}
                />
              </Block>
              <WangdekInfo />
            </>
          )}
          renderItem={() => {
            return null;
          }}
        />
      </SafeAreaView>
      <ModalLoading loading={loading} />
    </>
  );
}
export default connect(null, ActionNewsRelations.actions)(NewsRelation);

const styles = StyleSheet.create({
  home: {
    width: width,
    height: height,
  },
  item: {
    margin: 5,
  },
  itemPhoto: {
    width: 100,
    height: 100,
  },
  items: {
    margin: 10,
    marginBottom: 10,
  },
  itemPhotos: {
    width: width - 20,
    height: 180,
  },
  itemText: {
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
  },
  menuTab: {
    width: width / 3,
    height: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    alignSelf: "center",
    borderBottomColor: "#47a3f5",
    borderBottomWidth: 5,
  },
  menuTabNaN: {
    width: width / 3,
    height: 50,
    backgroundColor: "white",
    alignSelf: "center",
  },
  textMenu: {
    textAlign: "center",
    fontFamily: "kanitRegular",
    fontSize: 18,
    marginTop: 12,
  },
});

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: width,
    height: height,
    flex: 1,
  },
  containerHeader: {
    backgroundColor: "#4967ad",
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
  blockFlashSale: {
    padding: 8,
    backgroundColor: "#1dab98",
    flexDirection: "column",
    height: 100,
  },
  sectionHeader: {
    fontWeight: "500",
    fontSize: 15,
    color: "#f4f4f4",
    marginTop: 5,
    marginBottom: 5,
  },
  item: {
    margin: 5,
  },
  itemPhoto: {
    width: 100,
    height: 100,
  },
  items: {
    margin: 5,
  },
  itemPhotos: {
    width: 300,
    height: 180,
  },
  itemText: {
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
  },
  TextActivity: {
    color: "black",
    fontFamily: "kanitRegular",
  },
});

const INFORMATION = [
  {
    title: "Information",
    data: [
      {
        key: "1",
        title: "Activity 1",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#fdb837",
        colorEtc: "#cc952f",
        uri: "https://picsum.photos/id/1/200",
      },
      {
        key: "2",
        title: "Activity 2",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#ec429a",
        colorEtc: "#c93a84",
        uri: "https://picsum.photos/id/10/200",
      },

      {
        key: "3",
        title: "Activity 3",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#10c990",
        colorEtc: "#0c9c6f",
        uri: "https://picsum.photos/id/1002/200",
      },
      {
        key: "4",
        title: "Activity 4",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#fd761a",
        colorEtc: "#c75e16",
        uri: "https://picsum.photos/id/1006/200",
      },
      {
        key: "5",
        title: "Activity 5",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#119bf6",
        colorEtc: "#1080c9",
        uri: "https://picsum.photos/id/1008/200",
      },

      {
        key: "6",
        title: "Activity 6",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#c924a7",
        colorEtc: "#961b7d",
        uri: "https://picsum.photos/id/1008/200",
      },

      {
        key: "7",
        title: "Activity 7",
        body:
          "Barbie LittleBarbie LittleBarbie LittleBarbie LittleBarbie Little",
        color: "#fc4353",
        colorEtc: "#ba303c",
        uri: "https://picsum.photos/id/1008/200",
      },
    ],
  },
];
