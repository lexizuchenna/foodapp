import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";

import BottomTab from "./app/navigation/BottomTab";

import { UserLocationContext } from "./app/context/UserLocationContext";
import { UserReversedGeoCode } from "./app/context/UserReversedGeoCode";
import { CartCountContext } from "./app/context/CartCountContext";
import { RestaurantContext } from "./app/context/RestaurantContext";
import { UserContext } from "./app/context/UserContext";
import { LoginContext } from "./app/context/LoginContext";

import FoodNavigator from "./app/navigation/FoodNavigator";
import Restaurants from "./app/navigation/Restaurants";
import Restaurant from "./app/screens/restaurant/Restaurant";
import AddRating from "./app/screens/AddRating";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);

  const defaultAddresss = {
    city: "Nsukka",
    country: "China",
    district: "Pudong",
    isoCountryCode: "CN",
    name: "33 East Nanjing Rd",
    postalCode: "94108",
    region: "SH",
    street: "Stockton St",
    streetNumber: "1",
    subregion: "San Francisco County",
    timezone: "America/Los_Angeles",
  };
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const getLocation = async () => {
      setAddress(defaultAddresss);

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Need to allow permission");
        return true;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
    };

    getLocation();
  }, []);

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
  }

  const loginStatus = async () => {
    const userToken = await AsyncStorage.getItem("token")

    if(userToken !== null) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReversedGeoCode.Provider value={{ address, setAddress }}>
        <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
          <CartCountContext.Provider value={{ cartCount, setCartCount }}>
            <LoginContext.Provider value={{ login, setLogin }}>
              <UserContext.Provider value={{ user, setUser }}>
                <NavigationContainer>
                  <Stack.Navigator>
                    <Stack.Screen
                      name="bottom-navigation"
                      component={BottomTab}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="food-nav"
                      component={FoodNavigator}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="restaurant-page"
                      component={Restaurants}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="restaurant"
                      component={Restaurant}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="rating"
                      component={AddRating}
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </UserContext.Provider>
            </LoginContext.Provider>
          </CartCountContext.Provider>
        </RestaurantContext.Provider>
      </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}
