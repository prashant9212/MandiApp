import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Text, View } from "react-native";

export default SplashScreen = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    const fetchToken = async () => {
      try {
        const at = await AsyncStorage.getItem("login");
        if (at)
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        else
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
      } catch (error) {}
    };
    fetchToken();
  }, []);
  return (
    <View
      style={{
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome</Text>
    </View>
  );
};
