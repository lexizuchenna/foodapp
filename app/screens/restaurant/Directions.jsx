import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import { useContext } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import GoogleMapView from "../../components/GoogleMapView";
import { COLORS, SIZES } from "../../constants/theme";

const Directions = () => {
  const { restaurant, setRestaurant } = useContext(RestaurantContext);

  const coords = restaurant.coords;

  const handleDirection = () => {
    const url = Platform.select({
      ios: "maps:" + coords.latitude + "," + coords.longitude,
      android: "geo:" + coords.latitude + "," + coords.longitude + "?z=16",
    });

    Linking.openURL(url);
  };
  return (
    <View>
      <GoogleMapView placeList={coords} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 12,
        }}
      >
        <Text style={[styles.small, { width: SIZES.width / 1.6 }]}>
          {coords.address}
        </Text>
        <TouchableOpacity style={styles.rating} onPress={handleDirection}>
          <Text>Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Directions;

const styles = StyleSheet.create({
  small: {
    fontSize: 13,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  rating: {
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 9,
    padding: 6,
  },
});
