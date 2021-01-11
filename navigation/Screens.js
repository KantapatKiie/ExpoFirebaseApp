import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import SignInScreen from "../screens/auth/SignIn";
import SignUpScreen from "../screens/auth/SignUp";
import ProductsScreen from "../screens/ProductScreen";
import PaymentScreen from "../screens/payment/PaymentScreen";
import PaymentNotifications from "../screens/payment/PaymentNotifications";
import ContactScreen from "../screens/Contact";
import CartScreen from "../screens/CartScreen";
import ForgetPasswordScreen from "../screens/auth/ForgetPassword";
import ChangePasswordScreen from "../screens/auth/ChangePassword";
import FlashsaleProductScreen from "../screens/FlashsaleProduct";
import NotificationsScreen from "../screens/Notifications";
import AboutUsScreen from "../screens/AboutUs";
import { Header } from "../components";
import { connect, useSelector } from "react-redux";
import * as ActionLogin from "../actions/action-actives/ActionLogin";
import * as firebase from "firebase";
import * as Notifications from "expo-notifications";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
// import Icons from "react-native-vector-icons/MaterialIcons";

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
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const { width } = Dimensions.get("screen");
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

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
    <Stack.Navigator mode="card" headerMode="screen">
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
    <Stack.Navigator mode="card" headerMode="screen">
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

function ForgetPasswordStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Forget Password"
        component={ForgetPasswordScreen}
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
    <Stack.Navigator mode="card" headerMode="screen">
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
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
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
    <Stack.Navigator mode="card" headerMode="screen">
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
    <Stack.Navigator mode="card" headerMode="screen">
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
    <Stack.Navigator mode="card" headerMode="screen">
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
    <Stack.Navigator mode="card" headerMode="screen">
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
    <Stack.Navigator mode="card" headerMode="screen">
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
    <Stack.Navigator mode="card" headerMode="screen">
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

function HomeStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
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
        name="Promotion"
        component={SettingsStack}
        style={{ color: "black" }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/menubar/promotion.png")}
              style={Style.menuBar}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={ContactStack}
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
        component={ProfileStack}
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
        name="Payment"
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

  // notificationListener.current = Notifications.addNotificationReceivedListener(
  //   (notification) => {
  //     setNotification(notification);
  //     console.log(notification);
  //   }
  // );
  // responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //   (response) => {
  //     console.log(response);
  //   }
  // );
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
  //   // console.log(token);

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
          name="Forget Password"
          component={ForgetPasswordStack}
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
          name="Payment"
          component={PaymentStack}
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
