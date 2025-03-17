import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import ForecastItem from "./forecast";

function CurrentLocationWeather({ weather, forecast, location }) {
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
          style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}
        >
          <Text style={styles.temperature}>
            {Math.round(weather?.main.temp)}°
          </Text>
          <Text style={styles.location}>{weather?.name}</Text>
        </View>
        <FlatList
          contentContainerStyle={{ gap: 10, height: 200, width: 400 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ marginTop: "auto" }}
          data={forecast}
          renderItem={({ item }) => <ForecastItem forecast={item} />}
        />
        <View style={styles.details}>
          <Text>{weather?.main.feels_like}</Text>
        </View>
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
  details: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inter",
    fontSize: 20,
    height: 200,
    width: 400,
  },
});

export default CurrentLocationWeather;
