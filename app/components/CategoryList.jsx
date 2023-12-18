import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import uidata from "../constants/uidata";
import CategoryItem from "./CategoryItem";

const CategoryList = ({
  setSelectedCategory,
  setSelectedSection,
  setSelectedValue,
}) => {
  const [selected, setSelected] = useState(null);
  const categories = [1, 2, 3, 4, 5];

  const handleSelectedCategory = (item) => {
    if (selected === item.value) {
      setSelectedCategory(null);
      setSelected(null);
      setSelectedSection(null);
      setSelectedValue(null);
    } else {
      setSelectedCategory(item._id);
      setSelected(item.value);
      setSelectedSection("category");
      setSelectedValue(item.title);
    }
  };
  return (
    <View>
      <FlatList
        data={uidata.categories}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ marginTop: 5 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectedCategory(item)}>
            <CategoryItem category={item} selected={selected} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({});
