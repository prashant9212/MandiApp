import React from "react";
import { Dimensions, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Forgot from "./Components/Forgot";
import Dashboard from "./Components/Dashboard";
import Statement from "./Components/Statement";
import Payment from "./Components/Payment";
import AmtTransfer from "./Components/AmtTransfer";
import DataSubmit from "./Components/DataSubmit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./Components/SplashScreen";
import Beneficiary from "./Components/Beneficiary";
import AddBeneficiary from "./Components/AddBeneficiary";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Beneficiary"
          component={Beneficiary}
          options={{ title: "Beneficiary" }}
        />
        <Stack.Screen
          name="AddBeneficiary"
          component={AddBeneficiary}
          options={{ title: "Add Beneficiary" }}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="AmtTransfer"
          component={AmtTransfer}
          options={{ title: "AmtTransfer" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{ title: "Forgot" }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ title: "Payment" }}
        />
        <Stack.Screen
          name="Statement"
          component={Statement}
          options={{ title: "Statement" }}
        />
        <Stack.Screen
          name="DataSubmit"
          component={DataSubmit}
          options={{ title: "DataSubmit" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
