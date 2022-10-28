import { View, Text, StyleSheet ,Dimensions} from 'react-native'
import React from 'react'

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const width = (window.width - 100);
const height = window.height;

export default function WeatherTemp({currentWeather}) {
  const {
    current : { temp }
  } = currentWeather;
  return (
    <View style={tempStyles.tempText}>
      <Text style={tempStyles.text}>{(Math.round(temp * 10)) / 10}°C</Text>
    </View>
  )
}

const tempStyles = StyleSheet.create({
  tempText:{
    flex:1,
  },
  text:{
    color:'#4A5A72',
    fontWeight: '400',
    fontSize:(width / 7),
    justifyContent:'flex-end'
  }
})