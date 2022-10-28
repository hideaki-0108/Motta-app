import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import * as React from "react";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import WeatherItems from "./components/ItemImagesLoad";
import WeatherTemp from "./components/WeatherTemp";
import ChanceOfRain from "./components/ChanceOfRain";
import WeatherComment from "./components/WeatherComment";
import AddLoadingGif from "./components/AddLoadingGif";

const BASE_WEATHER_URL = "https://api.openweathermap.org/data/3.0/onecall?";
const WEATHER_API_KEY = "f5747519e3e4cdaa51ee717d0156c5ee";
const window = Dimensions.get("window");
const width = window.width - 100;
const height = window.height;

console.log(width);

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWether] = useState(null);
  const [unitsSystem] = useState("metric");
  const [cityName, setCityName] = useState(null);
  const [weatherJp, setWeatherJp] = useState(null);

  const [pending, setPending] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setPending(true);
    try {
      if (Platform.OS !== "web") {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMessage("位置情報サービスをオンにしてください。");
          return;
        }
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      //現在の位置情報(経度・緯度)から都道府県の住所を取得
      const cityNameResponse = await fetch(
        `https://geoapi.heartrails.com/api/json?method=searchByGeoLocation&x=${longitude}&y=${latitude}`
      );

      const placeCityNameDetail = await cityNameResponse.json();

      const placeCityName = placeCityNameDetail.response.location[0].prefecture;

      setCityName(placeCityName);

      //都道府県の住所からWeatherIdを取得する
      const getPlaceWeatherId = (placeCityName) => {
        const placeDetail = require("./assets/deta/placeid.json");
        const id = placeDetail.placeId[placeCityName].weatherId;
        return id;
      };

      // 都道府県別の天気IDを既存のJSONから読み込む
      const placeWeatherId = getPlaceWeatherId(placeCityName);

      const weatherJpUrl = `https://weather.tsukumijima.net/api/forecast?city=${placeWeatherId}`;
      const weatherDetail = await fetch(weatherJpUrl);
      const weatherDeta = await weatherDetail.json();

      if (weatherDetail) {
        setWeatherJp(weatherDeta);
      } else {
        setErrorMessage(weatherDeta.message);
      }

      // opne weather map get json

      const response = await fetch(weatherUrl);

      const result = await response.json();

      if (response.ok) {
        setCurrentWether(result);
      } else {
        setErrorMessage(result.message);
        setPending(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setPending(false);
    }
    setPending(false);
  }

  if (pending) {
    return <>{pending ? <AddLoadingGif /> : null}</>;
  } else if (currentWeather) {
    return (
      <>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.weatherInfoWrap}>
            <View style={styles.weatherTextArea}>
              <Text style={styles.cityNameText}>{cityName}</Text>
              <ChanceOfRain currentWeather={currentWeather} />
              <WeatherTemp currentWeather={currentWeather} />
            </View>
            <WeatherInfo currentWeather={currentWeather} />
          </View>
          <View
            style={{
              flex: 3.1,
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <WeatherItems
              currentWeather={currentWeather}
              weatherJp={weatherJp}
            />
          </View>
          <View
            style={{
              flex: 2,
              position: "absolute",
              bottom: 0,
              left: 0,
              backgroundColor: "#D7E9F3",
              width: width + 100,
              height: height / 8,
            }}
          ></View>
          <View style={{ position: "absolute", bottom: 0, left: 0 }}>
            <WeatherComment currentWeather={currentWeather} />
          </View>
        </View>
        {pending ? <AddLoadingGif /> : null}
      </>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.center}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#333",
    backgroundColor: "#E9F3F7",
    justifyContent: "center",
    paddingTop: height / 12,
    paddingBottom: 50,
    paddingLeft: 43,
    paddingRight: 43,
  },
  main: {
    justifyContent: "center",
    flex: 2,
  },
  top: {
    flex: 1,
    justifyContent: "flex-start",
    textAlign: "center",
  },
  center: {
    justifyContent: "center",
    textAlign: "center",
  },
  weatherTextArea: {
    flex: 1,
    color: "#4A5A72",
    fontWeight: "400",
  },
  cityNameText: {
    color: "#4A5A72",
    fontWeight: "400",
    fontSize: width / 10,
  },
  weatherInfoWrap: {
    flex: 1,
    flexDirection: "row",
  },

  cityName: {
    flex: 1,
  },
});

//大阪の経度緯度 34.4138    135.3009
//東京都の経度緯度 35.69891   139.696731
