import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const width = window.width - 100;
const height = window.height;

export default function WeatherTemp({ currentWeather }) {
  const {
    current: { temp },
  } = currentWeather;

  const formattedTemp = Math.round(temp * 10) / 10;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formattedTemp}°C</Text>
    </View>
  );
}

WeatherTemp.propTypes = {
  currentWeather: PropTypes.shape({
    current: PropTypes.shape({
      temp: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#4A5A72",
    fontWeight: "400",
    fontSize: width / 7,
    justifyContent: "flex-end",
  },
});
