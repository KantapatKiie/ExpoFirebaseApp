import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalLoading from "../../components/ModalLoading";
import * as auth from "../../store/ducks/auth.duck";
import { createAccount } from "../../store/mock/mock";
import { signup } from "../../store/crud/auth.crud";

function SignUp(props) {
  useEffect(() => {}, []);

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [stateObj, setStateObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChangeFirstName = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.firstName = e;
    setStateObj(newObj);
  };
  const onChangeLastName = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.lastName = e;
    setStateObj(newObj);
  };
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
  const onChangePasswordConfirm = (e) => {
    let newObj = Object.assign({}, stateObj);
    newObj.password2 = e;
    setStateObj(newObj);
  };

  const onClickSignUp = () => {
    setLoading(true);
    createAccount("firstName", "lastName", "test@test.ca", "12345")
      .then((val) => {
        console.log(val);

        setLoading(false);
        props.navigation.navigate("Sign In");
      })
      .catch((err) => console.log("error:", err.message));
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/nathan-dumlao.png")}
          style={styles.image}
        >
          <View style={styles.containerBack}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Sign In")}
            >
              <Icons
                name="account"
                size={20}
                color="black"
                style={styles.IconBack}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
              <Icons
                name="home"
                size={20}
                color="black"
                style={styles.IconBack}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerHeader}>
            <Text style={styles.labelHeader}>Sign Up</Text>
          </View>
          {/* TextInput */}
          <View style={styles.container2}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="First Name..."
                placeholderTextColor="#808080"
                onChangeText={onChangeFirstName}
                name="firstName"
                value={stateObj.firstName}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Last Name..."
                placeholderTextColor="#808080"
                onChangeText={onChangeLastName}
                name="lastName"
                value={stateObj.lastName}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder={"Email..."}
                placeholderTextColor="#808080"
                onChangeText={onChangeEmail}
                name="email"
                value={stateObj.email}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Password..."
                placeholderTextColor="#808080"
                onChangeText={onChangePassword}
                secureTextEntry={true}
                name="password"
                value={stateObj.password}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Confrim Password..."
                placeholderTextColor="#808080"
                onChangeText={onChangePasswordConfirm}
                secureTextEntry={true}
                name="passwordCF"
                value={stateObj.password2}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                checked={isChecked}
                onPress={() => setIsChecked(!isChecked)}
                checkedColor="#71D58E"
              />
              <Text style={styles.label}>
                I agree to the Terms of Service and Privacy Policy
              </Text>
            </View>
            <View style={styles.textContainerEnd}>
              <View>
                <Text style={styles.label2}>
                  If you continue with already have a WordPress.com account,
                </Text>
              </View>
              <View>
                <Text style={styles.label2}>
                  you are creating an account and you agree to our Terms of
                  Service.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.acceptBtn} onPress={onClickSignUp}>
              <Text style={styles.SignupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <ModalLoading loading={loading} />
    </>
  );
}

export default connect(null, auth.actions)(SignUp);

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
  containerHeader: {
    paddingTop: 10,
    alignSelf: "center",
  },
  containerBack: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 12,
    paddingLeft: 20,
  },
  forgot: {
    color: "white",
    fontSize: 11,
    alignItems: "flex-end",
  },
  acceptBtn: {
    width: "40%",
    backgroundColor: "#71D58E",
    borderRadius: 15,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  SignupText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  imageContainer: {
    elevation: 1,
    paddingBottom: 50,
  },
  showLogo: {
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    color: "white",
    alignSelf: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    color: "white",
    fontSize: 10,
    marginTop: 19,
    marginRight: 25,
    alignSelf: "flex-start",
  },
  labelHeader: {
    color: "white",
    fontSize: 21,
    marginTop: 20,
  },
  IconBack: {
    color: "white",
    marginTop: 25,
    marginLeft: 15,
  },
  textContainerEnd: {
    alignSelf: "center",
    paddingTop: 20,
  },
  label2: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
});
