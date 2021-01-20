import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
  FlatList,
} from "react-native";
import moment from "moment";
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

const { height, width } = Dimensions.get("screen");

moment.locale("uk");
function Events(props) {
  const { objEventsHD } = useSelector((state) => ({
    objEventsHD: state.actionEvents.objEventsHD,
  }));
  const locale = useSelector(({ i18n }) => i18n.lang);

  useEffect(() => {
    props.clearObjEventsHD();
    if (locale === "th") {
      moment.locale("th");
    } else {
      moment.locale("en-au");
    }
  }, []);

  const [typeEvents, setTypeEvents] = useState([
    {
      label: objEventsHD.TYPE_NAME,
      value: objEventsHD.TYPE_CODE,
    },
  ]);
  const onChangeEventsType = () => {};

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
      newObj.EVENT_DATE = moment(date).format("DD/MM/YYYY");
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
      newObj.EVENT_FIRST_TIME = moment(date).format("HH:mm");
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
      newObj.EVENT_LAST_TIME = moment(date).format("HH:mm");
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
    newObj.FIRST_NAME = e;
    props.setObjEventsHD(newObj);
  };
  const onChangeEventsLastName = (e) => {
    let newObj = Object.assign({}, objEventsHD);
    newObj.LAST_NAME = e;
    props.setObjEventsHD(newObj);
  };
  const onChangeEventsEmail = (e) => {
    let newObj = Object.assign({}, objEventsHD);
    newObj.EMAIL = e;
    props.setObjEventsHD(newObj);
  };

  const previousMonth = () => {
    let newObj = Object.assign({}, objEventsHD);
    let oldDate = objEventsHD.EVENT_MONTH;
    oldDate.setMonth(oldDate.getMonth() - 1);
    newObj.EVENT_MONTH = oldDate;

    props.setObjEventsHD(newObj);
  };
  const nextMonth = () => {
    let newObj = Object.assign({}, objEventsHD);
    let oldDate = objEventsHD.EVENT_MONTH;
    oldDate.setMonth(oldDate.getMonth() + 1);
    newObj.EVENT_MONTH = oldDate;

    props.setObjEventsHD(newObj);
  };

  const ListEventType = ({ item }) => {
    return (
      <Block style={styles.itemEventType}>
        <TouchableOpacity>
            <Block row style={{width: 140, backgroundColor:"#bfbfbf", borderRadius:50, height:30}}>
                <Block style={{width:25, height:10, backgroundColor:item.color,borderRadius:3,margin:10}}>
                
                    
                </Block>
                <Text style={{fontFamily:"kanitRegular", fontSize:15, color:"white",margin:2, marginRight:10}}>{item.title}</Text>


            </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  const [viewEvents, setViewEvents] = useState(false);
  const events = [
    {
      title: "Meeting",
      start: new Date(2021, 0, 20, 10, 0, 0),
      end: new Date(2021, 0, 20, 12, 30, 0),
    },
    {
      title: "Coffe Time",
      start: new Date(2021, 0, 20, 11, 30, 0),
      end: new Date(2021, 0, 20, 12, 30, 0),
    },
    {
      title: "Tea Time",
      start: new Date(2021, 0, 21, 11, 15, 0),
      end: new Date(2021, 0, 21, 12, 30, 0),
    },
  ];
  console.log(events);
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={!viewEvents}
      >
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
                {parseInt(moment(objEventsHD.EVENT_MONTH).format("YYYY")) + 543}
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
        <Block>
          <Block style={styles.containerEventType}>
            <SafeAreaView style={{ flex: 1 }}>
              <SectionList
                contentContainerStyle={{
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                }}
                stickySectionHeadersEnabled={false}
                sections={EVENTS_TYPE}
                scrollEnabled={false}
                renderSectionHeader={({ section }) => (
                  <>
                    {section.horizontal ? (
                      <>
                        <FlatList
                          horizontal
                          data={section.data}
                          renderItem={({ item }) => (
                            <ListEventType item={item} />
                          )}
                          showsHorizontalScrollIndicator={false}
                          showsVerticalScrollIndicator={false}
                        />
                      </>
                    ) : null}
                  </>
                )}
                renderItem={({ item, section }) => {
                  if (section.horizontal) {
                    return null;
                  }
                  return <ListItem item={item} />;
                }}
              />
            </SafeAreaView>
          </Block>
        </Block>

        {/* Time Events */}
        <Block row style={{ backgroundColor: "#9864d0" }}>
          <CheckBox
            containerStyle={{ margin: 5 }}
            checked={viewEvents}
            onPress={() => setViewEvents(!viewEvents)}
            checkedColor="#71D58E"
          />
          <Text
            style={{
              fontFamily: "kanitRegular",
              color: "white",
              fontSize: 15,
              marginTop: 16,
            }}
          >
            Lock Calendar
          </Text>
        </Block>
        <Block>
          <Calendar
            events={events}
            height={400}
            style={{ color: "black" }}
            mode="3days"
            showTime={true}
            // eventCellStyle={{backgroundColor:events[0].color}}
            style={{fontFamily:"kanitRegular"}}
          />
        </Block>

        {/* Block Register */}
        <Block style={styles.blockRegisterBG}>
          {/* Block1 */}
          <Block>
            <Block style={styles.blockTitle1}>
              <Text style={styles.fontTitle2}>ลงทะเบียนจองพื้นที่</Text>
            </Block>
            <Block>
              <Text style={styles.fontDescription}>เลือกประเภทกินกจจรม :</Text>
              <DropDownPicker
                items={typeEvents}
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
                value={objEventsHD.EVENT_DATE}
                iconContent={
                  <TouchableOpacity onPress={showDatePicker}>
                    <Icons name="calendar-range" size={20} color="#02d483" />
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
                  value={objEventsHD.EVENT_FIRST_TIME}
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
                  value={objEventsHD.EVENT_LAST_TIME}
                  iconContent={
                    <TouchableOpacity onPress={showTime2Picker}>
                      <Icons name="clock" size={20} color="#02d483" />
                    </TouchableOpacity>
                  }
                />
              </Block>
            </Block>
            <Block>
              <Text style={styles.fontDescription}>จำนวนผู้เข้าร่วม :</Text>
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
                  value={objEventsHD.FIRST_NAME}
                  onChangeText={onChangeEventsFirstName}
                />
              </Block>
            </Block>
            <Block>
              <Text style={styles.fontDescription}>เบอร์ติดต่อ :</Text>
              <Block style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder={"นามสกุล.."}
                  placeholderTextColor="#808080"
                  value={objEventsHD.LAST_NAME}
                  onChangeText={onChangeEventsLastName}
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
              titleStyle={{ color: "white", fontFamily: "kanitRegular" }}
              title={"ลงทะเบียน"}
              type="solid"
              buttonStyle={styles.buttonStyle1}
              containerStyle={{ margin: 40 }}
              onPress={() => props.navigation.navigate("Order Screen")}
            />
          </Block>
        </Block>

        <WangdekInfo />
      </ScrollView>

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
        title: "งานวันเกิด",
        color: "pink"
      },
      {
        key: "2",
        title: "Worrkshop",
        color: "orange"
      },
      {
        key: "3",
        title: "Worrkshop",
        color: "green"
      },
      {
        key: "4",
        title: "Worrkshop",
        color: "red"
      },
      {
        key: "5",
        title: "Worrkshop",
        color: "yellow"
      },

    ],
  },
];
