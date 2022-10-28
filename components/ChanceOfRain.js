import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useEffect, useState, } from 'react';


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const width = (window.width - 100);//padding領域を入れているため
const height = window.height;

export default function ChanceOfRain({currentWeather}) {

  const maxTemp = currentWeather.daily[0].temp.max;
  const minTemp = currentWeather.daily[0].temp.min;
  const chanceOfRainDetail = currentWeather.daily[0].pop * 100 + "%"
  const humidity = currentWeather.daily[0].humidity + "%";

  console.log(chanceOfRainDetail);

  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>降水確率{chanceOfRainDetail}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap:{
    marginTop:5,
  },
  text:{
    color:'#4A5A72',
    fontWeight: '400',
    fontSize: (width / 20)
  }
})

