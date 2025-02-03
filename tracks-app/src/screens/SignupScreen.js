import React, { useContext } from "react";
import NavLink from "../components/NavLink";
import AuthForm from "../components/AuthForm";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  React.useEffect(() => {
    // Screen was unfocused.
    const unsubscribe = navigation.addListener("blur", () => {
      clearErrorMessage();
    });
    return unsubscribe;
  }, [navigation, clearErrorMessage]);

  return (
    <View style={styles.container}>
      <AuthForm
        onSubmit={signup}
        submitButtonText="Sign Up"
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
      />

      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
      />
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
});

export default SignupScreen;
