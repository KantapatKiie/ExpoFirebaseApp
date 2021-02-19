import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';

const { height, width } = Dimensions.get("window");

function ModalLoading (props){
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={"fade"}
      visible={loading}
      style={{height: height, width: width}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            color="white"
            size={50}
          />
          <Text style={styles.textLoding}>Loading . . .</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    height: height,
    width:width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    height: 120,
    width: 120,
    borderRadius: 12,
    justifyContent: "center",
  },
  textLoding: {
    fontSize: 22,
    color: "white",
    alignSelf: "center",
    fontFamily: "kanitRegular",
    marginTop: 5,
  },
});

export default ModalLoading;