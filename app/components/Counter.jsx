import { StyleSheet, Text, View } from "react-native";
import {AntDesign} from "@expo/vector-icons"
import { COLORS } from "../constants/theme";

const Counter = ({ count, setCount }) => {
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => {
    if(count > 1) setCount((prev) => prev - 1);
  };
  return (
    <View style={styles.container}>
      <AntDesign name="minuscircleo" size={26} color={COLORS.primary} onPress={decrement} />
      <Text style={styles.text}>{count}</Text>
      <AntDesign name="pluscircleo" size={26} color={COLORS.primary} onPress={increment} />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent:"flex-start"
  },
  text: {
    fontFamily: "medium", fontSize: 20, marginTop: 1, marginHorizontal:10
  }
});
