import React, { Component,useState } from 'react';
import { View, Image, StyleSheet, Dimensions,Text,ImageBackground } from 'react-native';
import {itemImages} from '../assets/deta/imageSource';


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const width = (window.width - 100);//padding領域を入れているため
const height = window.height;

export default function WeatherComment({currentWeather}) {
  const weather = currentWeather.daily[0].weather[0].main;

  const commentList = require('../assets/deta/comment.json');
  const commentUrl = commentList.comments
  const comment = commentUrl[weather]

  return (
        <View style={styles.container}>
          <Image
          source={require('../assets/img/mainkyara.png')}
          style={styles.characterImg} />
          <ImageBackground
          source={require('../assets/img/hukidashi.png')}
          style={styles.hukidashi} >
            <Text style={styles.hukidashiText}>{comment}</Text>
          </ImageBackground>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#D7E9F3",
    width:"100%"
  },
  characterImg: {
    position:'absolute',
    width: (width / 2),
    height: (width / 2),
    bottom: (height / 16),
    left:50
  },
  hukidashi: {
    flex:1,
    position:'absolute',
    width: (width / 1.5),
    height: (width / 3.2),
    bottom:(height / 6),
    left: (width / 1.5 - 30)
  },
  hukidashiText:{
    flex:1,
    marginTop:(width / 10),
    marginLeft:(width/20),
    justifyContent:'center',
    textAlign:'center',
    alignItems:'center',
    color:"#4A5A72",
    fontSize:(width/ 20),
    lineHeight:(width / 10),
    fontWeight:'bold'
  }
});