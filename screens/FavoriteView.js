import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  FlatList,
  Image,
  RefreshControl,
  SectionList,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import * as ActionFavoriteView from "../actions/action-favorite-view/ActionFavoriteView";
import { Block, Text, theme } from "galio-framework";
import { formatTr } from "../i18n/I18nProvider";
import WangdekInfo from "../components/WangdekInfo";
import { API_URL } from "../config/config.app";
import commaNumber from "comma-number";
import { getToken } from "../store/mock/token";
import ModalLoading from "../components/ModalLoading";

const { width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

const defaultListFavorite = [
  {
    favorite: 1,
    favorite_id: 3,
    id: 1,
    name_th: "",
    name_en: "",
    image: "/storage/3/images-%281%29.jfif",
    price: "0",
    favorite: 1,
    updated_at: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  },
];

function FavoriteView(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  var LOAD_MORE = formatTr("LOAD_MORE").toString();
  const [loading, setLoading] = useState(null);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const onRefreshPageNow = React.useCallback(() => {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    setRefreshingPage(true);
    wait(1000).then(() => {
      setNumList(2);
      loadListFavorite();
      ToastAndroid.show("Refresh Page", ToastAndroid.SHORT);
      setRefreshingPage(false);
    });
  }, []);

  useEffect(() => {
    setNumList(2);
    loadListFavorite();
  }, []);

  const [stateObj, setStateObj] = useState(defaultListFavorite);

  //List Favorite View
  const [numColumns] = useState(2);
  const [numList, setNumList] = useState(2);
  const loadListFavorite = async () => {
    setStateObj("");
    setLoading(false);
    await axios
      .get(API_URL.FAVORITE_VIEW_LIST_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
        params: {
          page: 1,
        },
      })
      .then(function (response) {
        setStateObj(response.data.data.product_lists);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(true);
      });
    setLoading(true);
  };
  const loadMoreListProduct = async () => {
    setLoading(false);
    setNumList(numList + 1);
    await axios
      .get(API_URL.FAVORITE_VIEW_LIST_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
        params: {
          page: numList,
        },
      })
      .then(function (response) {
        const newConcatState = stateObj.concat(
          response.data.data.product_lists
        );
        setStateObj(newConcatState);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const renderFavoriteProducts = ({ item }) => {
    //Favorite Click
    const onFavoriteProduct = async (key, favorite) => {
      let newObjOld = stateObj.filter((item) => item.id != key);
      let newObj = stateObj.filter(
        (item) => item.id == key && item.favorite == favorite
      );
      if (newObj[0].favorite !== 0) {
        newObj[0].favorite = 0;
        ToastAndroid.show("ยกเลิกติดตามสินค้า", ToastAndroid.SHORT);
      } else {
        newObj[0].favorite = 1;
        ToastAndroid.show("ติดตามสินค้า", ToastAndroid.SHORT);
      }

      let newStateObj = newObj.concat(newObjOld).sort(function (a, b) {
        return new Date(a.updated_at) - new Date(b.updated_at);
      });
      setStateObj(newStateObj);
      axios
        .put(API_URL.FAVORITE_VIEW_LIST_API + "/" + key, {
          headers: {
            Accept: "*/*",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          // console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    return (
      <Block flex style={styles.textContainerBlock1}>
        <ImageBackground
          source={{
            uri: rootImage + item.image,
          }}
          style={styles.imageProduct}
        >
          <TouchableOpacity
            key={item}
            onPress={() => onFavoriteProduct(item.id, item.favorite)}
            style={{
              width: 35,
              height: 35,
              alignSelf: "flex-end",
              marginRight: 10,
              marginTop: "58%",
            }}
          >
            <Image
              source={
                item.favorite === 1
                  ? require("../assets/iconSignIn/like-icon2.png")
                  : require("../assets/iconSignIn/like-icon1.png")
              }
            />
          </TouchableOpacity>
        </ImageBackground>
        <TouchableOpacity
          style={styles.productText}
          onPress={() => props.navigation.navigate("Products")}
        >
          <Block flex space="between" style={styles.productDescription}>
            <Block
              style={{ borderBottomWidth: 0.5, borderBottomColor: "#e0e0e0" }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 13,
                }}
              >
                {locale == "th" ? item.name_th : item.name_en}
              </Text>
            </Block>

            <Text
              style={{
                color: "black",
                fontFamily: "kanitRegular",
                fontSize: 17,
              }}
            >
              ราคา : {"฿"}
              {commaNumber(parseFloat(item.price).toFixed(2))}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={FAVORITE_LIST}
          refreshControl={
            <RefreshControl
              refreshing={refreshingPage}
              onRefresh={onRefreshPageNow}
            />
          }
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
                    {"<  "}รายการโปรด
                  </Text>
                </Block>
              </TouchableOpacity>
              {/* ListItem */}
              <FlatList
                data={stateObj}
                style={styles.containers}
                renderItem={renderFavoriteProducts}
                numColumns={numColumns}
                keyExtractor={(item) => item.id.toString()}
              />
              <TouchableOpacity
                onPress={loadMoreListProduct}
                style={{ marginBottom: 30 }}
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
      <ModalLoading loading={!loading} />
    </>
  );
}

export default connect(null, ActionFavoriteView.actions)(FavoriteView);

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
    padding: 9,
  },
  imageProduct: {
    resizeMode: "cover",
    width: 180,
    height: 150,
  },
  productText: {
    width: 180,
    height: 80,
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

const FAVORITE_LIST = [
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
