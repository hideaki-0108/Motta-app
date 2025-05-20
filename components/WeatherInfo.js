import { View, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { itemImages } from "../assets/deta/imageSource";

const window = Dimensions.get("window");
const width = window.width - 100;

export default function WeatherInfo({ currentWeather }) {
  const {
    current: { weather },
  } = currentWeather;
  const { icon } = weather[0];

  return (
    <View style={styles.iconWrap}>
      <Image source={itemImages.weatherIcon[icon]} style={styles.weatherIcon} />
    </View>
  );
}

WeatherInfo.propTypes = {
  currentWeather: PropTypes.shape({
    current: PropTypes.shape({
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
          main: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
    timezone: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  iconWrap: {
    height: undefined,
    alignItems: "flex-end",
  },
  weatherIcon: {
    width: width / 2.3,
    height: width / 2.3,
    alignItems: "flex-end",
  },
});
