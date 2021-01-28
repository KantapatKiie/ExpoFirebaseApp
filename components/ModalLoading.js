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
      style={{height: 300, width: 300}}
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
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    // backgroundColor: '#FFFFFF',
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