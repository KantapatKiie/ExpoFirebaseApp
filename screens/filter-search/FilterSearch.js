import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
  Dimensions,
  FlatList,
  Platform,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";
import { actions as ActionFilterSearch } from "../../actions/action-filter-search/ActionFilterSearch.js";
import { actions as ActionProductType } from "../../actions/action-product-type/ActionProductType";
import { Block, Text } from "galio-framework";
import { formatTr } from "../../i18n/I18nProvider";
import WangdekInfo from "../../components/WangdekInfo";
import { Button } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import RangeSlider from "react-native-range-slider-expo";
import ModalLoading from "../../components/ModalLoading";
import Checkboxs from "react-native-modest-checkbox";

const { width } = Dimensions.get("window");
let token = getToken();

function FilterSearch(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const [loading, setLoading] = useState(null);
  const { objFilterSearch } = useSelector((state) => ({
    objFilterSearch: state.actionFilterSearch.objFilterSearch,
  }));
  const { objProductType } = useSelector((state) => ({
    objProductType: state.actionProductType.objProductType,
  }));

  useEffect(() => {
    getProductType();
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

  // CheckedTypes
  const [showType, setShowType] = useState(false);
  const [listProductType, setListProductType] = useState(null);
  const [listProductBrands, setListProductBrands] = useState(null);
  async function getProductType() {
    await axios({
      method: "GET",
      url: API_URL.CATEGORY_PRODUCT_LISTVIEW_API,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate",
      },
    })
      .then(async (resType) => {
        let newlstType = await resType.data.data;
        setListProductType(newlstType);

        await axios({
          method: "GET",
          url: API_URL.BRANDS_PRODUCT_LISTVIEW_API,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Connection: "keep-alive",
          },
        }).then(async (resBrands) => {
          let newlstBrands = await resBrands.data.data;
          setListProductBrands(newlstBrands);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const onShowTypeFilter = () => {
    if (showType === false) {
      setShowType(true);
    } else {
      setShowType(false);
    }
  };
  const renderCheckboxType = ({ item }) => {
    const onCheckItemType = (item) => {
      let oldlst = listProductType.filter((key) => key.id != item.id);
      let newlst = listProductType.filter((key) => key.id == item.id);

      if (newlst[0].image !== "") {
        newlst[0].image = "";
      } else {
        newlst[0].image = "ImageMockup";
      }
      let newStateObj = newlst.concat(oldlst).sort(function (a, b) {
        return a.id - b.id;
      });

      setListProductType(newStateObj);
    };
    return (
      <Block row style={{ marginTop: 10 }} key={item.id}>
        <Block style={{ width: "82%" }}>
          <Checkboxs
            checked={item.image == "" ? true : false}
            onChange={() => onCheckItemType(item)}
            label={locale == "th" ? item.name_th : item.name_en}
            labelStyle={{
              color: "#707070",
              fontSize: 14,
              fontFamily: "kanitRegular",
              margin: 5,
            }}
            checkboxStyle={{ width: 28, height: 28}}
          />
        </Block>
        <Block style={{ width: "22%" }}>
          <Text
            style={{
              color: "#0290d6",
              fontSize: 14,
              fontFamily: "kanitRegular",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            {item.stocks}
          </Text>
        </Block>
      </Block>
    );
  };
  // Checked Brands
  const [showBrand, setShowBrand] = useState(false);
  const onShowBrandFilter = () => {
    if (showBrand === false) {
      setShowBrand(true);
    } else {
      setShowBrand(false);
    }
  };
  const renderCheckboxBrand = ({ item }) => {
    const onCheckItemBrands = (item) => {
      let oldlst = listProductBrands.filter((key) => key.id != item.id);
      let newlst = listProductBrands.filter((key) => key.id == item.id);

      if (newlst[0].image !== "") {
        newlst[0].image = "";
      } else {
        newlst[0].image = "ImageMockup";
      }
      let newStateObj = newlst.concat(oldlst).sort(function (a, b) {
        return a.id - b.id;
      });

      setListProductBrands(newStateObj);
    };
    return (
      <Block row style={{ marginTop: 10 }} key={item.id}>
        <Block style={{ width: "82%" }}>
          <Checkboxs
            checked={item.image == "" ? true : false}
            onChange={() => onCheckItemBrands(item)}
            label={locale == "th" ? item.name_th : item.name_en}
            labelStyle={{
              color: "#707070",
              fontSize: 14,
              fontFamily: "kanitRegular",
              margin: 5,
            }}
            checkboxStyle={{ width: 28, height: 28 }}
          />
        </Block>
        <Block style={{ width: "22%" }}>
          <Text
            style={{
              color: "#0290d6",
              fontSize: 14,
              fontFamily: "kanitRegular",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            {item.stocks}
          </Text>
        </Block>
      </Block>
    );
  };

  // Range Price
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  async function onSearchProductFilter() {
    let newListTypes = listProductType.reduce(
      (a, b) => (b.image !== "" && a.push(b.id), a),
      []
    );
    let newListBrands = listProductBrands.reduce(
      (a, b) => (b.image !== "" && a.push(b.id), a),
      []
    );
    setLoading(true);
    await axios({
      method: "POST",
      url: API_URL.PRODUCT_FILTHER_SEARCH_HD_API,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        page: "1",
        keyword: objFilterSearch.SEARCH_ORDER,
        category_selected: newListTypes,
        brand_selected: newListBrands,
        min_price: fromValue,
        max_price: toValue.toString(),
        sort: 1,
      },
    })
      .then(function (response) {
        setLoading(false);
        let newObj = Object.assign({}, objProductType);
        newObj.TABS_TYPE = true;
        newObj.ITEM_NAME = "";
        props.setObjProductType(newObj);
        props.setListTrProductType(response.data.data);
        props.navigation.navigate("Product Type");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
    setLoading(false);
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={FILTER_LIST}
          renderSectionHeader={() => (
            <>
              {/* Title */}
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Flash Sale")}
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
                    {"<  "}กรองสินค้า
                  </Text>
                </Block>
              </TouchableOpacity>

              {/* Search & Filter */}
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
                  height: Platform.OS === "android" ? 40 : 50,
                  width: width - 23,
                  alignSelf: "center",
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
                  borderRadius: 18,
                  color: "white",
                }}
                defaultValue={filterSearch}
                onChangeItem={onChangeFilter}
              />

              {/* Checkbox Type */}
              <Block
                style={{
                  margin: 15,
                  marginTop: 25,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e0e0e0",
                }}
              >
                <Block row>
                  <Block style={{ width: "85%" }}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 18,
                        fontFamily: "kanitRegular",
                      }}
                    >
                      ประเภทสินค้า
                    </Text>
                  </Block>
                  <TouchableOpacity
                    onPress={onShowTypeFilter}
                    style={{ width: "13.2%", marginTop: 2 }}
                  >
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
                </Block>
                {showType ? (
                  <FlatList
                    data={listProductType}
                    renderItem={renderCheckboxType}
                    numColumns={1}
                    keyExtractor={(item) => item.id.toString()}
                    listKey={(item) => item.id}
                  />
                ) : null}
              </Block>

              {/* Checkbox Brands */}
              <Block
                style={{
                  margin: 15,
                  marginTop: 25,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e0e0e0",
                }}
              >
                <Block row>
                  <Block style={{ width: "85%" }}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 18,
                        fontFamily: "kanitRegular",
                      }}
                    >
                      แบรนด์
                    </Text>
                  </Block>
                  <TouchableOpacity
                    onPress={onShowBrandFilter}
                    style={{ width: "13.2%", marginTop: 2 }}
                  >
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
                </Block>
                {showBrand ? (
                  <FlatList
                    data={listProductBrands}
                    renderItem={renderCheckboxBrand}
                    numColumns={1}
                    keyExtractor={(item) => item.id.toString()}
                    listKey={(item) => item.id}
                  />
                ) : null}
              </Block>

              {/* Price */}
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
                  max={5000}
                  fromValueOnChange={(value) => setFromValue(value)}
                  toValueOnChange={(value) => setToValue(value)}
                  initialFromValue={500}
                  initialToValue={4500}
                  showValueLabels={true}
                  showRangeLabels={false}
                  inRangeBarColor={"#00a2ff"}
                  outOfRangeBarColor={"#dbdbdb"}
                  styleSize={17}
                />
              </Block>

              {/* Search */}
              <Block style={{ marginBottom: 25 }}>
                <Button
                  titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
                  title={"ค้นหา"}
                  type="solid"
                  buttonStyle={styles.buttonSearch}
                  onPress={onSearchProductFilter}
                />
              </Block>
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

const mapActions = {
  setObjFilterSearch: ActionFilterSearch.setObjFilterSearch,
  clearObjFilterSearch: ActionFilterSearch.clearObjFilterSearch,

  setObjProductType: ActionProductType.setObjProductType,
  clearObjProductType: ActionProductType.clearObjProductType,
  setListTrProductType: ActionProductType.setListTrProductType,
  pushListTrProductType: ActionProductType.pushListTrProductType,
};

export default connect(null, mapActions)(FilterSearch);

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

const FILTER_LIST = [
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
