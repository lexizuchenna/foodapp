import { FlatList, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { RatingInput } from "react-native-stock-star-rating";

import { RestaurantContext } from "../../context/RestaurantContext";
import uidata from "../../constants/uidata";
import { COLORS, SHADOWS } from "../../constants/theme";
import NetworkImage from "../../components/NetworkImage";

const Menu = () => {
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  const navigation = useNavigation();

  const handlePress = () => {};

  return (
    <View style={{ marginTop: 5 }}>
      <FlatList
        data={uidata.foods}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5 }}
        keyExtractor={(item) => item._id}
        scrollEnabled
        renderItem={({ item }) => (
          <View style={styles.wrapper}>
            <View style={{ flexDirection: "row" }}>
              <NetworkImage
                data={item.imageUrl[0]}
                height={75}
                width={75}
                radius={15}
              />
              <View style={{marginLeft: 10, marginTop: 5}}>
                <Text>{item.title}</Text>
                <RatingInput rating={Number(item.rating)} size={20} />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.offwhite,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    marginRight: 10,
    shadowColor: SHADOWS.medium,
  },
});
