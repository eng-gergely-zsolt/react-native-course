import trackerApi from "../api/tracker";
import { navigate } from "../RootNavigation";
import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    dispatch({ type: "signin", payload: token });

    navigate("Home");
  } else {
    navigate("Signup");
  }
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });

      await AsyncStorage.setItem("token", response.data.token);

      dispatch({ type: "signin", payload: response.data.token });

      navigate("Home");
    } catch (err) {
      console.log(err);

      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });

      await AsyncStorage.setItem("token", response.data.token);

      dispatch({ type: "signin", payload: response.data.token });

      navigate("Home");
    } catch (err) {
      console.log(err);

      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };

const signout = (dispatch) => {
  return () => {
    // Somehow sign out.
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, tryLocalSignin, clearErrorMessage },
  { token: null, errorMessage: "" }
);
