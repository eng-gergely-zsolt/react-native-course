import React, { useContext } from "react";
import NavLink from "../components/NavLink";
import AuthForm from "../components/AuthForm";
import { View, StyleSheet } from "react-native";
import { Context } from "../context/AuthContext";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(Context);

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
        onSubmit={signin}
        submitButtonText="Sign In"
        errorMessage={state.errorMessage}
        headerText="Sign In to Your Account"
      />

      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead!"
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

export default SigninScreen;
