import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import ForecastItem from "./forecast";
import Feather from "@expo/vector-icons/Feather";
function CurrentLocationWeather({ weather, forecast, location }) {
  return (
    <View style={{flex: 1, width: '%100', justifyContent: "center", alignItems: "center"}}>
      
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text style={styles.temperature}>
            {Math.round(weather?.main.temp)}°
          </Text>
          <Text style={styles.location}>{weather?.name}</Text>
        </View>
        <View style={styles.details}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Feels like: {Math.round(weather?.main.feels_like)}°
            </Text>
            <Text style={styles.text}>
              Temp MIN-MAX: {Math.round(weather?.main.temp_min) +"-"+ Math.round(weather?.main.temp_max)}°
            </Text>
            <Text style={styles.text}>
            Desc: {weather.weather[0].description}
            </Text>
          </View>
          {weather.weather[0].main === "Rain" ? (
            <Feather
              style={{ paddingRight: 20, paddingTop: 20 }}
              name="cloud-rain"
              size={40}
              color="black"
            />
          ) : weather.weather[0].main === "Clouds" ? (
            <Feather
              style={{ paddingRight: 20, paddingTop: 20 }}
              name="cloud"
              size={40}
              color="black"
            />
          ) : weather.weather[0].main === "Clear" ? (
            <Feather
              style={{ paddingRight: 20, paddingTop: 20 }}
              name="sun"
              size={40}
              color="black"
            />
          ) : weather.weather[0].main === "Snow" ? (
            <Feather
              style={{ paddingRight: 20, paddingTop: 20 }}
              name="snowflake"
              size={40}
              color="black"
            />
          ) : weather.weather[0].main === "Thunderstorm" ? (
            <Feather
              style={{ paddingRight: 20, paddingTop: 20 }}
              name="zap"
              size={40}
              color="black"
            />
          ) : (
            <Text style={{ paddingRight: 20, paddingTop: 20 }}>
             not available
            </Text>
          )}
        </View>
        <FlatList
          contentContainerStyle={{ gap: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ marginTop: "auto", height: 1 }}
          data={forecast}
          renderItem={({ item }) => <ForecastItem forecast={item} />}
        />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
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
  details: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "rgba(248, 248, 255, 0.47)",
    alignItems: "flex-start",
    justifyContent: "space-around",
    height: 200,
    width: 250,
    borderRadius: 5,
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    padding: 15,
  },
  text: {
    fontFamily: "InterBlack",
    fontSize: 16,
  },
});

export default CurrentLocationWeather;
