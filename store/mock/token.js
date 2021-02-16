import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getToken () {
  try {
    var value = await AsyncStorage.getItem("@auth_token");
    if (value !== null && value !== undefined) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export async function setToken (token) {
  try {
    await AsyncStorage.setItem("@auth_token", token);

    var value = await AsyncStorage.getItem("@auth_token");
    if (value !== null && value !== undefined) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export async function removeToken () {
  try {
    await AsyncStorage.removeItem("@auth_token");
  } catch (e) {
    return null;
  }
};

