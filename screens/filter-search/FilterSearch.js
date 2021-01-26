import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  Image,
  CheckBox,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import * as ActionFilterSearch from "../../actions/action-filter-search/ActionFilterSearch.js";
import { Block, Text } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import { Button } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import RangeSlider, { Slider } from 'react-native-range-slider-expo';

const { height, width } = Dimensions.get("screen");

function FilterSearch(props) {
  const { objFilterSearch } = useSelector((state) => ({
    objFilterSearch: state.actionFilterSearch.objFilterSearch,
  }));

  useEffect(() => {
    setShowType(false);
  }, []);

  const onChangeSearch = (e) => {
    let newObj = Object.assign({}, objFilterSearch);
    newObj.SEARCH_ORDER = e.nativeEvent.text;
    props.setObjFilterSearch(newObj);
  };
  const [filterSearch, setFilterSearch] = useState("1");
  const itemFilter = [
    {
      label: "เรียงลำดับ น้อย > มาก",
      value: "1",
      hidden: true,
    },
    {
      label: "เรียงลำดับ มาก > น้อย",
      value: "2",
    },
  ];
  const onChangeFilter = (item) => {
    setFilterSearch(item.value);
  };

  // Filter Function
  const [isSelectedType, setSelectionType] = useState(false);
  const [showType, setShowType] = useState(false);
  const onChangeTypeFilter = () => {
    if (showType === false) {
      setShowType(true);
    } else {
      setShowType(false);
    }
  };
  const renderCheckboxType = () => {
    return (
      <>
        <Block row style={{ margin: 15, marginTop: 25 ,borderBottomWidth:1, borderBottomColor:"#e0e0e0"}}>
          <Block flex style={{ width: "85%" }}>
            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontFamily: "kanitRegular",
              }}
            >
              ประเภทสินค้า
            </Text>
            {showType ? (
              <Block row>
                <CheckBox
                  value={isSelectedType}
                  onValueChange={setSelectionType}
                />
                <Text
                  style={{
                    color: "#707070",
                    fontSize: 14,
                    fontFamily: "kanitRegular",
                    margin: 5,
                  }}
                >
                  ของใช้และของเล่นเด็ก
                </Text>
              </Block>
            ) : null}
          </Block>
          <Block style={{ width: "15%" }}>
            <TouchableOpacity onPress={onChangeTypeFilter}>
              <Block
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#02db88",
                  alignSelf: "flex-end",
                }}
              >
                <Image
                  source={
                    showType
                      ? require("../../assets/icons/arrow_up.png")
                      : require("../../assets/icons/arrow_down.png")
                  }
                  style={{ alignSelf: "center", marginTop: 1 }}
                />
              </Block>
            </TouchableOpacity>
            {showType ? (
              <Text
                style={{
                  color: "#0290d6",
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                  marginTop: 10,
                  textAlign: "right",
                }}
              >
                (199)
              </Text>
            ) : null}
          </Block>
        </Block>
      </>
    );
  };
  const [isSelectedBrand, setSelectionBrand] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const onChangeBrandFilter = () => {
    if (showBrand === false) {
      setShowBrand(true);
    } else {
      setShowBrand(false);
    }
  };
  const renderCheckboxBrand = () => {
    return (
      <>
        <Block row style={{ margin: 15, marginTop: 25 ,borderBottomWidth:1, borderBottomColor:"#e0e0e0"}}>
          <Block flex style={{ width: "85%" }}>
            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontFamily: "kanitRegular",
              }}
            >
              แบรนด์
            </Text>
            {showBrand ? (
              <Block row>
                <CheckBox
                  value={isSelectedBrand}
                  onValueChange={setSelectionBrand}
                />
                <Text
                  style={{
                    color: "#707070",
                    fontSize: 14,
                    fontFamily: "kanitRegular",
                    margin: 5,
                  }}
                >
                  Barbie
                </Text>
              </Block>
            ) : null}
          </Block>
          <Block style={{ width: "15%" }}>
            <TouchableOpacity onPress={onChangeBrandFilter}>
              <Block
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#02db88",
                  alignSelf: "flex-end",
                }}
              >
                <Image
                  source={
                    showBrand
                      ? require("../../assets/icons/arrow_up.png")
                      : require("../../assets/icons/arrow_down.png")
                  }
                  style={{ alignSelf: "center", marginTop: 1 }}
                />
              </Block>
            </TouchableOpacity>
            {showBrand ? (
              <Text
                style={{
                  color: "#0290d6",
                  fontSize: 14,
                  fontFamily: "kanitRegular",
                  marginTop: 10,
                  textAlign: "right",
                }}
              >
                (99)
              </Text>
            ) : null}
          </Block>
        </Block>
      </>
    );
  };

  //   Range Price
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        {/* Title */}
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
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
              {"<  "}กรองสินค้า
            </Text>
          </Block>
        </TouchableOpacity>

        {/* Filter */}
        <Searchbar
          placeholder="ค้นหาคำสั่งซื้อ"
          value={objFilterSearch.SEARCH_ORDER}
          onChange={onChangeSearch}
          style={styles.search}
          inputStyle={{
            color: "#707070",
            fontSize: 15,
            fontFamily: "kanitRegular",
          }}
        />
        <DropDownPicker
          items={itemFilter}
          containerStyle={{
            height: 40,
            width: width - 23,
            alignSelf: "center"
          }}
          style={{ backgroundColor: "#f0f0f0" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#f0f0f0" }}
          labelStyle={{
            textAlign: "left",
            color: "#707070",
            fontSize: 15,
            fontFamily: "kanitRegular",
          }}
          arrowColor={"white"}
          arrowSize={18}
          arrowStyle={{
            backgroundColor: "#02d483",
            borderRadius: 20,
            color: "white",
          }}
          defaultValue={filterSearch}
          onChangeItem={onChangeFilter}
        />

        {/* Checkbox */}
        {renderCheckboxType()}
        {renderCheckboxBrand()}

        {/* Scroll Price */}
        <Block
          style={{
            margin: 15,
            marginTop: 25,
            height: 140,
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontFamily: "kanitRegular",
            }}
          >
            ราคา
          </Text>
          <Block row style={{ marginTop: 10 }}>
            <Block style={{ marginLeft: "15%" }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontFamily: "kanitRegular",
                  textAlign: "center",
                }}
              >
                {fromValue}
              </Text>
            </Block>
            <Block style={{ marginLeft: "25%" }}>
              <Text
                style={{
                  color: "#00a2ff",
                  fontSize: 15,
                  fontFamily: "kanitRegular",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </Block>
            <Block style={{ marginLeft: "25%" }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontFamily: "kanitRegular",
                  textAlign: "center",
                }}
              >
                {toValue}
              </Text>
            </Block>
          </Block>
          <RangeSlider
            min={0}
            max={20000}
            fromValueOnChange={(value) => setFromValue(value)}
            toValueOnChange={(value) => setToValue(value)}
            initialFromValue={5000}
            initialToValue={15000}
            showValueLabels={true}
            showRangeLabels={false}
            inRangeBarColor={"#00a2ff"}
            outOfRangeBarColor={"#dbdbdb"}
            styleSize={12}
          />
        </Block>

        {/* Search */}
        <Block style={{ marginBottom: 25 }}>
          <Button
            titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
            title={"ค้นหา"}
            type="solid"
            buttonStyle={styles.buttonSearch}
          />
        </Block>
        <WangdekInfo />
      </ScrollView>
    </>
  );
}

export default connect(null, ActionFilterSearch.actions)(FilterSearch);

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
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    height: width / 3, // approximate a square
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
  blockFilter: {
    height: 38,
    width: width - 25,
    alignSelf: "center",
    backgroundColor: "#f0f0f0",
  },
  buttonSearch: {
    backgroundColor: "#00c278",
    borderRadius: 25,
    width: width - 70,
    alignSelf: "center",
    marginTop: 20,
  },
});
