import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { withNavigation } from "@react-navigation/compat";

function DialogProcess(props) {
  const { loading, success } = props;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (loading) {
        setTimeout(() => { setModalVisible(true); }, 400);
    }
    return () => {
      setTimeout(() => {
        setModalVisible(false);
      }, 400);
    };
  }, [loading]);

  return (
    <Modal visible={modalVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#00000020",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={styles.progressHeader}>Loading...</Text>
          <ActivityIndicator size="large" color="#f35588" />
        </View>
        <TouchableHighlight
          style={{ backgroundColor: "#2196F3" }}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text style={styles.textStyle}>Close</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
}

export default withNavigation(DialogProcess);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
});
