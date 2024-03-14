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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { INACTIVITY_INTERVAL, initialData, showToast } from "../Api/common";
import { useFocusEffect } from "@react-navigation/native";

const Profile = ({ navigation }) => {
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

  const [userDetails, setUserDetails] = useState(initialData);
  React.useEffect(() => {
    const get = async () => {
      const res = await AsyncStorage.getItem("userDetails");
      if (res) setUserDetails(JSON.parse(res));
      else showToast("Error fetching data");
    };
    get();
  }, []);
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
              source={require("../assets/edit.png")}
            ></Image>
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 26, fontWeight: "500", color: "#fff" }}>
            User Profile
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
        <View style={styles.List}>
          <MaterialCommunityIcons
            name="account-outline"
            style={{ fontSize: 22, paddingRight: 15, color: "#5A5A5A" }}
          />
          <Text style={{ width: "70%", fontSize: 17, color: "#5A5A5A" }}>
            {userDetails.fullName}
          </Text>
        </View>

        <View style={styles.List}>
          <MaterialCommunityIcons
            name="cellphone"
            style={{ fontSize: 22, paddingRight: 15, color: "#5A5A5A" }}
          />
          <Text style={{ width: "70%", fontSize: 17, color: "#5A5A5A" }}>
            +91-{userDetails.mobile}
          </Text>
        </View>

        <View style={styles.List}>
          <MaterialCommunityIcons
            name="email-mark-as-unread"
            style={{ fontSize: 22, paddingRight: 15, color: "#5A5A5A" }}
          />
          <Text style={{ width: "70%", fontSize: 17, color: "#5A5A5A" }}>
            {userDetails.email}
          </Text>
        </View>

        <View style={styles.List}>
          <MaterialCommunityIcons
            name="home"
            style={{ fontSize: 22, paddingRight: 15, color: "#5A5A5A" }}
          />
          <Text style={{ width: "70%", fontSize: 17, color: "#5A5A5A" }}>
          {userDetails.address}
          </Text>
        </View>

        <View style={styles.List}>
          <MaterialCommunityIcons
            name="home"
            style={{ fontSize: 22, paddingRight: 15, color: "#5A5A5A" }}
          />
          <Text style={{ width: "70%", fontSize: 17, color: "#5A5A5A" }}>
          {userDetails.city}
          </Text>
        </View>

        <TouchableOpacity onPress={LogOut}>
          <View style={styles.List}>
            <MaterialCommunityIcons
              name="logout"
              style={{ fontSize: 22, paddingRight: 15, color: "#5A5A5A" }}
            />
            <Text style={{ width: "70%", fontSize: 17, color: "#5A5A5A" }}>
              Logout
            </Text>
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
    width: "100%",
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
  },
});

export default Profile;
