import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("@auth_token");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("@auth_token", await token);
  } catch (e) {
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@auth_token");
  } catch (e) {
    return null;
  }
};
