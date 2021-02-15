import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
  Dimensions,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import * as ActionHistoryView from "../actions/action-history-view/ActionHistoryView";
import { Block, Text, theme } from "galio-framework";
import { formatTr } from "../i18n/I18nProvider";
import WangdekInfo from "../components/WangdekInfo";
import { API_URL } from "../config/config.app";
import commaNumber from "comma-number";
import { getToken } from "../store/mock/token";
import ModalLoading from "../components/ModalLoading";

import products from "../constants/products";
import products2 from "../constants/products2";

const { width } = Dimensions.get("screen");
const token = getToken();
//const rootImage = "http://10.0.1.37:8080";
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

function HistoryView(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const { objHistoryView } = useSelector((state) => ({
    objHistoryView: state.actionHistoryView.objHistoryView,
  }));
  var LOAD_MORE = formatTr("LOAD_MORE").toString();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setStateObj(products);
  }, []);

  const [stateObj, setStateObj] = useState([
    {
      key: "1",
      title: "",
      detail: "",
      image: "1",
      price: "0",
      horizontal: true,
    },
  ]);

  const renderProduct = ({ item }) => {
    const onSelectProductHistory = () => {};
    return (
      <Block flex style={styles.textContainerBlock1}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.imageProduct}
        />
        <TouchableOpacity
          onPress={onSelectProductHistory}
          style={styles.productText}
        >
          <Block flex space="between" style={styles.productDescription}>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 13,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 14,
              }}
            >
              ราคา : ฿{commaNumber(parseFloat(item.price).toFixed(2))}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  const loadMoreProductHistoryView = () => {
    const newConcatState = stateObj.concat(products2);
    setStateObj(newConcatState);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={HISTORY_VIEW_LIST}
          renderSectionHeader={() => (
            <>
              {/* Title */}
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Sign In")}
              >
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
                    {"<  "}ประวัติการเข้าชม
                  </Text>
                </Block>
              </TouchableOpacity>
              {/* ListItem */}
              <FlatList
                data={stateObj}
                style={styles.containers}
                renderItem={renderProduct}
                numColumns={2}
              />
              <TouchableOpacity
                onPress={loadMoreProductHistoryView}
                style={{ marginBottom: 15 }}
              >
                <Text
                  style={styles.loadMoreText}
                  size={14}
                  color={theme.COLORS.PRIMARY}
                >
                  {LOAD_MORE + " >"}
                </Text>
              </TouchableOpacity>
            </>
          )}
          renderSectionFooter={() => <>{<WangdekInfo />}</>}
          renderItem={() => {
            return null;
          }}
        />
      </SafeAreaView>

      <ModalLoading loading={loading} />
    </>
  );
}

export default connect(null, ActionHistoryView.actions)(HistoryView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  containers: {
    flex: 1,
    marginVertical: 20,
  },
  textContainerBlock1: {
    padding: 10,
    flexWrap: "wrap",
    marginRight: 10,
  },
  imageProduct: {
    resizeMode: "cover",
    width: 180,
    height: 150,
  },
  productText: {
    width: 180,
    height: 100,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 1.5,
    backgroundColor: "white",
    borderBottomEndRadius: 2,
    borderBottomLeftRadius: 2,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    height: width / 3, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
  },
  loadMoreText: {
    alignSelf: "center",
    color: "black",
    fontFamily: "kanitRegular",
    borderBottomWidth: 5,
    borderBottomColor: "#ff002f",
    borderRadius: 2,
  },
});

const HISTORY_VIEW_LIST = [
  {
    title: "Mock",
    horizontal: false,
    data: [
      {
        key: "1",
        uri: "",
      },
    ],
  },
];
