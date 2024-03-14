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
  Alert
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import { INACTIVITY_INTERVAL, showToast } from "../Api/common";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Payment = ({ navigation }) => {
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
      console.log("Payment");
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
  return (
    <View 
    // {...panResponder.panHandlers} 
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
              source={require("../assets/qr-code.png")}
            ></Image>
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 26, fontWeight: "500", color: "#fff" }}>
            Pay and transfer
          </Text>
        </View>
      </View>

      {/* Start List */}
      <View
        style={{
          backgroundColor: "#fff",
          minHeight: 500,
          padding: 12,
          margin: 6,
          borderRadius: 5,
          borderColor: "#E9E9E9",
          borderWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleActivity();
            navigation.navigate("AmtTransfer");
          }}
          style={styles.MainContainer}
        >
          <View style={styles.List}>
            <Image
              style={{
                resizeMode: "cover",
                width: 20,
                height: 20,
                margin: 3,
                marginRight: 18,
              }}
              source={require("../assets/transfer.png")}
            ></Image>
            <Text style={{ width: "80%", fontSize: 17, color: "#5A5A5A" }}>
              Pay and transfer
            </Text>
          </View>
          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Image
              style={{
                resizeMode: "cover",
                width: 16,
                height: 16,
                margin: 4,
                marginRight: 15,
              }}
              source={require("../assets/right-arrow.png")}
            ></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleActivity();
            navigation.navigate("Payment");
          }}
          style={styles.MainContainer}
        >
          <View style={styles.List}>
            <Image
              style={{
                resizeMode: "cover",
                width: 20,
                height: 20,
                margin: 3,
                marginRight: 18,
              }}
              source={require("../assets/free-trade.png")}
            ></Image>
            <Text style={{ width: "80%", fontSize: 17, color: "#5A5A5A" }}>
              Send money internationally
            </Text>
          </View>
          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Image
              style={{
                resizeMode: "cover",
                width: 16,
                height: 16,
                margin: 4,
                marginRight: 15,
              }}
              source={require("../assets/right-arrow.png")}
            ></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleActivity();
            navigation.navigate("Payment");
          }}
          style={styles.MainContainer}
        >
          <View style={styles.List}>
            <Image
              style={{
                resizeMode: "cover",
                width: 22,
                height: 22,
                margin: 3,
                marginRight: 18,
              }}
              source={require("../assets/upi.png")}
            ></Image>
            <Text style={{ width: "80%", fontSize: 17, color: "#5A5A5A" }}>
              UPI
            </Text>
          </View>
          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Image
              style={{
                resizeMode: "cover",
                width: 16,
                height: 16,
                margin: 4,
                marginRight: 15,
              }}
              source={require("../assets/right-arrow.png")}
            ></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleActivity();
            navigation.navigate("Payment");
          }}
          style={styles.MainContainer}
        >
          <View style={styles.List}>
            <Image
              style={{
                resizeMode: "cover",
                width: 20,
                height: 20,
                margin: 3,
                marginRight: 18,
              }}
              source={require("../assets/credit-card.png")}
            ></Image>
            <Text style={{ width: "80%", fontSize: 17, color: "#5A5A5A" }}>
              Credit/Debit Card{" "}
            </Text>
          </View>
          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Image
              style={{
                resizeMode: "cover",
                width: 16,
                height: 16,
                margin: 4,
                marginRight: 15,
              }}
              source={require("../assets/right-arrow.png")}
            ></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleActivity();
            navigation.navigate("Payment");
          }}
          style={styles.MainContainer}
        >
          <View style={styles.List}>
            <Image
              style={{
                resizeMode: "cover",
                width: 20,
                height: 20,
                margin: 3,
                marginRight: 18,
              }}
              source={require("../assets/online-banking.png")}
            ></Image>
            <Text style={{ width: "80%", fontSize: 17, color: "#5A5A5A" }}>
              Net Banking
            </Text>
          </View>
          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Image
              style={{
                resizeMode: "cover",
                width: 16,
                height: 16,
                margin: 4,
                marginRight: 15,
              }}
              source={require("../assets/right-arrow.png")}
            ></Image>
          </View>
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
  item: {
    flex: 4,
    direction: "ltr",
    width: 100,
    margin: 10,
    alignItems: "center",
    textAlign: "center",
  },
  itemText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 11,
    marginTop: 5,
    color: "#838383",
  },
  itemImg: {
    width: 18,
    height: 18,
  },
  List: {
    flexDirection: "row",
    width: "90%",
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
  },
  MainContainer: {
    flexDirection: "row",
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
  },
});

export default Payment;
