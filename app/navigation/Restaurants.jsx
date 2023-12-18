import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useState } from "react";

import Menu from "../screens/restaurant/Menu";
import Directions from "../screens/restaurant/Directions";
import New from "../screens/restaurant/New";


const renderScene = SceneMap({
  first: Menu,
  second: Directions,
  third: New,
});

const Restaurants = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Menu" },
    { key: "second", title: "Directions" },
    { key: "third", title: "New" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Restaurants;

const styles = StyleSheet.create({});
