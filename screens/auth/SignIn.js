import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import * as auth from "../../store/ducks/auth.duck";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  LayoutAnimation,
  Alert,
  Platform,
  UIManager,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalLoading from "../../components/ModalLoading";
import { logins } from "../../store/mock/mock"; //mock api
import { setToken } from "../../store/mock/token";
import { login } from "../../store/crud/auth.crud"; //real api
import * as ActionLogin from "../../actions/action-actives/ActionLogin";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function SignIn(props) {
  const { objLoginHD } = useSelector((state) => ({
    objLoginHD: state.login.objLoginHD,
  }));

  useEffect(() => {
    setRequiredEmail(false);
    setRequiredPass(false);
    setLoading(false);
  }, []);

  const [expanded, setExpanded] = useState(false);
  const [stateObj, setStateObj] = useState({
    email: "",
    password: "",
  });

  const onChangeEmail = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.email = e;
    setStateObj(newObj);
  };
  const onChangePassword = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.password = e;
    setStateObj(newObj);
  };

  //loading
  const [loading, setLoading] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const onClickSignIn = async (email, password) => {
    let newLogin = Object.assign({}, objLoginHD);
    if (stateObj.email !== "" && stateObj.email !== "undefined") {
      setRequiredEmail(true);
      if (stateObj.password !== "" && stateObj.password !== "undefined") {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          newLogin.EMAIL = "";
        } else {
          setRequiredEmail(false);
          setRequiredPass(false);
          setTimeout(() => {
            setLoading(true);
            logins(email, password)
              .then(async (res) => {
                newLogin.EMAIL = email;
                newLogin.PASSWORD = password;
                props.setObjLogin(newLogin);

                await setToken(res.auth_token);
                props.navigation.navigate("Home");
              })
              .catch((err) => console.log("error:", err.message));
          }, 120);
        }
      } else {
        setRequiredPass(true);
        setRequiredEmail(false);
        setLoading(false);
      }
    } else {
      setRequiredPass(true);
      setRequiredEmail(true);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/tiendat.png")}
          style={styles.image}
        >
          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
              <Icons
                name="home"
                size={20}
                color="black"
                style={styles.IconBack}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.container2}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.showLogo}
                source={require("../../assets/images/ios.png")}
              />
            </View>
            <View
              style={
                requiredEmail !== true
                  ? styles.inputView
                  : styles.inputViewRequired
              }
            >
              <TextInput
                style={styles.inputText}
                placeholder={"example@email.co.th..."}
                placeholderTextColor="#808080"
                value={stateObj.email}
                onChangeText={onChangeEmail}
              />
            </View>
            <View
              style={
                requiredPass !== true
                  ? styles.inputView
                  : styles.inputViewRequired
              }
            >
              <TextInput
                style={styles.inputText}
                placeholder="Password..."
                placeholderTextColor="#808080"
                value={stateObj.password}
                onChangeText={onChangePassword}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => onClickSignIn(stateObj.email, stateObj.password)}
            >
              <Text>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rowTouch}
              onPress={() => props.navigation.navigate("Sign Up")}
            >
              <Text style={styles.SignupText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <ModalLoading loading={loading} />
    </>
  );
}

export default connect(null, ActionLogin.actions)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputViewRequired: {
    width: "80%",
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 1.4,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 11,
  },
  rowTouch: {
    flexDirection: "column",
  },
  forgot: {
    color: "white",
    fontSize: 11,
    alignItems: "flex-end",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#34b1c9",
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  SignupText: {
    color: "white",
    fontSize: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    paddingTop: 5,
  },
  logoContainer: {
    elevation: 1,
    paddingBottom: 80,
    marginTop: 10,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  showLogo: {
    alignItems: "center",
  },
  IconBack: {
    color: "white",
    marginTop: 25,
    marginLeft: 15,
  },
});
