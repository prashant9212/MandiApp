import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi } from "../Api/loginApi";
import { showToast } from "../Api/common";

const Login = ({ navigation }) => {
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleSubmit = async () => {
    try {
      console.log(username, password);
      const response = await loginApi(username, password);
      if (response.status) {
        navigation.navigate("Home");
      } else {
        showToast(response.message);
      }
    } catch (error) {
      console.log("Error at login", error);
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <StatusBar animated={true} backgroundColor="#FF1715" style="light" />
      <View style={styles.container}>
        <Image
          style={{ resizeMode: "cover", width: 300, height: 150 }}
          source={require("../assets/logo.png")}
        ></Image>
        <View style={{ height: 100 }}>
          <Text style={styles.welcome}>Welcome to mandi</Text>
        </View>

        <SafeAreaView style={styles.SafeArea}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="User Id"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
            style={styles.buttonText}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                textTransform: "capitalize",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </SafeAreaView>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#000", textAlignVertical: "center" }}>
            {" "}
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text
              style={{
                color: "#FF1715",
                fontSize: 16,
                textTransform: "capitalize",
              }}
            >
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Forgot");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#FF1715",
              textAlignVertical: "center",
              textDecorationLine: "underline",
              marginTop: 30,
            }}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    marginTop: "25%",
  },
  welcome: {
    fontSize: 28,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
  },
  SafeArea: {
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    width: 250,
    height: 50,
    margin: 8,
    borderWidth: 1,
    borderColor: "#E3E2E2",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textTransform: "capitalize",
    color: "#fff",
    backgroundColor: "#FF1715",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 15,
    width: 250,
    height: 45,
    borderRadius: 5,
    fontSize: 18,
  },
});

export default Login;
