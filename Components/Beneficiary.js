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
  Alert,
  RefreshControl
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { INACTIVITY_INTERVAL, initialData, showToast } from "../Api/common";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { getBeneficiaries } from "../Api/beneficiaryApi";

const Beneficiary = ({ navigation }) => {
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


  const [beneficiaries, setBeneficiaries] = useState([]);
  const getData = async (isRefresh) => {
    try {
      if (isRefresh)
        setLoading(true)
      const res = await getBeneficiaries();
      if (res.status) {
        let sortedBeneficiaries = res.payload.sort((a, b) => Number(b.intBid) - Number(a.intBid));
        setBeneficiaries(sortedBeneficiaries);
      }
      else
        showToast(res.message);
    } catch (error) {
      console.log(error, "at Components/Beneficiary.js")
    }
    finally {
      if (isRefresh)
        setLoading(false)
    }
  }
  const [loading, setLoading] = useState(false);
  React.useEffect(() => { getData(true) }, [])
  useFocusEffect(React.useCallback(() => {
    getData(false).then()
  }, []))



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
          <Text style={{ fontSize: 22, fontWeight: "500", color: "#fff" }}>
            View/Manage Beneficiary
          </Text>
        </View>
      </View>

      {/* Start List */}
      <View
        style={{
          //backgroundColor: "#fff",
          minHeight: 100,
          padding: 12,
          margin: 6,
          marginBottom: 0,
          borderRadius: 5,
          //borderColor: "#E9E9E9",
          //borderWidth: 1,
        }}
      >
        {/* <View style={styles.List}>
          <MaterialCommunityIcons
            name="account-outline"
            style={{ fontSize: 22, paddingRight: 15, color: "#5A5A5A" }}
          />
          <Text style={{ width: "70%", fontSize: 17, color: "#5A5A5A" }}>
            {userDetails.fullName}
          </Text>
        </View> */}

        <View style={{ flexDirection: "row", width: "100%" }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("AddBeneficiary", { edit: false, sameBank: true });
          }}>
            <View style={{
              width: 140,
              height: 45,
              backgroundColor: "#FF1715",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              textAlignVertical: "center",
              alignSelf: "center",
              borderRadius: 10,
              margin: 15
            }}>
              <Text style={{ fontSize: 17, color: "#fff" }}>
                Same Bank
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate("AddBeneficiary", { edit: false, sameBank: false });
          }}>
            <View style={{
              width: 140,
              height: 45,
              backgroundColor: "#FF1715",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              textAlignVertical: "center",
              alignSelf: "center",
              borderRadius: 10,
              margin: 15
            }}>
              <Text style={{ fontSize: 17, color: "#fff" }}>
                Other Bank
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

      <View>
        <Text
          style={{
            padding: 12,
            fontSize: 20
          }}>Beneficiary List</Text>
        <View
          style={{
            backgroundColor: "#fff",
            minHeight: 500,
            padding: 12,
            borderRadius: 5,
            borderColor: "#E9E9E9",
            borderWidth: 1,
            display: 'flex',
          }}
        >

          {/* List Start */}
          <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={async () => {
            setBeneficiaries([]);
            getData(true).then()
          }} />} style={{ flex: 1 }} >
            {beneficiaries.map((item, index) => {
              return <View
                key={index}
                style={{
                  flexDirection: "row",
                  width: "100%",
                  backgroundColor: "#F4F4F4",
                  borderColor: "#E8E8E8",
                  borderWidth: 1,
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 12
                }}
              >
                <View style={{ width: "75%" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#000",
                      paddingTop: 4,
                      paddingBottom: 4,

                    }}
                  >
                    {item?.recipientName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#8A8A8A",
                      paddingTop: 4,
                      paddingBottom: 4
                    }}
                  >
                    Account No: {item.accountNumber}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#8A8A8A",
                      paddingTop: 4,
                      paddingBottom: 4
                    }}
                  >
                    IFSC: {item.ifscCode}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AddBeneficiary", { edit: true, user: item, });
                  }}
                >
                  <Text style={{
                    width: 85,
                    height: 36,
                    backgroundColor: "#FF1715",
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    textAlignVertical: "center",
                    alignSelf: "center",
                    borderRadius: 10,
                    marginTop: 25,
                    color: "#fff",
                    fontSize: 14
                  }}
                  >
                    Modify
                  </Text>
                </TouchableOpacity>
              </View>
            })
            }
            {beneficiaries.length === 0 && <Text>Loading...</Text>}
          </ScrollView>
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
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: "#E8E6E6",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default Beneficiary;
