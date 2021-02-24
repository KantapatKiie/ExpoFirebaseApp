import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  try {
    var value = await AsyncStorage.getItem("_AUTH_TOKEN_");
    if (value !== null && value !== undefined) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const setToken = async (token) => { 
  try {
    await AsyncStorage.setItem("_AUTH_TOKEN_", token);
  } catch (e) {
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("_AUTH_TOKEN_");
  } catch (e) {
    return null;
  }
};

