import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import ForecastItem from "./forecast";

const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;
const FORECAST_API_KEY = process.env.EXPO_PUBLIC_OPEN_FORECAST_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const CITY_URL = "http://api.openweathermap.org/geo/1.0";

function SelectedLocation({ value }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const getSelectedLocation = async () => {
    if (value) {
      try {
        const response = await fetch(
          `${BASE_URL}?lat=${value[0].lat}&lon=${value[0].lon}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getSelectedForecast = async () => {
    if (value) {
      const dayNumber = 7;
      const response = await fetch(
        `${FORECAST_URL}?lat=${value[0].lat}&lon=${value[0].lon}&cnt=${dayNumber}&appid=${FORECAST_API_KEY}&units=metric`
      );
      const data = await response.json();
      setForecast(data.list);
    }
  };

  useEffect(() => {
    getSelectedLocation();
    getSelectedForecast();
  }, [value]);

  useEffect(() => {}, [weather,forecast,value]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/3684396/pexels-photo-3684396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        resizeMode="cover"
        style={styles.container}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.location}>{weather?.name}</Text>
          <Text style={styles.temperature}>
            {Math.round(weather?.main.temp)}°
          </Text>
        </View>
        <FlatList
          contentContainerStyle={{ gap: 10, height: 200, width: 400 }}
          showsHorizontalScrollIndicator={false}
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
    justifyContent: "center",
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
export default SelectedLocation;
