import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  FlatList,
  SectionList,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { Block, theme } from "galio-framework";
import { API_URL } from "../../config/config.app";
import { formatTr } from "../../i18n/I18nProvider";
import * as ActionMyCoupon from "../../actions/action-my-coupon/ActionMyCoupon";
import WangdekInfo from "../../components/WangdekInfo";
import { getToken } from "../../store/mock/token";
import ModalLoading from "../../components/ModalLoading";

const { width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

function MyCoupon(props) {
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
      loadListCoupon();
      ToastAndroid.show("Refresh Page", ToastAndroid.SHORT);
      setRefreshingPage(false);
    });
  }, []);

  useEffect(() => {
    loadListCoupon();
  }, []);
  // Set MenuTAB
  const [menu1, setMenu1] = useState(true);
  const [menu2, setMenu2] = useState(false);
  const [menuType, setMenuType] = useState(1);

  const onSelectedMenu1 = () => {
    setMenu1(true);
    setMenu2(false);
    setMenuType(1);
    loadListCoupon();
  };
  const onSelectedMenu2 = () => {
    setMenu1(false);
    setMenu2(true);
    setMenuType(0);
    loadListCoupon();
  };

  //List Coupon View
  const [numColumns] = useState(2);
  const [numList, setNumList] = useState(2);
  const [listCoupon, setListCoupon] = useState(null);
  const loadListCoupon = async () => {
    setLoading(false);
    await axios
      .get(API_URL.MY_COUPON_LIST_TR_API + menuType, {
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
        setListCoupon(response.data.data);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(true);
      });
    setLoading(true);
  };
  const loadMoreListCoupon = async () => {
    setLoading(false);
    setNumList(numList + 1);
    await axios
      .get(API_URL.MY_COUPON_LIST_TR_API + menuType, {
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
        const newConcatState = listCoupon.concat(response.data.data);
        setListCoupon(newConcatState);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const renderCouponListItem = ({ item }) => {
    return (
      <>
        <Block style={{ alignSelf: "center" }}>
          <Image
            source={{
              uri:
                locale == "th"
                  ? rootImage + item.image_th
                  : rootImage + item.image_en,
            }}
            style={{
              height: 120,
              width: width - 160,
              marginTop: 5,
            }}
          />
        </Block>
      </>
    );
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={MY_COUPON_LIST}
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
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 18,
                    }}
                  >
                    {"<  "}คูปองของฉัน
                  </Text>
                </Block>
              </TouchableOpacity>

              {/* Menu Type */}
              <Block style={{ height: 50, backgroundColor: "#ededed" }}>
                <Block row style={{ marginLeft: 50 }}>
                  <TouchableOpacity onPress={onSelectedMenu1}>
                    <Text
                      style={menu1 ? styles.textMenuSelect : styles.textMenu}
                    >
                      คูปองที่ใช้ได้
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onSelectedMenu2}>
                    <Text
                      style={menu2 ? styles.textMenuSelect : styles.textMenu}
                    >
                      คูปองที่ใช้ไปแล้ว
                    </Text>
                  </TouchableOpacity>
                </Block>
              </Block>

              {/* Coupon List*/}
              <Block style={{ backgroundColor: "white" }}>
                <Text
                  style={{
                    fontFamily: "kanitRegular",
                    fontSize: 15,
                    color: "red",
                    textAlign: "center",
                  }}
                >
                  {menuType == 1
                    ? "กรุณาเลือกสินค้าในตะกร้าก่อนเลือกคูปองส่วนลด"
                    : "คูปองส่วนลดที่ใช้ไปแล้ว"}
                </Text>
                <FlatList
                  horizontal={false}
                  data={listCoupon}
                  style={styles.containers}
                  renderItem={renderCouponListItem}
                  numColumns={1}
                  keyExtractor={(item) => item.id.toString()}
                />

                <TouchableOpacity
                  onPress={loadMoreListCoupon}
                  style={{ margin: 30 }}
                >
                  <Text
                    style={styles.loadMoreText}
                    size={14}
                    color={theme.COLORS.PRIMARY}
                  >
                    {LOAD_MORE + " >"}
                  </Text>
                </TouchableOpacity>
              </Block>
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

export default connect(null, ActionMyCoupon.actions)(MyCoupon);

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
  loadMoreText: {
    alignSelf: "center",
    color: "black",
    fontFamily: "kanitRegular",
    borderBottomWidth: 5,
    borderBottomColor: "#ff002f",
    borderRadius: 2,
  },
});

const MY_COUPON_LIST = [
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
