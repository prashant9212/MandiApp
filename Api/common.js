import { Platform, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = "https://my-store-design.com/api";
export const getBalance = async () => {
  try {
    const blc = await AsyncStorage.getItem("balance");
    if (blc) return blc;
    else return -1;
  } catch (error) {
    console.log("Error fetching balance", error);
  }
};
export const setBalance = async (blc) => {
  try {
    const blc = await AsyncStorage.setItem("balance", blc);
  } catch (error) {
    console.log("Error fetching balance", error);
  }
};
export const setLoginId = async (loginid) => {
  try {
    const blc = await AsyncStorage.setItem("login", loginid);
  } catch (error) {
    console.log("Error fetching balance", error);
  }
};
export const getLoginId = async () => {
  try {
    const loginId = await AsyncStorage.getItem("login");
    if (loginId) return loginId;
    else return -1;
  } catch (error) {
    console.log("Error fetching balance", error);
  }
};

export const showToast = (msg) => {
  try {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravityAndOffset(
        msg,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } else {
      alert(response.message);
    }
  } catch (error) {
    console.log("Error in toast", error);
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatIndian = (str) => {
  if (str?.toString())
    return str.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  else return str;
};

export const initialData = {
  intUserId: 0,
  userName: "Loading",
  fullName: "Loading",
  mobile: "Loading",
  email: "Loading",
  address: "Loading",
  city: "Loading",
  vchbalance: 0.0,
  savingAccount: 0.0,
  overdraftBalance: 0.0,
  ledgerBalance: 0.0,
};

//inactivity in micorseconds
export const INACTIVITY_INTERVAL = 1000 * 60 * 60; // 10 minute wait before logout
