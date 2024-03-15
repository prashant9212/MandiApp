import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  PanResponder,
  TextInput,
  Alert
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { INACTIVITY_INTERVAL, initialData, showToast } from "../Api/common";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { addBeneficiary, updateBeneficiary } from "../Api/beneficiaryApi";

const AddBeneficiary = ({ navigation }) => {
  // Activity Handler Starts

  const inactivityTimer = React.useRef(null);
  const LogOut = () => {
    AsyncStorage.removeItem("login", () => {
      AsyncStorage.removeItem("balance").then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      });
    });
  };
  const startTimer = () => {
    inactivityTimer.current = setTimeout(() => {
      //showToast("Your current session was timed-out and you have been logged out. Please login again to continue.");
      Alert.alert('Session Timeout', 'Your current session was timed-out and you have been logged out. Please login again to continue.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      console.log("Profile");
      LogOut();
    }, INACTIVITY_INTERVAL);
  };
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        handleActivity();
      },
      onPanResponderMove: (evt, gestureState) => {
        handleActivity();
      },
    })
  ).current;
  const handleActivity = () => {
    clearInactivityTimer();
    startTimer();
  };
  React.useEffect(() => {
    startTimer();
  }, []);
  const clearInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearInactivityTimer();
      };
    }, [])
  );

  // Activity Handler Ends

  const route = useRoute();
  React.useEffect(() => {
    if (route.params.edit && route.params.user) {
      beneficiaryData_(route.params.user)
      confirmAc_(route.params.user.accountNumber)
    }
  }, []);

  const submitHandler = async () => {
    if (confirmAc !== beneficiaryData.accountNumber)
      showToast("Account numbers don't match.")
    else if (beneficiaryData.ifscCode.length !== 11)
      showToast("IFSC Code invalid.")
    else if (beneficiaryData.recipientName.length < 3)
      showToast("Recipient name shorter than expected.")
    else if (beneficiaryData.recipientName.match(/[^a-zA-Z]/g))
      showToast("Recipient name contains invalid characters.");
    else if (beneficiaryData.nickname.match(/[^a-zA-Z]/g))
      showToast("Nickname contains invalid characters.");
    else if (beneficiaryData.nickname.length === 0)
      showToast("Nickname is required.")
    else
      try {
        let res;
        if (route.params.edit) {
          res = await updateBeneficiary({ AccountType: route.params.user.accountType, ...beneficiaryData });
        }
        else {
          res = await addBeneficiary({ AccountType: route.params.sameBank ? "same" : "other", ...beneficiaryData });
        }
        showToast(res.message);
        if (res.status) {
          navigation.navigate("Beneficiary", { reloadList: true })
        }
      } catch (error) {
        console.log(error, "at Components/AddBeneficiary.js")
      }
  }

  const [beneficiaryData, beneficiaryData_] = useState({
    "accountNumber": "",
    "ifscCode": "",
    "recipientName": "",
    "nickname": "",
  });

  const [confirmAc, confirmAc_] = useState("");

  return (
    <View
      style={{ backgroundColor: "#f1f1f1" }}>
      <StatusBar animated={true} backgroundColor="#FF1715" style="light" />
      <View
        style={{
          backgroundColor: "#FF1715",
          height: 140,
          marginTop: 25,
          paddingLeft: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row-reverse",
            height: 50,
            marginTop: 13,
            padding: 5,
          }}
        >
          <Text style={styles.TopIcons}>
            <Image
              style={{ resizeMode: "cover", width: 18, height: 18 }}
              source={require("../assets/help.png")}
            ></Image>
          </Text>
          <Text style={styles.TopIcons}>
            <Image
              style={{ resizeMode: "cover", width: 18, height: 18 }}
              source={require("../assets/edit.png")}
            ></Image>
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 25, fontWeight: "500", color: "#fff" }}>
            Enter Recipient Details
          </Text>
        </View>
      </View>

      {/* Start List */}
      <View
        style={{
          backgroundColor: "#fff",
          minHeight: "100%",
          borderRadius: 5,
          borderColor: "#E9E9E9",
          borderWidth: 1,
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <TextInput
          value={beneficiaryData.accountNumber}
          onChangeText={(a) => {
            beneficiaryData_((e) => ({ ...e, accountNumber: a }))
          }}
          style={styles.input}
          placeholder="Account Number"
          maxLength={16}
          keyboardType="numeric"
        />
        <TextInput
          value={confirmAc}
          onChangeText={confirmAc_}
          style={styles.input}
          maxLength={16}
          placeholder="Re-enter Account Number"
        />
        <TextInput

          value={beneficiaryData.ifscCode}
          onChangeText={(a) => {
            beneficiaryData_((e) => ({ ...e, ifscCode: a }))
          }}
          maxLength={11}
          style={styles.input}
          placeholder="Enter IFSC"
        />
        <TextInput

          value={beneficiaryData.recipientName}
          onChangeText={(a) => {
            beneficiaryData_((e) => ({ ...e, recipientName: a }))
          }}
          style={styles.input}
          placeholder="Recipient Name"
        />
        <TextInput
          value={beneficiaryData.nickname}
          style={styles.input}
          onChangeText={(a) => {
            beneficiaryData_((e) => ({ ...e, nickname: a }))
          }}
          placeholder="Nick Name"
        />
        <TouchableOpacity
          onPress={submitHandler}
        >
          <Text style={{
            width: 200,
            height: 45,
            backgroundColor: "#FF1715",
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
            borderRadius: 10,
            marginTop: 50,
            color: "#fff",
            fontSize: 18
          }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      {/* Start List */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  TopIcons: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 50,
    margin: 6,
    padding: 2,
    alignItems: "center",
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#FBFBFB",
    fontSize: 15
  },
});

export default AddBeneficiary;
