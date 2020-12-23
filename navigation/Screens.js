import React, { useState, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import SignInScreen from "../screens/auth/SignIn";
import SignUpScreen from "../screens/auth/SignUp";
import BasketScreen from "../screens/Basket";
import ProductsScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import { Header } from "../components";
import { connect, useSelector } from "react-redux";
import * as ActionLogin from "../actions/action-actives/ActionLogin";
import * as firebase from "firebase";
import * as Notifications from "expo-notifications";
import Icons from "react-native-vector-icons/MaterialIcons";

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

function ProfileStack(props) {
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

function SettingsStack(props) {
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

function RegistrationStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function BasketStack(props) {
  return (
    <Stack.Navigator initialRouteName="Basket" mode="modal" headerMode="screen">
      <Stack.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Basket" scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ProductStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      mode="card"
      headerMode="none"
    >
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Products" scene={scene} navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Cart" scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <>
              <Header
                search
                tabs
                title="Home"
                navigation={navigation}
                scene={scene}
              />
            </>
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
        },
      }}
    >
      <Tab.Screen
        name="Flash Sale"
        component={HomeStack}
        options={{
          tabBarLabel: "Flash Sale",
          tabBarIcon: ({ size }) => (
            <Icons name="whatshot" color={"orange"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Promotion"
        component={SettingsStack}
        style={{ color: "black" }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="loyalty" color={"green"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={ProductStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="campaign" color={"blue"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={BasketStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="event" color={"red"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ size }) => (
            <Icons name="payment" color={"#820036"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={RegistrationStack}
        options={{
          tabBarIcon: ({ size }) => (
            <Icons name="face" color={"#007e82"} size={size} />
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
          name="Registration"
          component={RegistrationStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Product"
          component={ProductStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Basket"
          component={BasketStack}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </>
  );
}

export default connect(null, ActionLogin.actions)(OnboardingStack);
