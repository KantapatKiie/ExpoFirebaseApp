import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Images } from "../constants/";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

function Categories(props) {
  return (
    <Block flex center>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        <Block
          flex
          style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}
        >
          <Block style={{ marginHorizontal: theme.SIZES.BASE * 2 }}>
            <Block flex right>
              <Text
                size={12}
                color={theme.COLORS.PRIMARY}
                onPress={() => props.navigation.navigate("Home")}
              >
                View All
              </Text>
            </Block>
            <Block
              row
              space="between"
              style={{ marginTop: theme.SIZES.BASE, flexWrap: "wrap" }}
            >
              {Images.Viewed.map((img, index) => (
                <Block key={`viewed-${img}`} style={styles.shadow}>
                  <Image
                    resizeMode="cover"
                    source={{ uri: img }}
                    style={styles.albumThumb}
                  />
                </Block>
              ))}
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
}

export default Categories;

const styles = StyleSheet.create({
  components: {},
  title: {
    paddingVertical: 1,
    paddingHorizontal: theme.SIZES.BASE,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 1.5,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
});
