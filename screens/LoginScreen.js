// screens/LoginScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://smiling-ruby-gosling.cyclic.app/api/v1/login",
        {
          email,
        }
      );
      if (response.data.data) {
        navigation.navigate("Home", { userData: response.data.data[0] });
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default LoginScreen;
