import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { CartCountContext } from "../context/CartCountContext";
import { COLORS, SIZES } from "../constants/theme";
import Counter from "./Counter";

const FoodPage = ({ route, navigation }) => {
  const { item } = route.params;

  const [isChecked, setIsChecked] = useState(false);
  const [additives, setAdditives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [restaurant, setRestaurant] = useState(1);
  const [count, setCount] = useState(1);
  const [preference, setPreference] = useState("");
  const { cartCount, setCartCount } = useContext(CartCountContext);

  let sendToOrderPage;
  const id = item.restaurant;

  const handleAdditivies = (additive) => {
    setAdditives((prev) => {
      const exists = prev.some((add) => add.id === additive.id);

      if (exists) {
        return prev.filter((add) => add.id !== additive.id);
      } else {
        console.log(additive);
        return [...prev, additive];
      }
    });
  };

  const handlePress = (item) => {
    const cartItem = {
      productId: item._id,
      additives,
      quantity: count,
      totalPrice: (item.price + totalPrice) * count,
    };

    addToCart(cartItem);
  };

  orderDetails = {
    orderItem: {
      foodId: item._id,
      additives,
      quantity: count,
      instructions: preference,
      price: (item.price + totalPrice) * count,
    },
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl[0],
    restaurant: id,
  };

  const addToCart = async (item) => {};

  useEffect(() => {
    (() => {
      const total = additives.reduce((sum, additive) => {
        return sum + parseFloat(additive.price);
      }, 0);

      setTotalPrice(total);
    })();
  }, [additives]);
  return (
    <View style={{ height: SIZES.height, backgroundColor: COLORS.lightWhite }}>
      <View>
        <Image source={{ uri: item.imageUrl[0] }} style={styles.image} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.shareBtn}
        >
          <MaterialCommunityIcons
            name="share-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.restBtn}
        >
          <View style={styles.restView}>
            <Text style={styles.restText}>Open the Store</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.title, { color: COLORS.primary }]}>
            {(item.price + totalPrice) * count}
          </Text>
        </View>
        <Text style={styles.desc}>{item.description}</Text>
        <FlatList
          data={item.foodTags}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 10 }}
          horizontal
          scrollEnabled
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.tagView}>
              <Text style={styles.tagText}> {item} </Text>
            </View>
          )}
        />

        <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}>
          Additives and Toppings
        </Text>
        <FlatList
          data={item.additives}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <BouncyCheckbox
                size={20}
                fillColor={COLORS.primary}
                unfillColor={COLORS.white}
                innerIconStyle={{ borderWidth: 1 }}
                textStyle={styles.desc}
                text={item.title}
                onPress={() => handleAdditivies(item)}
              />
              <Text style={styles.desc}> {item.price} </Text>
            </View>
          )}
        />

        <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}>
          Preferences
        </Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Add specific instructions"
            value={preference}
            onChangeText={(text) => setPreference(text)}
            autoCapitalize="none"
            autoComplete="off"
            style={{ flex: 1 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={[styles.title, { marginBottom: 10 }]}>Quantity</Text>
          <Counter count={count} setCount={setCount} />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={styles.suspended}>
          <View style={styles.cart}>
            <View style={styles.cartRow}>
              <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("order-page", orderDetails)}
                style={{
                  backgroundColor: COLORS.primary,
                  paddingHorizontal: 80,
                  borderRadius: 30,
                }}
              >
                <Text
                  style={[
                    styles.title,
                    {
                      color: COLORS.lightWhite,
                      marginTop: 8,
                      alignItems: "center",
                    },
                  ]}
                >
                  Order
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
                <Text
                  style={[
                    styles.title,
                    {
                      color: COLORS.lightWhite,
                      marginTop: 8,
                      alignItems: "center",
                    },
                  ]}
                >
                  {cartCount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodPage;

const styles = StyleSheet.create({
  heading: {
    backgroundColor: COLORS.lightWhite,
    height: SIZES.height,
  },
  image: {
    width: SIZES.width,
    height: SIZES.height / 4,
    borderBottomRightRadius: 30,
  },
  backBtn: {
    marginLeft: 12,
    alignItems: "center",
    zIndex: 999,
    top: SIZES.xxLarge,
    position: "absolute",
  },
  shareBtn: {
    marginRight: 12,
    alignItems: "center",
    zIndex: 999,
    right: 0,
    top: SIZES.xxLarge,
    position: "absolute",
  },
  restBtn: {
    position: "absolute",
    bottom: 20,
    right: 0,
  },
  restView: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  restText: {
    color: COLORS.lightWhite,
    fontFamily: "bold",
  },
  container: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "medium",
    color: COLORS.black,
  },
  desc: {
    fontSize: 13,
    fontFamily: "regular",
    color: COLORS.gray,
    textAlign: "justify",
  },
  tagView: {
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  tagText: {
    color: COLORS.lightWhite,
    paddingHorizontal: 4,
  },
  input: {
    borderColor: COLORS.primary1,
    borderWidth: 1,
    backgroundColor: COLORS.offwhite,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  suspended: {
    position: "absolute",
    zIndex: 999,
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  cart: {
    width: SIZES.width - 24,
    height: 60,
    justifyContent: "center",
    backgroundColor: COLORS.primary1,
    borderRadius: 30,
  },
  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
});
