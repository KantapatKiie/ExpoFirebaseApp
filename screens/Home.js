import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  SectionList,
  SafeAreaView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { Icon, Product } from "../components/";
import products from "../constants/products";

const { width } = Dimensions.get("screen");
export default class Home extends React.Component {
  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="zoom-in"
        family="material"
      />
    );

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        //onFocus={() => navigation.navigate("Pro")}
      />
    );
  };

  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate("")}
        >
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>
              Categories
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate("")}
        >
          <Block row middle>
            <Icon
              size={16}
              name="camera-18"
              family="GalioExtra"
              style={{ paddingRight: 8 }}
            />
            <Text size={16} style={styles.tabTitle}>
              Best Products
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  //Package List
  rederPackage = () => {
    const ListItem = ({ item }) => {
      return (
        <View style={styles2.item}>
          <Image
            source={{
              uri: item.uri,
            }}
            style={styles2.itemPhoto}
            resizeMode="cover"
          />
          <Text style={styles2.itemText}>{item.text}</Text>
        </View>
      );
    };
    return (
      <>
        <View style={styles2.container}>
          <StatusBar style="light" />
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              contentContainerStyle={{ paddingHorizontal: 10 }}
              stickySectionHeadersEnabled={false}
              sections={SECTIONS}
              renderSectionHeader={({ section }) => (
                <Text style={styles2.sectionHeader}>{section.title}</Text>
              )}
              renderItem={({ item }) => {
                return <ListItem item={item} />;
              }}
            />
          </SafeAreaView>
        </View>
      </>
    );
  };

  renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Block flex>
          {products.map((item) => (
            <Block flex row key={item.title}>
              <Product product={item} />
            </Block>
          ))}
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <>
        {/* {this.rederPackage()} */}
        <Block flex center style={styles.home}>
          {this.renderProducts()}
        </Block>
      </>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 1.5,
    paddingVertical: theme.SIZES.BASE * 1.5,
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#121212",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#f4f4f4",
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
  },
});

const SECTIONS = [
  {
    title: "Made for you",
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/10/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1002/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1006/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1008/200",
      },
    ],
  },
];

//#region Backup ProducView
{
  /* <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.products}
>
  <Block flex>
    <Product product={products[0]} horizontal />
    <Block flex row>
      <Product
        product={products[1]}
        style={{ marginRight: theme.SIZES.BASE }}
      />
      <Product product={products[2]} />
    </Block>
    <Product product={products[3]} horizontal />
    <Product product={products[4]} full />
  </Block>
</ScrollView>; */
}
//#endregion
