import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
  TextInput,
  ImageBackground,
} from "react-native";
import {} from "react-native";
import * as Location from "expo-location";
import ForecastItem from "./forecast";

const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;
const FORECAST_API_KEY = process.env.EXPO_PUBLIC_OPEN_FORECAST_KEY;
const LOCATION_API_KEY = process.env.EXPO_PUBLIC_OPEN_LOCATION_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const CITY_URL = "http://api.openweathermap.org/geo/1.0";

function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [value, setValue] = useState("");

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

  const getCityLocation = async () => {
    response = await fetch(
      `${CITY_URL}/direct?q=${value}&appid=${LOCATION_API_KEY}`
    );
    const data = await response.json();
    setValue(data)
  };

  // İlk render'da veriyi çek
  useEffect(() => { 
    if (location) {
      getWeatherToday();
      getWeatherForecast();
    }
  }, [location]);

  // Weather değiştiğinde log'la
  useEffect(() => {
    console.log(value)
  }, [weather, forecast, value]);

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

  if (!weather) {
    return <ActivityIndicator></ActivityIndicator>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/3684396/pexels-photo-3684396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="choose city"
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <Button style={styles.btn} title="Search" onPress={() => getCityLocation(value)} />
        </View>
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
  inputContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Buton ve input arasını eşit şekilde hizalar
    alignItems: 'center', // Yatayda ortalamak için
    padding: 10,
    backgroundColor: 'rgba(248, 248, 255, 0.47)',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1, // Input alanının genişliğini otomatik olarak ayarlar
    marginRight: 10, // Input ile buton arasındaki boşluğu ayarlar
    paddingLeft: 10,
  },
  btn: {
    
  }
});

export default WeatherScreen;
