import { View, Text, StyleSheet,Image, Dimensions } from 'react-native'
import React from 'react'
import {itemImages} from '../assets/deta/imageSource';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const width = (window.width - 100);
const height = window.height;

export default function WeatherInfo({currentWeather}) {
  const {
    current : {weather},
    timezone
  } = currentWeather;
  let currweather = weather[0]
  const {icon, main, description} = currweather;

  return (
    <View style={weatherIconStyels.iconWrap}>
      <Image source={itemImages.weatherIcon[`${icon}`]} style={weatherIconStyels.weatherIcon}></Image>
    </View>
  )
}

const weatherIconStyels = StyleSheet.create({
  iconWrap:{
    height:undefined,
    alignItems:'flex-end',
  },

  weatherIcon:{
    width: (width / 2.3) ,
    height: (width / 2.3),
    alignItems:'flex-end',
  }
})