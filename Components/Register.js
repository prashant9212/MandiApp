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
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast, validateEmail } from "../Api/common";
import { registerApi } from "../Api/registerApi";

const Register = ({ navigation }) => {
  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      showToast("Email invalid");
      return null;
    }
    if (password !== confPassword) {
      showToast("Passwords dont match");
      return null;
    }
    const response = await registerApi(
      name,
      address,
      city,
      email,
      mobile,
      password,
      username
    );
    if (response.status) {
      navigation.navigate("DataSubmit");
    } else showToast(response.message);
  };
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confPassword, setConfPassword] = React.useState("");

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <StatusBar animated={true} backgroundColor="#FF1715" style="light" />
      <View style={styles.container}>
        <View style={{ height: 60 }}>
          <Text style={styles.welcome}>Create Account</Text>
        </View>
        <ScrollView>
          <KeyboardAvoidingView style={styles.SafeArea}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
            />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Address"
            />
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="City"
            />
            <TextInput
              style={styles.input}
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Email"
            />
            <TextInput
              value={mobile}
              onChangeText={setMobile}
              style={styles.input}
              placeholder="Mobile"
              maxLength={10}
              keyboardType="numeric"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
            <TextInput
              value={confPassword}
              onChangeText={setConfPassword}
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
            />
          </KeyboardAvoidingView>
        </ScrollView>
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
            Submit
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#000", textAlignVertical: "center" }}>
            {" "}
            Already a user?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
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
              Login
            </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 5,
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

export default Register;
