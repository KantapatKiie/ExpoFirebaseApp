import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  ToastAndroid,
  RefreshControl,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment/locale/th";
import "moment/locale/en-au";
import * as ActionOrderStatus from "../../actions/action-order-status/ActionOrderStatus.js";
import { Block, Text, theme, Input } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import { Button } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import ModalLoading from "../../components/ModalLoading";
import { API_URL } from "../../config/config.app";
import commaNumber from "comma-number";
import { getToken } from "../../store/mock/token";

const { width } = Dimensions.get("screen");
const token = getToken();

const defaultListHistoryOrder = [
  {
    id: 9999,
    code: "ORD-2020120010",
    quantity: "2",
    amount: "6.00",
    status_th: "รอการชำระเงิน",
    status_en: "Waiting for payment",
    created_at: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  },
];

function HistoryOrder(props) {
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
      loadHistoryOrderList();
      ToastAndroid.show("Refresh Page", ToastAndroid.SHORT);
      setRefreshingPage(false);
    });
  }, []);

  useEffect(() => {
    setNumList(2);
    loadHistoryOrderList();
    setObjSerach({
      SEARCH_ORDER: "",
    });
  }, []);

  const [numList, setNumList] = useState(1);
  const [stateObj, setStateObj] = useState(defaultListHistoryOrder);
  const [objSearch, setObjSerach] = useState({
    SEARCH_ORDER: "",
  });
  const onChangeSearch = async (e) => {
    setStateObj("");
    let newObj = Object.assign({}, objSearch);
    newObj.SEARCH_ORDER = e.nativeEvent.text;
    setObjSerach(newObj);
    await axios
      .get(API_URL.HISTORY_ORDER_LIST_SEARCH_API + objSearch.SEARCH_ORDER, {
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
        setStateObj(response.data.data.orders.lists);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  async function loadHistoryOrderList() {
    setLoading(false);
    console.log("Load Load");
    await axios
      .get(API_URL.HISTORY_ORDER_LIST_API, {
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
        console.log(response.data.data);
        setStateObj(response.data.data.orders.lists);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(true);
      });
    setLoading(true);
  }
  const loadMoreHistoryOrderList = async () => {
    setLoading(false);
    setNumList(numList + 1);
    await axios
      .get(API_URL.HISTORY_ORDER_LIST_API, {
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
        const newConcatState = stateObj.concat(response.data.data.orders.lists);
        setStateObj(newConcatState);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(true);
      });
    setLoading(true);
  };
  const renderProduct = ({ item }) => {
    let status = item.status_th;
    const renderStatus = () => {
      if (status == "ชำระเงินแล้ว") {
        return (
          <Image
            source={require("../../assets/images/order-filter/status1-icon.png")}
            style={{ width: 20, height: 20 }}
          />
        );
      } else if (status == "รอการชำระเงิน") {
        return (
          <Image
            source={require("../../assets/images/order-filter/status2-icon.png")}
            style={{ width: 20, height: 20 }}
          />
        );
      } else if (status == "รอการตรวจสอบ") {
        return (
          <Image
            source={require("../../assets/images/order-filter/status3-icon.png")}
            style={{ width: 20, height: 20 }}
          />
        );
      }
      return null;
    };
    const handleViewDetail = async () => {
      props.clearObjOrderStatus();
      setLoading(false);
      await axios
        .get(API_URL.HISTORY_ORDER_DETAIL_LIST_API + item.code, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          let newObjStatus = Object.assign({}, stateObj);
          newObjStatus.status_th = item.status_th;
          newObjStatus.status_en = item.status_en;
          props.setStatusObjins(newObjStatus);

          props.setObjOrderStatus(response.data.data.orders);
          props.setListLogisticOrderStatus(response.data.data.orders.logistics);

          let listCarts = [];
          for (
            let i = 0;
            i < response.data.data.orders.carts_list.length;
            i++
          ) {
            listCarts.push(response.data.data.orders.carts_list[i]);
          }
          setLoading(true);
          props.navigation.navigate("Order Status", listCarts);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(true);
        });
      setLoading(true);
    };
    const handleCancelOrder = async () => {
      await axios
        .put(API_URL.CANCEL_ORDER_HD_API + item.code, {
          headers: {
            Accept: "*/*",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response.data);
          ToastAndroid.show(item.code + " is cancel", ToastAndroid.SHORT);
        })
        .catch(function (error) {
          console.log("error :", error);
        });
    };
    return (
      <Block flex style={styles.blockHistoryOrder}>
        <Block style={{ marginLeft: 5 }}>
          <Text
            style={{
              color: "#525252",
              fontFamily: "kanitRegular",
              fontSize: 18,
            }}
          >
            หมายเลขการสั่งซื้อ:
          </Text>
          <Text
            style={{
              color: "#525252",
              fontFamily: "kanitRegular",
              fontSize: 18,
            }}
          >
            {item.code}
          </Text>
          {/* Block 1 */}
          <Block row style={{ marginTop: 10 }}>
            <Block style={{ width: "55%" }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 14,
                }}
              >
                วันที่สั่งสินค้า :
              </Text>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 14,
                }}
              >
                {moment(item.created_at).format("DD  MMM  YYYY")}
              </Text>
            </Block>
            <Block style={{ width: "45%" }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 14,
                }}
              >
                จำนวน :
              </Text>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 14,
                }}
              >
                {item.quantity}
              </Text>
            </Block>
          </Block>
          {/* Block 2 */}
          <Block row style={{ marginTop: 10 }}>
            <Block style={{ width: "55%" }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 14,
                }}
              >
                ราคา :
              </Text>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 14,
                }}
              >
                {commaNumber(item.amount)}
              </Text>
            </Block>
            <Block style={{ width: "45%" }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "kanitRegular",
                  fontSize: 14,
                }}
              >
                สถานะ :
              </Text>
              <Block row>
                {renderStatus()}
                <Text
                  style={
                    item.status_th == "ชำระเงินแล้ว"
                      ? styles.textStatusPayment
                      : item.status_th == "รอการชำระเงิน"
                      ? styles.textStatusWaitPayment
                      : styles.textStatusWaitCheck
                  }
                >
                  {item.status_th}
                </Text>
              </Block>
            </Block>
          </Block>

          {/* Button */}
          {status !== "payment" ? (
            <Block row style={{ marginTop: 25 }}>
              <Button
                titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                title={"ดูรายละเอียด"}
                type="solid"
                containerStyle={styles.blockButton1}
                buttonStyle={styles.buttonStyle1}
                onPress={handleViewDetail}
              />
              <Button
                titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                title={"ยกเลิกคำสั่งซื้อ"}
                type="solid"
                containerStyle={styles.blockButton2}
                buttonStyle={styles.buttonStyle2}
                onPress={handleCancelOrder}
              />
            </Block>
          ) : (
            <Block row style={{ alignSelf: "center", marginTop: 25 }}>
              <Button
                titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                title={"ดูรายละเอียด"}
                type="solid"
                buttonStyle={styles.buttonStylePayment}
              />
            </Block>
          )}
        </Block>
      </Block>
    );
  };

  return (
    <>
      <Block flex center style={{ width: width }}>
        <View style={{ backgroundColor: "white" }}>
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              stickySectionHeadersEnabled={false}
              sections={HISTORY_LIST}
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
                        {"<  "}ประวัติการสั่งซื้อ
                      </Text>
                    </Block>
                  </TouchableOpacity>

                  {/* Filter */}
                  <Searchbar
                    placeholder="ค้นหาคำสั่งซื้อ"
                    value={objSearch.SEARCH_ORDER}
                    onChange={onChangeSearch}
                    style={styles.search}
                    inputStyle={{ fontSize: 16, fontFamily: "kanitRegular" }}
                  />
                  {/* List order */}
                  <FlatList
                    data={stateObj}
                    style={styles.containers}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                  />
                  {/* Load more */}
                  <TouchableOpacity
                    onPress={loadMoreHistoryOrderList}
                    style={{ marginBottom: 25, marginTop: 15 }}
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
        </View>
      </Block>
      <ModalLoading loading={!loading} />
    </>
  );
}

