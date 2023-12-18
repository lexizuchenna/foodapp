import { StyleSheet, Text, View, FlatList } from "react-native";
import { useContext } from "react";

import Store from "./Store";
import Restaurants from "../navigation/Restaurants";
import { RestaurantContext } from "../context/RestaurantContext";

import uidata from "../constants/uidata";
import { useNavigation } from "@react-navigation/native";

const NearbyRestaurants = () => {
  const navigation = useNavigation();

  const { restaurant, setRestaurant } = useContext(RestaurantContext);

  const handlePress = (item) => {
    navigation.navigate("restaurant", item);
    setRestaurant(item);
  };
  return (
    <View style={styles.head}>
      <FlatList
        data={uidata.restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        scrollEnabled
        renderItem={({ item }) => (
          <Store item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
};

export default NearbyRestaurants;

const styles = StyleSheet.create({
  head: {
    marginLeft: 12,
    marginTop: 10,
  },
  list: {
    marginTop: 5,
    rowGap: 10,
  },
});
