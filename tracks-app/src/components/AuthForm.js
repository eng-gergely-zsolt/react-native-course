import React, { useState } from "react";
import Spacer from "../components/Spacer";
import { StyleSheet } from "react-native";
import { Text, Input, Button } from "@rneui/themed";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  return (
    <>
      <Text h3>{headerText}</Text>

      <Spacer />

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

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <Spacer />

      <Button
        title={submitButtonText}
        onPress={() => onSubmit({ email, password })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    fontSize: 16,
  },
});

export default AuthForm;
