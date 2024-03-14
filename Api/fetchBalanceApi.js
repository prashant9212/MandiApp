import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, getLoginId, setBalance } from "./common";
import axios from "axios";

export const fetchBalanceApi = async () => {
  try {
    const userId = await getLoginId();
    if (userId === -1) return userId;
    const response = await axios.get(`${API_URL}/getBalance/${userId}`);
    if (response && response.data && response.data.success) {
      await AsyncStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.balanceInfo)
      );
      return {
        status: true,
        message: "ok",
        payload: response.data.balanceInfo,
      };
    }
  } catch (error) {
    console.log("Error in fetching balance", error);
    return { status: false, message: "Balance could not be fetched" };
  }
};
