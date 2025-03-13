import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { View, Text, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import ForecastItem from "./forecast";
import { ImageBackground } from "react-native";
// const IST = { lat: 41.0138, long: 28.9496 };
const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;
const FORECAST_API_KEY = process.env.EXPO_PUBLIC_OPEN_FORECAST_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getWeatherToday = async () => {
    try {
      if (!location) {
        return;
      }
      const response = await fetch(
        `${BASE_URL}?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherForecast = async () => {
    if (!location) {
      return;
    }
    const dayNumber = 7;
    const response = await fetch(
      `${FORECAST_URL}?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&cnt=${dayNumber}&appid=${FORECAST_API_KEY}&units=metric`
    );
    const data = await response.json();
    setForecast(data.list);
  };

  // İlk render'da veriyi çek
  useEffect(() => {
    if (location) {
      getWeatherToday();
      getWeatherForecast();
    }
  }, [location]);

  // Weather değiştiğinde log'la
  useEffect(() => {}, [weather, forecast]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  if(!weather){
    return <ActivityIndicator></ActivityIndicator>
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://images.pexels.com/photos/3684396/pexels-photo-3684396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}} resizeMode="cover" style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.location}>{weather?.name}</Text>
        <Text style={styles.temperature}>
          {Math.round(weather?.main.temp)}°
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{ gap: 10, height: 200, width: 400 }}
        showsHorizontalScrollIndicator = {false}
        horizontal
        style={{ marginTop: "auto" }}
        data={forecast}
        renderItem={({ item }) => <ForecastItem forecast={item} />}
      />
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  location: {
    fontFamily: "inter",
    fontSize: 30,
  },
  temperature: {
    fontFamily: "InterBlack",
    fontSize: 120,
    color: "gray",
  },
});

export default WeatherScreen;
