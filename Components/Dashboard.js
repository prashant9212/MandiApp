import React, { useRef, useState } from "react";
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
import Collapsible from "react-native-collapsible";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchBalance, fetchBalanceApi } from "../Api/fetchBalanceApi";
import {
  INACTIVITY_INTERVAL,
  formatIndian,
  initialData,
  showToast,
} from "../Api/common";
import { useFocusEffect } from "@react-navigation/native";

const image = { uri: "https://images.ojalmart.com/homebg.jpg" };

const Dashboard = ({ navigation }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    handleActivity();
    setCollapsed(!collapsed);
  };

  const [userDetails, setUserDetails] = React.useState(initialData);
  React.useEffect(() => {
    startTimer();
    const fetchBalance = async () => {
      try {
        const response = await fetchBalanceApi();
        console.log(response.payload);
        if (response.status) setUserDetails(response.payload);
        else {
          showToast(response.message);
          setUserDetails(initialData);
        }
      } catch (error) {
        console.log("Error fetching balance", error);
      }
    };
    fetchBalance();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearInactivityTimer();
      };
    }, [])
  );
  const inactivityTimer = useRef(null);
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
  const startTimer = () => {
    inactivityTimer.current = setTimeout(() => {
      //showToast("Your current session was timed-out and you have been logged out. Please login again to continue.");
      Alert.alert('Session Timeout', 'Your current session was timed-out and you have been logged out. Please login again to continue.', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      console.log("Dashboard");
      AsyncStorage.removeItem("login", () => {
        AsyncStorage.removeItem("balance").then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        });
      });
    }, INACTIVITY_INTERVAL);
  };
  const handleActivity = () => {
    clearInactivityTimer();
    startTimer();
  };
  const clearInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
  };
  return (
    <View style={{ backgroundColor: "#f1f1f1" }}
    // {...panResponder.panHandlers}
    >
      <StatusBar animated={true} backgroundColor="#FF1715" style="light" />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View
          style={{
            backgroundColor: "",
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
              Welcome, {userDetails.fullName}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 12,
          margin: 6,
          borderRadius: 5,
          borderColor: "#E9E9E9",
          borderWidth: 1,
        }}
      >
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Text
            style={{
              width: "70%",
              fontSize: 16,
              color: "#5a5a5a",
              fontWeight: "500",
            }}
          >
            Balance overview
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Statement");
            }}
          >
            <Text style={{ fontSize: 14, color: "#FF1715", direction: "rtl" }}>
              View Statement
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", width: "100%", marginTop: 20 }}>
          <Text style={{ width: "92%", fontSize: 14, color: "#5a5a5a" }}>
            Your total assets
          </Text>
          <Image
            style={{ width: 18, height: 18 }}
            source={require("../assets/question.png")}
          ></Image>
        </View>

        <View
          style={{
            flexDirection: "row-reverse",
            height: 50,
            marginTop: 13,
            padding: 10,
          }}
        >
          <Text style={{ color: "#838383" }}>CNY</Text>
          <Text style={{ paddingRight: 10, color: "#838383" }}>
            XXXXXXXXXXX
          </Text>
        </View>

        <View>
          <SafeAreaView
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <ScrollView>
                <TouchableOpacity onPress={toggleExpanded}>
                  <View style={styles.ViewAccount}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#5a5a5a",
                        fontWeight: "500",
                      }}
                    >
                      View Accounts
                    </Text>
                    {/* <Image style={styles.AccountImg} source={require('../assets/down-arrow.png')}></Image> */}
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsed}>
                  {/* <View
                    style={{
                      backgroundColor: "#f1f1f1",
                      borderRadius: 5,
                      padding: 12,
                      marginTop: 5,
                      marginBottom: 5,
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View style={{ width: "6%" }}>
                      <Image
                        style={styles.itemImg}
                        source={require("../assets/savings.png")}
                      ></Image>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingLeft: 15,
                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ fontSize: 14, color: "#000" }}>
                        Vch Balance
                      </Text>
                    </View>
                    <View
                      style={{ width: "44%", flexDirection: "row-reverse" }}
                    >
                      <Text style={{ fontWeight: "400", color: "#4a4949" }}>
                        {formatIndian(userDetails.vchbalance)} INR
                      </Text>
                    </View>
                  </View> */}
                  <View
                    style={{
                      backgroundColor: "#f1f1f1",
                      borderRadius: 5,
                      padding: 12,
                      marginTop: 5,
                      marginBottom: 5,
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View style={{ width: "6%" }}>
                      <Image
                        style={styles.itemImg}
                        source={require("../assets/savings.png")}
                      ></Image>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingLeft: 15,
                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ fontSize: 14, color: "#000" }}>
                        Account
                      </Text>
                    </View>
                    <View
                      style={{ width: "44%", flexDirection: "row-reverse" }}
                    >
                      <Text style={{ fontWeight: "400", color: "#4a4949" }}>
                        {formatIndian(userDetails.savingAccount)} INR
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#f1f1f1",
                      borderRadius: 5,
                      padding: 12,
                      marginTop: 5,
                      marginBottom: 5,
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View style={{ width: "6%" }}>
                      <Image
                        style={styles.itemImg}
                        source={require("../assets/overdraft.png")}
                      ></Image>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingLeft: 15,
                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ fontSize: 14, color: "#000" }}>
                        Overdraft Balance{" "}
                      </Text>
                    </View>
                    <View
                      style={{ width: "44%", flexDirection: "row-reverse" }}
                    >
                      <Text style={{ fontWeight: "400", color: "#4a4949" }}>
                        {formatIndian(userDetails.overdraftBalance)} INR
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#f1f1f1",
                      borderRadius: 5,
                      padding: 12,
                      marginTop: 5,
                      marginBottom: 5,
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View style={{ width: "6%" }}>
                      <Image
                        style={styles.itemImg}
                        source={require("../assets/ledger.png")}
                      ></Image>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingLeft: 15,
                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ fontSize: 14, color: "#000" }}>
                        Ledger
                      </Text>
                    </View>
                    <View
                      style={{ width: "44%", flexDirection: "row-reverse" }}
                    >
                      <Text style={{ fontWeight: "400", color: "#4a4949" }}>
                        {formatIndian(userDetails.ledgerBalance)} INR
                      </Text>
                    </View>
                  </View>
                </Collapsible>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 12,
          marginBottom: 6,
          marginHorizontal: 6,
          borderRadius: 5,
          borderColor: "#E9E9E9",
          borderWidth: 1,
        }}
      >
        <View style={styles.Info}>
          <View style={{ width: "12%", padding: 15 }}>
            <Image
              style={styles.itemImg}
              source={require("../assets/email.png")}
            ></Image>
          </View>
          <View style={{ width: "82%", paddingLeft: 15, paddingRight: 10 }}>
            <Text style={{ fontSize: 14, color: "#5a5a5a" }}>
              Notice of Update Product Risk Rating for Investment or Insurance
              Products issued or Distributed
            </Text>
          </View>
          <View style={{ width: "10%", padding: 10 }}>
            <Image
              style={styles.itemImg}
              source={require("../assets/right-arrow.png")}
            ></Image>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 12,
          marginLeft: 6,
          marginRight: 6,
          borderRadius: 5,
          borderColor: "#E9E9E9",
          borderWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 50,
            paddingTop: 5,
          }}
        >
          <Text
            style={{
              width: "70%",
              fontSize: 16,
              color: "#5a5a5a",
              fontWeight: "500",
            }}
          >
            Quick actions
          </Text>
          <View style={{ flexDirection: "row-reverse", width: "30%" }}>
            <Text style={{ fontSize: 14, color: "#FF1715" }}>More</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          {/* <View style={styles.item}>
            <Image
              style={styles.itemImg}
              source={require("../assets/question.png")}
            ></Image>
            <Text style={styles.itemText}>All {"\n"} Community </Text>
          </View> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Beneficiary");
            }}
            style={styles.item}
          >
            <Image
              style={styles.itemImg}
              source={require("../assets/beneficiary.png")}
            ></Image>
            <Text style={styles.itemText}>
              View/Manage {"\n"} Beneficiary
            </Text>
          </TouchableOpacity>
          <View style={styles.item}>
            <Image
              style={styles.itemImg}
              source={require("../assets/transfer.png")}
            ></Image>
            <Text style={styles.itemText}>CNY {"\n"} Transfers</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Payment");
            }}
            style={styles.item}
          >
            <Image
              style={styles.itemImg}
              source={require("../assets/currency.png")}
            ></Image>
            <Text style={styles.itemText}>
              Foreign {"\n"} Currency {"\n"} Transfers
            </Text>
          </TouchableOpacity>
          <View style={styles.item}>
            <Image
              style={styles.itemImg}
              source={require("../assets/money.png")}
            ></Image>
            <Text style={styles.itemText}>
              Foreign {"\n"} Exchange {"\n"} Services
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.item}>
            <Image
              style={styles.itemImg}
              source={require("../assets/economy.png")}
            ></Image>
            <Text style={styles.itemText}>All {"\n"} Global View</Text>
          </View>
          <View style={styles.item}>
            <Image
              style={styles.itemImg}
              source={require("../assets/economy.png")}
            ></Image>
            <Text style={styles.itemText}>
              All {"\n"} Global {"\n"} Transfers
            </Text>
          </View>
          <View style={styles.item}>
            <Image
              style={styles.itemImg}
              source={require("../assets/mail.png")}
            ></Image>
            <Text style={styles.itemText}>Term {"\n"} Deposit</Text>
          </View>
          <View style={styles.item}>
            <Image
              style={styles.itemImg}
              source={require("../assets/profit.png")}
            ></Image>
            <Text style={styles.itemText}>FX Rate {"\n"} Inquiry</Text>
          </View>
        </View>
      </View>
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
    margin: 12,
    alignItems: "center",
    textAlign: "center",
  },
  itemText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 11,
    marginTop: 5,
    color: "#5A5A5A",
  },
  itemImg: {
    width: 20,
    height: 20,
    marginBottom: 3,
  },
  Info: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
  },
  ViewAccount: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#EAEAEA",
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 6,
    width: "100%",
  },
});

export default Dashboard;
