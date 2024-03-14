import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Payment from "./Payment";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Statement from "./Statement";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Home "
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#FF1715",
          tabBarInactiveTintColor: "#5a5a5a",
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 6,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} style={{ fontSize: 20, }} />
          ),
        }}
      />
      <Tab.Screen
        name="Statement"
        component={Statement}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#FF1715",
          tabBarInactiveTintColor: "#5a5a5a",
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 6,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-outline" color={color} style={{ fontSize: 20, }} />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#FF1715",
          tabBarInactiveTintColor: "#5a5a5a",
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 6,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="currency-inr" color={color} style={{ fontSize: 20, }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#FF1715",
          tabBarInactiveTintColor: "#5a5a5a",
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 6,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} style={{ fontSize: 20, }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
