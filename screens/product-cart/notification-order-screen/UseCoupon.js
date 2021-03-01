import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  SectionList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { Block, Text, theme } from "galio-framework";
import { connect, useSelector } from "react-redux";
import * as ActionOrder from "../../../actions/action-order-status/ActionOrder";
import WangdekInfo from "../../../components/WangdekInfo";
import { Button } from "react-native-elements";
import { API_URL } from "../../../config/config.app";
import { getToken } from "../../../store/mock/token";

const { width } = Dimensions.get("screen");
const token = getToken();
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

function UseCoupon(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const { objOrderScreen } = useSelector((state) => ({
    objOrderScreen: state.actionOrder.objOrderScreen,
  }));
  const { objUseCoupon } = useSelector((state) => ({
    objUseCoupon: state.actionOrder.objUseCoupon,
  }));

  useEffect(() => {
    setVerifyCoupon(false);
    loadDataCouponUser();
  }, []);

  const [couponList, setCouponList] = useState(null);
  const [verifyCoupon, setVerifyCoupon] = useState(false);
  async function loadDataCouponUser() {
    await axios
      .get(API_URL.MY_COUPON_LIST_TR_API + 1, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
        params: {
          page: 1,
        },
      })
      .then((response) => {
        setCouponList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const ListItemCoupon = ({ item }) => {
    const selectCouponThis = async (item) => {
      setVerifyCoupon(false);
      let objCoupon = Object.assign({}, objUseCoupon);
      await axios
        .get(API_URL.COUPON_VERIFY_IDS_API + item.code, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + (await token),
            "Content-Type": "application/json",
          },
        })
        .then(async (response) => {
          objCoupon.code = response.data.data.code;
          objCoupon.id = response.data.data.id;
          objCoupon.image =
            locale == "th"
              ? response.data.data.image_th
              : response.data.data.image_en;
          objCoupon.title1_en = response.data.data.title1_en;
          objCoupon.title1_th = response.data.data.title1_th;
          objCoupon.title2_en = response.data.data.title2_en;
          objCoupon.title2_th = response.data.data.title2_th;
          objCoupon.coupon_discount = response.data.data.coupon_discount;

          props.setObjUseCoupon(objCoupon);
          props.navigation.navigate("Order Screen");
        })
        .catch(function (error) {
          console.log(error, false)
        });
    };
    return (
      <Block
        row
        style={{
          backgroundColor: "#ededed",
          width: width,
          height: 110,
        }}
      >
        <Image
          source={{
            uri:
              locale == "th"
                ? rootImage + item.image_th
                : rootImage + item.image_en,
          }}
          style={{ width: 160, height: 80, margin: 20 }}
        />

        <Block>
          <Button
            titleStyle={{
              color: "white",
              fontFamily: "kanitRegular",
            }}
            title={"COLLECT"}
            type="solid"
            buttonStyle={styles.buttonCoupon}
            onPress={() => selectCouponThis(item)}
          />
        </Block>
      </Block>
    );
  };

  const onChangeCodeCoupon = (value) => {
    let newObj = Object.assign({}, objUseCoupon);
    newObj.code = value;
    props.setObjUseCoupon(newObj);
  };

  const onUseCodeVerifyCoupon = async () => {
    setVerifyCoupon(false);
    // setVerifyCouponCollect(false);
    let objCoupon = Object.assign({}, objUseCoupon);
    await axios
      .get(API_URL.COUPON_VERIFY_IDS_API + objUseCoupon.code, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        objCoupon.code = response.data.data.code;
        objCoupon.id = response.data.data.id;
        objCoupon.image =
          locale == "th"
            ? response.data.data.image_th
            : response.data.data.image_en;
        objCoupon.title1_en = response.data.data.title1_en;
        objCoupon.title1_th = response.data.data.title1_th;
        objCoupon.title2_en = response.data.data.title2_en;
        objCoupon.title2_th = response.data.data.title2_th;
        objCoupon.coupon_discount = response.data.data.coupon_discount;

        props.setObjUseCoupon(objCoupon);
        props.navigation.navigate("Order Screen");
      })
      .catch(function (error) {
        console.log(false);
        setVerifyCoupon(true);
      });
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={COUPON_CART_LIST}
          renderSectionHeader={() => (
            <>
              {/* Title */}
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Order Screen")}
              >
                <Block row style={styles.container}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "kanitRegular",
                      fontSize: 18,
                    }}
                  >
                    {"<  "}ใช้ส่วนลด
                  </Text>
                </Block>
              </TouchableOpacity>

              {/* Detail */}
              <Block style={{ backgroundColor: "white" }}>
                <Block style={{ margin: 15 }}>
                  <Text style={styles.fontTitleProduct}>
                    กรอกโค้ดเพื่อรับส่วนลด
                  </Text>
                  <Block style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder={"กรุณากรอกรหัสส่วนลด"}
                      placeholderTextColor="#808080"
                      value={objOrderScreen.CODE_COUPON}
                      onChangeText={onChangeCodeCoupon}
                    />
                  </Block>
                  {verifyCoupon ? (
                    <Block style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          color: "red",
                          fontSize: 12,
                          fontFamily: "kanitRegular",
                        }}
                      >
                        ⚠ ไม่สามารถใช้โค้ตส่วนลดนี้ได้
                      </Text>
                    </Block>
                  ) : null}
                </Block>
                <Block
                  style={{
                    paddingTop: 10,
                    paddingBottom: 30,
                    alignSelf: "center",
                  }}
                >
                  <Button
                    titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                    title={"USE CODE"}
                    type="solid"
                    buttonStyle={styles.buttonStyle1}
                    onPress={onUseCodeVerifyCoupon}
                  />
                </Block>

                {/* My coupon */}
                <Block style={{ backgroundColor: "white" }}>
                  <Text style={styles.fontTitleProduct}>คูปองของฉัน</Text>
                  <FlatList
                    horizontal={false}
                    data={couponList}
                    renderItem={({ item }) =>
                      item.code !== "" ? <ListItemCoupon item={item} /> : null
                    }
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </Block>
              </Block>

              {/* Button */}
              <Block
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  alignSelf: "center",
                  backgroundColor: "white",
                  width: width,
                }}
              ></Block>
            </>
          )}
          renderSectionFooter={() => <>{<WangdekInfo />}</>}
          renderItem={() => {
            return null;
          }}
        />
      </SafeAreaView>
    </>
  );
}

export default connect(null, ActionOrder.actions)(UseCoupon);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BUTTON_COLOR,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  inputView: {
    width: "95%",
    backgroundColor: "#fafafa",
    height: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1.4,
    borderColor: "#e0e0e0",
    borderRadius: 2,
    alignSelf: "center",
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 15,
    fontFamily: "kanitRegular",
  },
  fontTitleProduct: {
    paddingLeft: 12,
    paddingBottom: 10,
    fontFamily: "kanitRegular",
    fontSize: 17,
    color: "black",
  },
  buttonStyle1: {
    backgroundColor: "#02d483",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  buttonCoupon: {
    backgroundColor: "#02d483",
    borderRadius: 15,
    width: 120,
    height: 30,
    alignSelf: "center",
    marginTop: 42,
    marginLeft: 15,
  },
});

//Style Modal
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#00000099",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalContainer: {
    backgroundColor: "#f9fafb",
    width: "80%",
    borderRadius: 13,
  },
  modalHeader: {},
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 15,
    color: "#000",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
  modalBody: {
    backgroundColor: "#fff",
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  modalFooter: {},
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    color: "#fff",
  },
  bloxStyle: {
    marginTop: 10,
  },
});

const COUPON_CART_LIST = [
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
