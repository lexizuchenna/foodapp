import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/theme";

const Heading = ({ heading, onPress }) => {
  return (
    <View style={styles.heading}>
      <Text style={styles.text}>{heading}</Text>
      <Pressable onPress={onPress}>
        <Ionicons name="grid" size={20} color={COLORS.secondary} />
      </Pressable>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 7,
    justifyContent: "space-between",
    marginRight: 16,
  },
  text: {
    marginLeft: 16,
    fontSize: 18,
    fontFamily: "bold",
  },
});
