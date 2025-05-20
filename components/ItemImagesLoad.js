// import React from 'react';
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { itemImages } from "../assets/deta/imageSource";

const window = Dimensions.get("window");
const vanillaWidth = window.width;
const width = window.width - 100; // padding領域を考慮

export default function ItemImagesLoad({ currentWeather }) {
  const { daily } = currentWeather;
  const chanceOfRain = daily[0].pop * 100;

  // アイテムのJSONファイルを読み込む
  const weatherItemDetails = require("../assets/deta/items.json");

  // アイテムの表示判定
  const getFilteredItems = (details) => {
    const { items } = details;
    return items
      .filter((item) => {
        return (
          item.minTemp <= 30 &&
          item.maxTemp >= 0 &&
          item.minChanceOfRain <= chanceOfRain
        );
      })
      .map((item) => item.itemId)
      .filter(Boolean);
  };

  const itemIds = getFilteredItems(weatherItemDetails);
  const [selectedItems, setSelectedItems] = useState(
    Array(itemIds.length).fill(false),
  );

  const getItemStyle = (index) => {
    return index % 2 ? styles.img : styles.img2;
  };

  return (
    <View style={styles.container}>
      {itemIds.map((itemId, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setSelectedItems((prev) =>
              prev.map((value, i) => (i === index ? !value : value)),
            );
          }}
          style={getItemStyle(index)}
        >
          <Image
            source={itemImages.ratings[itemId]}
            style={selectedItems[index] ? styles.opacity2 : styles.opacity1}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

ItemImagesLoad.propTypes = {
  currentWeather: PropTypes.shape({
    daily: PropTypes.arrayOf(
      PropTypes.shape({
        pop: PropTypes.number.isRequired,
        temp: PropTypes.shape({
          max: PropTypes.number.isRequired,
          min: PropTypes.number.isRequired,
        }).isRequired,
        humidity: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  img2: {
    flex: 1,
    width: vanillaWidth / 3,
    height: vanillaWidth / 3.5,
    marginRight: vanillaWidth / 19,
    marginBottom: 10,
  },
  img: {
    flex: 1,
    width: vanillaWidth / 3,
    height: vanillaWidth / 3.5,
    marginLeft: vanillaWidth / 19,
    marginBottom: 10,
  },
  opacity1: {
    width: width / 2,
    height: width / 2,
    opacity: 1,
  },
  opacity2: {
    width: width / 2,
    height: width / 2,
    opacity: 0.3,
  },
});
