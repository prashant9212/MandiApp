import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { INACTIVITY_INTERVAL, formatIndian, showToast } from "../Api/common";
import { useFocusEffect } from "@react-navigation/native";

const Statement = ({ navigation }) => {
  const [Data, setData] = React.useState([
    {
      CatId: 1001,
      date: "Dec 17, 2023",
      reference: "UTR Number",
      mode: "NEFT",
      utr: "256225",
      amount: "-25,000",
    },
    {
      CatId: 1001,
      date: "Dec 17, 2023",
      reference: "UTR Number",
      mode: "NEFT",
      utr: "256225",
      amount: "-25,000",
    },
    {
      CatId: 1001,
      date: "Dec 17, 2023",
      reference: "UTR Number",
      mode: "NEFT",
      utr: "256225",
      amount: "-25,000",
    },
    {
      CatId: 1001,
      date: "Dec 17, 2023",
      reference: "UTR Number",
      mode: "NEFT",
      utr: "256225",
      amount: "-25,000",
    },
    {
      CatId: 1001,
      date: "Dec 17, 2023",
      reference: "UTR Number",
      mode: "NEFT",
      utr: "256225",
      amount: "-25,000",
    },
    {
      CatId: 1002,
      date: "Dec 05, 2023",
      reference: "UTR Number",
      mode: "UPI",
      utr: "565554",
      amount: "-16,458",
    },
    {
      CatId: 1003,
      date: "Nov 15, 2023",
      reference: "UTR Number",
      mode: "UPI",
      utr: "985825",
      amount: "-9,045",
    },
  ]);

  const [balance, setBalance] = useState(0);

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
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      console.log("Statement");
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
  const clearInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
  };
  const handleActivity = () => {
    clearInactivityTimer();
    startTimer();
  };
  React.useEffect(() => {
    startTimer();
    const fetchData = async () => {
      try {
        const x = await AsyncStorage.getItem("userDetails");
        const y = JSON.parse(x);
        setBalance(y.savingAccount);
        setData((e) => [
          {
            CatId: 1003,
            date: "Nov 10, 2023",
            reference: "UTR Number",
            mode: "UPI",
            utr: "985825",
            amount: y.savingAccount,
          },
          ...e,
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
      style={{ backgroundColor: "#f1f1f1", height: "100%" }}
    >
      <StatusBar animated={true} backgroundColor="#FF1715" style="light" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            handleActivity();
            navigation.navigate("Home");
          }}
          style={{ width: 40, height: 30 }}
        >
          <Image
            style={{ width: 20, height: 20, marginTop: 5 }}
            source={require("../assets/back-arrow.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={{ fontSize: 18 }}>Account</Text>
      </View>
      <View style={styles.MainCard}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Text
            style={{
              width: "60%",
              fontSize: 18,
              color: "#5a5a5a",
              fontWeight: "500",
            }}
          >
            Balance
          </Text>
          <View style={{ width: "40%", flexDirection: "row-reverse" }}>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#5a5a5a" }}>
              {balance ? formatIndian(balance) : ""} INR
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", width: "100%", marginTop: 15 }}>
          <Text style={{ fontSize: 14, color: "#5a5a5a" }}>Account :</Text>
          <Text style={{ marginLeft: 8, fontSize: 14, color: "#5a5a5a" }}>
            897526221562
          </Text>
        </View>
      </View>

      <View style={styles.StatementCard}>
        <Text
          style={{
            width: "100%",
            fontSize: 18,
            color: "#5a5a5a",
            fontWeight: "500",
            marginBottom: 5,
          }}
        >
          Transaction History
        </Text>
        <FlatList
          data={Data}
          persistentScrollbar
          showsVerticalScrollIndicator={true}
          style={{ height: "70%" }}
          renderItem={({ item }) => {
            return (
              <View style={styles.StateCard}>
                <View style={{ width: "70%" }}>
                  <Text style={styles.StatementDate}>{item.date}</Text>
                  <Text style={styles.StatementOutput}>
                    Payment by {item.mode}
                  </Text>
                  <Text style={styles.CategoryText}>
                    {item.reference} {item.utr}XXXXX
                  </Text>
                </View>
                <View style={{ width: "30%", flexDirection: "row-reverse" }}>
                  <Text>
                    {item.amount ? formatIndian(item.amount) : ""} INR
                  </Text>
                </View>
              </View>
            );
          }}
          numColumns={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  MainCard: {
    backgroundColor: "#fff",
    padding: 18,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 8,
    borderRadius: 5,
    borderColor: "#E9E9E9",
    borderWidth: 1,
  },
  StatementCard: {
    backgroundColor: "#fff",
    padding: 18,
    margin: 6,
    borderRadius: 5,
    borderColor: "#E9E9E9",
    borderWidth: 1,
  },
  StateCard: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    borderTopColor: "#EAEAEA",
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 5,
    marginTop: 10,
  },
  StatementDate: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "500",
  },
  StatementOutput: {
    fontSize: 14,
    marginBottom: 6,
  },
  CategoryText: {
    color: "#5A5A5A",
    fontSize: 12,
  },
  header: {
    alignItems: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 18,
    marginTop: 38,
    flexDirection: "row",
    width: "100%",
  },
});

export default Statement;
