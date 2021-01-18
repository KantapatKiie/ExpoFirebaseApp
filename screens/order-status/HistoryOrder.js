import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from "react-native";
import * as ActionHistoryOrder from "../../actions/action-history-order/ActionHistoryOrder.js";
import { Block, Text, theme, Input } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import { Button } from "react-native-elements";
import { Searchbar } from "react-native-paper";

const { height, width } = Dimensions.get("screen");

function HistoryOrder(props) {
  const { objHistoryOrder } = useSelector((state) => ({
    objHistoryOrder: state.actionHistoryOrder.objHistoryOrder,
  }));

  useEffect(() => {
    // setStateObj(products);
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

  const onClickProducts = () => {
    console.log("Load More Item concat");
    // const newConcatState = stateObj.concat(products2);
    // setStateObj(newConcatState);
  };

  const onChangeSearch = (e) => {
    let newObj = Object.assign({}, objHistoryOrder);
    newObj.SEARCH_ORDER = e.nativeEvent.text;
    props.setObjHistoryOrder(newObj);
  };

  const showToast = () => {
    ToastAndroid.show("Test ToastAndriod React Native !", ToastAndroid.SHORT);
  };

  let status = "payment";
  const renderProduct = () => {
    status = "payment";
    const renderStatus = () => {
      if (status == "payment") {
        return (
          <Image
            source={require("../../assets/images/order-filter/status1-icon.png")}
            style={{ width: 20, height: 20 }}
          />
        );
      } else if (status == "waitpay") {
        return (
          <Image
            source={require("../../assets/images/order-filter/status2-icon.png")}
            style={{ width: 20, height: 20 }}
          />
        );
      } else if (status == "waitcheck") {
        return (
          <Image
            source={require("../../assets/images/order-filter/status3-icon.png")}
            style={{ width: 20, height: 20 }}
          />
        );
      }
      return null;
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
            UCM789456123:
          </Text>
          {/* Block 1 */}
          <Block row style={{ marginTop: 10 }}>
            <Block>
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
                8 ก.พ. 2564
              </Text>
            </Block>
            <Block style={{ paddingLeft: "40%" }}>
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
                2
              </Text>
            </Block>
          </Block>
          {/* Block 2 */}
          <Block row style={{ marginTop: 10 }}>
            <Block>
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
                8 ก.พ. 2564
              </Text>
            </Block>
            <Block style={{ paddingLeft: "43%" }}>
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
                  style={{
                    color: "#00c278",
                    fontFamily: "kanitRegular",
                    fontSize: 14,
                  }}
                >
                  {"  "}ชำระเงินแล้ว
                </Text>
              </Block>
            </Block>
          </Block>
          {/* Block Button */}
          {status !== "payment" ? (
            <Block row style={{ marginTop: 25 }}>
              <TouchableOpacity onPress={() => props.navigation.navigate("Order Status")}>
                <Button
                  titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                  title={"ดูรายละเอียด"}
                  type="solid"
                  containerStyle={styles.blockButton1}
                  buttonStyle={styles.buttonStyle1}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Button
                  titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                  title={"ยกเลิกคำสั่งซื้อ"}
                  type="solid"
                  containerStyle={styles.blockButton2}
                  buttonStyle={styles.buttonStyle2}
                  onPress={() => console.log("Cancel")}
                />
              </TouchableOpacity>
            </Block>
          ) : (
            <Block row style={{ alignSelf: "center", marginTop: 25 }}>
                <Button
                  titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                  title={"ดูรายละเอียด"}
                  type="solid"
                  buttonStyle={styles.buttonStyle1}
                  onPress={() => props.navigation.navigate("Order Status")}
                />
            </Block>
          )}
        </Block>
      </Block>
    );
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        {/* Title */}
        <TouchableOpacity onPress={() => props.navigation.navigate("Sign In")}>
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
          value={objHistoryOrder.SEARCH_ORDER}
          onChange={onChangeSearch}
          style={styles.search}
          inputStyle={{ fontSize: 16, fontFamily: "kanitRegular" }}
        />

        {/* List order */}
        {renderProduct()}

        {/* Load more */}
        <TouchableOpacity
          onPress={onClickProducts}
          style={{ marginBottom: 15, marginTop: 25 }}
        >
          <Text
            style={styles.loadMoreText}
            size={14}
            color={theme.COLORS.PRIMARY}
          >
            {formatTr("LOAD_MORE") + " >"}
          </Text>
        </TouchableOpacity>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionHistoryOrder.actions)(HistoryOrder);

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
    padding: 20,
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
  buttonStyle2: {
    backgroundColor: "#ff4545",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
});
