import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { RatingInput } from "react-native-stock-star-rating";
import { useRoute } from "@react-navigation/native";
import { useEffect, useContext, useState } from "react";

import Restaurants from "../../navigation/Restaurants";
import NetworkImage from "../../components/NetworkImage";
import { SIZES, COLORS } from "../../constants/theme";

import { UserLocationContext } from "../../context/UserLocationContext";

import GoogleApiServices from "../../hook/GoogleApiServices";

const Restaurant = ({ navigation }) => {
  const { location, setLocation } = useContext(UserLocationContext);
  const [distanceTime, setDistanceTime] = useState({});
  useEffect(() => {
    GoogleApiServices.calculateDistanceAndTime(
      location?.coords?.latitude,
      location?.coords?.longitude,
      item?.coords?.latitude,
      item?.coords?.longitude
    ).then((data) => {
      if (data) {
        setDistanceTime(data);
      }
    });
  }, []);

  const route = useRoute();

  const item = route.params;

  const totalTime =
    GoogleApiServices.extractNumbers(distanceTime.duration)[0] +
    GoogleApiServices.extractNumbers(item.time)[0];

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.shareBtn}
        >
          <MaterialCommunityIcons
            name="share-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <NetworkImage
          data={item.imageUrl}
          height={SIZES.height / 3.4}
          width={SIZES.width}
        />
        <View style={styles.rating}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 12,
            }}
          >
            <RatingInput rating={Number(item.rating)} size={20} />
            <TouchableOpacity
              style={{
                borderColor: COLORS.lightWhite,
                borderWidth: 1,
                borderRadius: 9,
                padding: 6,
              }}
              onPress={() => navigation.navigate("rating")}
            >
              <Text>Rate store</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 8, marginHorizontal: 8, marginBottom: 10 }}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.small, { color: COLORS.gray }]}>Distance</Text>
          <Text style={[styles.small, { fontFamily: "regular" }]}>
            {distanceTime.distance}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.small, { color: COLORS.gray }]}>
            Delivery Time
          </Text>

          <Text style={[styles.small, { fontFamily: "regular" }]}>
            {totalTime} mins
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.small, { color: COLORS.gray }]}>Cost</Text>

          <Text style={[styles.small, { fontFamily: "regular" }]}>
            {distanceTime.finalPrice}
          </Text>
        </View>
      </View>
      <View style={{ height: 600 }}>
        <Restaurants />
      </View>
    </View>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  backBtn: {
    marginLeft: 12,
    alignItems: "center",
    zIndex: 999,
    top: SIZES.xxLarge,
    position: "absolute",
  },
  title: {
    fontSize: 22,
    fontFamily: "medium",
    color: COLORS.black,
  },
  small: {
    fontSize: 13,
    fontFamily: "medium",
    color: COLORS.black,
  },
  shareBtn: {
    marginRight: 12,
    alignItems: "center",
    zIndex: 999,
    right: 0,
    top: SIZES.xxLarge,
    position: "absolute",
  },
  rating: {
    height: 50,
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    backgroundColor: "",
    zIndex: 999,
    bottom: 0,
    borderRadius: 15,
  },
});
