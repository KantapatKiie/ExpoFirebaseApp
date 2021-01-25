import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { connect, useSelector } from "react-redux";
import { actions as ActionProduct } from "../../actions/action-product/ActionProduct";
import { actions as ActionCart } from "../../actions/action-cart/ActionCart";
import WangdekInfo from "../../components/WangdekInfo";
import ReadMore from "react-native-read-more-text";
import NumericInput from 'react-native-numeric-input'
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar, Colors } from 'react-native-paper';
import CountDown from "react-native-countdown-component";
import commaNumber from "comma-number";

const { height, width } = Dimensions.get("screen");

function ProductDetail(props) {
  const { objProductActivity } = useSelector((state) => ({
    objProductActivity: state.actionProduct.objProductActivity,
  }));
  const { objCartBasket } = useSelector((state) => ({
    objCartBasket: state.actionCart.objCartBasket,
  }));

  useEffect(() => {
  }, []);
  
  const [progressValue ,setProgressValue] = useState(0.7);

  const [ favotite, setFavorite] = useState(false)
  const onClickFavorite = () => {
    if (favotite === false) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  };

  // ReadMore
  const renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={{
          color: "black",
          marginTop: 5,
          fontFamily: "kanitBold",
          fontSize: 15,
        }}
        onPress={handlePress}
      >
        Read more...
      </Text>
    );
  };
  const renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={{
          color: "black",
          marginTop: 5,
          fontFamily: "kanitBold",
          fontSize: 15,
        }}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };

  //onChangeCount
  const onChangeValue =(value) => {
    let newObj = Object.assign({}, objProductActivity);
    newObj.COUNT = value;
    props.setObjProductActivity(newObj);
  }
  const onclickAddProduct = () => {
    let newObjCart = Object.assign({}, objCartBasket);
    newObjCart.CART_ID = "CRTID001";
    newObjCart.TITLE = objProductActivity.TITLE;
    newObjCart.DETAIL = objProductActivity.DETAIL;
    newObjCart.IMAGE = objProductActivity.IMAGE;
    newObjCart.PRICE = objProductActivity.PRICE;
    newObjCart.COUNT = objProductActivity.COUNT;
    newObjCart.TOTAL_PRICE = objProductActivity.TOTAL_PRICE;

    props.setObjCartBasket(newObjCart);
    AsyncStorage["sessionCartBefore"] = newObjCart;
    props.navigation.navigate("Cart");
  };

  console.log(props);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.container}>
          <StatusBar barStyle="default" />
          {/* Image */}
          <Block
            row
            style={{
              marginBottom: 8,
            }}
          >
            <Image
              source={{
                uri: objProductActivity.IMAGE,
              }}
              style={{
                height: 320,
                width: width,
              }}
            />
          </Block>
          {/* Flashsale Type */}
          {objProductActivity.FLASHSALE ? (
            <LinearGradient
              colors={["#02a1eb", "#00c4b7", "#00d184"]}
              style={linerStyle.linearGradient}
            >
              <Block row>
                <Image
                  source={require("../../assets/images/flashsale_head.png")}
                  style={{
                    width: width - 190,
                    height: 27,
                    alignSelf: "flex-start",
                    marginTop: 35,
                    marginLeft: 10,
                  }}
                />
                {/* CountDownTime */}
                <Block>
                  <Text
                    style={{
                      fontFamily: "kanitRegular",
                      color: "white",
                      fontSize: 15,
                      marginLeft: 25,
                      marginTop: 17,
                    }}
                  >
                    Ends in
                  </Text>
                  <Block row>
                    <Block style={linerStyle.BlockTime}>
                      <CountDown
                        size={22}
                        until={60000}
                        digitStyle={{
                          backgroundColor: "#ff4545",
                          height: 30,
                          width: 38,
                        }}
                        style={{
                          marginLeft: 20,
                          marginBottom: 20,
                        }}
                        digitTxtStyle={{
                          color: "white",
                          fontSize: 18,
                          fontFamily: "kanitRegular",
                        }}
                        timeToShow={["H", "M", "S"]}
                        timeLabelStyle={{
                          color: "white",
                          fontWeight: "bold",
                        }}
                        timeLabels={{ d: null, h: null, m: null, s: null }}
                        separatorStyle={{ color: "white", marginBottom: 3.5 }}
                        showSeparator
                      />
                    </Block>
                  </Block>
                </Block>
              </Block>
              <Block
                style={{
                  backgroundColor: "#ebebeb",
                  borderRadius: 25,
                  height: 40,
                  width: "95%",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "kanitBold",
                    marginLeft: 18,
                  }}
                >
                  ขายแล้ว 250 ชิ้น
                </Text>
                <ProgressBar
                  progress={progressValue}
                  color={progressValue === 1 ? Colors.red800 : "#00b1ba"}
                  style={{
                    borderRadius: 20,
                    height: 10,
                    marginRight: 20,
                    width: "90%",
                    alignSelf: "flex-end",
                  }}
                />
              </Block>
            </LinearGradient>
          ) : null}
          {/* Title */}
          <Block row style={styles.blockTitle}>
            <Text style={styles.titleProduct}>{objProductActivity.TITLE}</Text>
            <Block style={styles.blockFavorite}>
              <TouchableOpacity onPress={onClickFavorite}>
                <Image
                  source={
                    favotite
                      ? require("../../assets/icons/I-heart.png")
                      : require("../../assets/icons/I-heart-o.png")
                  }
                  style={{
                    marginTop: 5,
                    alignSelf: "center",
                    width: 29,
                    height: 24,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "kanitRegular",
                    textAlign: "center",
                    fontSize: 9,
                    marginTop: 4,
                  }}
                >
                  รายการโปรด
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
          {/* Detail */}
          <Block style={{ margin: 10 }}>
            <Text style={styles.detailText}>
              รหัสสินค้า : {objProductActivity.TITLE}
            </Text>
            <Text style={styles.detailText}>
              ยี่ห้อ : {objProductActivity.TITLE}
            </Text>
            <Text style={styles.detailText}>
              มีสินค้าทั้งหมด : {objProductActivity.TITLE}
            </Text>
          </Block>
          <Block row style={{ margin: 15, alignSelf: "flex-end" }}>
            <Text style={styles.detailPrice1}>ราคา : </Text>
            <Text style={styles.detailPrice2}>฿{commaNumber(objProductActivity.PRICE)}</Text>
          </Block>
          {/* Count */}
          <Block row style={{ margin: 10 }}>
            <Text style={styles.detailText}>จำนวน : </Text>
            <NumericInput
              value={objProductActivity.COUNT}
              onChange={(value) => onChangeValue(value)}
              totalWidth={125}
              totalHeight={32}
              iconSize={18}
              step={1}
              valueType="real"
              type="plus-minus"
              rounded={false}
              textColor="black"
              iconStyle={{ color: "black" }}
              inputStyle={{ fontFamily: "kanitRegular" }}
              leftButtonBackgroundColor="#adadad"
              rightButtonBackgroundColor="#09db99"
              containerStyle={{ marginLeft: 20, fontFamily: "kanitRegular" }}
            />
          </Block>
          {/* Share Facebook&Line */}
          <Block
            row
            style={{
              marginTop: 25,
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
                marginTop: 3,
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
          {/* Button */}
          <Block style={styles.padded}>
            <Button
              shadowless
              style={styles.button1}
              color={"black"}
              onPress={onclickAddProduct}
            >
              <Text
                style={{
                  fontFamily: "kanitRegular",
                  color: "white",
                  fontSize: 15,
                }}
              >
                เพิ่มลงรถเข็น
              </Text>
            </Button>
            <Button
              shadowless
              style={styles.button2}
              color={"black"}
              onPress={onclickAddProduct}
            >
              <Text
                style={{
                  fontFamily: "kanitRegular",
                  color: "white",
                  fontSize: 15,
                }}
              >
                ซื้อเลย
              </Text>
            </Button>
          </Block>
          <Block style={{ margin: 10 }}>
            <Text style={styles.detailText}>ข้อมูลสินค้า</Text>
            <ReadMore
              numberOfLines={2}
              renderTruncatedFooter={renderTruncatedFooter}
              renderRevealedFooter={renderRevealedFooter}
            >
              <Text style={styles.detailTextDesc}>
                {objProductActivity.DETAIL}
              </Text>
            </ReadMore>
          </Block>
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

const mapActions = {
  setObjProductActivity: ActionProduct.setObjProductActivity,
  clearObjProductActivity: ActionProduct.clearObjProductActivity,
  setListTrProductActivity: ActionProduct.setListTrProductActivity,
  pushListTrProductActivity: ActionProduct.pushListTrProductActivity,

  setObjCartBasket: ActionCart.setObjCartBasket,
  clearObjCartBasket: ActionCart.clearObjCartBasket,
  setListTrCartBasket: ActionCart.setListTrCartBasket,
  pushListTrCartBasket: ActionCart.pushListTrCartBasket,
};
export default connect(null, mapActions)(ProductDetail);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BUTTON_COLOR,
  },
  padded: {
    height: 140,
    position: "relative",
    alignSelf: "center",
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  button1: {
    width: width - theme.SIZES.BASE * 5,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    borderRadius: 40,
    backgroundColor: "#008ce3",
  },
  button2: {
    width: width - theme.SIZES.BASE * 5,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    borderRadius: 40,
    backgroundColor: "#00dea6",
  },
  titleProduct: {
    color: "black",
    fontSize: 17,
    fontFamily: "kanitRegular",
    width: "80%",
  },
  detailText: {
    color: "black",
    fontSize: 16,
    fontFamily: "kanitRegular",
    marginTop:4
  },
  detailTextDesc: {
    color: "#858585",
    fontSize: 15,
    fontFamily: "kanitRegular",
  },
  detailPrice1: {
    color: "black",
    fontSize: 24,
    fontFamily: "kanitRegular",
    marginTop: 2,
  },
  detailPrice2: {
    color: "red",
    fontSize: 27,
    fontFamily: "kanitRegular",
  },
  blockFavorite: {
    backgroundColor: "#d1d1d1",
    width: 55,
    height: 50,
    marginLeft: "2.5%",
    marginTop: 5,
  },
  blockTitle: {
    marginLeft: 10,
    marginTop:15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    height: 70,
  },
  //Input Count
  detailTextCount: {
    color: "white",
    fontSize: 18,
    fontFamily: "kanitRegular",
    textAlign: "center",
  },
  buttonIncrease: {
    width: 30,
    height: 30,
    backgroundColor: "#09db99",
    borderWidth:0.2
  },
  buttonDecrease: {
    width: 30,
    height: 30,
    backgroundColor: "#adadad",
    marginLeft: 15,
    borderWidth:0.2
  },
  inputCountPD: {
    width: 70,
    height: 30,
    backgroundColor: "white",
    borderWidth:0.5,
    color: "black",
    fontSize: 18,
    fontFamily: "kanitRegular",
    textAlign: "center",
  },
});


const linerStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    justifyContent: "flex-start",
    height: 150,
    width: "97%",
    alignSelf:"center"
  },
  BlockTime: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    width:width / 1.6
  },
});


const timeStyle = StyleSheet.create({
  timeText: {
    fontWeight: "800",
    fontSize: 22,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
    fontFamily:"kanitRegular"
  },
  timeTextArrow: {
    fontWeight: "500",
    fontSize: 22,
    color: "white",
    paddingLeft: 10,
    paddingRight: 1.5,
    marginTop: 2.5,
    fontFamily:"kanitRegular"
  },
});
