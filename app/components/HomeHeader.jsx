import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

import AssetImage from "./AssetImage";
import { COLORS, SIZES } from "../constants/theme";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { UserLocationContext } from "../context/UserLocationContext";

const HomeHeader = () => {
  const { address, setAddress } = useContext(UserReversedGeoCode);
  const { location, setLocation } = useContext(UserLocationContext);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (location !== null) {
      reverseGeoCode(location.coords.longitude, location.coords.latitude);
    }
  }, [location]);

  const reverseGeoCode = async (longitude, latitude) => {
    const reversedAddress = await Location.reverseGeocodeAsync({
      longitude,
      latitude,
    });
    setAddress(reversedAddress[0]);
    const greeting = getTimeOfDay();
    setTime(greeting);
  };

  const getTimeOfDay = () => {
    const date = new Date();

    const hrs = date.getHours();

    if (hrs >= 0 && hrs < 12) {
      return "Sun";
    } else {
      return "Moon";
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={styles.outerStyle}>
        <AssetImage
          data={require("../../assets/images/profile.jpg")}
          width={50}
          height={50}
          mode="cover"
          radius={100}
        />
        <View style={styles.headerText}>
          <Text style={styles.heading}>Delivering to</Text>
          <Text
            style={styles.location}
          >{`${address?.city}, ${address?.region}, ${address?.isoCountryCode}`}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 20 }}> {time} </Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  headerText: {
    marginLeft: 15,
    justifyContent: "center",
  },
  heading: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  location: {
    fontFamily: "regular",
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
});
