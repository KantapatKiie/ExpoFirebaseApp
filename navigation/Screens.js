import React from "react";
import { Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Header } from "../components";
import { connect } from "react-redux";
import * as ActionLogin from "../actions/action-actives/ActionLogin";
import * as firebase from "firebase";
import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
// Screen //
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import SignInScreen from "../screens/auth/SignIn";
import SignUpScreen from "../screens/auth/SignUp";
import EditProfileScreen from "../screens/auth/EditProfile";
import ProductDetailScreen from "../screens/product-cart/ProductDetail";
import CartScreen from "../screens/product-cart/CartScreen";
import PaymentScreen from "../screens/payment/PaymentScreen";
import PaymentNotifications from "../screens/payment/PaymentNotifications";
import ContactScreen from "../screens/about/Contact";
import ForgotPasswordScreen from "../screens/auth/ForgotPassword";
import ChangePasswordScreen from "../screens/auth/ChangePassword";
import FlashsaleProductScreen from "../screens/product-cart/FlashsaleProduct";
import HistoryViewScreen from "../screens/HistoryView";
import FavoriteViewScreen from "../screens/FavoriteView";
import ProductAllScreen from "../screens/product-cart/ProductAll";
import PromotionsScreen from "../screens/notifications/Promotions";
import FilterSearchScreen from "../screens/filter-search/FilterSearch";
import EventsScreen from "../screens/events/Events";
//History View
import HistoryOrderScreen from "../screens/order-status/HistoryOrder";
import OrderStatusScreen from "../screens/order-status/OrderStatus";
//Order Screen & Notification-order
import OrderScreen from "../screens/product-cart/OrderScreen";
import OrderStatusPriceScreen from "../screens/product-cart/OrderStatusPriceScreen";
import UseCouponScreen from "../screens/product-cart/notification-order-screen/UseCoupon";
import UseDeliveryScreen from "../screens/product-cart/notification-order-screen/UseDelivery";
import UseAddressDeliveryScreen from "../screens/product-cart/notification-order-screen/UseAddressDelivery";
// Product-Type
import ProductTypeScreen from "../screens/product-type/ProductType";
// Etc //
import NotificationsScreen from "../screens/notifications/Notifications";
import HowToScreen from "../screens/notifications/HowTo";
import NewsScreen from "../screens/notifications/News";
import AboutUsScreen from "../screens/about/AboutUs";
import NewsRelationScreen from "../screens/notifications/NewsRelation";
import NewsRelationDetailScreen from "../screens/notifications/NewsRelationDetail";
import MyCouponScreen from "../screens/coupon/MyCoupon";