export default connect(null, ActionOrderStatus.actions)(HistoryOrder);

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
  blockHistoryOrder: {
    padding: 25,
    backgroundColor: "#f0f0f0",
    // shadowColor: theme.COLORS.BLACK,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // shadowOpacity: 0.1,
    // elevation: 2,
  },
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    height: width / 3, // approximate a square
  },
  loadMoreText: {
    alignSelf: "center",
    color: "black",
    fontFamily: "kanitRegular",
    borderBottomWidth: 5,
    borderBottomColor: "#ff002f",
    borderRadius: 2,
  },
  search: {
    height: 38,
    width: width - 25,
    alignSelf: "center",
    borderWidth: 1.5,
    borderRadius: 1,
    backgroundColor: "#f0f0f0",
    borderColor: "#f0f0f0",
    margin: 10,
    elevation: 0,
  },
  blockButton1: {
    flexDirection: "row",
    paddingLeft: 15,
  },
  blockButton2: {
    paddingLeft: 15,
  },
  buttonStyle1: {
    backgroundColor: "#00c278",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  buttonStylePayment: {
    backgroundColor: "#eba7b0",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  buttonStyle2: {
    backgroundColor: "#ff4545",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  textStatusPayment: {
    color: "#00c278",
    fontFamily: "kanitRegular",
    fontSize: 14,
    marginLeft: 10,
  },
  textStatusWaitPayment: {
    color: "#8a8a8a",
    fontFamily: "kanitRegular",
    fontSize: 14,
    marginLeft: 10,
  },
  textStatusWaitCheck: {
    color: "#f5d225",
    fontFamily: "kanitRegular",
    fontSize: 14,
    marginLeft: 10,
  },
});

const HISTORY_LIST = [
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
