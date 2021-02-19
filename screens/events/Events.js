import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  LogBox,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
  FlatList,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import "moment/locale/th";
import "moment/locale/en-au";
import { Block, Text, Input } from "galio-framework";
import { connect, useSelector } from "react-redux";
import * as ActionEvents from "../../actions/action-events/ActionEvents";
import WangdekInfo from "../../components/WangdekInfo";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar } from "react-native-big-calendar";
import { formatTr } from "../../i18n/I18nProvider";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, CheckBox } from "react-native-elements";
import { API_URL } from "../../config/config.app";
import { getToken } from "../../store/mock/token";
import ModalLoading from "../../components/ModalLoading";

LogBox.ignoreLogs(["Setting a timer"]);
const { width } = Dimensions.get("screen");
let token = getToken();

function Events(props) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  if (locale === "th") {
    moment.locale("th");
  } else {
    moment.locale("en-au");
  }
  const [loading, setLoading] = useState(null);
  const { objEventsHD } = useSelector((state) => ({
    objEventsHD: state.actionEvents.objEventsHD,
  }));

  useEffect(() => {
    props.clearObjEventsHD();
    onLoadActivitiesList();
    getDaysInMonth();
  }, []);

  const itemEvents = [
    {
      label: "Birthday",
      value: "1",
      hidden: true,
    },
    {
      label: "Workshop",
      value: "2",
    },
    {
      label: "Live stream",
      value: "3",
    },
  ];
  const onChangeEventsType = (item) => {
    let newObj = Object.assign({}, objEventsHD);
    newObj.TYPE_CODE = item.value;
    newObj.TYPE_NAME = item.label;
    props.setObjEventsHD(newObj);
  };

  //#region Date & Time
  //DatePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    let newObj = Object.assign({}, objEventsHD);
    if (date === null) {
      newObj.EVENT_DATE = moment(new Date()).format();
    } else {
      newObj.EVENT_DATE = moment(date).format();
    }
    props.setObjEventsHD(newObj);
    hideDatePicker();
  };
  //   Time Picker1
  const [isDatePickerVisibleTime1, setDatePickerVisibilityTime1] = useState(
    false
  );
  const showTime1Picker = () => {
    setDatePickerVisibilityTime1(true);
  };
  const hideTime1Picker = () => {
    setDatePickerVisibilityTime1(false);
  };
  const handleConfirmTime1 = (date) => {
    let newObj = Object.assign({}, objEventsHD);
    if (date === null) {
      newObj.EVENT_FIRST_TIME = moment(new Date()).format();
    } else {
      newObj.EVENT_FIRST_TIME = moment(date).format();
    }
    props.setObjEventsHD(newObj);
    hideTime1Picker();
  };

  //   Time Picker2
  const [isDatePickerVisibleTime2, setTimePickerVisibilityTime2] = useState(
    false
  );
  const showTime2Picker = () => {
    setTimePickerVisibilityTime2(true);
  };
  const hideTime2Picker = () => {
    setTimePickerVisibilityTime2(false);
  };
  const handleConfirmTime2 = (date) => {
    let newObj = Object.assign({}, objEventsHD);
    if (date === null) {
      newObj.EVENT_LAST_TIME = moment(new Date()).format();
    } else {
      newObj.EVENT_LAST_TIME = moment(date).format();
    }
    props.setObjEventsHD(newObj);
    hideTime2Picker();
  };
  //#endregion

  const onChangeEventsName = (e) => {
    let newObj = Object.assign({}, objEventsHD);
    newObj.EVENT_NAME = e;
    props.setObjEventsHD(newObj);
  };
  const onChangeEventsPeople = (e) => {
    let newObj = Object.assign({}, objEventsHD);
    newObj.PEOPLE = e;
    props.setObjEventsHD(newObj);
  };
  const onChangeEventsFirstName = (e) => {
    let newObj = Object.assign({}, objEventsHD);
    newObj.FULL_NAME = e;
    props.setObjEventsHD(newObj);
  };
  const onChangeEventsPhone = (e) => {
    let newObj = Object.assign({}, objEventsHD);
    newObj.PHONE = e;
    props.setObjEventsHD(newObj);
  };
  const onChangeEventsEmail = (e) => {
    let newObj = Object.assign({}, objEventsHD);
    newObj.EMAIL = e;
    props.setObjEventsHD(newObj);
  };

  const ListEventType = ({ item }) => {
    return (
      <Block style={styles.itemEventType}>
        <TouchableOpacity>
          <Block
            row
            style={{
              width: 140,
              backgroundColor: "#bfbfbf",
              borderRadius: 50,
              height: 30,
            }}
          >
            <Block
              style={{
                width: 25,
                height: 10,
                backgroundColor: item.color,
                borderRadius: 3,
                margin: 10,
              }}
            ></Block>
            <Text
              style={{
                fontFamily: "kanitRegular",
                fontSize: 15,
                color: "white",
                margin: 2,
                marginRight: 10,
              }}
            >
              {item.title}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };
  const [listPeriodEvent, setListPeriodEvent] = useState(null);
  const [listDays, setListDays] = useState(null);
  async function onLoadActivitiesList() {
    setLoading(true);
    await axios
      .get(API_URL.ACTIVITIES_LIST_HD_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await token),
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        let newEvents = response.data.data.filter(
          (eve) =>
            eve.operate_date ==
            moment(objEventsHD.EVENT_MONTH).format("YYYY-MM-") + 1
        );
        setListPeriodEvent(newEvents);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  }
  const getDaysInMonth = () => {
    var getDays = new Date(
      moment(objEventsHD.EVENT_MONTH).format("YYYY"),
      moment(objEventsHD.EVENT_MONTH).format("MM"),
      0
    ).getDate();
    var getDaysList = [];
    var days = 0;
    var act = false;
    for (var i = 0; i < getDays; i++) {
      days += 1;
      act = days == 1 ? true : false;
      getDaysList.push({ key: days, active: act });
    }
    setListDays(getDaysList);
  };
  const previousMonth = () => {
    let newObj = Object.assign({}, objEventsHD);
    let oldDate = objEventsHD.EVENT_MONTH;
    oldDate.setMonth(oldDate.getMonth() - 1);
    newObj.EVENT_MONTH = oldDate;

    props.setObjEventsHD(newObj);
    getDaysInMonth();
    onLoadActivitiesList();
  };
  const nextMonth = () => {
    let newObj = Object.assign({}, objEventsHD);
    let oldDate = objEventsHD.EVENT_MONTH;
    oldDate.setMonth(oldDate.getMonth() + 1);
    newObj.EVENT_MONTH = oldDate;

    props.setObjEventsHD(newObj);
    getDaysInMonth();
    onLoadActivitiesList();
  };

  const ListDateOfMonths = ({ item }) => {
    const onChageDateEvents = async (item) => {
      const newListEvents = await listDays.filter((val) => {
        val.active = false;
        if (val.key == item.key) val.active = true;
        return val;
      });
      setListDays(newListEvents);
      await axios
        .get(API_URL.ACTIVITIES_LIST_HD_API, {
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
          let newEvents = response.data.data.filter(
            (eve) =>
              eve.operate_date ==
              moment(objEventsHD.EVENT_MONTH).format("YYYY-MM-") + item.key
          );
          setListPeriodEvent(newEvents);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    return (
      <TouchableOpacity
        style={styles.itemDateEvents}
        onPress={() => onChageDateEvents(item)}
      >
        <Block
          row
          style={item.active ? styles.activeDays : styles.unActiveDays}
        >
          <Block
            style={
              item.key > 9
                ? { alignSelf: "center", marginLeft: 9 }
                : { alignSelf: "center", marginLeft: 15 }
            }
          >
            <Text style={item.active ? styles.textDays : styles.untextDays}>
              {item.key}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  };

  const onRegistrationEvents = async () => {
    await axios({
      method: "POST",
      url: API_URL.ACTIVITIES_LIST_HD_API,
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + (await token),
        "Content-Type": "application/json",
      },
      data: {
        type: objEventsHD.TYPE_CODE,
        title: objEventsHD.EVENT_NAME,

        day: moment(objEventsHD.EVENT_DATE).format("DD"),
        month: moment(objEventsHD.EVENT_DATE).format("MM"),
        year: moment(objEventsHD.EVENT_DATE).format("YYYY"),

        start_time: moment(objEventsHD.EVENT_FIRST_TIME).format("HH:mm:ss"),
        end_time: moment(objEventsHD.EVENT_LAST_TIME).format("HH:mm:ss"),

        participant: objEventsHD.PEOPLE,
        full_name: objEventsHD.FULL_NAME,
        telephone: objEventsHD.PHONE,
        email: objEventsHD.EMAIL,
      },
    })
      .then(function (response) {
        ToastAndroid.show(response.data.data, ToastAndroid.SHORT);
      })
      .catch(function (error) {
        console.log(error);
        ToastAndroid.show(error.response.data.data, ToastAndroid.SHORT);
      });
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={EVENTS_LIST}
          renderSectionHeader={() => (
            <>
              {/* Title */}
              <LinearGradient
                colors={["#00cef2", "#00c4b7", "#00d184"]}
                style={linerStyle.linearGradient}
              >
                <Block style={styles.blockTitle1}>
                  <Text style={styles.fontTitle}>ปฏิทินกิจกรรม</Text>
                </Block>
                <Block row style={styles.blockTitle2}>
                  <Block row style={{ width: "80%" }}>
                    <Text style={styles.fontTitle}>
                      เดือน{moment(objEventsHD.EVENT_MONTH).format("MMMM")}
                    </Text>
                    <Text style={styles.fontTitle}>
                      {parseInt(
                        moment(objEventsHD.EVENT_MONTH).format("YYYY")
                      ) + 543}
                    </Text>
                  </Block>
                  <TouchableOpacity onPress={previousMonth}>
                    <Image
                      source={require("../../assets/icons/arrow_left.png")}
                      style={{ marginTop: 20 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={nextMonth}>
                    <Image
                      source={require("../../assets/icons/arrow_right.png")}
                      style={{ marginTop: 20 }}
                    />
                  </TouchableOpacity>
                </Block>
              </LinearGradient>

              {/* Type Event */}
              <Block style={styles.containerEventType}>
                <FlatList
                  horizontal={true}
                  data={EVENTS_TYPE[0].data}
                  renderItem={({ item }) => <ListEventType item={item} />}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              </Block>

              {/* Time Events */}
              <FlatList
                horizontal={true}
                data={listDays}
                renderItem={({ item }) => <ListDateOfMonths item={item} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.key.toString()}
                listKey={(item) => item.key}
              />
              {/* Time Period */}
              <Block style={{ backgroundColor: "white" }}>
                {listPeriodEvent ? (
                  <>
                    {listPeriodEvent.map((item) => (
                      <Block
                        style={{
                          backgroundColor:
                            item.type == 3
                              ? "#ff6600"
                              : item.type == 1
                              ? "#ff5cad"
                              : "#ffa600",
                          width: width - 20,
                          height: 50,
                          margin: 10,
                          borderRadius: 5,
                        }}
                        key={item.title}
                      >
                        <Text style={styles.fontTimeEvents}>
                          {item.start_time + " - " + item.end_time}
                        </Text>
                      </Block>
                    ))}
                  </>
                ) : null}
              </Block>

              {/* Register Events */}
              <Block style={styles.blockRegisterBG}>
                {/* Block1 */}
                <Block>
                  <Block style={styles.blockTitle1}>
                    <Text style={styles.fontTitle2}>ลงทะเบียนจองพื้นที่</Text>
                  </Block>
                  <Block>
                    <Text style={styles.fontDescription}>
                      เลือกประเภทกิจกจจรม :
                    </Text>
                    <DropDownPicker
                      items={itemEvents}
                      containerStyle={{
                        height: 35,
                        width: width - 40,
                        alignSelf: "center",
                        marginTop: 7,
                      }}
                      style={{ backgroundColor: "#f0f0f0" }}
                      itemStyle={{
                        justifyContent: "flex-start",
                      }}
                      dropDownStyle={{ backgroundColor: "#f0f0f0" }}
                      placeholderStyle={{
                        textAlign: "left",
                        color: "gray",
                        fontFamily: "kanitRegular",
                      }}
                      placeholder={"- โปรดเลือก -"}
                      labelStyle={{
                        textAlign: "left",
                        color: "#000",
                        fontFamily: "kanitRegular",
                      }}
                      arrowColor={"white"}
                      arrowSize={18}
                      arrowStyle={{
                        backgroundColor: "#02d483",
                        borderRadius: 20,
                        color: "white",
                      }}
                      onChangeItem={onChangeEventsType}
                    />
                  </Block>
                  <Block>
                    <Text style={styles.fontDescription}>ชื่องานกิจกรรม :</Text>
                    <Block style={styles.inputView}>
                      <TextInput
                        style={styles.inputText}
                        placeholder={"ชื่องาน.."}
                        placeholderTextColor="#808080"
                        value={objEventsHD.EVENT_NAME}
                        onChangeText={onChangeEventsName}
                      />
                    </Block>
                  </Block>
                  <Block>
                    <Text style={styles.fontDescription}>วันที่กิจกรรม :</Text>
                    <Input
                      right
                      color="black"
                      style={styles.DateTime1}
                      value={moment(objEventsHD.EVENT_DATE).format(
                        "DD/MM/YYYY"
                      )}
                      iconContent={
                        <TouchableOpacity onPress={showDatePicker}>
                          <Icons
                            name="calendar-range"
                            size={20}
                            color="#02d483"
                          />
                        </TouchableOpacity>
                      }
                    />
                  </Block>
                  {/* Time */}
                  <Block row>
                    <Block>
                      <Text style={styles.fontDescription}>ตั้งแต่เวลา :</Text>
                      <Input
                        right
                        color="black"
                        style={styles.DateTime2}
                        value={moment(objEventsHD.EVENT_FIRST_TIME).format(
                          "HH:mm"
                        )}
                        iconContent={
                          <TouchableOpacity onPress={showTime1Picker}>
                            <Icons name="clock" size={20} color="#02d483" />
                          </TouchableOpacity>
                        }
                      />
                    </Block>
                    <Block>
                      <Text style={styles.fontDescription}>ถึงเวลา :</Text>
                      <Input
                        right
                        color="black"
                        style={styles.DateTime2}
                        value={moment(objEventsHD.EVENT_LAST_TIME).format(
                          "HH:mm"
                        )}
                        iconContent={
                          <TouchableOpacity onPress={showTime2Picker}>
                            <Icons name="clock" size={20} color="#02d483" />
                          </TouchableOpacity>
                        }
                      />
                    </Block>
                  </Block>
                  <Block>
                    <Text style={styles.fontDescription}>
                      จำนวนผู้เข้าร่วม :
                    </Text>
                    <Block style={styles.inputView}>
                      <TextInput
                        style={styles.inputText}
                        value={objEventsHD.PEOPLE}
                        onChangeText={onChangeEventsPeople}
                        keyboardType="numeric"
                      />
                    </Block>
                  </Block>
                </Block>

                <Block style={styles.block1Ends} />
                {/* Block2 */}
                <Block>
                  <Block style={styles.blockTitle2Ends}>
                    <Text style={styles.fontTitle2}>ข้อมูลผู้จอง</Text>
                  </Block>
                  <Block>
                    <Text style={styles.fontDescription}>ชื่อ-นามสกุล :</Text>
                    <Block style={styles.inputView}>
                      <TextInput
                        style={styles.inputText}
                        placeholder={"ชื่อ.."}
                        placeholderTextColor="#808080"
                        value={objEventsHD.FULL_NAME}
                        onChangeText={onChangeEventsFirstName}
                        keyboardType={"default"}
                      />
                    </Block>
                  </Block>
                  <Block>
                    <Text style={styles.fontDescription}>เบอร์ติดต่อ :</Text>
                    <Block style={styles.inputView}>
                      <TextInput
                        style={styles.inputText}
                        placeholder={"เบอร์โทร.."}
                        placeholderTextColor="#808080"
                        value={objEventsHD.PHONE}
                        onChangeText={onChangeEventsPhone}
                        keyboardType="phone-pad"
                      />
                    </Block>
                  </Block>
                  <Block>
                    <Text style={styles.fontDescription}>อีเมล :</Text>
                    <Block style={styles.inputView}>
                      <TextInput
                        style={styles.inputText}
                        placeholder={"อีเมล.."}
                        placeholderTextColor="#808080"
                        value={objEventsHD.EMAIL}
                        onChangeText={onChangeEventsEmail}
                        keyboardType="email-address"
                      />
                    </Block>
                  </Block>
                </Block>

                {/* Button */}
                <Block>
                  <Button
                    titleStyle={{
                      color: "white",
                      fontFamily: "kanitRegular",
                    }}
                    title={"ลงทะเบียน"}
                    type="solid"
                    buttonStyle={styles.buttonStyle1}
                    containerStyle={{ margin: 40 }}
                    onPress={onRegistrationEvents}
                  />
                </Block>
              </Block>
            </>
          )}
          renderSectionFooter={() => <>{<WangdekInfo />}</>}
          renderItem={() => {
            return null;
          }}
        />
      </SafeAreaView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisibleTime1}
        mode="time"
        onConfirm={handleConfirmTime1}
        onCancel={hideTime1Picker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisibleTime2}
        mode="time"
        onConfirm={handleConfirmTime2}
        onCancel={hideTime2Picker}
      />

      <ModalLoading loading={loading} />
    </>
  );
}

export default connect(null, ActionEvents.actions)(Events);

const styles = StyleSheet.create({
  containerEventType: {
    backgroundColor: "white",
    height: 50,
    padding: 0,
  },
  itemEventType: {
    margin: 10,
    height: 100,
  },
  itemDateEvents: {
    margin: 10,
    height: 45,
  },
  blockTitle1: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
    height: 75,
    width: "95%",
    alignSelf: "center",
  },
  blockTitle2Ends: {
    height: 45,
    width: "95%",
    alignSelf: "center",
  },
  blockTitle2: {
    height: 75,
    width: "95%",
    alignSelf: "center",
  },
  activeDays: {
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: "#17d18a",
  },
  unActiveDays: {
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: "white",
  },
  textDays: {
    fontFamily: "kanitBold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  untextDays: {
    fontFamily: "kanitBold",
    fontSize: 24,
    color: "#17d18a",
    textAlign: "center",
  },
  fontTimeEvents: {
    fontFamily: "kanitRegular",
    fontSize: 20,
    color: "white",
    marginTop: 10,
    marginLeft: 20,
  },
  fontTitle: {
    fontFamily: "kanitRegular",
    color: "white",
    fontSize: 25,
    marginTop: 18,
    marginLeft: 5,
  },
  fontTitle2: {
    fontFamily: "kanitRegular",
    color: "white",
    fontSize: 22,
    marginTop: 20,
    marginLeft: 8,
  },
  fontDescription: {
    fontFamily: "kanitRegular",
    color: "white",
    fontSize: 16,
    marginTop: 18,
    marginLeft: 18,
    marginBottom: 5,
  },
  fontIconTitle: {
    fontFamily: "kanitRegular",
    color: "white",
    fontSize: 25,
    marginTop: 18,
    marginLeft: 5,
  },
  blockRegisterBG: {
    backgroundColor: "#9864d0",
  },
  inputView: {
    width: "90%",
    backgroundColor: "#f0f0f0",
    height: 20,
    justifyContent: "center",
    alignSelf: "center",
    padding: 15,
    borderWidth: 1.2,
    borderColor: "#e0e0e0",
  },
  inputText: {
    height: 30,
    color: "black",
    fontSize: 14,
    fontFamily: "kanitRegular",
  },
  buttonStyle1: {
    backgroundColor: "#0be390",
    borderRadius: 20,
    width: 170,
    alignSelf: "center",
  },
  block1Ends: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
    height: 40,
    width: "95%",
    alignSelf: "center",
  },
  DateTime1: {
    height: 35,
    width: width - 38,
    borderRadius: 0,
    alignSelf: "center",
  },
  DateTime2: {
    height: 35,
    width: 166,
    borderRadius: 0,
    alignSelf: "center",
    marginLeft: 20,
  },
});

//Header Calendar
const linerStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    justifyContent: "flex-start",
    height: 150,
  },
  BlockTime: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginBottom: 5,
    marginRight: 10,
  },
});

const EVENTS_TYPE = [
  {
    title: "Event Type",
    horizontal: true,
    data: [
      {
        key: "1",
        title: "Birthday",
        color: "#ff5cad",
      },
      {
        key: "2",
        title: "Workshop",
        color: "#ffa600",
      },
      {
        key: "3",
        title: "Live stream",
        color: "#ff6600",
      },
    ],
  },
];

const EVENTS_LIST = [
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
