import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL, setLoginId } from "./common";

export const loginApi = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      userName: username,
      password: password,
    });
    if (response && response.data && response.data.success) {
      await setLoginId(response.data.userResponse.intUserId.toString());
      return { status: true, message: "ok" };
    } else return { status: false, message: "Server not responding." };
  } catch (error) {
    console.log("LoginApi error", error.response.data);
    return { status: false, message: "Username and Password dont match" };
  }
};
