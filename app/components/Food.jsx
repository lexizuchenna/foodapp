import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import NetworkImage from "./NetworkImage";

import { COLORS, SIZES } from "../constants/theme";

const Food = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <NetworkImage
        data={item.imageUrl[0]}
        width={SIZES.width - 60}
        height={SIZES.height / 5.8}
        radius={16}
        mode="cover"
      />
      <Text style={styles.heading}>{item.title}</Text>
      <Text style={styles.small}>{item.time} - delivery time</Text>
      {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.small}>Delivery under</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <RatingInput
          rating={item.rating}
          size={14}
          maxStars={5}
          setRating={item.rating}
          bordered={false}
          color={COLORS.primary}
        />
        <Text style={styles.small}>{item.ratingCount} ratings</Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default Food;

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 15,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
  },
  heading: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  small: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.gray,
  },
});
