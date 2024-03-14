import React from "react";
import { Text, View, StyleSheet, Image, SafeAreaView, TextInput, TouchableHighlight, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";


const Login = ({ navigation }) => (
  <View style={{backgroundColor:'#fff', height:'100%'}}>
    <StatusBar animated={true} backgroundColor="#FF1715" style="light" />
    <View style={styles.container}>
      <Image style={{ resizeMode: 'cover', width: 300, height: 150 }} source={require('../assets/logo.png')}></Image>

      <View style={{ height: 100 }}>
        <Text style={styles.welcome}>Forgot Password</Text>
      </View>

      <SafeAreaView style={styles.SafeArea}>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          secureTextEntry={true}
        //keyboardType="numeric"
        />
        <TouchableOpacity style={styles.buttonText}>
          <Text style={{ color: '#fff', fontSize: 16, textTransform: 'capitalize' }}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: '#000', textAlignVertical: 'center', }}> Already a user? </Text>
        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
          <Text style={{ color: '#FF1715', fontSize: 16, textTransform: 'capitalize', }}> Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginTop: "25%"
  },
  welcome: {
    fontSize: 28,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
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
    borderColor: '#E3E2E2',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textTransform: "capitalize",
    color: '#fff',
    backgroundColor: '#FF1715',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 15,
    width: 250,
    height: 45,
    borderRadius: 5,
    fontSize: 18,
  },
});

export default Login;
