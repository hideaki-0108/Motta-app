import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
} from "react-native";

const window = Dimensions.get("window");
const width = window.width - 100; // padding領域を考慮
const height = window.height;

export default function WeatherComment({ currentWeather }) {
  const weather = currentWeather.daily[0].weather[0].main;
  const { comments } = require("../assets/deta/comment.json");
  const comment = comments[weather];

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/mainkyara.png")}
        style={styles.characterImg}
      />
      <ImageBackground
        source={require("../assets/img/hukidashi.png")}
        style={styles.hukidashi}
      >
        <Text style={styles.hukidashiText}>{comment}</Text>
      </ImageBackground>
    </View>
  );
}

WeatherComment.propTypes = {
  currentWeather: PropTypes.shape({
    daily: PropTypes.arrayOf(
      PropTypes.shape({
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            main: PropTypes.string.isRequired,
          }),
        ).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7E9F3",
    width: "100%",
  },
  characterImg: {
    position: "absolute",
    width: width / 2,
    height: width / 2,
    bottom: height / 16,
    left: 50,
  },
  hukidashi: {
    flex: 1,
    position: "absolute",
    width: width / 1.5,
    height: width / 3.2,
    bottom: height / 6,
    left: width / 1.5 - 30,
  },
  hukidashiText: {
    flex: 1,
    marginTop: width / 10,
    marginLeft: width / 20,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    color: "#4A5A72",
    fontSize: width / 20,
    lineHeight: width / 10,
    fontWeight: "bold",
  },
});
