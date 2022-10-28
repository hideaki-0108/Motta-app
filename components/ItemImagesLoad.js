// import React from 'react';
import React, { Component,useState,createContext, useContext,  } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight,Platform , Pressable, Text,} from 'react-native';
import {itemImages} from '../assets/deta/imageSource';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const vanillaWidth = window.width;
const width = (window.width - 100);//padding領域を入れているため
const height = window.height;


export default function itemJudge({currentWeather}){
  const maxTemp = currentWeather.daily[0].temp.max;
  const minTemp = currentWeather.daily[0].temp.min;
  const chanceOfRain = currentWeather.daily[0].pop * 100
  const humidity = currentWeather.daily[0].humidity ;



      //アイテムのJSONファイルを読み込む
      const weatherItemDetails = require('../assets/deta/items.json');
      //アイテムジャッジ
      const itemsSetter = (detail) => {
        const detaArray = detail.items;
        let detaList = detaArray.map( (deta) => {
          let itemImagesUrl = deta.itemId;//itemナンバーの管理
          for (let i = 0; i <= 50; i++) {
          if((deta.minTemp <= 30 && deta.maxTemp >= 0) && (deta.minChanceOfRain <= chanceOfRain)){ //これより下は気温・天気・湿度・降水確率・UV指数から適切なアイテムの表示判定
            return (
              itemImagesUrl
            )
            }
          }
        });
        detaList = detaList.filter( function(x) { return x !== void 0 } )
        return detaList;
      }
      const itemNum = itemsSetter(weatherItemDetails);
    
      const itemImageStyleFunction = (int, index) => {
        return index % 2 ? styles.img : styles.img2;
      }
      const jArr = itemNum.map((num)=>{
          return ({judge:false})
      })

      const [count, setCount] = useState(0);
      const [boolean,setBoolean] = useState([
        false,
        false,
        false,
        false
      ]);

      return (
        <View  style={{width:width,flexDirection: "row",flexWrap: "wrap",justifyContent:'space-around'}}>
          {itemNum.map((int,index) => { if(int !== undefined){ return (

        <TouchableOpacity key={index} onPress={() => {
          let imageNum = index;
          setBoolean((prevState) =>
            prevState.map((value,i) => (i === imageNum ? value === true ? false : true : value)
          ));
        } }  style={itemImageStyleFunction}>
          <Image key={index}  source={itemImages.ratings[int]} style={boolean[index] === true ? styles.opacity2 : styles.opacity1}></Image>
        </TouchableOpacity>
          )}
          })}
        </View>
      )
}

const styles = StyleSheet.create({
  wrap:{
    marginTop:5,
  },
  img2:{
    flex:1,
    width: (vanillaWidth / 3),
    height: (vanillaWidth / 3.5),
    marginRight: (vanillaWidth / 19),
    marginBottom:10
  },
  img:{
    flex:1,
    width: (vanillaWidth / 3),
    height: (vanillaWidth / 3.5),
    marginLeft: (vanillaWidth / 19),
    marginBottom:10

  },
  opacity1:{
    width:(width / 2) , height:(width / 2), 
    opacity:1
  },
  opacity2:{
    width:(width / 2) , height:(width / 2), 
    opacity:.3
  }
})