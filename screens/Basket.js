import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Modal,
  ToastAndroid,
} from "react-native";
import { Block, Input, theme } from "galio-framework";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect, useSelector } from "react-redux";
import * as ActionSearchHD from "../actions/action-search-hd/ActionSearchHD";
import { Button } from "react-native-elements";
import { Product } from "../components/";
import products from "../constants/products";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import Toast from 'react-native-toast-message';
import { formatTr } from "../i18n/I18nProvider";

const { height, width } = Dimensions.get("screen");

function Basket(props) {
  const { objSearchHD, listTrSearchHD, disabledInput } = useSelector(
    (state) => ({
      objSearchHD: state.actionSearchHD.objSearchHD,
      listTrSearchHD: state.actionSearchHD.listTrSearchHD,
      disabledInput: state.actionSearchHD.disabledInput,
    })
  );

  //DatePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    let newObj = Object.assign({}, objSearchHD);
    if (date === null) {
      newObj.SEARCH_DATE = moment(new Date()).format();
    } else {
      newObj.SEARCH_DATE = moment(date).format("DD/MM/YYYY");
    }
    props.setObjSearchHD(newObj);
    hideDatePicker();
  };

  useEffect(() => {
    props.clearObjSearchHD();
    setObjSearch({
      PLACE_NO: "",
    });
    return () => props.clearObjSearchHD();
  }, []);

  const [objSearch, setObjSearch] = useState({
    PLACE_NO: "",
  });

  const onChangeText = (e) => {
    let newObj = Object.assign({}, objSearch);
    newObj.PLACE_NO = e.nativeEvent.text;
    setObjSearch(newObj);
  };
  const handleClearObj = () => {
    setObjSearch("");
  };
  const onChangeValue = (e) => {
    let newObj = Object.assign({}, objSearchHD);
    newObj.SEARCH_NAME = e.nativeEvent.text;
    props.setObjSearchHD(newObj);
  };

  //#region Modal
  const [modalVisible, setModalVisible] = useState(false);
  const modalHeader = (
    <View style={styles2.modalHeader}>
      <Text style={styles2.title}>Close Your Modal</Text>
      <View style={styles2.divider}></View>
    </View>
  );
  const modalBody = (
    <View style={styles2.modalBody}>
      <Text style={styles2.bodyText}>
        Are you sure you want to close modal ?
      </Text>
    </View>
  );
  const modalFooter = (
    <View style={styles2.modalFooter}>
      <View style={styles2.divider}></View>
      <View style={{ flexDirection: "row-reverse", margin: 10 }}>
        <TouchableOpacity
          style={{ ...styles2.actions, backgroundColor: "#ed6868" }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles2.actionText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles2.actions, backgroundColor: "#54bf6d" }}
        >
          <Text style={styles2.actionText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const modalContainer = (
    <View style={styles2.modalContainer}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </View>
  );
  const modal = (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles2.modal}>
        <View>{modalContainer}</View>
      </View>
    </Modal>
  );
  //#endregion

  const showToast = () => {
    ToastAndroid.show("Test ToastAndriod React Native !", ToastAndroid.SHORT);
  };

  return (
    <>
      <View>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}
        >
          <Block style={styles.blockStyle}></Block>
          <Block>
            <Input
              right
              color="black"
              style={styles.search}
              placeholder="Text..."
              onChange={onChangeText}
              value={objSearch.PLACE_NO}
              iconContent={
                <TouchableOpacity onPress={handleClearObj}>
                  <Icons name="close" size={20} color="black" />
                </TouchableOpacity>
              }
            />
          </Block>
          <Block>
            <Input
              right
              color="black"
              style={styles.search}
              value={objSearchHD.SEARCH_NAME}
              onChange={onChangeValue}
              iconContent={
                <TouchableOpacity onPress={() => props.clearObjSearchHD()}>
                  <Icons name="biathlon" size={20} color="black" />
                </TouchableOpacity>
              }
            />
          </Block>
          <Block>
            <Input
              right
              color="black"
              style={styles.search}
              value={objSearchHD.SEARCH_DATE}
              iconContent={
                <TouchableOpacity onPress={showDatePicker}>
                  <Icons name="calendar-range" size={20} color="black" />
                </TouchableOpacity>
              }
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </Block>
          <Block>
            <Button
              titleStyle={{ color: "white" }}
              title={formatTr("VIEW_ALL").toString()}
              type="solid"
              containerStyle={styles.blockStyle}
              onPress={() => {
                setModalVisible(true);
              }}
              buttonStyle={styles.btnStyle}
            />
          </Block>
          <Block>
            <Button
              titleStyle={{ color: "white" }}
              title="Snackbar"
              type="solid"
              containerStyle={styles.blockStyle}
              buttonStyle={styles.btnStyle}
              onPress={() => showToast()}
            />
          </Block>
          {/* Image Products */}
          <Block flex style={styles2.bloxStyle}>
            <Product product={products[5]} horizontal />
            <Block flex row>
              <Product
                product={products[6]}
                style={{ marginRight: theme.SIZES.BASE }}
              />
              <Product product={products[7]} />
            </Block>
            <Block flex row>
              <Product
                product={products[8]}
                style={{ marginRight: theme.SIZES.BASE }}
              />
              <Product product={products[9]} />
            </Block>
          </Block>
        </ScrollView>
      </View>
      {modal}
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </>
  );
}

export default connect(null, ActionSearchHD.actions)(Basket);

const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
  btnStyle: {
    backgroundColor: "#36467a",
    borderRadius: 12,
    width: width - 48,
    alignSelf: "center",
  },
  blockStyle: {
    padding: 10,
  },
  search: {
    height: 40,
    width: width - 48,
    alignSelf: "center",
    borderWidth: 1.5,
    borderRadius: 5,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});

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
