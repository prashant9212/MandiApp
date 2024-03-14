import axios from "axios";
import { API_URL, setLoginId } from "./common";

export const registerApi = async (
  name,
  address,
  city,
  email,
  mobile,
  password,
  username
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      FullName: name,
      UserName: username,
      Email: email,
      Password: password,
      Address: address,
      Mobile: mobile,
      City: city,
    });
    if (response && response.data && response.data.success) {
      await setLoginId(response.data.userResponse.intUserId.toString());
      return { status: true, message: "ok" };
    } else return { status: false, message: "Server not responding." };
  } catch (error) {
    console.log("Error in register api", error);
    var err_str = "";
    if (error.response.data) {
      if (error.response.data.errors) {
        if (error.response.data.errors.Email)
          err_str = error.response.data.errors.Email[0];
        else if (error.response.data.errors.Mobile)
          err_str = error.response.data.errors.Mobile[0];
        else err_str = JSON.stringify(error.response.data.errors);
      } else err_str = error.response.data.message;
    }
    if (err_str && typeof err_str === "string" && err_str !== "") {
      console.log("Err str:", err_str.toString());
      return { status: false, message: err_str };
    } else return { status: false, message: "Error sending data" };
  }
};
