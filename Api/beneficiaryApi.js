import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, getLoginId, setBalance } from "./common";
import axios from "axios";

export const addBeneficiary = async (body) => {
    try {
        const userId = await getLoginId();
        const response = await axios.post(`${API_URL}/addBeneficiary`, { intUserId: userId, ...body });
        console.log(response.data)
        if (response && response.data && response.data.success) {
            return {
                status: true,
                message: response.data.message,
            };
        }
    } catch (error) {
        console.log("Error in fetching balance", error.response.data);
        if (error?.response && error.response.data)
            return { status: false, message: error.response.data.message };
        else
            return { status: false, message: "Beneficiary could not added" };
    }
};

export const updateBeneficiary = async (body) => {
    try {
        const userId = await getLoginId();
        const response = await axios.post(`${API_URL}/updateBeneficiaryDetials`, { intUserId: userId, ...body });
        console.log(response.data)
        if (response && response.data && response.data.success) {
            return {
                status: true,
                message: response.data.message,
            };
        }
    } catch (error) {
        console.log("Error in fetching balance", error);
        if (error?.response && error.response.data)
            return { status: false, message: error.response.data.message };
        else
            return { status: false, message: "Beneficiary could not added" };
    }
};

export const getBeneficiaries = async () => {
    try {
        const userId = await getLoginId();
        const response = await axios.get(API_URL + "/getBeneficiaryDetails/" + userId);
        if (response && response.data && response.data.success) {
            return {
                status: true,
                message: "ok",
                payload: response.data.beneficiaryBalanceResponse
            };
        }
    } catch (error) {
        console.log("Error in fetching balance", error.response.data);
        return { status: false, message: "Beneficiaries could not fetched" };
    }
};
