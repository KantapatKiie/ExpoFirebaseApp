import React, { useState, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import ProScreen from "../screens/Pro";
import SettingsScreen from "../screens/Settings";
import SignInScreen from "../screens/auth/SignIn";
import SignUpScreen from "../screens/auth/SignUp";
import BasketScreen from "../screens/Basket";
import CategoriesScreen from "../screens/Categories";
import ProductsScreen from "../screens/ProductScreen";
import CustomDrawerContent from "./Menu";
import { Icon, Header } from "../components";
import { Images, materialTheme } from "../constants/";
import { connect, useSelector } from "react-redux";
import * as ActionLogin from "../actions/action-actives/ActionLogin";
import * as firebase from "firebase";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

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
const Drawer = createDrawerNavigator();

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

function SignInStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="Sign In" component={SignInScreen} />
    </Stack.Navigator>
  );
}

function SignUpStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
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

function CategoriesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Categories" scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ProductStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Products"
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
    </Stack.Navigator>
  );
}

function ProStack(props) {
  return (
    <Stack.Navigator initialRouteName="Pro" mode="card" headerMode="none">
      <Stack.Screen name="Pro" component={ProScreen} />
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

function AppStack(props) {
  const { objLoginHD } = useSelector((state) => ({
    objLoginHD: state.login.objLoginHD,
  }));
  const profile = {
    avatar: Images.Onboarding,
    name: objLoginHD.EMAIL === "" ? "Guest" : objLoginHD.EMAIL,
    type: "Administrator",
    rating: 4.9,
  };

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          justifyContent: "center",
          alignContent: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="gears"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: -3 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sign In"
        component={SignInStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="ios-log-in"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sign Up"
        component={SignUpStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen name="Basket" component={BasketStack} />
      <Drawer.Screen name="Categories" component={CategoriesStack} />
      <Drawer.Screen name="Products" component={ProductStack} />
      <Drawer.Screen name="Pro" component={ProStack} />
    </Drawer.Navigator>
  );
}

function OnboardingStack(props) {
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
  //     Token: "token",
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
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

export default connect(null, ActionLogin.actions)(OnboardingStack);
