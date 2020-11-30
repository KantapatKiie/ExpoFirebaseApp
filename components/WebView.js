import React from "react";
import { View } from "react-native";

function WebView(props) {
  const { uri } = props;
  return (
    <View>
      <WebView
        source={{
          uri: uri,
        }}
      />
    </View>
  );
}

export default WebView;
