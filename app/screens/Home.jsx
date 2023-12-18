import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

import pages from "./page.style";

import HomeHeader from "../components/HomeHeader";
import CategoryList from "../components/CategoryList";
import ChoicesList from "../components/ChoicesList";
import Heading from "../components/Heading";
import NearbyRestaurants from "../components/NearbyRestaurants";
import NewFoodList from "../components/NewFoodList";
import FastestFood from "../components/FastestFood";
import Divider from "../components/Divider";

import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { UserLocationContext } from "../context/UserLocationContext";
import uidata from "../constants/uidata";

const Home = () => {
  // const { address, setAddress } = useContext(UserReversedGeoCode);
  // const { location, setLocation } = useContext(UserLocationContext);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
          >
            <CategoryList
              setSelectedCategory={setSelectedCategory}
              setSelectedSection={setSelectedSection}
              setSelectedValue={setSelectedValue}
            />

            <ChoicesList
              setSelectedSection={setSelectedSection}
              setSelectedChoice={setSelectedChoice}
            />
            <View>
              <Heading heading="Nearby Restaurants" onPress={() => {}} />
              <NearbyRestaurants />
              <Divider />
              <Heading heading="Try Something New" onPress={() => {}} />
              <NewFoodList />
              <Divider />
              <Heading heading="Fastest Near to You" onPress={() => {}} />
              <FastestFood />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scroll: {
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
});
