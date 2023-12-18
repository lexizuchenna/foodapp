import { StyleSheet, Image } from "react-native";
import React from "react";

const NetworkImage = ({ size, data, width, height, radius }) => {
  return (
    <Image source={{ uri: data }} style={styles.image(width, height, radius)} />
  );
};

export default NetworkImage;

const styles = StyleSheet.create({
  image: (width, height, radius, mode) => ({
    width: width,
    height: height,
    borderRadius: radius,
    resizeMode: mode,
  }),
});
