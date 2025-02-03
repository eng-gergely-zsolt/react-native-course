import Spacer from "../components/Spacer";
import { Text, Input, Button } from "@rneui/themed";
import React, { useState, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { StyleSheet, View, TouchableOpacity } from "react-native";
 
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { state, signup } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up for Tracker</Text>
      </Spacer>

      <Input
        label="Email"
        value={email}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <Spacer />

      <Input
        secureTextEntry
        label="Password"
        value={password}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={setPassword}
      />

      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}

      <Spacer>
        <Button title="Sign Up" onPress={() => signup({ email, password })} />
      </Spacer>

      <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
        <Text>Already have an account? Sign in instead.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
  },
});

export default SignupScreen;