//SET FIREBASE-CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCJcBZXaJYkEn49dfUiqbKW2H5FWLgmKrQ",
  authDomain: "fir-ntms-app.firebaseapp.com",
  databaseURL: "https://fir-ntms-app.firebaseio.com/",
  projectId: "fir-ntms-app",
  storageBucket: "fir-ntms-app.appspot.com",
  messagingSenderId: "409075053323",
  appId: "1:409075053323:web:910b51843919d94284280e",
  measurementId: "G-PPF21XCLZP",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//SET NOTIFICATIONS-CONFIG
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              white
              transparent
              title="Profile"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Home"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function SignInStack() {
  return (
    <Stack.Navigator initialRouteName="Sign In" mode="card" headerMode="screen">
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Sign In"
              search
              tabs
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function SignUpStack() {
  return (
    <Stack.Navigator initialRouteName="Sign Up" mode="card" headerMode="screen">
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Sign Up"
              search
              tabs
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function EditProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Edit Profile"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Edit Profile"
              search
              tabs
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ForgotPasswordStack() {
  return (
    <Stack.Navigator
      initialRouteName="Forgot Password"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Forget Password"
        component={ForgotPasswordScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Forget Password"
              search
              tabs
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ChangePasswordStack() {
  return (
    <Stack.Navigator
      initialRouteName="Change Password"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Change Password"
        component={ChangePasswordScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Change Password"
              search
              tabs
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ProductStack() {
  return (
    <Stack.Navigator
      initialRouteName="Products"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Products"
        component={ProductDetailScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Products"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator initialRouteName="Cart" mode="card" headerMode="screen">
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Cart"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function PaymentStack() {
  return (
    <Stack.Navigator initialRouteName="Payment" mode="card" headerMode="screen">
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Payment"
              search
              tabs
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function PaymentNotificationStack() {
  return (
    <Stack.Navigator
      initialRouteName="Payment Notifications"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Payment Notifications"
        component={PaymentNotifications}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Payment Notifications"
              search
              tabs
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ContactStack() {
  return (
    <Stack.Navigator initialRouteName="Contact" mode="card" headerMode="screen">
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Contact"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function FlashsaleProductStack() {
  return (
    <Stack.Navigator
      initialRouteName="Flashsale Product"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Flashsale Product"
        component={FlashsaleProductScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Flashsale Product"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function NotificationsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Notifications"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Notifications"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function AboutUsStack() {
  return (
    <Stack.Navigator
      initialRouteName="About Us"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="About Us"
        component={AboutUsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="About Us"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function HowToStack() {
  return (
    <Stack.Navigator initialRouteName="HowTo" mode="card" headerMode="screen">
      <Stack.Screen
        name="HowTo"
        component={HowToScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="HowTo"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function NewsStack() {
  return (
    <Stack.Navigator initialRouteName="News" mode="card" headerMode="screen">
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="News"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function NewsRelationStack() {
  return (
    <Stack.Navigator
      initialRouteName="News Relation"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="News Relation"
        component={NewsRelationScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="News Relation"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function NewsRelationDetailStack() {
  return (
    <Stack.Navigator
      initialRouteName="News Realtion Detail"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="News Realtion Detail"
        component={NewsRelationDetailScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="News Realtion Detail"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function HistoryViewStack() {
  return (
    <Stack.Navigator
      initialRouteName="History View"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="History View"
        component={HistoryViewScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="History View"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function HistoryOrderStack() {
  return (
    <Stack.Navigator
      initialRouteName="History Order"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="History Order"
        component={HistoryOrderScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="History Order"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function OrderStatusStack() {
  return (
    <Stack.Navigator
      initialRouteName="Order Status"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Order Status"
        component={OrderStatusScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Order Status"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function FavoriteViewStack() {
  return (
    <Stack.Navigator
      initialRouteName="Favorite View"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Favorite View"
        component={FavoriteViewScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Favorite View"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ProductAllStack() {
  return (
    <Stack.Navigator
      initialRouteName="Product All"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Product All"
        component={ProductAllScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Product All"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function PromotiosnStack() {
  return (
    <Stack.Navigator
      initialRouteName="Promotions"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Promotions"
        component={PromotionsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Promotions"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ProductTypeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Product Type"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Product Type"
        component={ProductTypeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Product Type"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MyCouponStack() {
  return (
    <Stack.Navigator
      initialRouteName="My Coupo"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="My Coupon"
        component={MyCouponScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="My Coupo"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function FilterSearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="Filter Search"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Filter Search"
        component={FilterSearchScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Filter Search"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function EventsStack() {
  return (
    <Stack.Navigator initialRouteName="Events" mode="card" headerMode="screen">
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Events"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

//Order Screen
function OrderScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="Order Screen"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Order Screen"
        component={OrderScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Order Screen"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function OrderStatusPriceStack() {
  return (
    <Stack.Navigator
      initialRouteName="Order Status Price Screen"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Order Status Price Screen"
        component={OrderStatusPriceScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Order Status Price Screen"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function UseCouponStack() {
  return (
    <Stack.Navigator
      initialRouteName="Use Coupon"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Use Coupon"
        component={UseCouponScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Use Coupon"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function UseDeliveryStack() {
  return (
    <Stack.Navigator
      initialRouteName="Use Delivery"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Use Delivery"
        component={UseDeliveryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Use Delivery"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function UseAddressDeliveryStack() {
  return (
    <Stack.Navigator
      initialRouteName="Use Address Delivery"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Use Address Delivery"
        component={UseAddressDeliveryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Use Address Delivery"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      mode="card"
      headerMode="none"
      tabBarOptions={{
        activeTintColor: "black", // Click
        activeBackgroundColor: "#e0f0ff", // Backgrounf Before Click
        inactiveTintColor: "black", // Font
        inactiveBackgroundColor: "white", // Background Default
        labelStyle: {
          fontSize: 12,
          margin: 0,
          padding: 0,
          fontFamily: "kanitRegular",
          color: "gray",
        },
      }}
    >
      <Tab.Screen
        name="Flash Sale"
        component={HomeStack}
        options={{
          tabBarLabel: "Flash Sale",
          tabBarIcon: ({ size }) => (
            <Image
              source={require("../assets/images/menubar/flashsale.png")}
              style={Style.menuBar}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={ProductAllStack}
        style={{ color: "black" }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/menubar/product.png")}
              style={Style.menuBar}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsRelationStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/menubar/news.png")}
              style={Style.menuBar}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/menubar/events.png")}
              style={Style.menuBar}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Payment Notifications"
        component={PaymentNotificationStack}
        options={{
          tabBarIcon: ({ size }) => (
            <Image
              source={require("../assets/images/menubar/payments.png")}
              style={Style.menuBar}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={SignInStack}
        options={{
          tabBarIcon: ({ size }) => (
            <Image
              source={require("../assets/images/menubar/user.png")}
              style={Style.menuBar}
            />
            // <Icons name="face" color={"#007e82"} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function OnboardingStack(props) {
  //#region BackpUp Firebase
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       setNotification(notification);
  //       console.log(notification);
  //     }
  //   );
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log(response);
  //     }
  //   );
  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);

  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   const { status: existingStatus } = await Permissions.getAsync(
  //     Permissions.NOTIFICATIONS
  //   );
  //   let finalStatus = existingStatus;

  //   if (existingStatus !== "granted") {
  //     const { status } = Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== "granted") {
  //     alert("Failed to get push token for push notification!");
  //     return;
  //   }
  //   token = (await Notifications.getExpoPushTokenAsync()).data;
  //   firebase.database().ref("ExpoToken").set({
  //     Token: token,
  //   });
  //   console.log(token);

  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }
  //   return token;
  // }
  //#endregion

  // useEffect(() => {
  //   LogBox.ignoreLogs(["VirtualizedLists should never be nested!"]);
  // }, [props]);
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingsStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Cart"
          component={CartStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Products"
          component={ProductStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUpStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Edit Profile"
          component={EditProfileStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Forgot Password"
          component={ForgotPasswordStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Change Password"
          component={ChangePasswordStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Flashsale Product"
          component={FlashsaleProductStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="About Us"
          component={AboutUsStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="News"
          component={NewsStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="HowTo"
          component={HowToStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="News Relation"
          component={NewsRelationStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="News Relation Detail"
          component={NewsRelationDetailStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="History View"
          component={HistoryViewStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="History Order"
          component={HistoryOrderStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Favorite View"
          component={FavoriteViewStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Promotions"
          component={PromotiosnStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Product Type"
          component={ProductTypeStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="My Coupon"
          component={MyCouponStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Filter Search"
          component={FilterSearchStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Order Status"
          component={OrderStatusStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Order Screen"
          component={OrderScreenStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Order Status Price Screen"
          component={OrderStatusPriceStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Use Coupon"
          component={UseCouponStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Use Delivery"
          component={UseDeliveryStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Use Address Delivery"
          component={UseAddressDeliveryStack}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </>
  );
}

export default connect(null, ActionLogin.actions)(OnboardingStack);

const Style = StyleSheet.create({
  menuBar: {
    width: 20,
    height: 20,
  },
});
