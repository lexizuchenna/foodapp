import { StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Food from "./Food";

import uidata from "../constants/uidata";

const NewFoodList = () => {
  const navigation = useNavigation();
  const handlePress = (item) => navigation.navigate("food-nav", item);

  const renderItem = ({ item }) => <Food item={item} onPress={() => handlePress(item)} />
  

  return (
    <View style={styles.head}>
      <FlatList
        data={uidata.foods}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        scrollEnabled
        renderItem={renderItem}
      />
    </View>
  );
};

export default NewFoodList;

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
