import React, { useContext } from "react";
import { Context } from "../context/BlogContext";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";

const ShowScreen = ({ route }) => {
  const { id } = route.params;

  const navigation = useNavigation();

  const { state } = useContext(Context);

  const blogPost = state.find((blogPost) => blogPost.id === id);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Edit", { id: id })}
        >
          <FontAwesome name="edit" size={30} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View>
      <Text>{blogPost.title}</Text>

      <Text>{blogPost.content}</Text>
    </View>
  );
};

export default ShowScreen;
