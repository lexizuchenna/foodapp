import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import FoodPage from "../components/FoodPage";
import OrderPage from "../components/OrderPage";

const Stack = createNativeStackNavigator();

const FoodNavigator = () => {
  const route = useRoute();
  const item = route.params;
  return (
    <Stack.Navigator initialRouteName="food-page">
      <Stack.Screen
        name="food-page"
        component={FoodPage}
        options={{ headerShown: false }}
        initialParams={{ item }}
      />
      <Stack.Screen
        name="order-page"
        component={OrderPage}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default FoodNavigator;

const styles = StyleSheet.create({});
