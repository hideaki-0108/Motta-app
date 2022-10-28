import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const window = Dimensions.get("window");
const width = window.width; //padding領域を入れているため
const height = window.height;

const AddGifImage = () => {
  return (
    <View style={Styles.container}>
      <Image
        source={require("../assets/img/logo.png")}
        style={{
          width: 180,
          height: 50,
          position: "absolute",
          top: height / 3,
          left: width / 3.7,
        }}
      ></Image>
      <Image
        style={{
          width: 200,
          height: 200,
          position: "absolute",
          top: height / 2,
          left: width / 4.3,
        }}
        source={require("../assets/img/birdgif.gif")}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#E9F3F7",
    alignContent: "center",
  },
});

export default AddGifImage;
