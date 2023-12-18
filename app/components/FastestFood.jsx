import { StyleSheet, Text, View, FlatList } from "react-native";

import Food from "./Food";

import uidata from "../constants/uidata";

const FastestFood = () => {
  const renderItem = ({ item }) => <Food item={item} onPress={() => {}} />;
  return (
    <View style={styles.head}>
      <FlatList
        data={uidata.restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        scrollEnabled
        renderItem={renderItem}
      />
    </View>
  );
};

export default FastestFood;

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
