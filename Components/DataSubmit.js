import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DataSubmit = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <StatusBar animated={true} backgroundColor="#FF1715" style="light" />
      <View style={{ alignItems: "center", paddingTop: 100 }}>
        <Text
          style={{
            fontSize: 26,
            color: "#000",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
          }}
        >
          Your details are {"\n"} Successfully Submitted.
        </Text>
        <Image
          style={{
            resizeMode: "cover",
            width: 100,
            height: 100,
            marginTop: 70,
            marginBottom: 70,
          }}
          source={require("../assets/check.png")}
        ></Image>
        <View>
          <Text
            style={{
              fontSize: 18,
              color: "#000",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              textAlignVertical: "center",
              alignSelf: "center",
            }}
          >
            Wait 30 Minutes for
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#179c5f",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              textAlignVertical: "center",
              alignSelf: "center",
              fontWeight: "500",
            }}
          >
            Account Activation
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DataSubmit;

const styles = StyleSheet.create({});
