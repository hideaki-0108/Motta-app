import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const window = Dimensions.get("window");
const width = window.width - 100; //padding領域を入れているため

export default function ChanceOfRain({ currentWeather }) {
  const chanceOfRainDetail = currentWeather.daily[0].pop * 100 + "%";

  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>降水確率{chanceOfRainDetail}</Text>
    </View>
  );
}

ChanceOfRain.propTypes = {
  currentWeather: PropTypes.shape({
    daily: PropTypes.arrayOf(
      PropTypes.shape({
        pop: PropTypes.number,
      }),
    ),
  }).isRequired,
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 5,
  },
  text: {
    color: "#4A5A72",
    fontWeight: "400",
    fontSize: width / 20,
  },
});
