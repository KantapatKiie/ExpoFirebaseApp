import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
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
import { RadioButton } from "react-native-paper";
import { API_URL } from "../../../config/config.app";
import { getToken } from "../../../store/mock/token";

const { width } = Dimensions.get("screen");
const token = getToken();
//const rootImage = "http://10.0.1.37:8080";
const rootImage = "http://demo-ecommerce.am2bmarketing.co.th";

function UseDelivery(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const { objUseDelivery } = useSelector((state) => ({
    objUseDelivery: state.actionOrder.objUseDelivery,
  }));

  useEffect(() => {
    setListDelivery(DeliveryList);
    loadDataDeliveryList();
  }, []);

  const [listDelivery, setListDelivery] = useState(DeliveryList);
  const loadDataDeliveryList = async () => {
    await axios
      .get(API_URL.LOGISTICS_LIST_HD_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
          "X-localization": locale,
        },
      })
      .then(function (response) {
        setListDelivery(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [checkedDelivery, setCheckedDelivery] = useState(1);
  const renderDeliveryList = () => {
    return (
      <>
        {listDelivery != undefined
          ? listDelivery.map((item) => (
              <Block
                row
                style={
                  item.id === checkedDelivery
                    ? styles.blockRadio
                    : styles.blockRadioWhite
                }
                key={item.id}
              >
                <Block style={{ marginLeft: 10, marginTop: 5 }}>
                  <RadioButton.Group
                    onValueChange={(value) => setCheckedDelivery(value)}
                    value={checkedDelivery}
                  >
                    <RadioButton color="#02d483" value={item.id} />
                  </RadioButton.Group>
                </Block>
                <Block style={{ marginLeft: 30, marginTop: 10 }}>
                  <Image
                    source={{ uri: rootImage + item.image }}
                    style={{ width: 190, height: 50 }}
                  />
                  <Block style={{ marginTop: 10 }}>
                    <Text style={styles.textTitleDelivery}>
                      {item.name_en + " - " + item.name_th}
                    </Text>
                    <Text style={styles.textDescDelivery}>
                      {"ระยะเวลาในการจัดส่ง : " + item.period}
                    </Text>
                    <Text style={styles.textDescDelivery}>
                      {"อัตราค่าบริการ : " + item.base_price}
                    </Text>
                  </Block>
                </Block>
              </Block>
            ))
          : null}
      </>
    );
  };
  const onSelectDelivery = () => {
    let objDelivery = Object.assign({}, objUseDelivery);
    objDelivery.id = checkedDelivery;
    props.setObjUseDelivery(objDelivery);
    props.navigation.navigate("Order Screen");
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              {"<  "}ช่องทางการจัดส่ง
            </Text>
          </Block>
        </TouchableOpacity>

        {/* Detail */}
        <Block style={{ backgroundColor: "white" }}>
          <Text style={styles.fontTitleProduct}>เลือกช่องทางการจัดส่ง</Text>
          {renderDeliveryList()}
        </Block>

        {/* Button */}
        <Block
          style={{
            paddingTop: 25,
            paddingBottom: 40,
            alignSelf: "center",
            backgroundColor: "white",
            width: width,
          }}
        >
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={"ตกลง"}
            type="solid"
            buttonStyle={styles.buttonStyle1}
            onPress={onSelectDelivery}
          />
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionOrder.actions)(UseDelivery);

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
  fontTitleProduct: {
    paddingLeft: 12,
    paddingBottom: 10,
    fontFamily: "kanitRegular",
    fontSize: 17,
    color: "black",
    marginLeft: 10,
    marginTop: 10,
  },
  buttonStyle1: {
    backgroundColor: "#02d483",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
  },
  blockRadio: {
    width: "95%",
    backgroundColor: "#f7f7f7",
    height: 150,
    alignSelf: "center",
    borderWidth: 0.2,
    borderColor: "gray",
    marginBottom: 10,
  },
  blockRadioWhite: {
    width: "95%",
    backgroundColor: "white",
    height: 150,
    alignSelf: "center",
    borderWidth: 0.2,
    borderColor: "gray",
    marginBottom: 10,
  },
  textTitleDelivery: {
    color: "black",
    fontFamily: "kanitBold",
    fontSize: 18,
  },
  textDescDelivery: {
    color: "black",
    fontFamily: "kanitRegular",
    fontSize: 15,
  },
});

const DeliveryList = [
  {
    id: 1,
    name_th: "เคอร์รี่",
    name_en: "Kerry",
    image: "/storage/5/download.png",
    period: "3-5",
    base_price: "23.00"
  },
  {
    id: 2,
    name_th: "อีเอ็มเอส",
    name_en: "EMS",
    image: "/storage/6/download-%282%29.png",
    period: "6-9",
    base_price: "5.00"
  },
  {
    id: 3,
    name_th: "แฟลช",
    name_en: "Flash",
    image: "/storage/7/download-%281%29.png",
    period: "1-4",
    base_price: "100.00"
  }
];
