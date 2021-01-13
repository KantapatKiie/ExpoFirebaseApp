import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
  SectionList,
  FlatList,
  Dimensions,
} from "react-native";
import moment from "moment";
import "moment-duration-format";
import { Block, Text, theme } from "galio-framework";
import { StatusBar } from "expo-status-bar";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";

const { height, width } = Dimensions.get("screen");

function NewsRelation(props) {
  useEffect(() => {
    setMenu1(true);
    setMenu2(false);
    setMenu3(false);
  }, []);
  let TimeActDay = moment(new Date()).format("DD");
  let TimeActMonth = moment(new Date()).format("MMM");
  let TimeActivity = moment(new Date()).format("DD MMM YYYY   |   HH:mm ");

  const ListItemInformation = ({ item }) => {
    return (
      <View style={styles.items}>
        {/* Image */}
        <ImageBackground
          source={{
            uri: item.uri,
          }}
          style={styles.itemPhotos}
        >
          <Block
            style={{
              backgroundColor: item.color,
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
              {TimeActDay}
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
              {TimeActMonth}
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
            {item.title}
          </Text>
          <Text style={styles.TextActivity}>{TimeActivity}</Text>
          <Text style={styles.TextActivity}>&nbsp;</Text>
          {/* Detail Information */}
          <Text style={styles.TextActivity}>{item.body}</Text>
          <Text style={styles.TextActivity}>&nbsp;</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("News Relation Detail")}
            style={{
              backgroundColor: item.colorEtc,
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

  // Set MenuTAB
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);

  const onSelectedMenu1 = () => {
    setMenu1(true);
    setMenu2(false);
    setMenu3(false);
  };
  const onSelectedMenu2 = () => {
    setMenu1(false);
    setMenu2(true);
    setMenu3(false);
  };
  const onSelectedMenu3 = () => {
    setMenu1(false);
    setMenu2(false);
    setMenu3(true);
  };
  return (
    <>
      {/* Menu List */}
      <Block row style={{ height: 50, backgroundColor: "white" }}>
        <TouchableOpacity onPress={onSelectedMenu1}>
          <Text style={menu1 ? styles.textMenuSelect : styles.textMenu}>
            ทั้งหมด
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSelectedMenu2}>
          <Text style={menu2 ? styles.textMenuSelect : styles.textMenu}>
            ข่าวประชาสัมพันธ์
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSelectedMenu3}>
          <Text style={menu3 ? styles.textMenuSelect : styles.textMenu}>
            กิจกรรม
          </Text>
        </TouchableOpacity>
      </Block>
      {/* Information List */}
      <Block flex center style={styles.home}>
        <View style={styles2.container}>
          <StatusBar style="auto" />
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              stickySectionHeadersEnabled={false}
              sections={INFORMATION}
              renderSectionFooter={() => (
                <>
                  <Block
                    flex
                    style={{ backgroundColor: "#f7f7f7", marginBottom: 25 }}
                  >
                    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
                      <SectionList
                        stickySectionHeadersEnabled={false}
                        sections={INFORMATION}
                        renderSectionHeader={({ section }) => (
                          <>
                            <Block style={styles2.containerHeader2}>
                              {section.horizontal ? (
                                <FlatList
                                  horizontal
                                  data={section.data}
                                  renderItem={({ item }) => (
                                    <ListItemInformation item={item} />
                                  )}
                                  showsHorizontalScrollIndicator={false}
                                />
                              ) : null}
                            </Block>
                          </>
                        )}
                        renderItem={({ item, section }) => {
                          if (section.horizontal) {
                            return null;
                          }
                          return <ListItemInformation item={item} />;
                        }}
                      />
                    </SafeAreaView>
                  </Block>
                  <WangdekInfo />
                </>
              )}
              renderItem={() => {
                return null;
              }}
            />
          </SafeAreaView>
        </View>
      </Block>
    </>
  );
}

export default NewsRelation;

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
  textMenu: {
    textAlign: "center",
    fontFamily: "kanitRegular",
    fontSize: 18,
    marginTop: 12,
    marginLeft: 38,
  },
  textMenuSelect: {
    textAlign: "center",
    fontFamily: "kanitRegular",
    fontSize: 18,
    marginTop: 12,
    marginLeft: 38,
    borderBottomColor: "#47a3f5",
    borderBottomWidth: 5,
    borderRadius: 2,
  },
});

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: "white",
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

const SECTION_TYPE = [
  {
    horizontal: true,
    data: [
      {
        key: "1",
        text: "ทั้งหมด",
        type: "all",
      },
      {
        key: "2",
        text: "ข่าวประชาสัมพันธ์",
        type: "relation",
      },
      {
        key: "3",
        text: "กิจกรรม",
        type: "event",
      },
    ],
  },
];

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
